import ko from 'knockout';
import $ from 'jquery';
import 'jquery.inputmask';
import 'jquery.inputmask/dist/inputmask/jquery.inputmask.date.extensions';
import 'jquery.inputmask/dist/inputmask/jquery.inputmask.extensions';
import 'jquery.inputmask/dist/inputmask/jquery.inputmask.numeric.extensions';
import 'jquery.inputmask/dist/inputmask/jquery.inputmask.phone.extensions';
import 'jquery.inputmask/dist/inputmask/jquery.inputmask.regex.extensions';


    var unwrap = ko.unwrap;

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
            allowMinus: true,
            rightAlign: false,
            definitions: {
                'i': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var i, split, dc;

                        for (i = pos - 1; i > -1; i--) {
                            chrs = maskset.buffer[i] + chrs;
                        }
                        if(chrs.indexOf('-') === 0) {
                            chrs = chrs.slice(1);
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
            suffix: ' %',
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
            rightAlign      : false,
            greedy          : false,
            allowMinus      : false,
            prefix          : '$ ',
            onBeforeMask    : function (value, opts) {
                if (value.indexOf('.00') == -1 && value !== '') {
                    return value + '.00';
                }
                return value;
            }
        }
    },
    {
        date: {
            'mask': '9[9/9[9/9999]]',
            'greedy': false,
            'placeholder': ''
        }
    });

    ko.bindingHandlers.inputmask = {
        init: function (
            element,
            valueAccessor,
            allBindings,
            viewModel,
            bindingContext
        ) {
            var options = unwrap(valueAccessor()),
                observable = allBindings().value || allBindings().textInput || allBindings().datepicker.data;

            if(!options) {
                return;
            }

            // removing placeholder as it breaks some input masks, i.e. dates
            // options.placeholder = options.placeholder ||| ' ';
            options.autoUnmask = options.autoUnmask === false ? false : true;
            
            if (ko.isObservable(observable)) {
                $(element).on('focusout change', function () {
                    observable($(element).val());
                });
            }

            // inits the inputmask
            $(element).inputmask(options);
        },
        update: function (
            element,
            valueAccessor,
            allBindings,
            viewModel,
            bindingContext
        ) {
            var options = unwrap(valueAccessor()),
                observable = allBindings().value || allBindings().textInput || allBindings().datepicker.data;
        
            if (ko.isObservable(observable)) {
                var valuetoWrite = observable();
                $(element).val(valuetoWrite);
            }
        }
    };

