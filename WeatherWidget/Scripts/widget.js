(function () {
    var called = false;

    function ready() {
        if (called) return;
        called = true;

        Array.prototype.forEach.call(document.querySelectorAll('w-widget'), function (node) {
            angular.bootstrap(node, ['widget']);
        });
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                ready();
            }
        })
    }
})();

(function () {
    var app = angular
    .module('widget', ['widget.directives', 'widget.services'])
    .controller('MainCtrl', ['$log', '$scope', '$window', '$location', 'Weather',
    function MainCtrl($log, $scope, $window, $location, Weather) {
        var self = this;

        self.data = {};
        self.acquireWeatherData = acquireWeatherData;

        // called from w-widget directive
        function acquireWeatherData(units) {
            Weather.get(units)
                .then(function (data) {
                    self.data = data;
                }, function WeatherGetError(err) {
                    $log.warn(err);
                });
        }
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('widget.directives', []);
    app.directive('wWidget', function () {
        return {
            restrict: 'E',
            scope: true,
            link: function (scope, element, attrs, ctrl) {
                scope.wind = typeof attrs.wind !== 'undefined';
                ctrl.acquireWeatherData(attrs.units);
            },
            controller: 'MainCtrl as main'
        }
    });
})();

(function () {
    'use strict';
    var app = angular.module('widget.services', ['ngResource']);

    app.constant('geoPositionOptions', {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 5000
    });

    app.factory('Weather', ['$log', '$q', 'OpenWeather', 'Geoposition', 'tools', 'unitsFactory', WeatherService]);
    function WeatherService($log, $q, OpenWeather, Geoposition, tools, unitsFactory) {
        var data;

        return {
            get: function get(units) {
                var deferred = $q.defer();

                Geoposition.get()
                    .then(function GeopositionReceived(pos) {
                        return OpenWeather.getByPosition(pos, units)
                    }, deferred.reject)
                    .then(function WeatherReceived(resource) {
                        data = resource;
                        deferred.resolve({
                            temp: getTemp(units),
                            humidity: getHumidity(),
                            wind: getWind(units),
                            iconClass: getIconClass(),
                            location: getLocation()
                        })
                    }, deferred.reject);
                return deferred.promise;
            }
        }

        function getTemp(units) {
            var result = 'n/a';
            if (data && data.main) {
                result = Math.round(data.main.temp, 0);

                result = tools.format('{0}{1} °{2}', result > 0 ? '+' : '', result, unitsFactory[units].temp);
            }
            return result;
        }
        function getWind(units) {
            var result = 'n/a';

            if (data && data.wind && data.wind) {
                // TODO pass real Units
                result = tools.format('{0} {1}', Math.round(data.wind.speed, 0), unitsFactory[units].wind);
            }
            return result;
        }
        function getIconClass() {
            var result = 'n/a';

            if (data && data.weather && data.weather.length) {
                result = tools.format('wi-owm-{0}', data.weather[0].id);
            }

            return result;
        }
        function getLocation() {
            var result = '';

            if (data && data.name) {
                result = data.name;
            }

            return result;
        }
        function getHumidity() {
            var result = 'n/a';
            if (data && data.main) {
                result = data.main.humidity;

                result = data.main.humidity;
            }
            return result;
        }

        return {
            get: get
        };
    }

    app.value('cityId', '511196');
    app.value('apiId', 'c038faa1c0c6322b27ceb7ca5f333ecf');
    app.value('positionUrlTemplate', 'http://api.openweathermap.org/data/2.5/weather?appid=:apiId&lon=:lon&lat=:lat&units=:units');

    app.factory('OpenWeather', ['$resource', '$log', '$q', '$timeout', 'cityId', 'apiId', 'positionUrlTemplate',
    function OpenWeather($resource, $log, $q, $timeout, cityId, apiId, positionUrlTemplate) {
        var WeatherByPosition = $resource(positionUrlTemplate);
        var pause = 150;
        var timeout = 0 - pause;

        return {
            getByPosition: function get(pos, units) {
                var deferred = $q.defer();

                $timeout(function OpenWeatherMapLockReleased() {
                    WeatherByPosition.get({ apiId: apiId, lon: pos.lon, lat: pos.lat, units: units }).$promise.then(function (data) {
                        timeout -= pause;
                        deferred.resolve(data);
                    });
                }, timeout += pause);

                return deferred.promise;
                // return WeatherByPosition.get({ apiId: apiId, lon: pos.lon, lat: pos.lat, units: units }).$promise;
            }
        };
    }]);

    app.factory('Geoposition', ['$log', '$window', '$q', 'geoPositionOptions',
    function Geoposition($log, $window, $q, geoPositionOptions) {
        return {
            get: function get() {
                if (!("geolocation" in $window.navigator)) {
                    throw "Sorry, geoposition is not available in your browser";
                }
                else {
                    var deferred = $q.defer();

                    $window.navigator.geolocation.getCurrentPosition(function success(pos) {
                        var position = {
                            lon: pos.coords.longitude,
                            lat: pos.coords.latitude
                        };
                        return deferred.resolve(position);
                    }, deferred.reject, geoPositionOptions);
                }
                return deferred.promise;
            }
        };
    }]);

    app.factory('unitsFactory', [function unitsFactory() {
        return {
            imperial: {
                wind: 'mph',
                temp: 'F'
            },
            metric: {
                wind: 'm/s',
                temp: 'C'
            }
        }
    }]);

    app.factory('tools', [function tools() {
        return {
            format: function format(str) {
                var args = Array.prototype.slice.call(arguments, 1);
                return str.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined'
                      ? args[number]
                      : match
                    ;
                })
            }
        };
    }]);
})();