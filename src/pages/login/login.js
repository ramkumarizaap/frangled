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
import { NavController, AlertController, LoadingController, MenuController, Platform } from "ionic-angular";
import { FormBuilder, Validators } from '@angular/forms';
import { regexPatterns } from '../../providers/regexPatterns';
import { GlobalVars } from '../../providers/globalVars';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { AvailCropsPage } from '../avail-crops/avail-crops';
import { CommonService } from '../../providers/commonService';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import xml2js from 'xml2js';
import { TranslateService } from '@ngx-translate/core';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, mCtrl, alertCtrl, loader, _formBuilder, barcode, commonService, platform, translateService, globalVars) {
        this.navCtrl = navCtrl;
        this.mCtrl = mCtrl;
        this.alertCtrl = alertCtrl;
        this.loader = loader;
        this._formBuilder = _formBuilder;
        this.barcode = barcode;
        this.commonService = commonService;
        this.platform = platform;
        this.translateService = translateService;
        this.globalVars = globalVars;
        this._passwordInputType = "password";
        this._passwordIcon = "eye-off";
        this.param = { value: 'Wordl' };
        this.mCtrl.swipeEnable(false);
        this._loginForm = this._formBuilder.group({
            //EMAIL
            email: ["sathish.izaap@gmail.com",
                Validators.compose([
                    Validators.required, Validators.pattern(regexPatterns.email)
                ])
            ],
            //PASSWORD
            password: ["password", Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])
            ]
        });
    }
    // Password Toggle
    LoginPage.prototype._toggleViewPassword = function (event) {
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
    LoginPage.prototype._changeLanguage = function (l) {
        console.log(l);
        this.translateService.use(l);
    };
    LoginPage.prototype._gotoRegisterPage = function () {
        this.navCtrl.setRoot(RegisterPage);
    };
    LoginPage.prototype._scanCard = function () {
        var _this = this;
        this.barcode.scan().then(function (barcodeData) {
            xml2js.parseString(barcodeData.text, { explicitArray: false }, function (error, result) {
                if (error) {
                    var error_1 = _this.alertCtrl.create({
                        title: 'Error',
                        message: "Can't able to fetch data",
                        buttons: ['Ok']
                    });
                    error_1.present();
                    return false;
                }
                else {
                    var load_1 = _this.loader.create({
                        content: 'Please Wait...'
                    });
                    load_1.present();
                    alert("Success :" + JSON.stringify(result.PrintLetterBarcodeData.$));
                    _this.commonService.registerFarmer(result.PrintLetterBarcodeData.$).then(function (res) {
                        load_1.dismiss();
                        if (res.type == "register") {
                            _this.navCtrl.setRoot(AvailCropsPage);
                        }
                        else {
                            var success = _this.alertCtrl.create({
                                title: 'Error',
                                message: 'Registration done succesfully.',
                                buttons: [{
                                        text: 'OK',
                                        handler: function () {
                                            _this.navCtrl.setRoot(AvailCropsPage);
                                        }
                                    }]
                            });
                            success.present();
                        }
                    })
                        .catch(function (err) {
                        load_1.dismiss();
                        var error = _this.alertCtrl.create({
                            title: 'Error',
                            message: err,
                            buttons: ['Ok']
                        });
                        error.present();
                        return false;
                        //uid,name,gender,yob,co(fathername),house,street,vtc(area),dist,state,pc(pincode)
                    });
                }
            });
            // Success! Barcode data is here
        }, function (err) {
            var error = _this.alertCtrl.create({
                title: 'Error',
                message: err,
                buttons: ['Ok']
            });
            error.present();
            // An error occurred
        });
    };
    LoginPage.prototype._login = function () {
        var _this = this;
        console.log(this._loginForm.value);
        if (this._loginForm.valid) {
            var load_2 = this.loader.create({
                content: "Please Wait..."
            });
            load_2.present();
            this.commonService.login(this._loginForm.value).then(function (res) {
                // console.log("Success :"+JSON.stringify(res));
                load_2.dismiss();
                if (res.status == "success") {
                    _this.globalVars.setUserdata(JSON.stringify(res.msg));
                    if (res.msg.role == '1')
                        _this.navCtrl.setRoot(HomePage);
                    else if (res.msg.role == '2')
                        _this.navCtrl.setRoot(AvailCropsPage);
                }
                else {
                    var error = _this.alertCtrl.create({
                        title: 'Error',
                        message: res.msg,
                        buttons: ['OK']
                    });
                    error.present();
                    return false;
                }
            }).catch(function (err) {
                load_2.dismiss();
                var error = _this.alertCtrl.create({
                    title: 'Error',
                    message: err,
                    buttons: ['OK']
                });
                error.present();
                return false;
            });
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController, MenuController, AlertController,
            LoadingController, FormBuilder, BarcodeScanner,
            CommonService, Platform, TranslateService,
            GlobalVars])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map