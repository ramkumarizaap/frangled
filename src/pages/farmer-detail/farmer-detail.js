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
import { HomePage } from '../home/home';
// import xml2js from 'xml2js';
var FarmerDetailPage = /** @class */ (function () {
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
                                _this.nav.setRoot(HomePage);
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
        Component({
            selector: 'page-farmer-detail',
            templateUrl: 'farmer-detail.html'
        }),
        __metadata("design:paramtypes", [NavParams, NavController, CommonService,
            AlertController, LoadingController])
    ], FarmerDetailPage);
    return FarmerDetailPage;
}());
export { FarmerDetailPage };
//# sourceMappingURL=farmer-detail.js.map