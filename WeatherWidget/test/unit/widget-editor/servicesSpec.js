describe('widgetEditor. Check services', function () {
    beforeEach(module('tools'));
    beforeEach(module('widgetEditor'));

    describe('widgetService', function () {
        it('existence of factory', inject(function (widgetService) {
            expect(widgetService).toBeDefined();
        }));
        it('existence of factory methods', inject(function (widgetService) {
            expect(widgetService.get).toBeDefined();
            expect(widgetService.save).toBeDefined();
            expect(widgetService.remove).toBeDefined();
            expect(widgetService.getCode).toBeDefined();
        }));
        it('get method', inject(function (widgetService, $q) {
            var result = widgetService.get('').$promise;
            expect(typeof result).toBe('object');
            expect(result.constructor).toBe($q.defer().promise.constructor);
        }));
        it('getCode method', inject(function (widgetService, embedCodeTemplate, tools) {
            var result = widgetService.getCode({});
            expect(result).toBe(tools.format(embedCodeTemplate, 'metric', '','',''));
        }));
    });

    describe('viewService', function () {
        it('existence of factory', inject(function (viewService) {
            expect(viewService).toBeDefined();
        }));
        it('existence of factory methods', inject(function (viewService) {
            expect(viewService.go).toBeDefined();
        }));
    });

    describe('tools', function () {
        it('existence of embedCodeTemplate constant', inject(function (embedCodeTemplate) {
            expect(embedCodeTemplate).toBeDefined();
        }));
        it('existence of factory', inject(function (tools) {
            expect(tools).toBeDefined();
        }));
        it('existence of factory methods', inject(function (tools) {
            expect(tools.format).toBeDefined();
            expect(tools.guid).toBeDefined();
            var guid = tools.guid();
            expect(guid).not.toBe(null);
            expect(guid.length).toBe(36);
        }));
    });
});