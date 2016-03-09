/* global describe,beforeEach,module,jasmine,it,inject,expect */
"use strict";

describe('widget. Check controllers', function () {
    beforeEach(function () {
        jasmine.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('widget'));

    describe('MainCtrl', function () {
        var scope = {}, ctrl;
        beforeEach(inject(function ($controller) {
            ctrl = $controller('MainCtrl', { $scope: scope });
        }));
        it('existence of controller', function () {
            expect(ctrl).toBeDefined();
        });
        it('existence of controller methods', inject(function ($controller) {
            expect(ctrl.acquireWeatherData).toBeDefined();
        }));
        it('acquireWeatherData method', inject(function ($q) {
            var result = ctrl.acquireWeatherData('metric');
            expect(typeof result).toBe('object');
            expect(result.constructor).toBe($q.defer().promise.constructor);
        }));
    });
});