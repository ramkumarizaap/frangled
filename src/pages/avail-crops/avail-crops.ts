import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController,ActionSheetController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { GlobalVars } from '../../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';
import { CropAddPage } from '../crop-add/crop-add';

// import xml2js from 'xml2js';
@Component({
  selector: 'page-avail-crops',
  templateUrl: 'avail-crops.html'
})
export class AvailCropsPage {
	public user;
	public lang = 'ta';
	public crops;
	constructor(public commonService:CommonService,public globalvars:GlobalVars,
			public loader:LoadingController,public alertCtrl:AlertController,public actionCtrl:ActionSheetController,
			public translateService:TranslateService,public nav:NavController)
	{
		this.user = this.globalvars.getUserdata();
		console.log(this.user);
		this.getFarmerCrops(this.user.id);
	}

	_changeLanguage(l)
  {
    if(l=="ta")
      this.lang = "en";
    else
      this.lang = "ta";
    this.translateService.use(l);
  }

	getFarmerCrops(id)
	{
		let load = this.loader.create({
			content:"Please Wait.."
		});
		console.log("ID :"+id);
		load.present();
		this.commonService.getFarmerCrops(id).then((res)=>{
			console.log(res);
			load.dismiss();
			if(res.status == "success")
			{
				this.crops = res.data;
			}
			else
			{
				let fail = this.alertCtrl.create({
					title:"Error",
					message:res.message,
					buttons:['OK']
				});
				fail.present();
				return false;
			}
		})
		.catch((err)=>{
			load.dismiss();
			let error = this.alertCtrl.create({
				title:"Error",
				message:err,
				buttons:['OK']
			});
			error.present();
			return false;
		});
	}

	_showAction(c)
	{
		console.log(c);
		let action = this.actionCtrl.create({
			title:'Choose Action',
			buttons: [
        {
          text: this.translateService.instant('Edit'),
          icon:'ios-create',
          handler: () => {
            this.nav.push(CropAddPage,{id:c})
          }
        },{
          text: this.translateService.instant('Delete'),
          icon:'ios-trash',
          handler: () => {
            	let confirm = this.alertCtrl.create({
						      title: 'Are sure want to delete?',
						      buttons: [
						        {
						          text: 'Cancel',
						          handler: () => {
						            console.log('Disagree clicked');
						          }
						        },
						        {
						          text: 'OK',
						          handler: () => {
						          	this._delete(c.f_id);
						          }
						        }
						      ]
						    });
						    confirm.present();
          }
        },{
          text: this.translateService.instant('Cancel'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
		});
		action.present();
	}

	_delete(id)
	{
		let load = this.loader.create({
			content:'Please Wait...'
		});
		load.present();
		let data = {id:id,table:'farmer_crops'};
		this.commonService.delete(data).then((res)=>{
			load.dismiss();
			this.nav.setRoot(AvailCropsPage);
		})
		.catch((err)=>{
			load.dismiss();
			let error = this.alertCtrl.create({
				title:'Error',
				message:err,
				buttons:['OK']
			})
			error.present();
			return false;
		});
	}

	_addCrop()
	{
		this.nav.push(CropAddPage);
	}
}