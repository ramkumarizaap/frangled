import { Component } from '@angular/core';
import { NavParams,NavController,AlertController,LoadingController,ActionSheetController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { FarmerDetailPage } from '../farmer-detail/farmer-detail';

// import xml2js from 'xml2js';
@Component({
  selector: 'page-farmer',
  templateUrl: 'farmer.html'
})
export class FarmerPage {
	public crop;
	public farmers;
	public isDesc:boolean = false;
	public column;
	public sortedBy:string = 'Name';
	public _searchField;
		constructor(public params:NavParams,
				public nav:NavController,public alertCtl:AlertController,
				public loader:LoadingController,public actionCtrl:ActionSheetController,
				public commonService:CommonService)
		{
			this.crop = this.params.get('id');
			if(this.crop)
				this.getFarmers(this.crop.id);
			console.log(this.crop);
		}
		_gotoFarmer(f:any='')
		{
			console.log(f);
			this.nav.push(FarmerDetailPage,{id:f});
		}
		getFarmers(id)
		{
			let load = this.loader.create({
				content:"Please Wait..."
			});
			load.present();

			this.commonService.getFarmers(id).then((res)=>{
				console.log(res);
				load.dismiss();
				if(res.data.length)
					this.farmers = res.data;
				else
				{
					let error = this.alertCtl.create({
					title:'Error',
					message:"No Farmers found",
					buttons:['OK']
				});
				error.present();
				return false;
				}
			})
			.catch((err)=>{
				load.dismiss();
				let error = this.alertCtl.create({
					title:'Error',
					message:err,
					buttons:['OK']
				});
				error.present();
				return false;
			});
		}

		_sortActionSheet()
		{
			let action = this.actionCtrl.create({
				title:'Sort By',
				buttons: [
	        {
	          text: 'Name',
	          handler: () => {
	            this._sort('name');
	            this.sortedBy = 'Name';
	          }
	        },
	        {
	          text: 'Price',
	          handler: () => {
	            this._sort('price');
	            this.sortedBy = 'Price';
	          }
	        },
	        {
	          text: 'Quantity',
	          handler: () => {
	            this._sort('quantity');
	            this.sortedBy = 'Quantity';
	          }
	        },
	        {
	          text: 'Cancel',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        }
        ]
			});
			action.present();
		}

		_sort(property)
		{
			this.isDesc = !this.isDesc; //change the direction    
		  this.column = property;
		  let direction = this.isDesc ? 1 : -1;

		    this.farmers.sort(function(a, b){
		        if(a[property] < b[property]){
		            return -1 * direction;
		        }
		        else if( a[property] > b[property]){
		            return 1 * direction;
		        }
		        else{
		            return 0;
		        }
		    });
		}
}