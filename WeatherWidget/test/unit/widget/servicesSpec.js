/* global describe,beforeEach,module,jasmine,it,inject,expect */
"use strict";

describe('widget. Check services', function () {
    beforeEach(function () {
        jasmine.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('widget'));
    beforeEach(module('widget.services'));

    it('existence of geoPositionOptions constant', inject(function (geoPositionOptions) {
        expect(geoPositionOptions).toBeDefined();
    }));

    it('apiId, positionUrlTemplate and geoIpServiceUrl provided', inject(function (apiId, positionUrlTemplate, geoIpServiceUrl) {
        expect(apiId).toBeDefined();
        expect(apiId).not.toBe(null);
        expect(positionUrlTemplate).toEqual('http://api.openweathermap.org/data/2.5/weather?appid=:apiId&lon=:lon&lat=:lat&units=:units');
        expect(geoIpServiceUrl).toEqual('http://ip-api.com/json');
    }));

    describe('Weather', function () {
        var factory;
        beforeEach(inject(function (Weather) {
            factory = Weather;
        }));
        it('existence of factory', function () {
            expect(factory).toBeDefined();
        });
        it('existence of factory methods', function () {
            expect(factory.get).toBeDefined();
        });
        it('get method', inject(function ($q) {
            var result = factory.get('metric');
            expect(typeof result).toBe('object');
            expect(result.constructor).toBe($q.defer().promise.constructor);
        }));
    });

    describe('OpenWeather', function () {
        var factory;
        beforeEach(inject(function (OpenWeather) {
            factory = OpenWeather;
        }));
        it('existence of factory', function () {
            expect(factory).toBeDefined();
        });
        it('existence of factory methods', function () {
            expect(factory.getByPosition).toBeDefined();
        });
        it('getByPosition', inject(function ($q) {
            var result = factory.getByPosition({ lon: '0', lat: '0' }, 'metric');
            expect(typeof result).toBe('object');
            expect(result.constructor).toBe($q.defer().promise.constructor);
        }));
    });
    describe('Geoposition', function () {
        var factory = null;
        beforeEach(inject(function (Geoposition) {
            factory = Geoposition;
        }));
        it('existence of factory', function () {
            expect(factory).toBeDefined();
        });
        it('existence of factory methods', function () {
            expect(factory.get).toBeDefined();
        });
        it('get method', inject(function ($window, $q) {
            var position = { coords: { latitude: 10, longitude: 10 } };
            spyOn($window.navigator.geolocation, "getCurrentPosition").and.callFake(function () {
                arguments[0](position);
            });
            var result = factory.get();
            expect(typeof result).toBe('object');
            expect(result.constructor).toBe($q.defer().promise.constructor);
        }));
    });
    it('existence of unitsFactory factory', inject(function (unitsFactory) {
        expect(unitsFactory).toBeDefined();
        expect(unitsFactory.imperial.wind).toBeDefined();
        expect(unitsFactory.imperial.temp).toBeDefined();
        expect(unitsFactory.metric.wind).toBeDefined();
        expect(unitsFactory.metric.temp).toBeDefined();
    }));
    it('existence of tools factory', inject(function (tools) {
        expect(tools.format).toBeDefined();
    }));
});