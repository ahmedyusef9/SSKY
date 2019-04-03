import { Component, OnInit, ViewChild, ElementRef ,Inject,AfterViewInit, Input} from '@angular/core';
import { PhoneService } from '../phone.service';
import { UsersService } from '../../users/users.service';
import {  MatSort, MatPaginator, MatDialog, MatPaginatorIntl, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { FormControl, Validators, FormBuilder, FormGroup, NgModel, ValidationErrors } from "@angular/forms";
import { ValidationService } from '../../validation.service';
//import { ProductService } from '../../product/product.service';
import { CompanyService } from '../../company/company.service';
import { Phone } from '../../model/phone';
import { Product } from '../../model/product';
import { Company } from '../../model/company';
import * as AppConst from '../../app.const';
import { YnPipe } from '../../pipes/yn.pipe';
import { AddPhoneComponent } from '../add-phone/add-phone.component';
import { EditPhoneComponent } from '../edit-phone/edit-phone.component';
import { DS } from '../../datasource/ds';
import { DB } from '../../database/db';
import { LocalStorageService } from '../../local-storage.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../excel.service';
import { AuthenticationService } from '../../login/authentication.service';
import { ProductService } from '../../product/product.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';
@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [ValidationService],
})
export class PhoneComponent implements OnInit {
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
    this.phonesDatabase = new DB(data.items);
    this.paginator.pageIndex=0;
    this.dataSource = new DS(this.phonesDatabase, this.sort, this.paginator);
  }
  prev(){
    if(this.pageIndex>1){
      this.pageIndex=this.pageIndex-1;
      let active=this.sort.active?this.sort.active:'id';
      let direction=this.sort.direction?this.sort.direction:'asc';
      let search=this.filter.nativeElement.value;
      this.loading = true;
      this.phoneService!.get(active, direction, this.pageIndex,search).subscribe(data => {this.init_data(data);});
    }
  }
  next(){
    if(this.pageIndex<this.total_pages){
      this.pageIndex=this.pageIndex+1;
      let active=this.sort.active?this.sort.active:'id';
      let direction=this.sort.direction?this.sort.direction:'asc';
      let search=this.filter.nativeElement.value;
      this.loading = true;
      this.phoneService!.get(active, direction, this.pageIndex,search).subscribe(data => {this.init_data(data);});
    }
  }
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput1') fileInput1; 
  lan:any;
  constructor(
      private phoneService:PhoneService,
      private usersService:UsersService,
      public  dialog: MatDialog,
      private companyService:CompanyService,
      private validationService:ValidationService,
      private formBuilder:FormBuilder,
      private mdPaginatorIntl:MatPaginatorIntl, private trans:TranslateService,
      private lsService:LocalStorageService,public snackBar: MatSnackBar,
      // private excelService:ExcelService,
      public authService:AuthenticationService,
      private productService:ProductService) {
        this.lan=this.lsService.getStorage('lan');
        this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
          this.lan=event.lang;
        });
        localStorage.setItem('currentComponent','app-phone');
       }
       getPhone(el){
        if(el.moved_to_phone && el.moved_to_phone!=0) return el.moved_to_phone; return el.phone;
       }
      loadExcel(){
        let excel:any=[];
        this.dataSource.getFSData().forEach(el=>{
          let a:any={
            'id':el.id,
            'טלפון':this.getPhone(el),
            'תאריך יצירה':el.created_at,
            'מנויד ל' :el.moved_to_phone==='0'?'':el.moved_to_phone,
            'ניוד פעיל':el.moved_to_phone==='0'?'':el.accepted_moved_to_phone==='1'?'כן':'לא',
            'בשימוש':  el.used==='1'?'כן':'לא',     
            'סוכן':el.agent_name,
            'חברה':el.company_name,
            'חבילה':el.product_name,
            'אינטרנט':el.internet==0?'':el.internet,
            'עדכון אינטרנט':el.internet==0?'':el.internet_update,

          }
          excel.push(a);
        });
        // this.excelService.exportAsExcelFile(excel, 'מספרי טלפון');
      }
      loadExcel2(){
        this.loading=true;
       this.phoneService.getExcel(this.filter.nativeElement.value).subscribe(res=>{
          this.loading=false;
          let excel:any=[];
          res.items.forEach(el=>{
          let a:any={
            'id':el.id,
            'טלפון':this.getPhone(el),
            'תאריך יצירה':el.created_at,
            'מנויד ל' :el.moved_to_phone==='0'?'':el.moved_to_phone,
            'ניוד פעיל':el.moved_to_phone==='0'?'':el.accepted_moved_to_phone==='1'?'כן':'לא',
            'בשימוש':  el.used==='1'?'כן':'לא',      
            'סוכן':el.agent_name,
            'חברה':el.company_name,
            'חבילה':el.product_name,
            'אינטרנט':el.internet==0?'':el.internet,
            'עדכון אינטרנט':el.internet==0?'':el.internet_update,
          }
          excel.push(a);
        });
        // this.excelService.exportAsExcelFile(excel, 'מספרי טלפון');
       })
      }
  phones:any[];
  excelPhones:any[]=null;
  loading:Boolean=false;
  companies:Company[];
  products:any[];
  item:Phone;
  phoneForm:FormGroup;
  formOnInit(phone:any){
    let fb:any={
      'phone':phone.phone?[phone.phone, Validators.required]:['', Validators.required],
      'note':phone.note?[phone.note, Validators.required]:[''],
      'agent_id':phone.agent_id?[phone.agent_id, Validators.required]:[0, Validators.required],
      'company_id':phone.company_id?[phone.company_id, Validators.required]:[0, Validators.required],
      'product_id':phone.product_id?[phone.product_id, Validators.required]:[0, Validators.required],
    };
    if(this.excelPhones!=null){
      fb.phone=['1', Validators.required];
    }
    this.phoneForm = this.formBuilder.group(fb);
  }
  private setPhoneForm(row:any=0) { 
    if(row && row.id>0){
            this.formOnInit(row);  
    }
    else{
    this.formOnInit({});
    }
  }
  public restPhoneForm(){
    this.item = {
      id: null,
      phone: '',
      note:'',
      moved_to_phone:'',
      created_at: '',
      created_at_sec: '',
      last_update: '',
      last_update_sec: '',
      agent_id: 0,
      agent_name:'',
      used:false,
      company_id:0,
      company_name:'',
      accepted_moved_to_phone:'0',
      accepted_moved_date:'0',
      accepted_moved_date_num:'0',
      product_name:'',
      product_id:0
    };
    this.formOnInit(this.item );
  }
  clear(){
   // this.msgs = [];
  }
  getCompanyName(id:number){
    if(id==0 || !this.companies){
      return '';
    }
    return this.companies.filter(
      company => company.id === id)[0].name;
  }
  ngOnInit() {
    // this.loading = true;
    merge(this.sort.sortChange,Observable.fromEvent(this.filter.nativeElement,'keyup')).subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page,Observable.fromEvent(this.filter.nativeElement,'keyup')).pipe(
      startWith({})
      ,switchMap(() => {
        this.isLoadingResults = true;
        let active=this.sort.active?this.sort.active:'id';
        let direction=this.sort.direction?this.sort.direction:'asc';
        let search=this.filter.nativeElement.value;
        return this.phoneService!.get(active, direction, this.paginator.pageIndex +1,search);
      }),
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.total_count;
        this.total_pages=data.total_pages;
        this.current_total=data.items.length; 
        return data.items;
      }),
    catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    )
      
    .subscribe(data => {
      // this.ids=[];
      // this.dataSource 
      // for(let i=0;i<data.length;i++){
      //   this.ids.push(data[i].id);
      //   data[i].company_name=this.getCompanyName(data[i].company_id); 
      //   data[i].company_name_ar=this.getCompanyNameAr(data[i].company_id);
      //   data[i].company_name_en=this.getCompanyNameEn(data[i].company_id);
      // }
      console.log(data);
      this.dataSource = data;
    });
    
   
    this.loadCompanies();
    //this.loadPhones();
    this.setPhoneForm();
  }
  delete(id:number){
    let dialogRef=this.dialog.open(DeletePhoneDialog,{
      width:'310px',
      data:{ id: id,phone:this.phones.filter(phone=> phone.id==id)[0].phone,data:this }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  delete2(phone:any){
    let dialogRef=this.dialog.open(DeletePhoneDialog,{
      width:'310px',
      data:{ id: phone.id,phone:phone.phone,data:this,is2:true }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  public loadPhones(){
    this.phoneService.get('id','desc',1,'').subscribe(res=>{
      this.loading=false;
      if(!res['message']){
        this.phones = res.items.reverse();
        if(this.authService.isAgent()){
          this.phones=this.phones.filter(el=>(el.agent_id==0||el.agent_id==this.authService.getCurrentUserId()));
        }
        this.initPhoneDatabase();
      }
    });
  }
  loadProducts(){
    this.productService.getProducts().subscribe(res=>{
      this.products=res;
    });
  }
  loadCompanies(){
    this.companyService.getCompanys().subscribe(res=>{
        if(!res['message']){
          this.companies=res;
          this.loadProducts();
        }
    });
  }
  openAddDialog(): void {
    let dialogRef=this.dialog.open(AddPhoneComponent, {
      width:'310px',
      data:{phone:this}
    });
    dialogRef.afterClosed().subscribe();
  }
  edit(row:Phone){
    this.setPhoneForm(row);
    let dialogRef = this.dialog.open(EditPhoneComponent, {
      width: '310px',
      data: { phone:this,item:row,phoneForm:this.phoneForm}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  upload() {
    this.loading=true;
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.phoneService.addExcel(fileBrowser.files[0]).subscribe(
        res=>{
          if(res['_body'] ){
            let r=JSON.parse(res['_body']);
            this.excelPhones=r.data;
            this.loading=false;
            this.formOnInit({});
            this.openAddDialog();
          }
      });
    }
  }
  upload2() {
    this.loading=true;
    const fileBrowser = this.fileInput1.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.phoneService.addInternet(fileBrowser.files[0]).subscribe(
        res=>{
          this.loading=false;
          this.snackBar.open('קובץ האינטרנט נטען בהצלחה', 'הצלחה', {
            duration: 5000,
          });
          this.ngOnInit();
      });
    }
  }
  displayedColumns = [ 'phone','agent_id','company_id','used','internet','id'];
  phonesDatabase = new DB([]);
  dataSource: DS | null;
  initPhoneDatabase(){
    this.phonesDatabase = new DB(this.phones);
    this.dataSource = new DS(this.phonesDatabase, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeletePhoneDialog {
  lan:any;
  constructor(
    public dialogRef: MatDialogRef<DeletePhoneDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private phoneService:PhoneService,
    public snackBar: MatSnackBar,
    private trans:TranslateService,
    private lsService:LocalStorageService,
    private router:Router,
    private authService:AuthenticationService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id:number,todelete:string){
    this.data.loading=true;
    this.phoneService.delete(id).subscribe(res=>{
      if(this.data.is2){
        this.router.navigate(['/']);
      }
      this.snackBar.open(this.data.phone, todelete, {
        duration: 2000,
      });
      this.data.loading=false;
    });
  }
}