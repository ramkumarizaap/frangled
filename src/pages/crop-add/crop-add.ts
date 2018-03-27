import { Component } from '@angular/core';
import { NavParams,NavController,AlertController,LoadingController,ActionSheetController } from 'ionic-angular';
import { CommonService } from '../../providers/commonService';
import { GlobalVars } from '../../providers/globalVars';
import { TranslateService } from '@ngx-translate/core';
import { AvailCropsPage } from '../avail-crops/avail-crops';
// import xml2js from 'xml2js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {SERVER_URL} from '../../providers/config';
let apiUrl = SERVER_URL;
@Component({
  selector: 'page-crop-add',
  templateUrl: 'crop-add.html'
})
export class CropAddPage {
	public lang = 'ta';
	public crops;
	public _cropForm:FormGroup;
	public user;
	public crop = {f_id:'',crop:'',quantity:'',price:'',crop_id:'',crop_video:''};
	constructor(public alertCrl:AlertController,public nav:NavController,public loader:LoadingController,
	public commonService:CommonService,public translateService:TranslateService,public globalVars:GlobalVars,
	public _formBuilder:FormBuilder,public params:NavParams,public actionCtrl:ActionSheetController,
	public camera:Camera,public media:MediaCapture,public transfer: FileTransfer, public file: File)
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
      crop_video:[this.crop.crop_video],
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
			this._cropForm.value.crop_video = this.crop.crop_video;
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

	_addVideo()
	{
		let actionSheet = this.actionCtrl.create({
      title: this.translateService.instant('Choose your video type'),
      buttons: [
        {
          text: this.translateService.instant('Take a Video'),
          handler: () => {
            this._gotoCamera();
          }
        },{
          text: this.translateService.instant('Choose from Album'),
          handler: () => {
            this._gotoGallery();
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
    actionSheet.present();
	}

	_gotoCamera()
	{
		let options: CaptureVideoOptions = { limit: 1,duration:30,quality:100 };
		this.media.captureVideo(options)
		  .then((data: MediaFile[]) => {
		  	this._fileTransfer(data[0].fullPath);
		  })
		  .catch((err: CaptureError) =>{
		  	let error = this.alertCrl.create({
		  		title:this.translateService.instant("Error"),
		  		message:this.translateService.instant('Something went wrong'),
		  		buttons:['OK']
		  	});
		  	error.present();
		  	return false;
		  });
	}
	_gotoGallery()
	{
		const options: CameraOptions = {
        quality: 100,
        targetWidth: 300,
        targetHeight: 300,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.VIDEO,
        saveToPhotoAlbum: false
      }
      this.camera.getPicture(options).then((imageData) => {
          this._fileTransfer("file://"+imageData);
        })
      .catch((err) => {
        let error = this.alertCrl.create({
		  		title:this.translateService.instant("Error"),
		  		message:this.translateService.instant('Something went wrong'),
		  		buttons:['OK']
		  	});
		  	error.present();
		  	return false;
      });
	}

	_fileTransfer(name)
	{
		let load = this.loader.create({
			content:this.translateService.instant('Uploading...')
		});
		load.present();
		const fileTransfer: FileTransferObject = this.transfer.create();
		let options: FileUploadOptions =
		{
     fileKey: 'file',
     httpMethod : 'post',
     fileName: 'video.mp4',
     chunkedMode: false,
     mimeType: "multipart/form-data",
     params : {'fileName': "video.mp4"}
	  }

	  fileTransfer.upload(name,apiUrl+'service/upload_video' , options)
	   .then((res) => {
	   	load.dismiss();
	   	let img = JSON.parse(res.response);
	   	this.updateVideo(img.data);
	     	let succ = this.alertCrl.create({
		  		title:this.translateService.instant("Success"),
		  		message:this.translateService.instant('Video uploaded successfully.'),
		  		buttons:['OK']
		  	});
		  	succ.present();
	   }, (err) => {
	   	load.dismiss();
	    let error = this.alertCrl.create({
		  		title:this.translateService.instant("Error"),
		  		message:this.translateService.instant('Something went wrong'),
		  		buttons:['OK']
		  	});
		  	error.present();
		  	return false;
	   })
	}
	updateVideo(name)
	{
		this.crop.crop_video = name;
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