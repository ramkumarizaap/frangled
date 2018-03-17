import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from './config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
let apiUrl = SERVER_URL;

@Injectable()
export class CommonService {

  constructor(public http : Http) {
  }
 getCrops() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl+'service/crops' ,options).map(res => res.json())
       .toPromise();
  }
  getFarmerCrops(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl+'service/farmer_crops?id='+id ,options).map(res => res.json())
       .toPromise();
  }
  getFarmers(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl+'service/farmers?id='+id ,options).map(res => res.json())
       .toPromise();
  }
  delete(data) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl+'service/delete',data ,options).map(res => res.json())
       .toPromise();
  }
 
  getOrders(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl+'service/orders?id='+id,options).map(res => res.json())
       .toPromise();
  }
  getOrderById(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl+'service/order_by_id?id='+id,options).map(res => res.json())
       .toPromise();
  }
  login(data) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl+'service/login',data ,options).map(res => res.json())
       .toPromise();
  }

  postOrder(data) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl+'service/createorder',data ,options).map(res => res.json())
       .toPromise();
  }

  postCrop(data) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl+'service/createcrop',data ,options).map(res => res.json())
       .toPromise();
  }
  registerFarmer(data) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl+'service/register_farmer',data ,options).map(res => res.json())
       .toPromise();
  }
}