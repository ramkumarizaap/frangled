import { Component } from '@angular/core';
import { NavParams,NavController,AlertController,LoadingController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { GlobalVars } from '../../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';
import { AvailCropsPage } from '../avail-crops/avail-crops';
// import xml2js from 'xml2js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'page-crop-add',
  templateUrl: 'crop-add.html'
})
export class CropAddPage {
	public lang = 'ta';
	public crops;
	public _cropForm:FormGroup;
	public user;
	public crop = {f_id:'',crop:'',quantity:'',price:'',crop_id:''};
	constructor(public alertCrl:AlertController,public nav:NavController,public loader:LoadingController,
	public commonService:CommonService,public translateService:TranslateService,public globalVars:GlobalVars,
	public _formBuilder:FormBuilder,public params:NavParams)
	{
		this.user = this.globalVars.getUserdata();
		let id = this.params.get('id');
		if(id)
			this.crop = id;
		this.getCrops();
		this.loadForm();
	}

	getCrops()
	{
		this.commonService.getCrops().then((res)=>{
			this.crops = res.data;
			console.log(res);
		})
		.catch((err)=>{
			let error = this.alertCrl.create({
				title:this.translateService.instant('Error'),
				message:this.translateService.instant('No Crops Found.'),
				buttons:[this.translateService.instant('OK')]
			});
			error.present();
			return false;
		});	
	}
	loadForm()
	{
		this._cropForm = this._formBuilder.group({
			crop_id:[this.crop.f_id],
			farmer_id:[this.user.id],
      //EMAIL
      name: [this.crop.crop_id,Validators.compose([Validators.required])],
      //PASSWORD
      quantity: [this.crop.quantity, Validators.compose([Validators.required])],
      price: [this.crop.price, Validators.compose([Validators.required])],
    });
	}

	_submitCrop()
	{
		let load = this.loader.create({
			content:this.translateService.instant('Please Wait...')
		});
		load.present();
		if(this._cropForm.valid)
		{
			console.log(this._cropForm.value);
			this.commonService.postCrop(this._cropForm.value).then((res)=>{
				load.dismiss();
				if(res.status=="success")
				{
					let success = this.alertCrl.create({
						title:this.translateService.instant('Success'),
						message:this.translateService.instant(res.msg),
						buttons:[
						{
							text:this.translateService.instant('OK'),
							handler:()=>{
								this.nav.setRoot(AvailCropsPage);
							}
						}]
					});
					success.present();
				}
				else{
					let fail = this.alertCrl.create({
						title:this.translateService.instant('Error'),
						message:res.msg,
						buttons:[this.translateService.instant('OK')]
					});
					fail.present();
					return false;
				}
			})
			.catch((err)=>{
				load.dismiss();
				let error = this.alertCrl.create({
					title:this.translateService.instant('Error'),
					message:err,
					buttons:[this.translateService.instant('OK')]
				});
				error.present();
				return false;
			});
		}
	}

	_changeLanguage(l)
  {
    if(l=="ta")
      this.lang = "en";
    else
      this.lang = "ta";
    this.translateService.use(l);
  }
  _goBack()
  {
  	this.nav.pop();
  }
}