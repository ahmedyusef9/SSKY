import { Component, OnInit, ViewContainerRef, Inject, ViewChild, ElementRef  } from '@angular/core';
import { User} from "../../model/user";
import { Consumer} from "../../model/consumer";
import { ConsumerService } from "../consumer.service";
import { FormControl, Validators, NgModel, FormGroup,FormBuilder} from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
import { ValidationService } from "../../validation.service";
import { Router } from '@angular/router';
import { YnPipe } from '../../pipes/yn.pipe';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DB } from '../../database/db';
import { DS } from '../../datasource/ds';
import { MyClassIntl } from '../../my-class-intl';
import { LangChangeEvent, TranslateService } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { ExcelService } from '../../excel.service';
import { AuthenticationService } from '../../login/authentication.service';
export { MatPaginatorIntl as ɵx } from '@angular/material';
@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss'],
  providers: [ValidationService]
})
export class ConsumerComponent implements OnInit {
  consumers:Consumer[];
  public loading:Boolean=true;
  public dt:ServerDateTime[];
  item: Consumer;
  name: string;
  private sTimeout;
  editRowId:number=0;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') fileInput;
 // msgs: Message[] = [];
  toggleEdit(id){
    this.editRowId = id;
  }
  searchForm: FormGroup;
  private setForm() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }
  timeout() { 
    setTimeout(() => {
      this.timeout();
    }, 1000);
  }
   timeoutMSG() { 
    setTimeout(() => {
      this.clear();
    }, 7000);
  } 
  lan:any;
  constructor(private consumerService:ConsumerService,
              private formBuilder: FormBuilder,
              private validationService:ValidationService,
              private router:Router,
              public dialog: MatDialog,
              private mdPaginatorIntl:MatPaginatorIntl,
              private trans:TranslateService, 
              private lsService:LocalStorageService,
            // private excelService:ExcelService,
            public authService:AuthenticationService) { 
                this.lan=this.lsService.getStorage('lan');
                this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
                  this.lan=event.lang;
                });
    this.consumers = new Array<Consumer>();
    this.timeout(); 
    this.timeoutMSG(); 
    localStorage.setItem('currentComponent','app-consumer');
  }
  loadExcel(){
    this.loading=true;
    this.consumerService.getExcel().subscribe(res=>{
      // console.log(res);
      window.open(res['url']);
           this.loading=false;
    });
  }
  onChangeEvent({target}){
    this.name = target.value;
  }
  getLastId(){
    if(this.consumers.length==0) return 0;
    return this.consumers[this.consumers.length-1].id;
  }
  delete(id:number){
    this.consumers= this.consumers.filter(item => item['id']!=id);
    this.consumerService.delete(id).subscribe(res => {});
    this.refresh();
  } 
  refresh(): void {
      this.editRowId=0;
      this.loadData();
  }
  ngOnInit() {
    this.editRowId=0;
    this.setForm();
    this.loadData();
  }
  loadData() {
    this.consumerService.getConsumers().subscribe(res => {
        this.loading=false;
        if(!res['message']) {
          this.consumers = res.reverse();
          this.initConsumerDatabase();
        }
        else{
          this.consumers =[];
        }
      });
      
  }
  loadSearchData(search) {
    this.consumerService.getSearch(search).subscribe(res => {
        this.loading=false;
        if(!res['message']) {
          this.consumers = res.reverse();
          
        }else{
          this.consumers =[];
        }
      });
  }
  clear() {
    //this.msgs = [];
  }
  search(){
    let search:string=this.searchForm.value.search;
    if(search!=''){
      this.loadSearchData(search);
    }
    else{
      this.loadData();
    }
  }
  deleteM(id:number){
    let dialogRef=this.dialog.open(DeleteDialog,{
      width:'310px',
      data:{id:id,consumer:this.consumers.filter(consumer=> consumer.id==id)[0],data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  displayedColumns = [ 'firstname','parent_name','phone','created_at','id'];
  consumersDatabase = new DB([]);
  dataSource: DS | null;
  initConsumerDatabase(){
    this.consumersDatabase = new DB(this.consumers);
    this.dataSource = new DS(this.consumersDatabase, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      // console.log(this.dataSource);
      // console.log(this.filter.nativeElement.value);
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
   
  }

}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  providers: [YnPipe],
})
export class DeleteDialog {
  loading:Boolean=false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumerService:ConsumerService,
    public snackBar: MatSnackBar,
    private authService:AuthenticationService) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id:number,todelete:string){
    this.data.loading=true;
    this.consumerService.delete(id).subscribe(res=>{
      this.snackBar.open(this.data.consumer, todelete, {
        duration: 2000,
      });
      this.data.loading=false;
    });
  }
}