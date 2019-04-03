import { Component, OnInit, ViewChild, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { AgentService } from '../agent.service';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ExcelService } from 'src/app/excel.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { DB } from 'src/app/database/db';
import { DS } from 'src/app/datasource/ds';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports:any[];
  _reports:any[];
  head:any[];
  loading:boolean=false;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') fileInput;
  lan:any;
  constructor(private agentService:AgentService,
    private mdPaginatorIntl:MatPaginatorIntl,private trans:TranslateService,
    private lsService:LocalStorageService,
    // private excelService:ExcelService,
    public authService:AuthenticationService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
        this.load(this.lan);
      });
      localStorage.setItem('currentComponent','app-report');
    }
  ngOnInit() {
    this.load('he');
  }
  load(lan){
    this.loading=true;
    this.agentService.getAgentReport(lan).subscribe(res=>{
     this.loading=false;
      this.head=res['a'][0];
      this._reports=res['b'];
      this.displayedColumns = this.head;
      this.initDatabase();
    });
  }
  loadExcel(){
  //  this.excelService.exportAsExcelFile(this._reports, 'דוח סוכנים');
  }
  displayedColumns = this.head;
  reportsDatabase = new DB([]);
  dataSource: DS | null;
  initDatabase(){
    this.reportsDatabase = new DB(this._reports);
    this.dataSource = new DS(this.reportsDatabase, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
}
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}