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
import { TranslateService } from '@ngx-translate/core';
var MyOrdersPage = /** @class */ (function () {
    function MyOrdersPage(navCtrl, alertCtrl, loader, commonService, translateService, globalVars) {
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
            this._getFarmerOrders(this.user.id);
    }
    MyOrdersPage.prototype._getFarmerOrders = function (id) {
        var _this = this;
        var load = this.loader.create({
            content: this.translateService.instant('Please Wait...')
        });
        load.present();
        this.commonService.getFarmerOrders(id).then(function (res) {
            console.log(res);
            setTimeout(function () {
                load.dismiss();
                _this.orders = res.data;
            }, 3000);
        })
            .catch(function (err) {
            load.dismiss();
            var error = _this.alertCtrl.create({
                title: _this.translateService.instant('Error'),
                message: err,
                buttons: ['OK'],
            });
            error.present();
            return false;
        });
    };
    MyOrdersPage.prototype._changeLanguage = function (l) {
        if (l == "ta")
            this.lang = "en";
        else
            this.lang = "ta";
        this.translateService.use(l);
    };
    MyOrdersPage = __decorate([
        Component({
            selector: 'page-my-orders',
            templateUrl: 'my-orders.html'
        }),
        __metadata("design:paramtypes", [NavController, AlertController,
            LoadingController, CommonService, TranslateService,
            GlobalVars])
    ], MyOrdersPage);
    return MyOrdersPage;
}());
export { MyOrdersPage };
//# sourceMappingURL=my-orders.js.map