import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { PhoneService } from 'src/app/phone/phone.service';
import { MemberService } from 'src/app/member/member.service';
import { ConsumerService } from 'src/app/consumer/consumer.service';
import { UsersService } from 'src/app/users/users.service';
import { OrderService } from 'src/app/order/order.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss']
})
export class MemberSearchComponent implements OnInit {
  @Input() loading:boolean=false;
  lan:any;
  constructor(private home:HomeComponent,
              private phoneService:PhoneService,
              private memberService:MemberService,
              private consumerService:ConsumerService,
              private usersService:UsersService,
              private orderService:OrderService,
              private trans:TranslateService, 
              private lsService:LocalStorageService,
              public authService:AuthenticationService) { 
                this.lan=this.lsService.getStorage('lan');
                this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
                  this.lan=event.lang;
                });
                localStorage.setItem('currentComponent','app-member-search');
              }
  search_number:string='';
  ngOnInit() {
  }
  
  fullNumber:boolean=false;
  setStatus(event){
    this.home.customers=null;
    this.home.phones=null;
    this.home.agents=null;
    if(this.search_number!=''){
      this.home.isSearchActive=false;
      this.fullNumber=false;
        if(!isNaN(parseInt(this.search_number.trim())) && this.search_number.trim().length>6){
          this.fullNumber=true;
          let phone:string=this.search_number;
          this.searchNumber(phone);
          this.home.isSearchActive=true;
        }
        if(this.search_number.trim().length>2){
          let s:string=this.search_number;
          if(s.trim().length>2){
            this.searchCustomers(s);
            this.searchAgents(s);
          }
        }
    
      
    }
    else{
      this.fullNumber=false;
      this.home.isSearchActive=false;
    }
    
  }
  searchCustomers(search){
    this.home.loading=true;
    this.memberService.getSearchFromNote(search).subscribe(res=>{
      this.home.loading=false;
      if(res && !res['message']){
        this.home.customers=res;
       // console.log(res);
      }
    });
   // this.home.customers=[];
  }
  searchAgents(search){
    this.home.loading=true;
    this.usersService.getAgentsSearch(search).subscribe(res=>{
      this.home.loading=false;
      if(res && !res['message']){
        this.home.agents=res;
      }
    });
  }
  searchNumber(phone){
   
    this.home.loading=true;
    this.phoneService.getSearch(phone).subscribe(res=>{
      this.home.loading=false;
      if(res && res[0]){
        
        this.home.phones=res;
        this.home.phones.forEach(el=>{
          this.memberService.getNumbersMembers(el.phone).subscribe(resEl=>{
            if(resEl && resEl[0]){
              el.member=resEl[0];
            }
          });
        });
        this.home.phone=res[0];
        this.home.loading=true;
        this.memberService.getNumbersMembers(this.home.phone.phone).subscribe(res1=>{
          this.home.loading=false;
          if(res1 && res1[0]){
            this.home.member=res1[0];
            this.home.loading=true;
            this.orderService.getMemberOrders(this.home.member.id).subscribe(res2=>{
              this.home.loading=false;
              if(res2){
                this.home.orders=res2;
              }
              else{
                this.home.orders=null;
              }
            });
          }
          else{
            this.home.member=null;
          }
        })
      }
      else{
        this.home.hasPhone=false;
        this.home.phone=null;
      }
    });
  }
  close(){
    this.search_number='';
    this.fullNumber=false;
    this.home.isSearchActive=false;
  }
}
