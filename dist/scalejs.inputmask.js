'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('jquery.inputmask');

require('jquery.inputmask/dist/inputmask/jquery.inputmask.date.extensions');

require('jquery.inputmask/dist/inputmask/jquery.inputmask.extensions');

require('jquery.inputmask/dist/inputmask/jquery.inputmask.numeric.extensions');

require('jquery.inputmask/dist/inputmask/jquery.inputmask.phone.extensions');

require('jquery.inputmask/dist/inputmask/jquery.inputmask.regex.extensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unwrap = _knockout2.default.unwrap;

_jquery2.default.extend(_jquery2.default.inputmask.defaults.definitions, {
    u: {
        validator: '[0-9A-F]',
        cardinality: 1
    }
});

_jquery2.default.extend(_jquery2.default.inputmask.defaults.aliases, {
    percent: {
        alias: 'numeric',
        mask: 'i[i[i[i[i[i[i]]]]]] %',
        allowMinus: true,
        rightAlign: false,
        definitions: {
            'i': {
                validator: function validator(chrs, maskset, pos, strict, opts) {
                    var i, split, dc;

                    for (i = pos - 1; i > -1; i--) {
                        chrs = maskset.buffer[i] + chrs;
                    }
                    if (chrs.indexOf('-') === 0) {
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
                    return (/100.00|[0-0][0-9]{2}.[0-9]{3}$/.test(chrs)
                    );
                }
            }
        },
        suffix: ' %',
        greedy: false,
        cardinality: 1
    }
}, {
    money: {
        alias: 'numeric',
        groupSeparator: ',',
        autoGroup: true,
        digits: 2,
        rightAlign: false,
        greedy: false,
        allowMinus: false,
        prefix: '$ ',
        onBeforeMask: function onBeforeMask(value, opts) {
            if (value.indexOf('.00') == -1 && value !== '') {
                return value + '.00';
            }
            return value;
        }
    }
}, {
    date: {
        'mask': '9[9/9[9/9999]]',
        'greedy': false,
        'placeholder': ''
    }
});

_knockout2.default.bindingHandlers.inputmask = {
    init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = unwrap(valueAccessor()),
            observable = allBindings().value || allBindings().textInput;

        if (!options) {
            return;
        }

        // removing placeholder as it breaks some input masks, i.e. dates
        // options.placeholder = options.placeholder ||| ' ';
        options.autoUnmask = options.autoUnmask === false ? false : true;

        if (_knockout2.default.isObservable(observable)) {
            (0, _jquery2.default)(element).on('focusout change', function () {
                observable((0, _jquery2.default)(element).val());
            });
        }

        // inits the inputmask
        (0, _jquery2.default)(element).inputmask(options);
    },
    update: function update(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = unwrap(valueAccessor()),
            observable = allBindings().value || allBindings().textInput || allBindings().datepicker.data;

        if (_knockout2.default.isObservable(observable)) {
            var valuetoWrite = observable();
            (0, _jquery2.default)(element).val(valuetoWrite);
        }
    }
};