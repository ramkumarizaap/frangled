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
import { NavParams, NavController, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { FarmerDetailPage } from '../farmer-detail/farmer-detail';
// import xml2js from 'xml2js';
var FarmerPage = /** @class */ (function () {
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
        this.nav.push(FarmerDetailPage, { id: f });
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
        Component({
            selector: 'page-farmer',
            templateUrl: 'farmer.html'
        }),
        __metadata("design:paramtypes", [NavParams,
            NavController, AlertController,
            LoadingController, ActionSheetController,
            CommonService])
    ], FarmerPage);
    return FarmerPage;
}());
export { FarmerPage };
//# sourceMappingURL=farmer.js.map