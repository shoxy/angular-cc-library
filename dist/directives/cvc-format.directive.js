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
var CvcFormatDirective = (function () {
    function CvcFormatDirective(el) {
        this.el = el;
        this.target = this.el.nativeElement;
    }
    CvcFormatDirective.prototype.onKeypress = function (e) {
        if (!credit_card_1.CreditCard.restrictNumeric(e) && !credit_card_1.CreditCard.restrictCvc(e.which, this.target)) {
            e.preventDefault();
        }
    };
    CvcFormatDirective.prototype.onPaste = function (e) {
        this.reformatCvc(e);
    };
    CvcFormatDirective.prototype.onChange = function (e) {
        this.reformatCvc(e);
    };
    CvcFormatDirective.prototype.onInput = function (e) {
        this.reformatCvc(e);
    };
    CvcFormatDirective.prototype.reformatCvc = function (e) {
        var _this = this;
        setTimeout(function () {
            var val = credit_card_1.CreditCard.replaceFullWidthChars(_this.target.value);
            val = val.replace(/\D/g, '').slice(0, 4);
            _this.target.selectionStart = _this.target.selectionEnd = credit_card_1.CreditCard.safeVal(val, _this.target);
        });
    };
    return CvcFormatDirective;
}());
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CvcFormatDirective.prototype, "onKeypress", null);
__decorate([
    core_1.HostListener('paste', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CvcFormatDirective.prototype, "onPaste", null);
__decorate([
    core_1.HostListener('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CvcFormatDirective.prototype, "onChange", null);
__decorate([
    core_1.HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CvcFormatDirective.prototype, "onInput", null);
CvcFormatDirective = __decorate([
    core_1.Directive({
        selector: '[ccCVC]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CvcFormatDirective);
exports.CvcFormatDirective = CvcFormatDirective;
//# sourceMappingURL=cvc-format.directive.js.map