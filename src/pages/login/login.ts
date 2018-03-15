import { Component } from '@angular/core';
import {NavController, AlertController,LoadingController,  MenuController,Platform} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexPatterns } from '../../providers/regexPatterns';
import { GlobalVars } from '../../providers/globalVars';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { CommonService } from '../../providers/commonService';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import xml2js from 'xml2js';  
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public _loginForm: FormGroup;
  public formdata;
  public _passwordInputType: string = "password";
  public _passwordIcon : string = "eye-off";
  param = {value:'Wordl'};
  constructor(public navCtrl: NavController,public mCtrl:MenuController,public alertCtrl:AlertController,
    public loader:LoadingController,public _formBuilder:FormBuilder,public barcode:BarcodeScanner,
    public commonService:CommonService,public platform:Platform,public translateService: TranslateService,
    public globalVars:GlobalVars)
  {
     this.mCtrl.swipeEnable(false);
     this._loginForm = this._formBuilder.group({
      //EMAIL
      email: ["ramkumar.izaap@gmail.com",
        Validators.compose([
          Validators.required,Validators.pattern(regexPatterns.email)
        ])
      ],
      //PASSWORD
      password: ["password", Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ]
    });
  }


  // Password Toggle
  _toggleViewPassword(event: MouseEvent) {
    event.preventDefault();
    if (this._passwordInputType === "password") {
      this._passwordInputType = "text";
      this._passwordIcon = "eye";
    } else {
      this._passwordIcon = "eye-off";
      this._passwordInputType = "password";
    };
  };
  _changeLanguage(l)
  {
    console.log(l);
    this.translateService.use(l);
  }
  _gotoRegisterPage()
  {
    this.navCtrl.setRoot(RegisterPage);
  }

  _scanCard()
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
                return false;
              }
              else
              {
                let load = this.loader.create({
                  content:'Please Wait...'
                });
                load.present();
                alert("Success :"+JSON.stringify(result.PrintLetterBarcodeData.$));
                this.commonService.registerFarmer(result.PrintLetterBarcodeData.$).then((res)=>{
                  load.dismiss();
                  if(res.type=="register")
                  {
                    this.navCtrl.setRoot(HomePage);
                  }
                  else
                  {
                    let success = this.alertCtrl.create({
                      title:'Error',
                      message:'Registration done succesfully.',
                      buttons:[{
                        text:'OK',
                        handler:()=>{
                          this.navCtrl.setRoot(HomePage);
                        }
                      }]
                    });
                    success.present();
                  }
                })
                .catch((err)=>{
                  load.dismiss();
                let error = this.alertCtrl.create({
                  title:'Error',
                  message:err,
                  buttons:['Ok']
                });
                error.present();
                return false;
                //uid,name,gender,yob,co(fathername),house,street,vtc(area),dist,state,pc(pincode)
                });
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
  }

  _login()
  {
    console.log(this._loginForm.value);
    if(this._loginForm.valid)
    {
      let load = this.loader.create({
        content:"Please Wait..."
      });
      load.present();
      this.commonService.login(this._loginForm.value).then((res)=>{
        console.log(res);
        load.dismiss();
        if(res.status=="success")
        {
          this.globalVars.setUserdata(JSON.stringify(res.msg));
          this.navCtrl.setRoot(HomePage);
        }
        else{
          let error = this.alertCtrl.create({
            title:'Error',
            message:res.msg,
            buttons:['OK']
          });
          error.present();
          return false;
        }
      }).catch((err)=>{
        load.dismiss();
        let error = this.alertCtrl.create({
            title:'Error',
            message:err,
            buttons:['OK']
          });
          error.present();
          return false;
      });
    }
  }
  
}
