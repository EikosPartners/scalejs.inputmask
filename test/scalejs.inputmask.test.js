define([
    'scalejs.core', 'scalejs.application'
], function(
    core
) {
    var inputmask = core.inputmask;

    // For deeper testing, log to console
    console.log('core.inputmask: ', inputmask);

    describe('core.inputmask', function() {

        it('is defined', function() {
            expect(inputmask).toBeDefined();
        });

    });
});

