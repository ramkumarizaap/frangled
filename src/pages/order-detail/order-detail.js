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
import { NavParams, NavController, AlertController, LoadingController } from "ionic-angular";
import { GlobalVars } from '../../providers/globalVars';
import { CommonService } from '../../providers/commonService';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
var OrderDetailPage = /** @class */ (function () {
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
        Component({
            selector: 'page-order-detail',
            templateUrl: 'order-detail.html'
        }),
        __metadata("design:paramtypes", [NavController, AlertController, NavParams,
            LoadingController, CommonService, TranslateService,
            GlobalVars, CallNumber])
    ], OrderDetailPage);
    return OrderDetailPage;
}());
export { OrderDetailPage };
//# sourceMappingURL=order-detail.js.map