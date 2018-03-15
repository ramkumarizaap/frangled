import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { FarmerPage } from '../farmer/farmer';
// import xml2js from 'xml2js';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public crops;
	public _searchField;
	public _items;
  public lang = 'ta';
  constructor(public navCtrl: NavController,public commonService:CommonService,
  	public alertCtrl:AlertController,public loading:LoadingController,
    public translateService: TranslateService)
  {
  	this.getCrops();
  }
  _changeLanguage(l)
  {
    if(l=="ta")
      this.lang = "en";
    else
      this.lang = "ta";
    this.translateService.use(l);
  }
 /* _scanQR()
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
				      } else {
				        alert("Success :"+JSON.stringify(result.PrintLetterBarcodeData.$));
				        let success = this.alertCtrl.create({
				      		title:'Success',
				      		message:"Registration done successfully.",
				      		buttons:[{
				      				text:'Ok',
				      				handler:()=>{

				      				}
				      		}]
				      	});
				        success.present();
				        //uid,name,gender,yob,co(fathername),house,street,vtc(area),dist,state,pc(pincode)
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
  }*/

  _showSearchInput():void
	{
		this._searchField = true;
	}
	_hideSearchInput():void
	{
		this._searchField = false;	
	}
	getFilteredItems()
	{
		this.crops = this._items;
	}

	setFilteredItems(e)
	{
		this.getFilteredItems();
		let val = e.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '')
    {
      this.crops = this.crops.filter((item) => {
        return ( (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1));
      })
    } 
	}
  getCrops()
  {
  	let loader = this.loading.create({
  		content:'Please Wait...'
  	});
  	loader.present();
  	this.commonService.getCrops().then((res)=>{
  		console.log(res);
  		loader.dismiss();
  		if(res.data.length)
  		{
  			this.crops = res.data;
  			this._items = res.data;
  		}
  		else
			{
				let error = this.alertCtrl.create({
  			title:'Error',
  			message:"No Crops Found",
  			buttons:['OK']
  		});
  		error.present();
  		return false;
			}
  	})
  	.catch((err)=>{
  		console.log(err);
  		loader.dismiss();
  		let error = this.alertCtrl.create({
  			title:'Error',
  			message:err,
  			buttons:['OK']
  		});
  		error.present();
  		return false;
  	});
  }

  _gotoFarmer(c:any="")
  {
  	this.navCtrl.push(FarmerPage,{id:c})
  }

}
