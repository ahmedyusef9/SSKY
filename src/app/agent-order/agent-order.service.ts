import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { AuthenticationService } from '../login/authentication.service';
import { Observable } from 'rxjs';

import * as AppConst from '../app.const';
@Injectable({
  providedIn: 'root'
})
export class AgentOrderService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  constructor(
    private _http:Http,
    private authenticationService: AuthenticationService
  ) { 
      this.http = _http;
}
getPhone(phone_id:number) :Observable<any>{
  let headers = new Headers({'Content-Type': 'application/json'});  
  let ls = localStorage.getItem('currentUser');
  let jls=JSON.parse(ls);
  let authToken=jls.token;
  headers.append('Authorization',`Bearer ${authToken}`)
  this.options = new RequestOptions({headers: headers});
  return this.http.get(this.apiRoot+'agent_order/get.php?phone_id='+phone_id,this.options).map(x=>x.json());
}
}
