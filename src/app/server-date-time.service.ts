import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import * as AppConst from './app.const';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServerDateTimeService {
  http: Http;
  headers: HttpHeaders = AppConst.httpOptions.headers;
  // options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  constructor(private _http:Http,private tokenService: Angular2TokenService) { 
    this.http = _http;
    // let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    if(jls && jls.token){
      let authToken=jls.token;
      this.headers.append('Authorization',`Bearer ${authToken}`);
    }
    else{
      this.headers.append('Authorization',`Bearer`);
    }
    // this.options = this.headers;
    this.tokenService.init();
  
  }
}
