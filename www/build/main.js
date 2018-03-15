webpackJsonp([0],{

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_regexPatterns__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_globalVars__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_xml2js__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_xml2js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_xml2js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var LoginPage = (function () {
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
            email: ["ramkumar.izaap@gmail.com",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(__WEBPACK_IMPORTED_MODULE_3__providers_regexPatterns__["a" /* regexPatterns */].email)
                ])
            ],
            //PASSWORD
            password: ["password", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype._scanCard = function () {
        var _this = this;
        this.barcode.scan().then(function (barcodeData) {
            __WEBPACK_IMPORTED_MODULE_9_xml2js___default.a.parseString(barcodeData.text, { explicitArray: false }, function (error, result) {
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
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        }
                        else {
                            var success = _this.alertCtrl.create({
                                title: 'Error',
                                message: 'Registration done succesfully.',
                                buttons: [{
                                        text: 'OK',
                                        handler: function () {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
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
                console.log(res);
                load_2.dismiss();
                if (res.status == "success") {
                    _this.globalVars.setUserdata(JSON.stringify(res.msg));
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"F:\frangled\src\pages\login\login.html"*/'<ion-content>\n  <div class="logo">\n      <img src="assets/icon/food.png">\n      <h3>NEWFANGLED PURCHASING</h3>\n  </div>\n  <div class="form-div">\n    <form novalidate="" [formGroup]="_loginForm" (submit)="_login()" method="post">\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n          {{\'Email\' | translate}}\n        </ion-label>\n        <ion-input  formControlName="email" type="email"></ion-input>\n      </ion-item>\n      <ion-item class="error" no-lines no-padding *ngIf="_loginForm.controls.email.hasError(\'required\') && _loginForm.controls.email.touched">\n        <p ion-text text-wrap>Please Enter Email-ID</p>\n      </ion-item>\n      <ion-item class="error" no-lines no-padding *ngIf="_loginForm.controls.email.invalid  && _loginForm.controls.email.dirty && _loginForm.controls.email.value!=\'\'">\n        <p ion-text text-wrap>Please use correct email format, e.g.:someone@domain.com.</p>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="key" item-start class="text-primary"></ion-icon>\n          {{\'Password\' | translate}}\n        </ion-label>\n        <ion-input  formControlName="password" [type]="_passwordInputType"></ion-input>\n      </ion-item>\n       <ion-icon float-right name="{{_passwordIcon}}" (click)="_toggleViewPassword($event)" class="password-icon"></ion-icon>\n      <ion-item class="error" no-lines no-padding *ngIf="_loginForm.controls.password.hasError(\'required\') && _loginForm.controls.password.touched">\n        <p ion-text text-wrap>Please Enter Password</p>\n      </ion-item>\n      <ion-item class="error" no-lines no-padding *ngIf="_loginForm.controls.password.invalid  && _loginForm.controls.password.dirty && _loginForm.controls.password.value!=\'\'">\n        <p ion-text text-wrap>Please enter atleast 6 characters.</p>\n      </ion-item>\n      <button type="submit" ion-button block>{{\'Login\' | translate}}</button>\n      <button type="button" ion-button block color="danger" (click)="_gotoRegisterPage()">{{\'Signup as Buyer\' | translate}}</button>\n      <button type="button" ion-button block color="dark" (click)="_scanCard()">{{\'Signup as Farmer\' | translate}}</button>\n    </form>\n  </div>\n  <ion-item class="lang-select">\n    <ion-label>{{\'Select Language\' | translate}}</ion-label>\n    <ion-select placeholder="Select Language" (ionChange)="_changeLanguage($event)">\n      <ion-option selected value=\'en\'>English</ion-option>\n      <ion-option value=\'ta\'>{{\'Tamil\'| translate}}</ion-option>\n    </ion-select>\n  </ion-item>\n</ion-content>'/*ion-inline-end:"F:\frangled\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_7__providers_commonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_globalVars__["a" /* GlobalVars */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 147;

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FarmerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__farmer_detail_farmer_detail__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import xml2js from 'xml2js';
var FarmerPage = (function () {
    function FarmerPage(params, nav, alertCtl, loader, actionCtrl, commonService) {
        this.params = params;
        this.nav = nav;
        this.alertCtl = alertCtl;
        this.loader = loader;
        this.actionCtrl = actionCtrl;
        this.commonService = commonService;
        this.isDesc = false;
        this.sortedBy = 'Name';
        this.crop = this.params.get('id');
        if (this.crop)
            this.getFarmers(this.crop.id);
        console.log(this.crop);
    }
    FarmerPage.prototype._gotoFarmer = function (f) {
        if (f === void 0) { f = ''; }
        console.log(f);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__farmer_detail_farmer_detail__["a" /* FarmerDetailPage */], { id: f });
    };
    FarmerPage.prototype.getFarmers = function (id) {
        var _this = this;
        var load = this.loader.create({
            content: "Please Wait..."
        });
        load.present();
        this.commonService.getFarmers(id).then(function (res) {
            console.log(res);
            load.dismiss();
            if (res.data.length)
                _this.farmers = res.data;
            else {
                var error = _this.alertCtl.create({
                    title: 'Error',
                    message: "No Farmers found",
                    buttons: ['OK']
                });
                error.present();
                return false;
            }
        })
            .catch(function (err) {
            load.dismiss();
            var error = _this.alertCtl.create({
                title: 'Error',
                message: err,
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    FarmerPage.prototype._sortActionSheet = function () {
        var _this = this;
        var action = this.actionCtrl.create({
            title: 'Sort By',
            buttons: [
                {
                    text: 'Name',
                    handler: function () {
                        _this._sort('name');
                        _this.sortedBy = 'Name';
                    }
                },
                {
                    text: 'Price',
                    handler: function () {
                        _this._sort('price');
                        _this.sortedBy = 'Price';
                    }
                },
                {
                    text: 'Quantity',
                    handler: function () {
                        _this._sort('quantity');
                        _this.sortedBy = 'Quantity';
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        action.present();
    };
    FarmerPage.prototype._sort = function (property) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        var direction = this.isDesc ? 1 : -1;
        this.farmers.sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1 * direction;
            }
            else if (a[property] > b[property]) {
                return 1 * direction;
            }
            else {
                return 0;
            }
        });
    };
    FarmerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-farmer',template:/*ion-inline-start:"F:\frangled\src\pages\farmer\farmer.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title *ngIf="!_searchField">Farmers List</ion-title>\n\n    <ion-searchbar [(ngModel)]="searchTerm" (ionCancel)="clearFilter($event)" (ionInput)="setFilteredItems($event)" *ngIf="_searchField" class="searchfield" type="text" placeholder="Search..."></ion-searchbar>\n\n    <ion-buttons end>\n\n      <button ion-button *ngIf="!_searchField" tappable (click)="_showSearchInput()">\n\n        <ion-icon name="ios-search"></ion-icon>\n\n      </button>\n\n      <button *ngIf="_searchField" ion-button tappable (click)="_hideSearchInput()">\n\n        <ion-icon name="ios-close-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <button full ion-button (click)="_sortActionSheet()">\n\n    <ion-icon name="ios-funnel">&nbsp;&nbsp;</ion-icon> Sort By : {{sortedBy}}\n\n  </button>\n\n  <ion-list>\n\n    <ion-item *ngFor="let f of farmers" (click)="_gotoFarmer(f)">\n\n      <p>{{f.name}}</p>\n\n      <p>{{f.price}}</p>\n\n      <p>Quantity Available : {{f.quantity}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"F:\frangled\src\pages\farmer\farmer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_commonService__["a" /* CommonService */]])
    ], FarmerPage);
    return FarmerPage;
}());

//# sourceMappingURL=farmer.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FarmerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import xml2js from 'xml2js';
var FarmerDetailPage = (function () {
    function FarmerDetailPage(params, nav, commonService, alertCtrl, loader) {
        this.params = params;
        this.nav = nav;
        this.commonService = commonService;
        this.alertCtrl = alertCtrl;
        this.loader = loader;
        this.farmer = this.params.get('id');
        console.log(this.farmer);
    }
    FarmerDetailPage.prototype._orderNow = function (crop_id, farmer_id, price, qty) {
        var _this = this;
        console.log(crop_id, farmer_id, price, qty);
        var quantity = this.alertCtrl.create({
            title: 'Enter Quantity for you',
            inputs: [
                {
                    name: 'quantity',
                    placeholder: 'Quantity',
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var q = data.quantity;
                        _this.order = { crop_id: crop_id, farmer_id: farmer_id, price: price, qty: q };
                        console.log(qty, q);
                        if (q >= qty) {
                            var error = _this.alertCtrl.create({
                                title: 'Sorry',
                                message: 'You have entered more quantity than available quantity',
                                buttons: ['OK']
                            });
                            error.present();
                            return false;
                        }
                        else
                            _this._saveOrder(_this.order);
                    }
                }
            ]
        });
        quantity.present();
    };
    FarmerDetailPage.prototype._saveOrder = function (order) {
        var _this = this;
        var load = this.loader.create({
            content: 'Please Wait...'
        });
        load.present();
        this.commonService.postOrder(order).then(function (res) {
            if (res.status == "success") {
                var success_1 = _this.alertCtrl.create({
                    title: 'Success',
                    message: "Your order has been placed.",
                    buttons: [{
                            text: 'OK',
                            handler: function () {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                            }
                        }]
                });
                setTimeout(function () {
                    load.dismiss();
                    success_1.present();
                }, 3000);
            }
            else {
                var error = _this.alertCtrl.create({
                    title: 'Error',
                    message: "Can't able to order right now."
                });
                error.present();
                return false;
            }
        })
            .catch(function (err) {
            var error = _this.alertCtrl.create({
                title: 'Error',
                message: "Can't able to order right now."
            });
            error.present();
            return false;
        });
    };
    FarmerDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-farmer-detail',template:/*ion-inline-start:"F:\frangled\src\pages\farmer-detail\farmer-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{farmer.name}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<ion-list>\n\n		<ion-item>\n\n			<ion-icon name="ios-call">&nbsp;&nbsp;</ion-icon>\n\n				Phone : {{farmer.phone}}\n\n		</ion-item>\n\n		<ion-item>\n\n			<ion-icon name="ios-pin">&nbsp;&nbsp;</ion-icon>\n\n				{{farmer.address1}}, {{farmer.address2}}, {{farmer.city}}, {{farmer.state}}, IN\n\n		</ion-item>\n\n		<ion-item>\n\n			<ion-icon name="ios-pricetag">&nbsp;&nbsp;</ion-icon>\n\n				Price : {{farmer.price}}\n\n		</ion-item>\n\n		<ion-item>\n\n			<ion-icon name="ios-basket">&nbsp;&nbsp;</ion-icon>\n\n				Available Quantity : {{farmer.quantity}}\n\n		</ion-item>\n\n	</ion-list>\n\n	<button ion-button block color="danger" (click)="_orderNow(farmer.crop_id,farmer.farmer_id,farmer.price,farmer.quantity)">\n\n		<ion-icon name="ios-cart">&nbsp;&nbsp;</ion-icon>\n\n		Order Now\n\n	</button>\n\n	<button ion-button block color="dark">\n\n		<ion-icon name="ios-navigate">&nbsp;&nbsp;</ion-icon>\n\n		Get Directions\n\n	</button>\n\n</ion-content>'/*ion-inline-end:"F:\frangled\src\pages\farmer-detail\farmer-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_commonService__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], FarmerDetailPage);
    return FarmerDetailPage;
}());

//# sourceMappingURL=farmer-detail.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_detail_order_detail__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrdersPage = (function () {
    function OrdersPage(navCtrl, alertCtrl, loader, commonService, translateService, globalVars) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loader = loader;
        this.commonService = commonService;
        this.translateService = translateService;
        this.globalVars = globalVars;
        this.lang = 'ta';
        this.user = { id: '' };
        this.user = this.globalVars.getUserdata();
        if (this.user.id != '' || this.user.id != null)
            this._getOrders(this.user.id);
    }
    OrdersPage.prototype._getOrders = function (id) {
        var _this = this;
        console.log(id);
        var load = this.loader.create({
            content: 'Please Wait...'
        });
        load.present();
        this.commonService.getOrders(id).then(function (res) {
            console.log(res);
            load.dismiss();
            if (res.status == "success") {
                _this.orders = res.data;
            }
            else {
                var error = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Nor Orders Found.',
                    buttons: ['OK']
                });
                error.present();
                return false;
            }
        })
            .catch(function (err) {
            load.dismiss();
            var error = _this.alertCtrl.create({
                title: 'Error',
                message: err,
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    OrdersPage.prototype._changeLanguage = function (l) {
        if (l == "ta")
            this.lang = "en";
        else
            this.lang = "ta";
        this.translateService.use(l);
    };
    OrdersPage.prototype._viewOrder = function (id) {
        var _this = this;
        this.commonService.getOrderById(id).then(function (res) {
            console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_detail_order_detail__["a" /* OrderDetailPage */], { id: res.data });
        })
            .catch(function (err) {
            var error = _this.alertCtrl.create({
                title: "Error",
                message: err,
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"F:\frangled\src\pages\orders\orders.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{\'Orders\' | translate}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button tappable (click)="_changeLanguage(lang)">\n\n        {{\'EN\' | translate}}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-card *ngFor="let o of orders">\n\n    <ion-card-header>\n\n      {{o.o_date}} {{o.o_month | translate}} {{o.o_year}}\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-item>\n\n        {{\'Crop\' | translate}}\n\n        <span item-end>{{o.crop | translate}}</span>\n\n      </ion-item>\n\n      <ion-item>\n\n        {{\'Quantity\' | translate}}\n\n        <span item-end>{{o.quantity | translate}}{{\'kg\' | translate}}</span>\n\n      </ion-item>\n\n      <ion-item>\n\n        {{\'Price\' | translate}}\n\n        <span item-end>{{\'Rs.\' | translate}}{{o.price | translate}}</span>\n\n      </ion-item>\n\n      <ion-item>\n\n        {{\'Est. Delivery\' | translate}}\n\n        <ion-badge item-end>{{o.d_date}} {{o.d_month | translate}} {{o.d_year}}</ion-badge>\n\n      </ion-item>\n\n      <ion-item>\n\n        {{\'Status\' | translate}}\n\n        <ion-badge color="secondary" item-end>{{o.status | translate}}</ion-badge>\n\n      </ion-item>\n\n      <button ion-button (click)="_viewOrder(o.order_id)" color="dark" block>{{\'View\' | translate}}</button>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\frangled\src\pages\orders\orders.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_commonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__["a" /* GlobalVars */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrderDetailPage = (function () {
    function OrderDetailPage(navCtrl, alertCtrl, params, loader, commonService, translateService, globalVars, callNumber) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.params = params;
        this.loader = loader;
        this.commonService = commonService;
        this.translateService = translateService;
        this.globalVars = globalVars;
        this.callNumber = callNumber;
        this.lang = 'ta';
        this.user = "";
        this.order = this.params.get('id');
        console.log(this.order);
    }
    OrderDetailPage.prototype._changeLanguage = function (l) {
        if (l == "ta")
            this.lang = "en";
        else
            this.lang = "ta";
        this.translateService.use(l);
    };
    OrderDetailPage.prototype._callFarmer = function (number) {
        var _this = this;
        this.callNumber.callNumber(number, true)
            .then(function (res) { console.log('Launched dialer!'); })
            .catch(function (err) {
            var error = _this.alertCtrl.create({
                title: 'Error',
                message: err,
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    OrderDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-detail',template:/*ion-inline-start:"F:\frangled\src\pages\order-detail\order-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{\'View\' | translate}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button tappable (click)="_changeLanguage(lang)">\n\n        {{\'EN\' | translate}}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-row>\n\n    <img src="{{order.image}}" style="height: 200px;width: 100%;">\n\n  </ion-row>\n\n  <ion-row>\n\n    <h3>{{ order.crop | translate}}</h3>\n\n  </ion-row>\n\n  <ion-row>\n\n    <ion-item>\n\n      {{\'Quantity\' | translate}}\n\n      <span item-end>{{order.quantity}}{{ \'kg\' | translate}}</span>\n\n    </ion-item>\n\n    <ion-item>\n\n      {{\'Price\' | translate}}\n\n      <span item-end><b>{{\'Rs.\' | translate}}{{order.total_price}}</b></span>\n\n    </ion-item>\n\n    <ion-item>\n\n      {{\'Est. Delivery\' | translate}}\n\n      <ion-badge item-end>10 Mar 2018</ion-badge>\n\n    </ion-item>\n\n  </ion-row>\n\n  <ion-row style="margin-top :20px;">\n\n    <h3>{{\'Farmer Details\' | translate}}</h3>\n\n    <ion-item>\n\n      {{\'Name\' | translate}}\n\n      <span item-end>{{order.farmer_name}}</span>\n\n    </ion-item>\n\n    <ion-item class="address">\n\n      {{\'Address\' | translate}}\n\n      <p>&nbsp;</p>\n\n      <p><ion-icon name="pin"></ion-icon>&nbsp;&nbsp;{{order.address}}</p>\n\n    </ion-item>\n\n    <ion-item>\n\n      {{\'Phone\' | translate}}\n\n      <ion-badge color="danger" item-end  (click)="_callFarmer(order.phone)">\n\n        <ion-icon name="call"></ion-icon>&nbsp;&nbsp;&nbsp;&nbsp;\n\n        {{order.phone}}\n\n      </ion-badge>\n\n    </ion-item>\n\n  </ion-row>\n\n  <ion-row>\n\n    <button ion-button block color="danger">{{\'Get Directions\' | translate}}</button>\n\n  </ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\frangled\src\pages\order-detail\order-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_commonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__["a" /* GlobalVars */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */]])
    ], OrderDetailPage);
    return OrderDetailPage;
}());

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return regexPatterns; });
var regexPatterns = {
    nameStrings: /^[a-zA-Z]+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/,
    numbersOnly: /^\d+$/,
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
};

//# sourceMappingURL=regexPatterns.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_regexPatterns__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(129);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
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
            email: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(__WEBPACK_IMPORTED_MODULE_3__providers_regexPatterns__["a" /* regexPatterns */].email)])],
            //PASSWORD
            password: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
            //NAME
            name: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            //PHONE
            phone: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10)])]
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
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"F:\frangled\src\pages\register\register.html"*/'<ion-content>\n\n  <div class="logo">\n\n      <img src="assets/icon/food.png">\n\n      <h3>Welcome to NewFangled Purchasing Registration!</h3>\n\n  </div>\n\n  <div class="form-div">\n\n    <form novalidate="" [formGroup]="_registerForm" method="post">\n\n      <!--EMAIL INPUT-->\n\n      <ion-item class="profile-photo" (click)="_showPhoto()">\n\n        <img src="assets/icon/user.png">\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating>\n\n          <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n\n          Email\n\n        </ion-label>\n\n        <ion-input  formControlName="email" type="email"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="error" no-lines no-padding *ngIf="_registerForm.controls.email.hasError(\'required\') && _registerForm.controls.email.touched">\n\n        <p ion-text text-wrap>Please Enter Email-ID</p>\n\n      </ion-item>\n\n      <ion-item class="error" no-lines no-padding *ngIf="_registerForm.controls.email.invalid  && _registerForm.controls.email.dirty && _registerForm.controls.email.value!=\'\'">\n\n        <p ion-text text-wrap>Please use correct email format, e.g.:someone@domain.com.</p>\n\n      </ion-item>\n\n      <!--PASSWORD INPUT-->\n\n      <ion-item>\n\n        <ion-label floating>\n\n          <ion-icon name="key" item-start class="text-primary"></ion-icon>\n\n          Password\n\n        </ion-label>\n\n        <ion-input  formControlName="password" [type]="_passwordInputType"></ion-input>\n\n      </ion-item>\n\n      <ion-icon float-right name="{{_passwordIcon}}" (click)="_toggleViewPassword($event)" class="password-icon"></ion-icon>\n\n      <ion-item class="error" no-lines no-padding *ngIf="_registerForm.controls.password.hasError(\'required\') && _registerForm.controls.password.touched">\n\n        <p ion-text text-wrap>Please Enter Password</p>\n\n      </ion-item>\n\n      <ion-item class="error" no-lines no-padding *ngIf="_registerForm.controls.password.invalid  && _registerForm.controls.password.dirty && _registerForm.controls.password.value!=\'\'">\n\n        <p ion-text text-wrap>Please enter atleast 6 characters.</p>\n\n      </ion-item>\n\n      <!--NAME-->\n\n      <ion-item>\n\n        <ion-label floating>\n\n          <ion-icon name="person" item-start class="text-primary"></ion-icon>\n\n          Name\n\n        </ion-label>\n\n        <ion-input  formControlName="name" type="text"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="error" no-lines no-padding *ngIf="_registerForm.controls.name.hasError(\'required\') && _registerForm.controls.name.touched">\n\n        <p ion-text text-wrap>Please Enter Name</p>\n\n      </ion-item>\n\n      <!--PHONE NUMBER-->\n\n      <ion-item>\n\n        <ion-label floating>\n\n          <ion-icon name="call" item-start class="text-primary"></ion-icon>\n\n          Phone\n\n        </ion-label>\n\n        <ion-input formControlName="phone"  type="number"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="error" no-lines no-padding *ngIf="_registerForm.controls.phone.invalid  && _registerForm.controls.phone.dirty && _registerForm.controls.phone.value!=\'\'">\n\n        <p ion-text text-wrap>Please enter atleast 10 characters.</p>\n\n      </ion-item>\n\n      <!--ADDRESS-->\n\n    </form>\n\n    <button ion-button block [disabled]="!_registerForm.valid">Register</button>\n\n    <button (click)="_goBack()" ion-button color="danger" block><ion-icon name="ios-arrow-round-back"></ion-icon>&nbsp;&nbsp;Back</button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"F:\frangled\src\pages\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(273);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export HttpLoaderFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_register_register__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_farmer_farmer__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_farmer_detail_farmer_detail__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_orders_orders__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_order_detail_order_detail__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_barcode_scanner__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_globalVars__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_common_http__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_call_number__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_farmer_farmer__["a" /* FarmerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_farmer_detail_farmer_detail__["a" /* FarmerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_order_detail_order_detail__["a" /* OrderDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_18__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_18__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_farmer_farmer__["a" /* FarmerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_farmer_detail_farmer_detail__["a" /* FarmerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_order_detail_order_detail__["a" /* OrderDetailPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_17__providers_globalVars__["a" /* GlobalVars */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__providers_commonService__["a" /* CommonService */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_call_number__["a" /* CallNumber */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_orders_orders__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_globalVars__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(app, platform, statusBar, splashScreen, translateService, globalvars) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.globalvars = globalvars;
        this.user = { role: '' };
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Crops', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'ios-nutrition' },
            { title: 'Orders', component: __WEBPACK_IMPORTED_MODULE_5__pages_orders_orders__["a" /* OrdersPage */], icon: 'ios-cart' }
        ];
        this.app.viewWillEnter.subscribe(function () {
            _this.user = _this.globalvars.getUserdata();
            // console.log(this.user);
            if (_this.user != null) {
                if (_this.user.role == '2') {
                    _this.pages = [
                        { title: 'My Crops', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'ios-nutrition' },
                        { title: 'My Orders', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */], icon: 'ios-basket' }
                    ];
                }
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.translateService.setDefaultLang('en');
            _this.translateService.use('en');
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype._logout = function () {
        this.globalvars.deleteUserdata();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\frangled\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar class="menu-logo">\n      <ion-title><img src="assets/icon/food.png"> \n        <p>NewFrangled Purchasing</p></ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon name="{{p.icon}}"></ion-icon>&nbsp;&nbsp;{{p.title | translate}}\n      </button>\n      <button menuClose ion-item (click)="_logout()">\n        <ion-icon name="ios-power"></ion-icon>&nbsp;&nbsp;{{\'Logout\' | translate}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"F:\frangled\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_7__providers_globalVars__["a" /* GlobalVars */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SERVER_URL; });
var SERVER_URL = "http://162.144.41.156/~izaapinn/ram/frangile/";
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var apiUrl = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* SERVER_URL */];
var CommonService = (function () {
    function CommonService(http) {
        this.http = http;
    }
    CommonService.prototype.getCrops = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(apiUrl + 'service/crops', options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getFarmers = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(apiUrl + 'service/farmers?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getOrders = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(apiUrl + 'service/orders?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getOrderById = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(apiUrl + 'service/order_by_id?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.login = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(apiUrl + 'service/login', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.postOrder = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(apiUrl + 'service/createorder', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.registerFarmer = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(apiUrl + 'service/register_farmer', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], CommonService);
    return CommonService;
}());

//# sourceMappingURL=commonService.js.map

/***/ }),

/***/ 344:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"F:\frangled\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"F:\frangled\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVars; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GlobalVars = (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], GlobalVars);
    return GlobalVars;
}());

//# sourceMappingURL=globalVars.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commonService__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__farmer_farmer__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import xml2js from 'xml2js';

var HomePage = (function () {
    function HomePage(navCtrl, commonService, alertCtrl, loading, translateService) {
        this.navCtrl = navCtrl;
        this.commonService = commonService;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.translateService = translateService;
        this.lang = 'ta';
        this.getCrops();
    }
    HomePage.prototype._changeLanguage = function (l) {
        if (l == "ta")
            this.lang = "en";
        else
            this.lang = "ta";
        this.translateService.use(l);
    };
    /* _scanQR()
     {
           this.barcode.scan().then((barcodeData) => {
               xml2js.parseString(barcodeData.text, { explicitArray: false }, (error, result) => {
         
                         if (error)
                         {
                           let error = this.alertCtrl.create({
                               title:'Error',
                               message:"Can't able to fetch data",
                               buttons:['Ok']
                           });
                           error.present();
                         } else {
                           alert("Success :"+JSON.stringify(result.PrintLetterBarcodeData.$));
                           let success = this.alertCtrl.create({
                               title:'Success',
                               message:"Registration done successfully.",
                               buttons:[{
                                       text:'Ok',
                                       handler:()=>{
   
                                       }
                               }]
                           });
                           success.present();
                           //uid,name,gender,yob,co(fathername),house,street,vtc(area),dist,state,pc(pincode)
                         }
                       });
   
                // Success! Barcode data is here
               }, (err) => {
                   let error = this.alertCtrl.create({
                               title:'Error',
                               message: err,
                               buttons:['Ok']
                           });
                           error.present();
                   // An error occurred
               });
     }*/
    HomePage.prototype._showSearchInput = function () {
        this._searchField = true;
    };
    HomePage.prototype._hideSearchInput = function () {
        this._searchField = false;
    };
    HomePage.prototype.getFilteredItems = function () {
        this.crops = this._items;
    };
    HomePage.prototype.setFilteredItems = function (e) {
        this.getFilteredItems();
        var val = e.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.crops = this.crops.filter(function (item) {
                return ((item.name.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    HomePage.prototype.getCrops = function () {
        var _this = this;
        var loader = this.loading.create({
            content: 'Please Wait...'
        });
        loader.present();
        this.commonService.getCrops().then(function (res) {
            console.log(res);
            loader.dismiss();
            if (res.data.length) {
                _this.crops = res.data;
                _this._items = res.data;
            }
            else {
                var error = _this.alertCtrl.create({
                    title: 'Error',
                    message: "No Crops Found",
                    buttons: ['OK']
                });
                error.present();
                return false;
            }
        })
            .catch(function (err) {
            console.log(err);
            loader.dismiss();
            var error = _this.alertCtrl.create({
                title: 'Error',
                message: err,
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    HomePage.prototype._gotoFarmer = function (c) {
        if (c === void 0) { c = ""; }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__farmer_farmer__["a" /* FarmerPage */], { id: c });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"F:\frangled\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title *ngIf="!_searchField">{{\'Crops\' | translate}}</ion-title>\n    <ion-searchbar [(ngModel)]="searchTerm" (ionCancel)="clearFilter($event)" (ionInput)="setFilteredItems($event)" *ngIf="_searchField" class="searchfield" type="text" placeholder="Search..."></ion-searchbar>\n    <ion-buttons end>\n      <button ion-button *ngIf="!_searchField" tappable (click)="_showSearchInput()">\n        <ion-icon name="ios-search"></ion-icon>\n      </button>\n      <button *ngIf="_searchField" ion-button tappable (click)="_hideSearchInput()">\n        <ion-icon name="ios-close-circle"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="_changeLanguage(lang)">\n        {{\'EN\' | translate}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class="crop-list">\n    <ion-item *ngFor="let c of crops" (click)="_gotoFarmer(c)">\n      <img src="{{c.image}}">\n      <p>{{c.name | translate}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"F:\frangled\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_commonService__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[253]);
//# sourceMappingURL=main.js.map