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
var ExpiryFormatDirective = (function () {
    function ExpiryFormatDirective(el) {
        this.el = el;
        this.target = this.el.nativeElement;
    }
    ExpiryFormatDirective.prototype.onKeypress = function (e) {
        if (credit_card_1.CreditCard.restrictNumeric(e)) {
            if (credit_card_1.CreditCard.restrictExpiry(e.which, this.target)) {
                this.formatExpiry(e);
                this.formatForwardSlashAndSpace(e);
                this.formatForwardExpiry(e);
            }
        }
        else {
            e.preventDefault();
            return false;
        }
    };
    ExpiryFormatDirective.prototype.onKeydown = function (e) {
        if (credit_card_1.CreditCard.restrictNumeric(e) && credit_card_1.CreditCard.restrictExpiry(e.which, this.target)) {
            this.formatBackExpiry(e);
        }
    };
    ExpiryFormatDirective.prototype.onChange = function (e) {
        this.reformatExpiry(e);
    };
    ExpiryFormatDirective.prototype.onInput = function (e) {
        this.reformatExpiry(e);
    };
    ExpiryFormatDirective.prototype.formatExpiry = function (e) {
        var _this = this;
        var digit = String.fromCharCode(e.which), val = "" + this.target.value + digit;
        if (!/^\d+$/.test(digit)) {
            if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
                e.preventDefault();
                setTimeout(function () {
                    _this.target.value = "0" + val + " / ";
                });
            }
            else if (/^\d\d$/.test(val)) {
                e.preventDefault();
                setTimeout(function () {
                    var m1 = parseInt(val[0], 10), m2 = parseInt(val[1], 10);
                    if (m2 > 2 && m1 !== 0) {
                        _this.target.value = "0" + m1 + " / " + m2;
                    }
                    else {
                        _this.target.value = val + " / ";
                    }
                });
            }
        }
    };
    ExpiryFormatDirective.prototype.formatForwardSlashAndSpace = function (e) {
        var which = String.fromCharCode(e.which), val = this.target.value;
        if (!(which === '/' || which === ' ')) {
            return false;
        }
        if (/^\d$/.test(val) && val !== '0') {
            this.target.value = "0" + val + " / ";
        }
    };
    ExpiryFormatDirective.prototype.formatForwardExpiry = function (e) {
        var digit = String.fromCharCode(e.which), val = this.target.value;
        if (!/^\d+$/.test(digit) && /^\d\d$/.test(val)) {
            this.target.value = val + " / ";
        }
    };
    ExpiryFormatDirective.prototype.formatBackExpiry = function (e) {
        var val = this.target.valueOf;
        if (e.which !== 8) {
            return;
        }
        if ((this.target.selectionStart != null) && this.target.selectionStart !== val.length) {
            return;
        }
        if (/\d\s\/\s$/.test(val)) {
            e.preventDefault();
            setTimeout(function () {
                this.target.value = val.replace(/\d\s\/\s$/, '');
            });
        }
    };
    ExpiryFormatDirective.prototype.reformatExpiry = function (e) {
        var _this = this;
        setTimeout(function () {
            var val = _this.target.value;
            val = credit_card_1.CreditCard.replaceFullWidthChars(val);
            val = credit_card_1.CreditCard.formatExpiry(val);
            _this.target.selectionStart = _this.target.selectionEnd = credit_card_1.CreditCard.safeVal(val, _this.target);
        });
    };
    return ExpiryFormatDirective;
}());
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpiryFormatDirective.prototype, "onKeypress", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpiryFormatDirective.prototype, "onKeydown", null);
__decorate([
    core_1.HostListener('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpiryFormatDirective.prototype, "onChange", null);
__decorate([
    core_1.HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpiryFormatDirective.prototype, "onInput", null);
ExpiryFormatDirective = __decorate([
    core_1.Directive({
        selector: '[ccExp]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ExpiryFormatDirective);
exports.ExpiryFormatDirective = ExpiryFormatDirective;
//# sourceMappingURL=expiry-format.directive.js.map