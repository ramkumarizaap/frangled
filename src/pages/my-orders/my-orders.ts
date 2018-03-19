import { Component } from '@angular/core';
import {NavController, AlertController,LoadingController} from "ionic-angular";
import { GlobalVars } from '../../providers/globalVars';
import { CommonService } from '../../providers/commonService';
import { OrderListPage } from '../order-list/order-list';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {
	public lang = 'ta';
	public user={id:''};
	public orders;
	constructor(public navCtrl: NavController,public alertCtrl:AlertController,
    public loader:LoadingController,public commonService:CommonService,public translateService: TranslateService,
    public globalVars:GlobalVars)
	{
		this.user = this.globalVars.getUserdata();
		if(this.user.id!='' || this.user.id!=null)
			this._getFarmerOrders(this.user.id);
	}

	_getFarmerOrders(id)
	{
		let load = this.loader.create({
			content:this.translateService.instant('Please Wait...')
		});
		load.present();
		this.commonService.getFarmerOrders(id).then((res)=>{
			console.log(res);
			setTimeout(()=>{
				load.dismiss();
				this.orders = res.data;
			},3000);
		})
		.catch((err)=>{
			load.dismiss();
			let error = this.alertCtrl.create({
				title:this.translateService.instant('Error'),
				message:err,
				buttons:['OK'],
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
  	this.commonService.getOrderById(id,'user').then((res)=>{
			console.log(res);
			this.navCtrl.push(OrderListPage,{id:res.data});
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