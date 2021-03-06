import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AvailCropsPage } from '../pages/avail-crops/avail-crops';
import { OrdersPage } from '../pages/orders/orders';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { LoginPage } from '../pages/login/login';
import { GlobalVars } from '../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public user={role:'',name:"Guest",photo:'assets/icon/user.png'};
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public app:App,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public translateService: TranslateService,public globalvars:GlobalVars) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Crops', component: HomePage,icon:'ios-nutrition' },
      { title: 'Orders', component: OrdersPage,icon:'ios-cart' }
    ];

    this.app.viewWillEnter.subscribe(() => {
       let sess = this.globalvars.getUserdata();
       console.log(sess);
       if(sess)
       {
         this.user = sess;
       }
      if(this.user!=null)
      {
        if(this.user.role=='2')
        {
          if(this.user.photo=='' || this.user.photo==null)
            this.user.photo = 'assets/icon/user.png';
          this.translateService.use('ta');
           this.pages = [
              { title: 'My Crops', component: AvailCropsPage,icon:'ios-nutrition' },
              { title: 'My Orders', component: MyOrdersPage,icon:'ios-basket'}
              ];
        }
      }
      else
      {
        this.pages = [
          { title: 'Crops', component: HomePage,icon:'ios-nutrition' },
          { title: 'Orders', component: OrdersPage,icon:'ios-cart' }
        ];
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  _logout()
  {
    this.globalvars.deleteUserdata();
    this.nav.setRoot(LoginPage);
  }
}
