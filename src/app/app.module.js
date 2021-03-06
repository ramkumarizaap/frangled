var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { FarmerPage } from '../pages/farmer/farmer';
import { FarmerDetailPage } from '../pages/farmer-detail/farmer-detail';
import { OrdersPage } from '../pages/orders/orders';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { AvailCropsPage } from '../pages/avail-crops/avail-crops';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { CropAddPage } from '../pages/crop-add/crop-add';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CommonService } from '../providers/commonService';
import { GlobalVars } from '../providers/globalVars';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CallNumber } from '@ionic-native/call-number';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                LoginPage,
                RegisterPage,
                FarmerPage,
                FarmerDetailPage,
                OrdersPage,
                OrderDetailPage,
                AvailCropsPage,
                CropAddPage,
                MyOrdersPage
            ],
            imports: [
                BrowserModule,
                HttpModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp),
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                LoginPage,
                RegisterPage,
                FarmerPage,
                FarmerDetailPage,
                OrdersPage,
                OrderDetailPage,
                AvailCropsPage,
                CropAddPage,
                MyOrdersPage
            ],
            providers: [
                StatusBar,
                BarcodeScanner,
                GlobalVars,
                SplashScreen,
                CommonService,
                CallNumber,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map