import { Component } from '@angular/core';
import { NavParams,NavController, AlertController,LoadingController} from "ionic-angular";
import { GlobalVars } from '../../providers/globalVars';
import { CommonService } from '../../providers/commonService';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {
	public lang = 'ta';
	public order;
	public oid;
	public user= {id:'',address1:'',address2:'',city:'',state:'',zip:''};
	constructor(public navCtrl: NavController,public alertCtrl:AlertController,public params:NavParams,
    public loader:LoadingController,public commonService:CommonService,public translateService: TranslateService,
    public globalVars:GlobalVars,public callNumber: CallNumber,public launchNavigator: LaunchNavigator)
	{
		this.order = this.params.get('id');
		this.user = this.globalVars.getUserdata();
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

  _callFarmer(number)
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

  _getDirections(address)
  {

 		let from = this.user.address1+', '+this.user.address2+', '+this.user.city+', '+this.user.state+', '+this.user.zip+', IN';
  	let options: LaunchNavigatorOptions = {
		  start: from,
		  app: this.launchNavigator.APP.GOOGLE_MAPS
		};
	  this.launchNavigator.navigate(address, options)
	  .then((success) =>{ alert('Launched navigator');
		})
		.catch((error) => { alert('Error launching navigator'+ error);
		});
	}
}