var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from './config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
var apiUrl = SERVER_URL;
var CommonService = /** @class */ (function () {
    function CommonService(http) {
        this.http = http;
    }
    CommonService.prototype.getCrops = function () {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'service/crops', options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getFarmerCrops = function (id) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'service/farmer_crops?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getFarmers = function (id) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'service/farmers?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.delete = function (data) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.put(apiUrl + 'service/delete', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getOrders = function (id) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'service/orders?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getOrderById = function (id) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'service/order_by_id?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.login = function (data) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.put(apiUrl + 'service/login', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.postOrder = function (data) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.put(apiUrl + 'service/createorder', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.postCrop = function (data) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.put(apiUrl + 'service/createcrop', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.registerFarmer = function (data) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.put(apiUrl + 'service/register_farmer', data, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService.prototype.getFarmerOrders = function (id) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'service/farmer_orders?id=' + id, options).map(function (res) { return res.json(); })
            .toPromise();
    };
    CommonService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], CommonService);
    return CommonService;
}());
export { CommonService };
//# sourceMappingURL=commonService.js.map