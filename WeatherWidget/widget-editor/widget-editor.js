/* global angular */
/* jslint multistr: true */

(function () {
    'use strict';
    angular
    .module('widgetEditor', ['ngResource', 'ngRoute', 'ngMaterial', 'ngMessages', 'tools'])
    .config(['$locationProvider', '$routeProvider', '$mdThemingProvider'
    , function ($locationProvider, $routeProvider, $mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('pink');
        //$locationProvider.html5Mode(true);
        $routeProvider
          .when('/', {
              templateUrl: 'widget-editor/partials/list.html',
              controller: 'ListCtrl',
              controllerAs: 'ctrl'
          })
          .when('/widget', {
              templateUrl: 'widget-editor/partials/create.html',
              controller: 'CreateCtrl',
              controllerAs: 'ctrl'
          })
          .when('/widget/:widgetId', {
              templateUrl: 'widget-editor/partials/create.html',
              controller: 'CreateCtrl',
              controllerAs: 'ctrl'
          });

    }])
    .controller('ListCtrl', ['$log', '$scope', '$mdDialog', '$mdMedia', 'widgetService', 'viewService',
    function ListCtrl($log, $scope, $mdDialog, $mdMedia, widgetService, viewService) {
        var self = this;
        self.go = viewService.go;
        self.widgets = widgetService.get();
        self.remove = remove;
        self.showCode = showCode;

        function remove(widget) {
            widgetService.remove(widget, self.widgets.value);
        }
        function showCode(ev, widget) {
            var code = widgetService.getCode(widget);
            $mdDialog.show({
                controller: CodeDialogCtrl,
                templateUrl: 'widget-editor/partials/codedialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false,
                locals: { code: code }
            });
        }
    }])
    .controller('CreateCtrl', ['$log', '$scope', '$resource', '$routeParams', 'widgetService', 'viewService',
    function CreateCtrl($log, $scope, $resource, $routeParams, widgetService, viewService) {
        var self = this;
        self.goBackToList = viewService.go.bind(null, '/');
        if ($routeParams.widgetId) {
            self.widget = widgetService.get($routeParams.widgetId);
        } else {
            self.widget = {
                name: null,
                unit: false,
                showWind: true,
                showHumidity: true,
                showLocation: true
            };
        }

        self.save = function () {
            if (!self.widget.name) return;
            widgetService
                .save(self.widget).$promise
                .then(self.goBackToList);
        };
    }]);
    function CodeDialogCtrl($scope, $mdDialog, code) {
        $scope.code = code;
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
})();

(function () {
    'use strict';
    var app = angular.module('widgetEditor');
    app.directive("wFocusNextOnEnter", function () {
        return {
            restrict: "A",
            link: function ($scope, elem) {
                elem.bind("keydown", function (e) {
                    var focusables = this.form;
                    var code = e.keyCode || e.which;
                    if (code === 13) {
                        var current = Array.prototype.indexOf.call(focusables, this);
                        var next = focusables[current + 1];
                        next = next ? next : focusables[0];
                        next.focus();
                        e.preventDefault();
                    }
                });
            }
        };
    });
    app.factory('widgetService', ['$resource', 'tools', 'embedCodeTemplate', widgetService]);
    function widgetService($resource, tools, embedCodeTemplate) {
        var service = $resource('/odata/Widgets:widgetId', {}, {
            patch: { method: 'PATCH', params: { widgetId: '@id' } }
        });

        function get(widgetId) {
            var id = widgetId ? '(' + widgetId + ')' : '';
            return service.get({ widgetId: id });
        }

        function save(widget) {
            if (!widget.id) {
                widget.id = tools.guid();
                return service.save(widget);
            } else {
                return service.patch({ widgetId: '(' + widget.id + ')' }, widget);
            }
        }

        function remove(widget, widgets) {
            return service
                .remove({ widgetId: '(' + widget.id + ')' }).$promise
                .then(function onRemove() {
                    var index = widgets.indexOf(widget);
                    widgets.splice(index, 1);
                });
        }

        function getCode(widget) {
            return tools.format(embedCodeTemplate
                , widget.unit ? 'imperial' : 'metric'
                , widget.showWind ? ' wind' : ''
                , widget.showHumidity ? ' humidity' : ''
                , widget.showLocation ? ' location' : '');
        }

        return {
            get: get,
            save: save,
            remove: remove,
            getCode: getCode
        };
    }
    app.factory('viewService', ['$location', viewService]);
    function viewService($location) {
        return {
            go: function go(url) {
                $location.path(url);
            }
        };
    }
    app.constant('embedCodeTemplate',
'<link href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css" rel="stylesheet" />\n\
<link href="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-csp.css" rel="stylesheet" />\n\
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min.js"></script>\n\
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-resource.min.js"></script>\n\
<!--<link href="../widget/widget.css" rel="stylesheet" />-->\n\
<script src="../widget/widget.js"></script>\n\
\n\
<w-widget ng-cloak units="{0}"{1}{2}{3}></w-widget>');
})();

(function () {
    angular.module("tools", [])
    .factory("tools", [function tools() {
        return {
            guid: function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            },
            format: function (str) {
                var args = Array.prototype.slice.call(arguments, 1);
                return str.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] !== 'undefined'
                    ? args[number]
                    : match;
                });
            }
        };
    }
    ]);
})();
