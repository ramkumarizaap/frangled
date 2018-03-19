var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var GlobalVars = /** @class */ (function () {
    function GlobalVars() {
    }
    GlobalVars.prototype.setUserdata = function (value) {
        this.myGlobalVar = localStorage.setItem('userData', value);
    };
    GlobalVars.prototype.deleteUserdata = function () {
        this.myGlobalVar = localStorage.removeItem('userData');
    };
    GlobalVars.prototype.getUserdata = function () {
        this.myGlobalVar = JSON.parse(localStorage.getItem('userData'));
        return this.myGlobalVar;
    };
    GlobalVars.prototype.getId = function () {
        this.myGlobalVar = JSON.parse(localStorage.getItem('userData'));
        return this.myGlobalVar.id;
    };
    GlobalVars.prototype.getUserRole = function () {
        this.myGlobalVar = JSON.parse(localStorage.getItem('userData'));
        return this.myGlobalVar.role;
    };
    GlobalVars = __decorate([
        Injectable()
    ], GlobalVars);
    return GlobalVars;
}());
export { GlobalVars };
//# sourceMappingURL=globalVars.js.map