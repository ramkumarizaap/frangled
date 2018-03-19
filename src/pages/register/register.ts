import { Component } from '@angular/core';
import {NavController, AlertController,LoadingController,  MenuController,ActionSheetController} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexPatterns } from '../../providers/regexPatterns';
import { CommonService } from '../../providers/commonService';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
	public _registerForm: FormGroup;
  public formdata;
  public user_photo = "assets/icon/user.png";
  public _passwordInputType: string = "password";
  public _passwordIcon : string = "eye-off";

  constructor(public navCtrl: NavController,public mCtrl:MenuController,public alertCtrl:AlertController,
    public loader:LoadingController,public _formBuilder:FormBuilder,public actionCtrl:ActionSheetController,
    public commonService:CommonService,public camera:Camera)
  {
     this.mCtrl.swipeEnable(false);
     this._registerForm = this._formBuilder.group({
      //EMAIL
      email: ["",Validators.compose([Validators.required,Validators.pattern(regexPatterns.email)])],
      //PASSWORD
      password: ["", Validators.compose([Validators.required,Validators.minLength(6)])],
      //NAME
      name: ["", Validators.compose([Validators.required])],
      //PHONE
      phone: ["", Validators.compose([Validators.minLength(10)])],
      photo: [""]
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

  _showPhoto()
  {
  	let actionSheet = this.actionCtrl.create({
      title: 'Choose your profile photo',
      buttons: [
        {
          text: 'Take a Picture',
          handler: () => {
            this._gotoCamera();
          }
        },{
          text: 'Choose from Album',
          handler: () => {
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  _gotoCamera()
  {
    const options: CameraOptions = {
        quality: 100,
        targetWidth: 900,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
          // this._registerForm.value.photo = 'data:image/jpeg;base64,' + imageData;
          // this.user_photo = 'data:image/jpeg;base64,' + imageData;
          alert('data:image/jpeg;base64,' + imageData);
        })
      .catch((err) => {
        let error = this.alertCtrl.create({
          title:'Error',
          message:err,
          buttons:['OK']
        });
        error.present();
        return false;
      });
  }
  _goBack()
  {
    this.navCtrl.setRoot(LoginPage);
  }

  _submitRegister()
  {
    // console.log(this._registerForm.value);
    if(this._registerForm.valid)
    {
      let load = this.loader.create({
        content:"Pleasw Wait..."
      });
      load.present();
      this.commonService.registerBuyer(this._registerForm.value).then((res)=>{
        let succ = this.alertCtrl.create({
          title:'Success',
          message:res.msg,
          buttons:[
          {
            text:'OK',
            handler:()=>{
              this.navCtrl.setRoot(LoginPage);
            }
          }]
        });
        setTimeout(()=>{
          load.dismiss();
          succ.present();
        },3000);
      })
      .catch((err)=>{
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