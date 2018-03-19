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
import { NavController, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { GlobalVars } from '../../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';
import { CropAddPage } from '../crop-add/crop-add';
// import xml2js from 'xml2js';
var AvailCropsPage = /** @class */ (function () {
    function AvailCropsPage(commonService, globalvars, loader, alertCtrl, actionCtrl, translateService, nav) {
        this.commonService = commonService;
        this.globalvars = globalvars;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.actionCtrl = actionCtrl;
        this.translateService = translateService;
        this.nav = nav;
        this.lang = 'ta';
        this.user = this.globalvars.getUserdata();
        console.log(this.user);
        this.getFarmerCrops(this.user.id);
    }
    AvailCropsPage_1 = AvailCropsPage;
    AvailCropsPage.prototype._changeLanguage = function (l) {
        if (l == "ta")
            this.lang = "en";
        else
            this.lang = "ta";
        this.translateService.use(l);
    };
    AvailCropsPage.prototype.getFarmerCrops = function (id) {
        var _this = this;
        var load = this.loader.create({
            content: "Please Wait.."
        });
        console.log("ID :" + id);
        load.present();
        this.commonService.getFarmerCrops(id).then(function (res) {
            console.log(res);
            load.dismiss();
            if (res.status == "success") {
                _this.crops = res.data;
            }
            else {
                var fail = _this.alertCtrl.create({
                    title: "Error",
                    message: res.message,
                    buttons: ['OK']
                });
                fail.present();
                return false;
            }
        })
            .catch(function (err) {
            load.dismiss();
            var error = _this.alertCtrl.create({
                title: "Error",
                message: err,
                buttons: ['OK']
            });
            error.present();
            return false;
        });
    };
    AvailCropsPage.prototype._showAction = function (c) {
        var _this = this;
        console.log(c);
        var action = this.actionCtrl.create({
            title: 'Choose Action',
            buttons: [
                {
                    text: this.translateService.instant('Edit'),
                    icon: 'ios-create',
                    handler: function () {
                        _this.nav.push(CropAddPage, { id: c });
                    }
                }, {
                    text: this.translateService.instant('Delete'),
                    icon: 'ios-trash',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Are sure want to delete?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                        console.log('Disagree clicked');
                                    }
                                },
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this._delete(c.f_id);
                                    }
                                }
                            ]
                        });
                        confirm.present();
                    }
                }, {
                    text: this.translateService.instant('Cancel'),
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        action.present();
    };
    AvailCropsPage.prototype._delete = function (id) {
        var _this = this;
        var load = this.loader.create({
            content: 'Please Wait...'
        });
        load.present();
        var data = { id: id, table: 'farmer_crops' };
        this.commonService.delete(data).then(function (res) {
            load.dismiss();
            _this.nav.setRoot(AvailCropsPage_1);
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
    AvailCropsPage.prototype._addCrop = function () {
        this.nav.push(CropAddPage);
    };
    AvailCropsPage = AvailCropsPage_1 = __decorate([
        Component({
            selector: 'page-avail-crops',
            templateUrl: 'avail-crops.html'
        }),
        __metadata("design:paramtypes", [CommonService, GlobalVars,
            LoadingController, AlertController, ActionSheetController,
            TranslateService, NavController])
    ], AvailCropsPage);
    return AvailCropsPage;
    var AvailCropsPage_1;
}());
export { AvailCropsPage };
//# sourceMappingURL=avail-crops.js.map