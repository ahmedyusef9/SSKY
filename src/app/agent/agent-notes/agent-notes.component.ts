import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatPaginatorIntl, MatSnackBar } from '@angular/material';
import { DB } from 'src/app/database/db';
import { DS } from 'src/app/datasource/ds';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ExcelService } from 'src/app/excel.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { AgentService } from '../agent.service';
import { Observable } from 'rxjs';
import { DeleteNoteComponent } from '../delete-note/delete-note.component';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-agent-notes',
  templateUrl: './agent-notes.component.html',
  styleUrls: ['./agent-notes.component.scss']
})
export class AgentNotesComponent implements OnInit {

  @Input() agent:any;
  @Input()  public openMore: Function; 
  public notes:any[];
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lan:any;
  @ViewChild('fileInput') fileInput;
  displayedColumns = [ 'note','created_at','add_by','id'];
  db = new DB([]);
  ds: DS | null;
  constructor(private trans:TranslateService, 
              private lsService:LocalStorageService,
              // private excelService:ExcelService,
              public authService:AuthenticationService,
              private agentService:AgentService,
              public dialog: MatDialog,
              private mdPaginatorIntl:MatPaginatorIntl,
              public snackBar: MatSnackBar){
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      localStorage.setItem('currentComponent','app-agent-notes');
   }
  ngOnInit() {
    this.loadNotes();
  }
  initPaymentsDatabase(){
    this.db = new DB(this.notes);
    this.ds = new DS(this.db, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(()=>{
      if(!this.ds){return;}
        this.ds.filter=this.filter.nativeElement.value;
    });
  }
  loadNotes(){
     this.agentService.getNotes(this.agent.id).subscribe(res=>{
       this.notes=res;
       this.db = new DB(this.notes);
       this.ds = new DS(this.db, this.sort, this.paginator);
       Observable.fromEvent(this.filter.nativeElement, 'keyup')
       .debounceTime(150)
       .distinctUntilChanged()
       .subscribe(()=>{
         if(!this.ds){return;}
         this.ds.filter=this.filter.nativeElement.value;
       });
    });
  }
  delete(row){
    let dialogRef=this.dialog.open(DeleteNoteComponent,{
      width:'310px',
      data:{id:row.id,row:row,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openNoteAdd(){
    let dialogRef=this.dialog.open(AddNoteComponent,{ 
      width:'310px',
      data:{agent:this.agent,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}