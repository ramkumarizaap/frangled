import { Component } from '@angular/core';
import { NavParams,NavController, AlertController,LoadingController} from "ionic-angular";
import { GlobalVars } from '../../providers/globalVars';
import { CommonService } from '../../providers/commonService';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {
	public lang = 'ta';
	public order;
	public oid;
	public user="";
	constructor(public navCtrl: NavController,public alertCtrl:AlertController,public params:NavParams,
    public loader:LoadingController,public commonService:CommonService,public translateService: TranslateService,
    public globalVars:GlobalVars,public callNumber: CallNumber)
	{
		this.order = this.params.get('id');
		console.log(this.order);
	}

	_changeLanguage(l)
  {
    if(l=="ta")
      this.lang = "en";
    else
      this.lang = "ta";
    this.translateService.use(l);
  }

  _callCustomer(number)
  {
  	this.callNumber.callNumber(number, true)
		  .then((res) =>{ console.log('Launched dialer!');})
		  .catch((err) =>{
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