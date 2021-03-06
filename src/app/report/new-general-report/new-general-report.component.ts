import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatSort, MatPaginator } from '@angular/material';
import { OrderService } from '../../order/order.service';
import { ReportService } from '../report.service';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { ExcelService } from '../../excel.service';
import { AuthenticationService } from '../../login/authentication.service';
import { UsersService } from '../../users/users.service';
import { Observable } from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import { isNull } from 'util';
import { DB } from '../../database/db';
import { DS } from '../../datasource/ds';
import { RefreshConnectComponent } from '../refresh-connect/refresh-connect.component';
import { DisconnectMemberComponent } from '../disconnect-member/disconnect-member.component';
import { AddRestComponent } from '../../payment/add-rest/add-rest.component';
import { startWith, map,debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { map } from 'rxjs-compat/operator/map';
@Component({
  selector: 'app-new-general-report',
  templateUrl: './new-general-report.component.html',
  styleUrls: ['./new-general-report.component.scss']
})
export class NewGeneralReportComponent implements OnInit {
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  total_pages=0;
  current_total=0;
  pageIndex=0;
  url:string='';
  agents:any[]=null;
  loading:Boolean=false;
  __trans:Boolean=false;
  //@ViewChild('filter') filter: ElementRef;
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('fileInput') fileInput;
  lan:any;
  displayedColumns = ['valid_from_sec','last_update_sec','phone','agent_name','product_name','status','note','price','price_agent','rest','profit','id'];
  database = new DB([]);
  dataSource: DS | null;
  constructor(
    private orderService:OrderService,
    private reportService:ReportService,
    private trans:TranslateService,
    private lsService:LocalStorageService,
    // private excelService:ExcelService,
    public authService:AuthenticationService,
    private userService:UsersService,
    public dialog: MatDialog) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      localStorage.setItem('currentComponent','app-new-general-report');
    }
    
  ngOnInit() {
    this.loadAgents();
    this.resetPageIndex();
    this.loadData();
  }
  loadPrice(){
      this.filterData.page=this.paginator.pageIndex +1;
      this.filterData.sort_active=this.sort.active?this.sort.active:'last_update_sec';
      this.filterData.sort_direction=this.sort.direction?this.sort.direction:'desc';
      this.loading = true;
      this.loadParams();
      // console.log(this.url);
    this.reportService.getPrices(this.url).pipe(



    ).subscribe(data=>{
      // console.log(data);
    });
  }
  filterData:any={
    begin:null,
    end:null,
    limit:30,
    agent:this.authService.isAgent()?this.authService.getCurrentUserId():0,
    company_id:0,
    status:'',
    search:'',
    sort_active:'last_update_sec',
    sort_direction:'desc',
    page:1
  };
  loadParams(){
    this.url=this.getParamsFromFilterData();
  }
  loadAgents(){
    if(!this.authService.isAgent()){
      this.loading=true;
      this.userService.getAgents().subscribe(res=>{
        this.loading=false;
        this.agents=res;
      });
    }
  }
  resetPageIndex(){
    this.sort.sortChange.subscribe(() =>{ this.paginator.pageIndex = 0;
      this.pageIndex=0;
      this.filterData.page=1;
      this.loadParams();
    });
  }
  initData(data){
    this.loading=false;
    this.isRateLimitReached = false;
    this.resultsLength = data.total_count;
    this.total_pages=data.total_pages;
    this.current_total=data.items.length;
    this.database = new DB(data.items);
    this.paginator.pageIndex=0;
    this.filterData.page=1;
    this.dataSource = new DS(this.database, this.sort, this.paginator);
  }
  loadData(){
    merge(this.sort.sortChange, this.paginator.page).pipe(
    startWith({})
    ,debounceTime(150)
    ,distinctUntilChanged()
    ,switchMap(() => {
     
      this.filterData.page=this.paginator.pageIndex +1;
      this.filterData.sort_active=this.sort.active?this.sort.active:'last_update_sec';
      this.filterData.sort_direction=this.sort.direction?this.sort.direction:'desc';
      this.loading = true;
      this.loadParams();
      // console.log(this.url);
      return this.reportService!.get(this.url);
    })
    ,map(data => {
      // this.loading = false;
      this.loading=false;
      this.isRateLimitReached = false;
      this.resultsLength = data.total_count;
      this.total_pages=data.total_pages;
      this.current_total=data.items.length;
      return data.items;
      // this.initData(data);
    })
    ).subscribe(data =>{
      // console.log(data);
      this.dataSource = data;
    });
  }
  getParamsFromFilterData(){
    let params='?';
    let paramsArray=[];
    if(this.filterData){
        paramsArray.push('limit='+String(this.filterData.limit));
        paramsArray.push('active='+String(this.filterData.sort_active));
        paramsArray.push('direction='+String(this.filterData.sort_direction));
        paramsArray.push('page='+String(this.filterData.page));
        if(this.filterData.begin && !isNull(this.filterData.begin)){
          paramsArray.push('begin='+String(Date.parse(this.filterData.begin)*0.001));
        }
        if(this.filterData.end && !isNull(this.filterData.end)){
          paramsArray.push('end='+String(Date.parse(this.filterData.end)*0.001));
        }
        if(this.filterData.agent && this.filterData.agent>0){
          paramsArray.push('agent='+String(this.filterData.agent));
        }
        if(this.filterData.company_id && this.filterData.company_id>0){
          paramsArray.push('company_id='+String(this.filterData.company_id));
        }
        if(this.filterData.status && this.filterData.status.length>0){
          paramsArray.push('status='+String(this.filterData.status));
        }
        if(this.filterData.search && this.filterData.search.length>0){
          paramsArray.push('search='+String(this.filterData.search));
        }
    }
    return params+paramsArray.join('&');
  }
  go(){
    this.pageIndex=0;
    this.filterData.page=1;
    this.loadParams();
    this.loadData();
  }
  resetFilter(){
    this.pageIndex=0;
    this.filterData={
      begin:null,
      end:null,
      limit:30,
      agent:this.authService.isAgent()?this.authService.getCurrentUserId():0,
      company_id:0,
      status:'',
      search:'',
      sort_active:'last_update_sec',
      sort_direction:'desc',
      page:1
    };
    this.loadParams();
    this.loadData();
  }
  checkTrans(){
    if(this.filterData.status=='trans'){
      this.__trans=true;
    }
  }
  prev(){
    if(this.pageIndex>1){
      this.pageIndex=this.pageIndex-1;
      this.filterData.page=this.pageIndex;
      this.filterData.sort_active=this.sort.active?this.sort.active:'last_update_sec';
      this.filterData.sort_direction=this.sort.direction?this.sort.direction:'desc';
      this.loading = true;
      this.loadParams();
      this.reportService!.get(this.url).subscribe(data => {this.initData(data);});
    }
  }
  next(){
    if(this.pageIndex<this.total_pages){
      this.pageIndex=this.pageIndex+1;
      this.filterData.page=this.pageIndex;
      this.filterData.sort_active=this.sort.active?this.sort.active:'last_update_sec';
      this.filterData.sort_direction=this.sort.direction?this.sort.direction:'desc';
      this.loading = true;
      this.loadParams();
      this.reportService!.get(this.url).subscribe(data => {this.initData(data);});
    }
  }
  refreshConnect(row){
    let dialogRef=this.dialog.open(RefreshConnectComponent,{
      width:'310px', 
      data:{row:row,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  transStatus(status){
    switch(status){
      case 'new':return 'חדש';
      case 'declined':return 'נדחה';
      case 'cancel':return 'מובטל';
      case 'completed':return 'פעיל';
      case 'disconnected':return 'מנותק';
      case 'finished':return 'פג תוקף';
      case '':return 'הכל';
    }
  }
  getPhone(el){
    if(el.moved_to_phone && el.moved_to_phone!=0)return el.moved_to_phone;
    return el.phone;
  }
  loadExcel(value:boolean){
    this.loadParams();
    this.loading=true;

    // console.log(value);
    if(value == true){
      
      this.reportService.getExcel(this.url+'&excelPage=1').subscribe(res=>{
        
        window.open(res['url']);
        this.loading=false;
        
      // this.excelService.exportAsExcelFile(excel, 'דו"ח כללי');
     })
    }else{
      
      this.reportService.getExcel(this.url).subscribe(res=>{
        // console.log(res);
        res['url'].forEach(element => {
          window.open(element);
        });
        this.loading=false;
        // window.open(res['url']);
        
      // this.excelService.exportAsExcelFile(excel, 'דו"ח כללי');
     })

    }
    
  }
  loadExcel2(){
   this.loadParams();
   this.loading=true;
   this.reportService.getExcel(this.url).subscribe(res=>{
      this.loading=false;
      window.open(res['url']);
      
    // this.excelService.exportAsExcelFile(excel, 'דו"ח כללי');
   })
  }
  disconnectMember(row){
    let dialogRef=this.dialog.open(DisconnectMemberComponent,{
      width:'310px', 
      data:{row:row,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  addRest(row){
    let dialogRef=this.dialog.open(AddRestComponent,{
      width:'310px', 
      data:{row:row,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
