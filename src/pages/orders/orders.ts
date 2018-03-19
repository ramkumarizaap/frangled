import { Component } from '@angular/core';
import {NavController, AlertController,LoadingController} from "ionic-angular";
import { GlobalVars } from '../../providers/globalVars';
import { CommonService } from '../../providers/commonService';
import { OrderDetailPage } from '../order-detail/order-detail';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
	public lang = 'ta';
	public user={id:''};
	public orders;
	constructor(public navCtrl: NavController,public alertCtrl:AlertController,
    public loader:LoadingController,public commonService:CommonService,public translateService: TranslateService,
    public globalVars:GlobalVars)
	{
		this.user = this.globalVars.getUserdata();
		if(this.user.id!='' || this.user.id!=null)
			this._getOrders(this.user.id);
	}

	_getOrders(id)
	{
		console.log(id);
		let load = this.loader.create({
			content:'Please Wait...'
		});
		load.present();
		this.commonService.getOrders(id).then((res)=>{
			console.log(res);
			load.dismiss();
			if(res.status=="success" && res.data.length > 0)
			{
				this.orders = res.data;
			}
			else
			{
				let error = this.alertCtrl.create({
				title:'Error',
				message:'No Orders Found.',
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

	_changeLanguage(l)
  {
    if(l=="ta")
      this.lang = "en";
    else
      this.lang = "ta";
    this.translateService.use(l);
  }

  _viewOrder(id)
  {
  	this.commonService.getOrderById(id,'farmer').then((res)=>{
			console.log(res);
			this.navCtrl.push(OrderDetailPage,{id:res.data});
		})
		.catch((err)=>{
			let error = this.alertCtrl.create({
				title:"Error",
				message:err,
				buttons:['OK']
			});
			error.present();
			return false;
		});
  }
}