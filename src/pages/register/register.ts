import { Component } from '@angular/core';
import {NavController, AlertController,LoadingController,  MenuController,ActionSheetController} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexPatterns } from '../../providers/regexPatterns';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
	public _registerForm: FormGroup;
  public formdata;
  public _passwordInputType: string = "password";
  public _passwordIcon : string = "eye-off";

  constructor(public navCtrl: NavController,public mCtrl:MenuController,public alertCtrl:AlertController,
    public loader:LoadingController,public _formBuilder:FormBuilder,public actionCtrl:ActionSheetController)
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
      phone: ["", Validators.compose([Validators.minLength(10)])]
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
            console.log('Destructive clicked');
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

  _goBack()
  {
    this.navCtrl.setRoot(LoginPage);
  }

}