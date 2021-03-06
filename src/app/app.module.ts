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
import { OrderListPage } from '../pages/order-list/order-list';
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
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@NgModule({
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
    MyOrdersPage,
    OrderListPage
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
    MyOrdersPage,
    OrderListPage
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    GlobalVars,
    SplashScreen,
    CommonService,
    CallNumber,
    LaunchNavigator,
    Camera,
    MediaCapture,
    FileTransfer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}