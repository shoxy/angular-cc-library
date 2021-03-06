"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultFormat = /(\d{1,4})/g;
var cards = [
    {
        type: 'maestro',
        patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
        format: defaultFormat,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'forbrugsforeningen',
        patterns: [600],
        format: defaultFormat,
        length: [16],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'dankort',
        patterns: [5019],
        format: defaultFormat,
        length: [16],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'visa',
        patterns: [4],
        format: defaultFormat,
        length: [13, 16],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
        format: defaultFormat,
        length: [16],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'amex',
        patterns: [34, 37],
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: [15],
        cvvLength: [3, 4],
        luhn: true
    }, {
        type: 'dinersclub',
        patterns: [30, 36, 38, 39],
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        length: [14],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'discover',
        patterns: [60, 64, 65, 622],
        format: defaultFormat,
        length: [16],
        cvvLength: [3],
        luhn: true
    }, {
        type: 'unionpay',
        patterns: [62, 88],
        format: defaultFormat,
        length: [16, 17, 18, 19],
        cvvLength: [3],
        luhn: false
    }, {
        type: 'jcb',
        patterns: [35],
        format: defaultFormat,
        length: [16],
        cvvLength: [3],
        luhn: true
    }
];
var CreditCard = (function () {
    function CreditCard() {
    }
    CreditCard.cards = function () {
        return cards;
    };
    CreditCard.cardFromNumber = function (num) {
        var card, p, pattern, ref;
        num = (num + '').replace(/\D/g, '');
        for (var i = 0, len = cards.length; i < len; i++) {
            card = cards[i];
            ref = card.patterns;
            for (var j = 0, len1 = ref.length; j < len1; j++) {
                pattern = ref[j];
                p = pattern + '';
                if (num.substr(0, p.length) === p) {
                    return card;
                }
            }
        }
    };
    CreditCard.restrictNumeric = function (e) {
        var input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    };
    CreditCard.hasTextSelected = function (target) {
        return target.selectionStart !== null && target.selectionStart !== target.selectionEnd;
    };
    CreditCard.cardType = function (num) {
        if (!num) {
            return num;
        }
        var card = this.cardFromNumber(num);
        if (card !== null && typeof card !== 'undefined') {
            return card.type;
        }
        else {
            return null;
        }
    };
    CreditCard.formatCardNumber = function (num) {
        var card, groups, upperLength;
        num = num.replace(/\D/g, '');
        card = this.cardFromNumber(num);
        if (!card) {
            return num;
        }
        upperLength = card.length[card.length.length - 1];
        num = num.slice(0, upperLength);
        if (card.format.global) {
            var matches = num.match(card.format);
            if (matches != null) {
                return matches.join(' ');
            }
        }
        else {
            groups = card.format.exec(num);
            if (groups == null) {
                return;
            }
            groups.shift();
            return groups.filter(Boolean).join(' ');
        }
    };
    CreditCard.safeVal = function (value, target) {
        var cursor = null, last = target.value, result = null;
        try {
            cursor = target.selectionStart;
        }
        catch (error) { }
        target.value = value;
        if (cursor !== null && target === document.activeElement) {
            if (cursor === last.length) {
                cursor = value.length;
            }
            if (last !== value) {
                var prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9), currPair = value.slice(cursor - 1, +cursor + 1 || 9e9), digit = value[cursor];
                if (/\d/.test(digit) && prevPair === (digit + " ") && currPair === (" " + digit)) {
                    cursor = cursor + 1;
                }
            }
            result = cursor;
        }
        return result;
    };
    CreditCard.isCardNumber = function (key, target) {
        var card, digit, value, result;
        digit = String.fromCharCode(key);
        if (!/^\d+$/.test(digit)) {
            return false;
        }
        if (CreditCard.hasTextSelected(target)) {
            return true;
        }
        value = (target.value + digit).replace(/\D/g, '');
        card = CreditCard.cardFromNumber(value);
        if (card) {
            result = value.length <= card.length[card.length.length - 1];
        }
        else {
            result = value.length <= 16;
        }
        return result;
    };
    CreditCard.restrictExpiry = function (key, target) {
        var digit, value;
        digit = String.fromCharCode(key);
        if (!/^\d+$/.test(digit) || this.hasTextSelected(target)) {
            return false;
        }
        value = ("" + target.value + digit).replace(/\D/g, '');
        return value.length > 6;
    };
    CreditCard.replaceFullWidthChars = function (str) {
        if (str === null) {
            str = '';
        }
        var chr, idx, fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19', halfWidth = '0123456789', value = '', chars = str.split('');
        for (var i = 0; i < chars.length; i++) {
            chr = chars[i];
            idx = fullWidth.indexOf(chr);
            if (idx > -1) {
                chr = halfWidth[idx];
            }
            value += chr;
        }
        return value;
    };
    CreditCard.formatExpiry = function (expiry) {
        var parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/), mon, sep, year;
        if (!parts) {
            return '';
        }
        mon = parts[1] || '';
        sep = parts[2] || '';
        year = parts[3] || '';
        if (year.length > 0) {
            sep = ' / ';
        }
        else if (sep === ' /') {
            mon = mon.substring(0, 1);
            sep = '';
        }
        else if (mon.length === 2 || sep.length > 0) {
            sep = ' / ';
        }
        else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
            mon = "0" + mon;
            sep = ' / ';
        }
        return "" + mon + sep + year;
    };
    CreditCard.restrictCvc = function (key, target) {
        var digit = String.fromCharCode(key);
        if (!/^\d+$/.test(digit) || this.hasTextSelected(target)) {
            return false;
        }
        var val = "" + target.value + digit;
        return val.length <= 4;
    };
    CreditCard.luhnCheck = function (num) {
        var digit, digits = num.split('').reverse(), odd = true, sum = 0;
        for (var i = 0; i < digits.length; i++) {
            digit = digits[i];
            digit = parseInt(digit, 10);
            if ((odd = !odd)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };
    return CreditCard;
}());
exports.CreditCard = CreditCard;
//# sourceMappingURL=credit-card.js.map