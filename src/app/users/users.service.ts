import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import * as AppConst from '../app.const';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Level } from '../model/level';
import { AuthenticationService } from '../login/authentication.service';
import { distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
 http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  getUsers() :Observable<Array<User>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php',this.options).map(x=>x.json());
  }
  getUser(id:number) :Observable<User>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?id='+id,this.options).map(x=>x.json());
  }
  getAdminUser(id:number) :Observable<User>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?admin=1&id='+id,this.options).map(x=>x.json());
  }
  getSearch(search:string) :Observable<Array<User>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?search='+search,this.options).map(x=>x.json());
  }
  getAgentsSearch(search:string) :Observable<Array<User>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?group=agent&search='+search,this.options).pipe(
      distinctUntilChanged(),
      debounceTime(50),
      filter(()=>search.length>2)
    ).map(x=>x.json());
  }
  getUserLevels() :Observable<Array<Level>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get_levels.php',this.options).map(x=>x.json());
  }
  getAdmins() :Observable<Array<User>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?group=admin',this.options).map(x=>x.json());
  }
  getAgents() :Observable<Array<User>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?group=agent',this.options).map(x=>x.json());
  }
  getConsumers() :Observable<Array<User>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'user/get.php?group=consumer',this.options).map(x=>x.json());
  }
  add(user:User) {
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.post(this.apiRoot+'user/add.php', user,this.options);     	    
  }
  update(user:User) {
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.put(this.apiRoot+'user/edit.php', user,this.options);     	    
  }
  updatePass(pass){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.put(this.apiRoot+'user/edit_pass.php', pass,this.options);   
  }
  delete(id:number){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
     return this.http.delete(this.apiRoot+'user/delete.php?id='+id, this.options );  
  }
  constructor(private _http:Http,
    private authenticationService: AuthenticationService) { 
    this.http = _http;
  }
}
