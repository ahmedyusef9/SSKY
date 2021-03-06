import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../../model/order';
import { DB } from '../../database/db';
import { DS } from '../../datasource/ds';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatPaginator, MatDialog, MatPaginatorIntl, MatSnackBar } from '@angular/material';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../delete/delete.component';
import { CompleteComponent } from '../complete/complete.component';
import { DeclineComponent } from '../decline/decline.component';
import { CancelComponent } from '../cancel/cancel.component';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { ExcelService } from '../../excel.service';
import * as moment from 'moment/moment';
import { AuthenticationService } from '../../login/authentication.service';
import {merge} from 'rxjs/observable/merge';
import { startWith, map,debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { map } from 'rxjs-compat/operator/map';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:Order[]=null;
  loading:Boolean=false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  total_pages=0;
  current_total=0;
  pageIndex=0;
  init_data(data){
    this.loading = false;
    this.isRateLimitReached = false;
    this.resultsLength = data.total_count;
    this.total_pages=data.total_pages;
    this.current_total=data.items.length;
    this.orders=data.items;
    this.db = new DB(data.items);
    this.paginator.pageIndex=0;
    this.ds = new DS(this.db, this.sort, this.paginator);
  }
  prev(){
    if(this.pageIndex>1){
      this.pageIndex=this.pageIndex-1;
      let active=this.sort.active?this.sort.active:'id';
      let direction=this.sort.direction?this.sort.direction:'asc';
      let search=this.filter.nativeElement.value;
      this.loading = true;
      this.orderService!.get(active, direction, this.pageIndex,search).subscribe(data => {this.init_data(data);});
    }
  }
  next(){
    if(this.pageIndex<this.total_pages){
      this.pageIndex=this.pageIndex+1;
      let active=this.sort.active?this.sort.active:'id';
      let direction=this.sort.direction?this.sort.direction:'asc';
      let search=this.filter.nativeElement.value;
      this.loading = true;
      this.orderService!.get(active, direction, this.pageIndex,search).subscribe(data => {this.init_data(data);});
    }
  }
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') fileInput;
  lan:any;
  constructor(
    private orderService:OrderService,
    public dialog: MatDialog,
    private mdPaginatorIntl:MatPaginatorIntl,
    private trans:TranslateService,
    public snackBar: MatSnackBar,
    private lsService:LocalStorageService,
    // private excelService:ExcelService,
    public authService:AuthenticationService
  ) {
    this.lan=this.lsService.getStorage('lan');
    this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lan=event.lang;
    });
    localStorage.setItem('currentComponent','app-order');
   }
   transStatus(status){
     switch(status){
       case 'new':
        return 'חדש';
        case 'declined':
        return 'נדחה';
        case 'cancel':
        return 'מובטל';
        case 'completed':
        return 'פעיל';
        case 'disconnected':
        return 'מנותק';
        case 'finished':
        return 'פג תוקף';
     }
   }
   getProductName(product){
    let c=product.product_name;
    if(this.lan=='he') return c;
    if(this.lan=='ar'){
     if(product.product_name_ar!=''){
       c=product.product_name_ar;
     }
    }
    else{
     if(product.product_name_en!=''){
       c=product.product_name_en;
     }
    }
    return c;
  }
  getCompanyName(company){
    let c=company.company_name;
    if(this.lan=='he') return c;
    if(this.lan=='ar'){
     if(company.company_name_ar!=''){
       c=company.company_name_ar;
     }
    }
    else{
     if(company.company_name_en!=''){
       c=company.company_name_en;
     }
    }
    return c;
  }
  getPhone(el){
    if(el.moved_to_phone && el.moved_to_phone!=0) return el.moved_to_phone; return el.phone;
   }
   generateURL():String{
        
    let active=this.sort.active?this.sort.active:'id';
    let direction=this.sort.direction?this.sort.direction:'asc';
    // this.pageIndex=this.pageIndex+1
    let search=this.filter.nativeElement.value;
    return this.orderService.getUrl(active, direction, this.pageIndex,search);

   }
   loadExcel(value:boolean){
    let url = this.generateURL();
    // console.log(url);
    this.loading = true;
    if(value==true){
      this.orderService.getExcel(url+'&limit=30').subscribe(res=>{
        window.open(res['url']);
        this.loading=false;
      });
    }else{
      // this.url = '';
      this.orderService.getExcel(url).subscribe(res=>{
        window.open(res['url']);
        this.loading=false;
      });
    }
   }
   
  ngOnInit() {
    // this.sort.sortChange.subscribe(() =>{ this.paginator.pageIndex = 0;
    //   this.pageIndex=0;
    // });
    // Observable.fromEvent(this.filter.nativeElement,'keyup').subscribe(() =>{ this.paginator.pageIndex = 0;
    //   this.pageIndex=0;
    // });
    merge(this.sort.sortChange,Observable.fromEvent(this.filter.nativeElement,'keyup')).subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page,Observable.fromEvent(this.filter.nativeElement,'keyup')).pipe(
          startWith({})
          ,debounceTime(150)
          ,distinctUntilChanged()
          ,switchMap(() => {
            let active=this.sort.active?this.sort.active:'id';
            let direction=this.sort.direction?this.sort.direction:'asc';
            this.pageIndex=this.pageIndex+1
            let search=this.filter.nativeElement.value;
            this.loading = true;
            return this.orderService!.get(active, direction, this.pageIndex,search);
          }),
          map(data => {this.init_data(data);})
      ).subscribe(data =>  {
      });
    this.newOrder();
    //this.loadOrders();
  }
  newOrder(){
    let o:Order=new Order();
    o.member_id=12;
    o.agent_id=3;
    o.status=0;
    o.product_id=12;
  }
  loadOrders(){
    this.orderService.get('id','desc',1,'').subscribe(res => {
        if(res && !res['message']){
          this.orders=res.items; 
          if(this.authService.isAgent()){
            this.orders=this.orders.filter(el=>(el.agent_id==0||el.agent_id==this.authService.getCurrentUserId()));
          }
          this.initOrderDatabase();
        }
     }); 
  }
  allow_release(order){
    if( String(order.status)=='cancel' && this.orders.filter(el=>el.phone_id==order.phone_id).length==1){
     return true;
    }
    return false;
  }
  releaseMember(order){
    this.orderService.release_member(order).subscribe(res=>{
      this.ngOnInit();
    });
  }
  add(){
    let dialogRef=this.dialog.open(AddComponent,{
      width:'310px',
      data:{order:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  complete(order:Order){
    let dialogRef=this.dialog.open(CompleteComponent,{
      width:'310px',
      data:{id:order.id,order:order,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  decline(order:Order){
    let dialogRef=this.dialog.open(DeclineComponent,{
      width:'310px',
      data:{id:order.id,order:order,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      
    });
  }
  cancel(order:Order){
    let dialogRef=this.dialog.open(CancelComponent,{
      width:'310px',
      data:{id:order.id,order:order,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      
    });
  }
  displayedColumns=['last_update_sec','phone','agent_name','product_name','company_name','status','id','automatic_update'];
  db = new DB([]);
  ds: DS | null;
  initOrderDatabase(){
    this.db = new DB(this.orders);
    this.ds = new DS(this.db, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.ds) { return; }
      this.ds.filter = this.filter.nativeElement.value;
    });
  }
  setAutomaticUpdate(row,e){
    let mes='הזמנה זו תתחדש חודשי!! למשך '+11+' חודשים..';
    if(!e.checked){
      mes='ביטול חידוש חודשי להזמנה';
      row.months=false;
      row.automatic_update='0';
    }
    else{
      row.automatic_update='1';
      row.months='11';
    }
    this.snackBar.open(mes, row.phone , {
      duration: 5000,
    });
    this.orderService.set_automatic_update(row.id,row.months).subscribe();
  }
  setAutomaticUpdate1(row,e){
    // console.log("automatic update");
    
    let mes='הזמנה זו תתחדש חודשי!! למשך '+row.months+' חודשים..';
    if(parseInt(row.months) > 11)
      mes='הזמנה זו תחדש חודשי ללא הגבלה!!';
    this.snackBar.open(mes, row.phone , {
      duration: 5000,
    });
    this.orderService.set_automatic_update(row.id,row.months).subscribe();
  }
}
