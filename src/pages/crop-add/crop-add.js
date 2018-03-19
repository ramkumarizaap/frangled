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
import { NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { GlobalVars } from '../../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';
import { AvailCropsPage } from '../avail-crops/avail-crops';
// import xml2js from 'xml2js';
import { FormBuilder, Validators } from '@angular/forms';
var CropAddPage = /** @class */ (function () {
    function CropAddPage(alertCrl, nav, loader, commonService, translateService, globalVars, _formBuilder, params) {
        this.alertCrl = alertCrl;
        this.nav = nav;
        this.loader = loader;
        this.commonService = commonService;
        this.translateService = translateService;
        this.globalVars = globalVars;
        this._formBuilder = _formBuilder;
        this.params = params;
        this.lang = 'ta';
        this.crop = { f_id: '', crop: '', quantity: '', price: '', crop_id: '' };
        this.user = this.globalVars.getUserdata();
        var id = this.params.get('id');
        if (id)
            this.crop = id;
        this.getCrops();
        this.loadForm();
    }
    CropAddPage.prototype.getCrops = function () {
        var _this = this;
        this.commonService.getCrops().then(function (res) {
            _this.crops = res.data;
            console.log(res);
        })
            .catch(function (err) {
            var error = _this.alertCrl.create({
                title: 'Error',
                message: 'No Crops Found.',
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    CropAddPage.prototype.loadForm = function () {
        this._cropForm = this._formBuilder.group({
            crop_id: [this.crop.f_id],
            farmer_id: [this.user.id],
            //EMAIL
            name: [this.crop.crop_id, Validators.compose([Validators.required])],
            //PASSWORD
            quantity: [this.crop.quantity, Validators.compose([Validators.required])],
            price: [this.crop.price, Validators.compose([Validators.required])],
        });
    };
    CropAddPage.prototype._submitCrop = function () {
        var _this = this;
        var load = this.loader.create({
            content: this.translateService.instant('Please Wait...')
        });
        load.present();
        if (this._cropForm.valid) {
            console.log(this._cropForm.value);
            this.commonService.postCrop(this._cropForm.value).then(function (res) {
                load.dismiss();
                if (res.status == "success") {
                    var success = _this.alertCrl.create({
                        title: _this.translateService.instant('Success'),
                        message: res.msg,
                        buttons: [
                            {
                                text: "OK",
                                handler: function () {
                                    _this.nav.setRoot(AvailCropsPage);
                                }
                            }
                        ]
                    });
                    success.present();
                }
                else {
                    var fail = _this.alertCrl.create({
                        title: _this.translateService.instant('Error'),
                        message: res.msg,
                        buttons: ['OK']
                    });
                    fail.present();
                    return false;
                }
            })
                .catch(function (err) {
                load.dismiss();
                var error = _this.alertCrl.create({
                    title: 'Error',
                    message: err,
                    buttons: ['OK']
                });
                error.present();
                return false;
            });
        }
    };
    CropAddPage.prototype._changeLanguage = function (l) {
        if (l == "ta")
            this.lang = "en";
        else
            this.lang = "ta";
        this.translateService.use(l);
    };
    CropAddPage.prototype._goBack = function () {
        this.nav.pop();
    };
    CropAddPage = __decorate([
        Component({
            selector: 'page-crop-add',
            templateUrl: 'crop-add.html'
        }),
        __metadata("design:paramtypes", [AlertController, NavController, LoadingController,
            CommonService, TranslateService, GlobalVars,
            FormBuilder, NavParams])
    ], CropAddPage);
    return CropAddPage;
}());
export { CropAddPage };
//# sourceMappingURL=crop-add.js.map