/* global describe,beforeEach,module,jasmine,it,inject,expect */

describe('widgetEditor. Check controllers', function () {
    beforeEach(function () {
        jasmine.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('widgetEditor'));

    describe('ListCtrl', function () {
        it('should have a ListCtrl controller', inject(function ($controller) {
            var scope = {},
                ctrl = $controller('ListCtrl', { $scope: scope });
            expect(ctrl).toBeDefined();
        }));

    });


    describe('CreateCtrl', function () {
        it('should have a CreateCtrl controller', inject(function ($controller) {
            var scope = {},
                ctrl = $controller('CreateCtrl', { $scope: scope });
            expect(ctrl).toBeDefined();
        }));
    });
});