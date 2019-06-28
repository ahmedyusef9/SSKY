import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers} from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { debounceTime ,distinctUntilChanged,filter} from 'rxjs/operators'; 
import { Member } from '../model/member';
import * as AppConst from './../app.const'; 
import { map } from 'rxjs-compat/operator/map';
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  constructor(private _http:Http,private tokenService: Angular2TokenService) { 
    this.http = _http;
  }
  getUrl(order:string,direction:string,page:number,search:string,agent_id=0,status=0):string{

    let url='?order='+order+'&direction='+direction+'&page='+page;
    if(agent_id>0){
      url+='&agent_id='+agent_id;
    }
    if(status){
      url+='&status='+status;
    }
    if(search && search.length>0){
      url+='&search='+search; 
    }
    return url;
  }
  getCountOfAgentOrder(agent_id):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    return this.http.get(this.apiRoot+'member/get1.php?count=all&agent_id='+agent_id, this.options);
   }
  get(order:string,direction:string,page:number,search:string,agent_id=0,status=0){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    let url=this.apiRoot+'member/get_all.php?order='+order+'&direction='+direction+'&page='+page;
    if(agent_id>0){
      url+='&agent_id='+agent_id;
    }
    if(status){
      url+='&status='+status;
    }
    if(search && search.length>0){
      url+='&search='+search; 
    }
    return this.http.get(url, this.options).map(x=>x.json());
  }
  getExcel(search:String){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    let url=this.apiRoot+'member/get_excel1.php'+search;
    console.log(search);
    return this.http.get(url, this.options).map(x=>x.json());
  }
  delete(id:number){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.delete(this.apiRoot+'member/delete.php?id='+id, this.options ); 
  }
  getAgentMembersloaderNew(agent:number,params:any) : Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    // console.log(params);
    let str = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
    return this.http.get(this.apiRoot+'member/get_Members_Orders_View.php?agent_id='+agent+"&"+str, this.options).map(x=>x.json());
  }
  exportAsExcelFile(agent:number,params:any): Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    console.log(params);
    let str = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
    return this.http.get(this.apiRoot+'member/get_Members_Orders_View.php?excel=true&agent_id='+agent+"&"+str, this.options).map(x=>x.json());
  }
  getAgentMembersloader(agent:number,page:number) :Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get1.php?agent_id='+agent+'&page='+page, this.options).map(x=>x.json());
  }
  getAgentHasMembers(agent:number) :Observable<boolean>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get_Members_Orders_View.php?agent_id='+agent+"&check_agent_has_members=true", this.options).map(x=>x.json());
  }
  getAgentMembers(agent:number) :Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get1.php?agent_id='+agent+'&page=1', this.options).map(x=>x.json());
  }
  getNumbersMembers(number_search:string) :Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get.php?number_search='+number_search,this.options).pipe(
      distinctUntilChanged(),
      debounceTime(50),
      filter(()=>number_search.length>5)
    ).map(x=>x.json());
  }
  getSearchFromNote(note:string) :Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/getSearchFromNote.php?note='+note,this.options).pipe(
      debounceTime(50),
      distinctUntilChanged(),
      filter(()=>note.length>3)
    ).map(x=>x.json());
  }
  getMembers() :Observable<Array<Member>>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get.php', this.options).map(x=>x.json());
  }
  getMember(id:number) :Observable<Member>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get.php?id='+id, this.options).map(x=>x.json());
  }
  getPhoneMember(phone_id:number) :Observable<Member>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get.php?phone_id='+phone_id, this.options).map(x=>x.json());
  }
  getMemberOrders(id:number){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.get(this.apiRoot+'member/get_orders.php?id='+id, this.options).map(x=>x.json());
  }
  add(members:Member[]) {
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.post(this.apiRoot+'member/add.php',members,this.options);     	    
  }
  blockMember(member){
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
    this.tokenService.init();
    return this.http.put(this.apiRoot+'member/block.php',member,this.options);     
  }
}
