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
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { GlobalVars } from '../../providers/globalVars';
import { CommonService } from '../../providers/commonService';
import { OrderDetailPage } from '../order-detail/order-detail';
import { TranslateService } from '@ngx-translate/core';
var OrdersPage = /** @class */ (function () {
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
            _this.navCtrl.push(OrderDetailPage, { id: res.data });
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
        Component({
            selector: 'page-orders',
            templateUrl: 'orders.html'
        }),
        __metadata("design:paramtypes", [NavController, AlertController,
            LoadingController, CommonService, TranslateService,
            GlobalVars])
    ], OrdersPage);
    return OrdersPage;
}());
export { OrdersPage };
//# sourceMappingURL=orders.js.map