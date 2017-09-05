"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var credit_card_1 = require("../shared/credit-card");
var CreditCardFormatDirective = (function () {
    function CreditCardFormatDirective(el) {
        this.el = el;
        this.target = this.el.nativeElement;
        this.cards = credit_card_1.CreditCard.cards();
    }
    CreditCardFormatDirective.prototype.onKeypress = function (e) {
        if (credit_card_1.CreditCard.restrictNumeric(e)) {
            if (credit_card_1.CreditCard.isCardNumber(e.which, this.target)) {
                this.formatCardNumber(e);
            }
        }
        else {
            e.preventDefault();
            return false;
        }
    };
    CreditCardFormatDirective.prototype.onKeydown = function (e) {
        this.formatBackCardNumber(e);
    };
    CreditCardFormatDirective.prototype.onKeyup = function (e) {
        this.setCardType(e);
    };
    CreditCardFormatDirective.prototype.onPaste = function (e) {
        this.reFormatCardNumber(e);
    };
    CreditCardFormatDirective.prototype.onChange = function (e) {
        this.reFormatCardNumber(e);
    };
    CreditCardFormatDirective.prototype.onInput = function (e) {
        this.reFormatCardNumber(e);
        this.setCardType(e);
    };
    CreditCardFormatDirective.prototype.formatCardNumber = function (e) {
        var _this = this;
        var card, digit, length, re, upperLength, value;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        value = this.target.value;
        card = credit_card_1.CreditCard.cardFromNumber(value + digit);
        length = (value.replace(/\D/g, '') + digit).length;
        upperLength = 16;
        if (card) {
            upperLength = card.length[card.length.length - 1];
        }
        if (length >= upperLength) {
            return;
        }
        if ((this.target.selectionStart != null) && this.target.selectionStart !== value.length) {
            // return;
        }
        if (card && card.type === 'amex') {
            re = /^(\d{4}|\d{4}\s\d{6})$/;
        }
        else {
            re = /(?:^|\s)(\d{4})$/;
        }
        if (re.test(value)) {
            e.preventDefault();
            setTimeout(function () {
                _this.target.value = value + " " + digit;
            });
        }
        else if (re.test(value + digit)) {
            e.preventDefault();
            setTimeout(function () {
                _this.target.value = "" + value + digit + " ";
            });
        }
    };
    CreditCardFormatDirective.prototype.formatBackCardNumber = function (e) {
        var _this = this;
        var value = this.target.value;
        if (e.which !== 8) {
            return;
        }
        if ((this.target.selectionStart != null) && this.target.selectionStart !== value.length) {
            // return;
        }
        if (/\d\s$/.test(value)) {
            e.preventDefault();
            setTimeout(function () {
                _this.target.value = value.replace(/\d\s$/, '');
            });
        }
        else if (/\s\d?$/.test(value)) {
            e.preventDefault();
            setTimeout(function () {
                _this.target.value = value.replace(/\d$/, '');
            });
        }
    };
    CreditCardFormatDirective.prototype.setCardType = function (e) {
        var card, val = this.target.value, cardType = credit_card_1.CreditCard.cardType(val) || 'unknown';
        if (!this.target.classList.contains(cardType)) {
            for (var i = 0, len = this.cards.length; i < len; i++) {
                card = this.cards[i];
                this.target.classList.remove(card.type);
            }
            this.target.classList.remove('unknown');
            this.target.classList.add(cardType);
            this.target.classList.toggle('identified', cardType !== 'unknown');
        }
    };
    CreditCardFormatDirective.prototype.reFormatCardNumber = function (e) {
        var _this = this;
        setTimeout(function () {
            var value = credit_card_1.CreditCard.replaceFullWidthChars(_this.target.value);
            value = credit_card_1.CreditCard.formatCardNumber(value);
            _this.target.selectionStart = _this.target.selectionEnd = credit_card_1.CreditCard.safeVal(value, _this.target);
        });
    };
    return CreditCardFormatDirective;
}());
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardFormatDirective.prototype, "onKeypress", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardFormatDirective.prototype, "onKeydown", null);
__decorate([
    core_1.HostListener('keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardFormatDirective.prototype, "onKeyup", null);
__decorate([
    core_1.HostListener('paste', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardFormatDirective.prototype, "onPaste", null);
__decorate([
    core_1.HostListener('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardFormatDirective.prototype, "onChange", null);
__decorate([
    core_1.HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardFormatDirective.prototype, "onInput", null);
CreditCardFormatDirective = __decorate([
    core_1.Directive({
        selector: '[ccNumber]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CreditCardFormatDirective);
exports.CreditCardFormatDirective = CreditCardFormatDirective;
//# sourceMappingURL=credit-card-format.directive.js.map