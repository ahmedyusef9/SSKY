import { Injectable } from '@angular/core';
import { Http, RequestOptions ,Headers} from '@angular/http';
import * as AppConst from './app.const';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  http: Http;
  headers: Headers ;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  constructor(private _http:Http,private tokenService: Angular2TokenService) { 
    this.http = _http;
  }
  getOptions(){
    let authToken = '';
    let ls ='';
    let headers = new Headers();
    ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    authToken=jls.token;
    
    // authToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1NTM0MTc3NzgsImp0aSI6Ims5XC9aRVpTalI0SnhjVkxkWktCZTA1VnE5T21hd2VWVkkzMzRMQzNOQ0NBPSIsImlzcyI6Imh0dHA6XC9cL2h0dHA6XC9cL3d3dy5za3lwYW5lbC5uZXRcL2FwaVwvIiwibmJmIjoxNTUzNDE4Nzc4LCJleHAiOjE1NTM0MjU5NzgsImRhdGEiOnsiaWQiOjEsIm5hbWUiOiJIb3N0IEdhdGUiLCJ1c2VybmFtZSI6Imhvc3RnYXRlIiwiYWN0aXZlIjoiMSIsIlJFTU9URV9BRERSIjoiMTAuMjAwLjEyOC4yIiwibGV2ZWxfaWQiOjEsInRpbWUiOiIyMDE5LTAzLTI0IDEwOjU2OjE4IiwicmVudCI6IjAiLCJjaGFuZ2VfcHJpY2UiOiIwIiwiYmxvY2tfbXlfbWVtYmVycyI6IjAiLCJpc19kZWZhdWx0IjoiMCIsImFsbG93X2FjY291bnRfZXhjZXB0aW9uIjoiMCIsInJlY2VpdmluZ19tZXNzYWdlcyI6IjEifX0.xKPJeT_aDz3ahlfjMEaw9py-5smilT4csvvIcis7vAZQra4T1E4LbnuyTLJayOUOMgjCQfsHZ1d-9qexmyDDag";
    headers.append('Authorization',`Bearer ${authToken}`)
  
   return  new RequestOptions({headers:headers});
  }
  getCountNewOrders() :Observable<any>{
    return this.http.get(this.apiRoot+'notification/get_count_new_orders.php', this.getOptions()).map(x=>x.json());
  }
  getNewOrders() :Observable<Array<any>>{
    return this.http.get(this.apiRoot+'notification/get_new_orders.php', this.getOptions()).map(x=>x.json());
  }
  getCountCancelOrders() :Observable<any>{
    return this.http.get(this.apiRoot+'notification/get_count_cancel_orders.php', this.getOptions()).map(x=>x.json());
  }
  getCancelOrders() :Observable<Array<any>>{
    return this.http.get(this.apiRoot+'notification/get_cancel_orders.php', this.getOptions()).map(x=>x.json());
  }
  getCountTransPhones():Observable<any>{
    return this.http.get(this.apiRoot+'notification/get_count_trans_phones.php', this.getOptions()).map(x=>x.json());
  }
  getTransPhones():Observable<Array<any>>{
    return this.http.get(this.apiRoot+'notification/get_trans_phones.php', this.getOptions()).map(x=>x.json());
  }
}
