import { Component } from '@angular/core';
import { NavParams,NavController,AlertController,LoadingController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { HomePage } from '../home/home';
// import xml2js from 'xml2js';
@Component({
  selector: 'page-farmer-detail',
  templateUrl: 'farmer-detail.html'
})
export class FarmerDetailPage
{
	public farmer;
	public order;
	constructor(public params:NavParams,public nav:NavController,public commonService:CommonService,
		public alertCtrl:AlertController,public loader:LoadingController)
	{
		this.farmer = this.params.get('id');
		console.log(this.farmer);
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
          	this.order = {crop_id:crop_id,farmer_id:farmer_id,price:price,qty:q};
          	console.log(qty,q);
          	if(q >= qty)
          	{
          		let error = this.alertCtrl.create({
          			title:'Sorry',
          			message:'You have entered more quantity than available quantity',
          			buttons:['OK']
          		});
          		error.present();
          		return false;
          	}
          	else
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
				let error = this.alertCtrl.create({
					title:'Error',
					message:"Can't able to order right now."
				});
				error.present();
				return false;
			}
		})
		.catch((err)=>{
			let error = this.alertCtrl.create({
					title:'Error',
					message:"Can't able to order right now."
				});
				error.present();
				return false;
		});
	}
}