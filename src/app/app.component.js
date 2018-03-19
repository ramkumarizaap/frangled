var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AvailCropsPage } from '../pages/avail-crops/avail-crops';
import { OrdersPage } from '../pages/orders/orders';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { LoginPage } from '../pages/login/login';
import { GlobalVars } from '../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';
var MyApp = /** @class */ (function () {
    function MyApp(app, platform, statusBar, splashScreen, translateService, globalvars) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.globalvars = globalvars;
        this.user = { role: '' };
        this.rootPage = MyOrdersPage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Crops', component: HomePage, icon: 'ios-nutrition' },
            { title: 'Orders', component: OrdersPage, icon: 'ios-cart' }
        ];
        this.app.viewWillEnter.subscribe(function () {
            _this.user = _this.globalvars.getUserdata();
            console.log(_this.user);
            if (_this.user != null) {
                if (_this.user.role == '2') {
                    _this.pages = [
                        { title: 'My Crops', component: AvailCropsPage, icon: 'ios-nutrition' },
                        { title: 'My Orders', component: MyOrdersPage, icon: 'ios-basket' }
                    ];
                }
            }
            else {
                _this.pages = [
                    { title: 'Crops', component: HomePage, icon: 'ios-nutrition' },
                    { title: 'Orders', component: OrdersPage, icon: 'ios-cart' }
                ];
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
        this.nav.setRoot(LoginPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [App, Platform, StatusBar, SplashScreen,
            TranslateService, GlobalVars])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map