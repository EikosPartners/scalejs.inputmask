

define('scalejs.inputmask',[
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

    $.extend($.inputmask.defaults.aliases, {
        percent: {
            alias: 'numeric',
            mask: 'i[i[i[i[i[i[i]]]]]] %',
            definitions: {
                'i': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var i, split, dc;

                        for (i = pos - 1; i > -1; i--) {
                            chrs = maskset.buffer[i] + chrs;
                        }
                        chrs = String(chrs);
                        split = chrs.split('.');
                        if (split.length > 2) {
                            return false;
                        }
                        chrs = split[0];
                        dc = split[1] || '';
                        for (i = 3 - chrs.length; i > 0; i--) {
                            chrs = '0' + chrs;
                        }
                        chrs += '.' + dc;
                        for (i = 7 - chrs.length; i > 0; i--) {
                            chrs += '0';
                        }
                        return /100.00|[0-0][0-9]{2}.[0-9]{3}$/.test(chrs);
                    }
                }
            },
            greedy: false,
            cardinality: 1
        }
    },
    {
        money: {
            alias           : 'numeric',
            groupSeparator  : ',',
            autoGroup       : true,
            digits          : 2,
            rightAlign      : true,
            greedy          : false,
            allowMinus      : false,
            prefix          : '$ ',
            onBeforeMask    : function (value, opts) {
                if (value.indexOf('.00') == -1) {
                    return value + '.00';
                }
                return value;
            }
        }
    });

    ko.bindingHandlers.inputmask = {
        init: function () {
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


