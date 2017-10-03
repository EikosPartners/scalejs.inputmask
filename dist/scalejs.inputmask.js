'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _inputmask = require('inputmask');

var _inputmask2 = _interopRequireDefault(_inputmask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unwrap = _knockout2.default.unwrap;

_inputmask2.default.extendDefinitions({
    u: {
        validator: '[0-9A-F]',
        cardinality: 1
    }
});

_inputmask2.default.extendAliases({
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
            if (value !== '') {
                return (parseFloat(value) || 0).toFixed(2);
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
                if (options.alias === 'money' && observable() !== parseFloat(observable()).toFixed(2)) {
                    observable.valueHasMutated();
                }
            });
        }

        // inits the inputmask
        (0, _jquery2.default)(element).inputmask(options);
    },
    update: function update(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = unwrap(valueAccessor()),
            observable = allBindings().value || allBindings().textInput;

        if (_knockout2.default.isObservable(observable)) {
            var valuetoWrite = observable();
            (0, _jquery2.default)(element).val(valuetoWrite);
        }
    }
};