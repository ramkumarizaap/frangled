import { Component } from '@angular/core';
import { NavParams,NavController,AlertController,LoadingController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { GlobalVars } from '../../providers/globalVars';
import { HomePage } from '../home/home';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import xml2js from 'xml2js';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-farmer-detail',
  templateUrl: 'farmer-detail.html'
})
export class FarmerDetailPage
{
	public farmer;
	public order;
	public lang = 'ta';
	public user = {id:'',address1:'',address2:'',city:'',state:'',zip:''};
	constructor(public params:NavParams,public nav:NavController,public commonService:CommonService,
		public alertCtrl:AlertController,public loader:LoadingController,
		public globalvars:GlobalVars,public launchNavigator: LaunchNavigator,public translateService: TranslateService)
	{
		this.farmer = this.params.get('id');
		console.log(this.farmer);
		this.user = this.globalvars.getUserdata();
	}
	_changeLanguage(l)
	  {
	    if(l=="ta")
	      this.lang = "en";
	    else
	      this.lang = "ta";
	    this.translateService.use(l);
	  }
	_orderNow(crop_id,farmer_id,price,qty:number)
	{
		console.log(crop_id,farmer_id,price,qty);
		let quantity = this.alertCtrl.create({
			title:'Enter Quantity for you',
			inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type:'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role:'cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: (data) => {
          	let q:number = data.quantity;
          	console.log(qty,q);
          	this.order = {user_id:this.user.id,crop_id:crop_id,farmer_id:farmer_id,price:price,qty:q};
          	this._saveOrder(this.order);
          }
        }
      ]
		});
		quantity.present();
	}

	_saveOrder(order)
	{
		let load = this.loader.create({
			content:'Please Wait...'
		});
		load.present();
		this.commonService.postOrder(order).then((res)=>{
			if(res.status=="success")
			{
				let success = this.alertCtrl.create({
					title:'Success',
					message:"Your order has been placed.",
					buttons:[{
						text:'OK',
						handler:()=>{
							this.nav.setRoot(HomePage);
						}
					}]
				});
				setTimeout(()=>{
					load.dismiss();
					success.present();
				},3000);
			}
			else
			{
				load.dismiss();
				let error = this.alertCtrl.create({
					title:'Error',
					message:res.msg,
					buttons:['OK']
				});
				error.present();
				return false;
			}
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
	_getDirections(address)
  {
  	let endpoint = address.address2+", "+address.city+", "+address.state+", "+address.zip+", IN";
  	console.log(endpoint);
 		let from = this.user.address1+', '+this.user.address2+', '+this.user.city+', '+this.user.state+', '+this.user.zip+', IN';
  	let options: LaunchNavigatorOptions = {
		  start: from,
		  app: this.launchNavigator.APP.GOOGLE_MAPS
		};
	  this.launchNavigator.navigate(endpoint, options)
	  .then((success) =>{ alert('Launched navigator');
		})
		.catch((error) => { alert('Error launching navigator'+ error);
		});
	}
}