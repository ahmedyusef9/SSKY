import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DB } from 'src/app/database/db';
import { DS } from 'src/app/datasource/ds';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ExcelService } from 'src/app/excel.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { AgentService } from '../agent.service';
import { Observable } from 'rxjs';
import { DeleteAgreementComponent } from '../delete-agreement/delete-agreement.component';
import { AddAgreementComponent } from '../add-agreement/add-agreement.component';
import { MatSort, MatPaginator, MatDialog, MatPaginatorIntl, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-agent-agreement',
  templateUrl: './agent-agreement.component.html',
  styleUrls: ['./agent-agreement.component.scss']
})
export class AgentAgreementComponent implements OnInit {
  @Input() agent:any;
  @Input()  public openMore: Function; 
  public agreements:any[];
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lan:any;
  @ViewChild('fileInput') fileInput;
  displayedColumns = [ 'title','created_at','add_by','id'];
  db = new DB([]);
  ds: DS | null;
  constructor(private trans:TranslateService, 
              private lsService:LocalStorageService,
              // private excelService:ExcelService,
              public authService:AuthenticationService,
              private agentService:AgentService,
              public dialog: MatDialog,
              private MatPaginatorIntl:MatPaginatorIntl,
              public snackBar: MatSnackBar) {
    this.lan=this.lsService.getStorage('lan');
    this.trans.onLangChange.subscribe((event: LangChangeEvent)=>{this.lan=event.lang;});
    localStorage.setItem('currentComponent','app-agent-agreement');
  }
  ngOnInit() {this.loadAgreements();}
  initPaymentsDatabase(){
    this.db = new DB(this.agreements);
    this.ds = new DS(this.db, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.ds) { return; }
      this.ds.filter = this.filter.nativeElement.value;
    });
  }
  loadAgreements(){
     this.agentService.getAgreements(this.agent.id).subscribe(res=>{
       this.agreements=res;
       this.db=new DB(this.agreements);
       this.ds=new DS(this.db,this.sort,this.paginator);
       Observable.fromEvent(this.filter.nativeElement,'keyup')
       .debounceTime(150)
       .distinctUntilChanged()
       .subscribe(()=>{
         if (!this.ds){return;}
         this.ds.filter=this.filter.nativeElement.value;
       });
    });
  }
  delete(row){
    let dialogRef=this.dialog.open(DeleteAgreementComponent,{
      width:'310px',
      data:{id:row.id,row:row,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openAgreementAdd(){
    let dialogRef=this.dialog.open(AddAgreementComponent,{ 
      width:'310px',
      data:{agent:this.agent,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
