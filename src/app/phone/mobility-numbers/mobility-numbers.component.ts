import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatPaginatorIntl } from '@angular/material';
import { PhoneService } from '../phone.service';
import { UsersService } from '../../users/users.service';
import { CompanyService } from '../../company/company.service';
import { ValidationService } from '../../validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Phone } from '../../model/phone';
import { Company } from '../../model/company';
import { DB } from '../../database/db';
import { DS } from '../../datasource/ds';
import { Observable } from 'rxjs/Observable';
import { ConfirmTransComponent } from '../confirm-trans/confirm-trans.component';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { ExcelService } from '../../excel.service';
import { AuthenticationService } from '../../login/authentication.service';
import { EditMobilityComponent } from '../edit-mobility/edit-mobility.component';

@Component({
  selector: 'app-mobility-numbers',
  templateUrl: './mobility-numbers.component.html',
  styleUrls: ['./mobility-numbers.component.scss'],
  providers: [ValidationService]
})
export class MobilityNumbersComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') fileInput;
  lan:any
  constructor(
      private phoneService:PhoneService,
      private usersService:UsersService,
      public dialog: MatDialog,
      private companyService:CompanyService,
     // private productService:ProductService,
      private validationService:ValidationService,
      private formBuilder:FormBuilder,
      private mdPaginatorIntl:MatPaginatorIntl,
      private trans:TranslateService,
      private lsService:LocalStorageService,
      // private excelService:ExcelService,
      public authService:AuthenticationService
    ) { 
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      localStorage.setItem('currentComponent','app-mobility-numbers');
    }
    loadExcel(){
      this.phoneService.getExcel('?trans=1').subscribe(res=>{
        window.open(res['url']);
        this.loading=false;
      });
    }
  phones:Phone[];
  loading:Boolean=false;
  companies:Company[];
  item:Phone;
  edit(row){
    let dialogRef=this.dialog.open(EditMobilityComponent,{
      width:'310px',
      data:{row:row,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadPhones();
    });
  }
  getCompanyName(id:number){
    if(id==0 || !this.companies){
      return '';
    }
    return this.companies.filter(
      company => company.id === id)[0].name;
  }
  
  ngOnInit() {
    this.loadCompanies();
    this.loadPhones();
  }
 
  public loadPhones(){
    this.phoneService.getTrans().subscribe(res=>{
      this.loading=false;
      if(!res['message']){
        this.phones = res.reverse();
        this.initPhoneDatabase();
      }
    });
  }
  loadCompanies(){
    this.companyService.getCompanys().subscribe(res=>{
        if(!res['message']){
          this.companies=res;
        }
    });
  }
 
  complete(phone:Phone){
    let dialogRef=this.dialog.open(ConfirmTransComponent,{
      width:'310px',
      data:{id:phone.id,phone:phone,data:this}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadPhones();
    });
  }
  displayedColumns = [ 'phone','moved_to_phone','agent_name','company_name','id'];
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
