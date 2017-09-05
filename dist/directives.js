"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var credit_card_format_directive_1 = require("./directives/credit-card-format.directive");
var expiry_format_directive_1 = require("./directives/expiry-format.directive");
var cvc_format_directive_1 = require("./directives/cvc-format.directive");
var CREDIT_CARD_LIBRARY_DIRECTIVES = [
    credit_card_format_directive_1.CreditCardFormatDirective,
    expiry_format_directive_1.ExpiryFormatDirective,
    cvc_format_directive_1.CvcFormatDirective
];
var CreditCardDirectivesModule = (function () {
    function CreditCardDirectivesModule() {
    }
    return CreditCardDirectivesModule;
}());
CreditCardDirectivesModule = __decorate([
    core_1.NgModule({
        declarations: [CREDIT_CARD_LIBRARY_DIRECTIVES],
        exports: [CREDIT_CARD_LIBRARY_DIRECTIVES]
    })
], CreditCardDirectivesModule);
exports.CreditCardDirectivesModule = CreditCardDirectivesModule;
//# sourceMappingURL=directives.js.map