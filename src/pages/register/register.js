var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController, ActionSheetController } from "ionic-angular";
import { FormBuilder, Validators } from '@angular/forms';
import { regexPatterns } from '../../providers/regexPatterns';
import { LoginPage } from '../login/login';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, mCtrl, alertCtrl, loader, _formBuilder, actionCtrl) {
        this.navCtrl = navCtrl;
        this.mCtrl = mCtrl;
        this.alertCtrl = alertCtrl;
        this.loader = loader;
        this._formBuilder = _formBuilder;
        this.actionCtrl = actionCtrl;
        this._passwordInputType = "password";
        this._passwordIcon = "eye-off";
        this.mCtrl.swipeEnable(false);
        this._registerForm = this._formBuilder.group({
            //EMAIL
            email: ["", Validators.compose([Validators.required, Validators.pattern(regexPatterns.email)])],
            //PASSWORD
            password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
            //NAME
            name: ["", Validators.compose([Validators.required])],
            //PHONE
            phone: ["", Validators.compose([Validators.minLength(10)])]
        });
    }
    // Password Toggle
    RegisterPage.prototype._toggleViewPassword = function (event) {
        event.preventDefault();
        if (this._passwordInputType === "password") {
            this._passwordInputType = "text";
            this._passwordIcon = "eye";
        }
        else {
            this._passwordIcon = "eye-off";
            this._passwordInputType = "password";
        }
        ;
    };
    ;
    RegisterPage.prototype._showPhoto = function () {
        var actionSheet = this.actionCtrl.create({
            title: 'Choose your profile photo',
            buttons: [
                {
                    text: 'Take a Picture',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                }, {
                    text: 'Choose from Album',
                    handler: function () {
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RegisterPage.prototype._goBack = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    RegisterPage = __decorate([
        Component({
            selector: 'page-register',
            templateUrl: 'register.html'
        }),
        __metadata("design:paramtypes", [NavController, MenuController, AlertController,
            LoadingController, FormBuilder, ActionSheetController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map