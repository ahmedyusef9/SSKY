import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import * as AppConst from './../../app.const'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lan:any;
  show_accounts=false;
  constructor(
    private router:Router,
    private trans:TranslateService, 
    private lsService:LocalStorageService,
    public authService:AuthenticationService) {
    this.lan=this.lsService.getStorage('lan');
    this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lan=event.lang;
    });
    localStorage.setItem('currentComponent','app-home');
   }
  @Input() loading:boolean=false;
  isSearchActive:boolean=false;
  hasPhone:boolean=true;//set in member-search
  phone:any=null;//set in member-search
  phones:any[]=null;//set in member-search
  hasMember:boolean=true;//set in member-search
  member:any=null;//set in member-search
  customers:any[]=null;
  agents:any[]=null;
  hasOrders:boolean=true;//set in member-search
  orders:any[];//set in member-search
  ngOnInit() {}
  phoneLink(){
    if(this.authService.isAgent()){
      return '/הזמנה-חדשה';
    }
    return '/מספר';
  }
  getPath(name,params=[]){ 
    let path= '/'+AppConst.Routes[name].path;
    params.forEach(el=>{
      path +='/'+el;
    });
    return path;
  }
  getIcon(name){return AppConst.Routes[name].icon;}
}
