/* global angular */
/* global jQuery */

(function () {
    'use strict';
    angular
    .module('widgetEditor', ['ngResource'])
    .config(["$locationProvider"
    , function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .controller('MainCtrl', ['$log', '$scope', '$resource', '$window', '$location', 'Widget',
    function MainCtrl($log, $scope, $resource, $window, $location, Widget) {
        $log.log('MainCtrl constructor');

        var self = this;
        var path = $location.path();
        var pathParts = path.split('/');
        var widgetId = pathParts[pathParts.length - 1];
        self.widget = Widget.getDetails(widgetId);
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('widgetEditor');

    app.factory('Widget', ['$resource', '$log', WidgetService]);
    function WidgetService($resource, $log) {
        $log.log('Widget singleton');

        var Widget = $resource('/odata/Widgets(:widgetId)', { widgetId: '@id' });
        
        function getDetails(widgetId) {
            return Widget.get({ widgetId: widgetId });
        }

        return {
            getDetails: getDetails
        };
    }
})();