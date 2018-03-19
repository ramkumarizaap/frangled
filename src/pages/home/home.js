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
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { FarmerPage } from '../farmer/farmer';
// import xml2js from 'xml2js';
import { TranslateService } from '@ngx-translate/core';
var HomePage = /** @class */ (function () {
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
        this.navCtrl.push(FarmerPage, { id: c });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, CommonService,
            AlertController, LoadingController,
            TranslateService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map