import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { SimService } from '../sim.service';
import { CompanyService } from 'src/app/company/company.service';
import { UsersService } from 'src/app/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { MatSnackBar, MatDialog, MatPaginatorIntl, MatSort, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ValidationService } from 'src/app/validation.service';
import { Sim } from 'src/app/model/sim';
import { Company } from 'src/app/model/company';
import 'rxjs/add/observable/fromEvent';
import { AddSimComponent } from '../add-sim/add-sim.component';
import { EditSimComponent } from '../edit-sim/edit-sim.component';
import { MsgComponent } from 'src/app/msg/msg.component';
import { YnPipe } from 'src/app/pipes/yn.pipe';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  excelSims:any[]=null;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  total_pages=0;
  current_total=0;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') fileInput;
  lan:any;
  constructor(private simService:SimService,
              private companyService:CompanyService,
              private usersService:UsersService,
              private validationService:ValidationService,
              private formBuilder:FormBuilder,
              public dialog: MatDialog,
              private mdPaginatorIntl:MatPaginatorIntl,
              private trans:TranslateService,
              private lsService:LocalStorageService,
              public authService:AuthenticationService,
              public snackBar: MatSnackBar) {

                this.lan=this.lsService.getStorage('lan');
                this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
                  this.lan=event.lang;
                });
                localStorage.setItem('currentComponent','app-sim');
              }
  
  loadExcel(all=true){
    this.isLoadingResults=true;
    this.simService.getExcel(this.filter.nativeElement.value,!all?this.ids:[]).subscribe(res=>{
      window.open(res['url']);
      this.isLoadingResults=false;
    });
  }
  sims:Sim[];
  companies:Company[];
  item:Sim;
  simForm:FormGroup;
  formOnInit(sim:any){
    let fb:any={
      'sim':sim.sim?[sim.sim, Validators.required]:['', Validators.required],
      'note':sim.note?[sim.note]:[''],
      'agent_id':sim.agent_id?[sim.agent_id, Validators.required]:[null, Validators.required],
      'company_id':sim.company_id?[sim.company_id, Validators.required]:[null, Validators.required]
    };
    if(this.excelSims!=null){
      fb.sim=['1', Validators.required];
    }
    this.simForm = this.formBuilder.group(fb);
  }
  private setSimForm(row:any=0) { 
     if(row && row.id>0){
             this.formOnInit(row);  
     }
     else{
      this.formOnInit({});
     }
   }
  public restSimForm(){
    this.item = {
      id: null,
      sim: '',
      note:'',
      created_at: '',
      created_at_sec: '',
      last_update: '',
      last_update_sec: '',
      agent_id: 0,
      agent_name:'',
      used:false,
      company_id:null,
      company_name:'',
      company_name_ar:'',
      company_name_en:''
    };
    this.formOnInit(this.item );
  }
  clear(){
    //this.msgs = [];
  }
  
  delete(id:number){
    let dialogRef=this.dialog.open(DeleteDialog,{
      width:'310px',
      data:{ id: id,sim:this.sims.filter(sim=> sim.id==id)[0].sim,data:this }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  loadCompanies(){
    this.companyService.getCompanys().subscribe(res=>{
        if(!res['message']){
          this.companies=res;
        }
    });
  }
  ids:any=[];
  ngOnInit() {
    merge(this.sort.sortChange,Observable.fromEvent(this.filter.nativeElement,'keyup')).subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page,Observable.fromEvent(this.filter.nativeElement,'keyup')).pipe(
        startWith({})
        ,switchMap(() => {
          this.isLoadingResults = true;
          let active=this.sort.active?this.sort.active:'id';
          let direction=this.sort.direction?this.sort.direction:'asc';
          let search=this.filter.nativeElement.value;
          return this.simService!.get(active, direction, this.paginator.pageIndex +1,search);
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
        this.ids=[];
        this.dataSource 
        for(let i=0;i<data.length;i++){
          this.ids.push(data[i].id);
          data[i].company_name=this.getCompanyName(data[i].company_id); 
          data[i].company_name_ar=this.getCompanyNameAr(data[i].company_id);
          data[i].company_name_en=this.getCompanyNameEn(data[i].company_id);
        }
        this.dataSource = data;
      });
    this.loadCompanies();
    this.setSimForm();
    
  }
  
  getCompanyName(id:number){
    if(id==0 || !this.companies){
      return '';
    }
    return this.companies.filter(
      company => company.id === id)[0].name;
  }
  getCompanyNameAr(id:number){
    if(id==0 || !this.companies){
      return '';
    }
    return this.companies.filter(
      company => company.id === id)[0].name_ar;
  }
  getCompanyNameEn(id:number){
    if(id==0 || !this.companies){
      return '';
    }
    return this.companies.filter(
      company => company.id === id)[0].name_en;
  }
  getTheCompany(row){
    let c=row.company_name;
    if(this.lan!='he'){
      if(this.lan=='ar'){
        if(row.company_name_ar!=''){
          c=row.company_name_ar;
        }
      }
      else{
        if(row.company_name_en!=''){
          c=row.company_name_en;
        }
      }
    }
    return c;
  }
  public loadSims(){
    this.simService.get('id','ASC',1,'').subscribe(res=>{
      this.isLoadingResults=false;
      if(!res['message']){
        this.sims = res.items.reverse();
        this.ngOnInit();
      }
    });
  }
  openAddDialog(): void {
    let dialogRef=this.dialog.open(AddSimComponent, {
      width:'310px',
      data:{sim:this}
    });
    dialogRef.afterClosed().subscribe();
  }
  edit(row:Sim){
    this.setSimForm(row);
    let dialogRef = this.dialog.open(EditSimComponent, {
      width: '310px',
      data: { sim:this,item:row,simForm:this.simForm}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  upload() {
    this.isLoadingResults=true;
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.simService.addExcel(fileBrowser.files[0]).subscribe(
        res=>{
          if(res['_body'] ){
            let r=JSON.parse(res['_body']);
            this.excelSims=r.data;
            this.isLoadingResults=false; 
            this.formOnInit({});
            this.openAddDialog();
          }
      });
    }
  }
  displayedColumns = [ 'sim','agent_id','company_id','used','id'];
  dataSource: any[]=[];
  
}
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  providers: [YnPipe],
})
export class DeleteDialog {
  lan:any;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private simService:SimService,
    public snackBar: MatSnackBar,private trans:TranslateService,
    private lsService:LocalStorageService,
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
    this.data.isLoadingResults=true;
    this.simService.delete(id).subscribe(res=>{
      
      this.snackBar.openFromComponent(MsgComponent,{
        duration: 3000,
        horizontalPosition:'right',
        data:{title:todelete,detail:this.data.sim,art:'delete',place:'sim'}
      });
      this.data.isLoadingResults=false;
    });
  }
}