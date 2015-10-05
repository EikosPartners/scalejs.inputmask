define([
    'scalejs!core',
    'knockout',
    'inputmask',
    'jquery'
], function (
    core,
    ko,
    inputmask,
    $
) {

    'use strict';

    var is = core.type.is,
        unwrap = ko.unwrap,
        clone = core.object.clone;

    $.extend($.inputmask.defaults.definitions, {
        u: {
            validator: '[0-9A-F]',
            cardinality: 1
        }
    });

    ko.bindingHandlers.inputmask = {
        init: function () {
            //console.log('is inited');
        },
        update: function (
            element,
            valueAccessor,
            allBindings,
            viewModel,
            bindingContext
        ) {
            var options = unwrap(valueAccessor()),
                val = allBindings().value || allBindings().textInput,
                initialVal = val.peek();

            if(!options) {
                return;
            }
            options.placeholder = ' ';
            options.autoUnmask = options.autoUnmask === false ? false : true;
            // inits the inputmask
            $(element).inputmask(options);

            if(initialVal && initialVal.toString() !== $(element).val()) {
                console.warn('The initial value of the inputmask is not valid. The value will be mutated upon masking', initialVal, options);
            }
        }
    };
});
