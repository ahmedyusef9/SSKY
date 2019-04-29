import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DB } from 'src/app/database/db';
import { DS } from 'src/app/datasource/ds';
import { Observable, merge } from 'rxjs';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { MatSort, MatPaginator } from '@angular/material';
import { AgentService } from '../agent.service';
import { MemberService } from 'src/app/member/member.service';
@Component({
  selector: 'app-agent-members',
  templateUrl: './agent-members.component.html',
  styleUrls: ['./agent-members.component.scss']
})
export class AgentMembersComponent implements OnInit {
  @Input() agent:any;
  lan:any;
  public members:any[]=[];
  ordersCount:Observable<any> ;
  @ViewChild('filter1') filter1:ElementRef;
  @ViewChild(MatSort) sort1:MatSort;
  @ViewChild('paginator1') paginator1:MatPaginator;
  displayedColumns=[ 'id','consumer_name','phone','has_orders','status','order_id'];
  db=new DB([]);
  ds:DS|null;
  initMembersDatabase(){
    this.db = new DB(this.members);
    this.ds = new DS(this.db, this.sort1, this.paginator1);
    Observable.fromEvent(this.filter1.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(()=>{
      // console.log(this.filter1);

      if (!this.ds){
        return;}
      this.ds.filter=this.filter1.nativeElement.value;
    });
  }
  constructor(private trans:TranslateService,
    private lsService:LocalStorageService,
    public authService:AuthenticationService,
    private memberService:MemberService,
    // private excelService:ExcelService
    ){
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent)=>{
      this.lan=event.lang;
    });
    localStorage.setItem('currentComponent','app-agent-members');
  }
  ngOnInit(){
    merge(this.sort1.sortChange, this.paginator1.page,Observable.fromEvent(this.filter1.nativeElement,'keyup')).pipe(
      
    ).subscribe(v =>{
      console.log(v);
    })
    if(this.agent && this.agent.members && this.agent.members.length>0){
      console.log(this.agent);
      this.agent.members.forEach(el=>{
        
      if(el.has_orders){
        el.orders.forEach(ord => {
          // console.log(el);
        let member:any={
          'id':ord.member_id,
          'consumer_name':ord.agent_name,
          'accepted_moved_to_phone':el.accepted_moved_to_phone,
          'phone_id':el.phone_id,
          'company_id':el.company_id,
          'product_id':'',
          'phone':el.phone,
          'moved_to_phone':el.moved_to_phone,
          'has_orders':(el.orders && el.orders.length>0)?true:false,
          'company_name':'',
          'product_name':'',
          'product_name_ar':'',
          'status':'',
          'completed_date_sec':'',
          'completed_date':'',
          'order_id':'',
        };
        
            member.company_name=ord.company_name;
            member.company_id=ord.company_id;
            member.company_name_ar=ord.company_name_ar;
            member.product_id=ord.product_id;
            member.company_name_en=ord.company_name_en;
            member.product_name=ord.product_name;
            member.product_name_ar=ord.product_name_ar;
            member.product_name_en=ord.product_name_en;
            member.status=ord.status;
            member.completed_date_sec=ord.completed_date_sec;
            member.completed_date=ord.completed_date;
            member.order_id=ord.id;

            this.members.push(member);
          });
          
        }
       
      });
      // console.log(this.members);
      this.initMembersDatabase();
     
    }
    
     this.ordersCount = this.memberService.getCountOfAgentOrder(this.agent.id).map(el =>{
       console.log(el);
      //  this.ordersCount =el;
      return el['_body'];
    });

  }
  
  getCompanyName(row){
    if(this.lan=='he') {
      return row.company_name;
    }
    else if(this.lan=='ar'){
      if(row.company_name_ar!=''){
        return row.company_name_ar;
      }
    }
    else{
      if(row.company_name_en!=''){
        return row.company_name_en;
      }
    }
    return row.company_name;
  }
  getProductName(row){
    if(this.lan=='he') {
      return row.product_name;
    }
    else if(this.lan=='ar'){
      if(row.product_name_ar!=''){
        return row.product_name_ar;
      }
    }
    else{
      if(row.product_name_en!=''){
        return row.product_name_en;
      }
    }
    return row.product_name;
  }
  transStatus(el){
    switch(el.status){
      case 'new':
       return 'חדש';
       case 'declined':
       return 'נדחה';
       case 'cancel':
       return 'מובטל';
       case 'completed':
       return 'פעיל'+ '  עד'+ ' '+ el.completed_date;
       case 'disconnected':
       return 'מנותק';
       case 'finished':
       return 'פג תוקף';
    }
  }
  loadExcel(){
    // let excel:any=[];
    // this.ds.getFSData().forEach(el=>{
    //   let a:any={
    //     'לקוח':el.consumer_name,
    //     'טלפון':el.phone,
    //     'חבילה':el.product_name,
    //     'סטטוס':this.transStatus(el),
    //     'מספר הזמנה':!el.has_orders?'עדיין אין הזמנות':el.id
    //   }
    //   excel.push(a);
    // });
    // this.excelService.exportAsExcelFile(excel, 'מנויים -'+ this.agent.username);

  }
}
