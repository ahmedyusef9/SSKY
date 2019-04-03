import { Component, OnInit, Inject } from '@angular/core';
import { ValidationService } from 'src/app/validation.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/model/company';
import { ServerDateTime } from 'src/app/model/server_date_time';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MsgComponent } from 'src/app/msg/msg.component';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ExcelService } from 'src/app/excel.service';
import { YnPipe } from 'src/app/pipes/yn.pipe';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [ValidationService]
})
export class CompanyComponent implements OnInit { 
  companys:Company[];
  public dt:ServerDateTime[];
  item: Company;
  companyForm: FormGroup;
  private sTimeout;
  name: string;
  editRowId:number=0;
  loading:Boolean=true;
  displayedColumns: string[] = ['id', 'comapny', 'created_at', 'number'];
  toggleEdit(id){
    this.editRowId = id;
  }
  update(company){
    this.editRowId=0;
    this.companyService.update(company).subscribe(res => { 
      this.snackBar.openFromComponent(MsgComponent,{
        duration: 3000,
        horizontalPosition:'right',
        data:{title:'נשמר בהצלחה',detail:company.name +' נשמר ',art:'add',place:'company'}
      });
    });
    this.loadData();
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
  constructor(
    private companyService:CompanyService,
    private validationService:ValidationService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private trans:TranslateService, 
    private lsService:LocalStorageService,
    // private excelService:ExcelService,
    public authService:AuthenticationService,
    public snackBar: MatSnackBar) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      this.companys = new Array<Company>();
      this.timeout(); 
      this.timeoutMSG(); 
      localStorage.setItem('currentComponent','app-company');
      this.item = {name: '',name_ar: '',name_en: '', id:0,created_at:'',created_at_sec:'',last_update:'',last_update_sec:'' };
  }
  loadExcel(){
    let excel:any=[];
    this.companys.forEach(el=>{
      let a:any={
        'id':el.id,
        'שם':el.name,
        'שם ערבית':el.name_ar,
        'שם אנגלית':el.name_en,
        'תאריך יצירה':el.created_at
      }
      excel.push(a);
    });
    // this.excelService.exportAsExcelFile(excel, 'חברות');
  }
  getCompanyName(row){
    if(this.lan=='he') {
      return row.name;
    }
    else if(this.lan=='ar'){
      if(row.name_ar!=''){
        return row.name_ar;
      }
    }
    else{
      if(row.name_en!=''){
        return row.name_en;
      }
    }
    return row.name;
  }
  onChangeEvent({target}){
    this.name = target.value;
  }
  getLastId(){
    if(this.companys.length==0) return 0;
    return this.companys[this.companys.length-1].id;
  }
  save(_id=0) {

    let id = this.item.id;
    this.item = this.companyForm.value;
    if(id==0){
      this.insert(this.item);
    }
    else{
      this.edit(this.item,id);
    }
    
    
  }
  insert(company){
    if(company.name.length>0){
      this.companys.push(company);
      this.companyService.add(company).subscribe(res => {
        this.snackBar.openFromComponent(MsgComponent,{
          duration: 3000,
          horizontalPosition:'right',
          data:{title:'נשמר בהצלחה',detail:this.companyForm.value.name +' נשמר ' ,art:'add',place:'company'}
        });
        this.companyForm.value.name='';
        this.ngOnInit();
       });
      
      this.loadData();
      this.setForm();
    }
  }
  edit(company,id){
    if(company.name.length>0){
      //this.companys.push(this.item);
      this.item.id=id;
      this.companyService.update(this.item).subscribe(res => {
        this.snackBar.openFromComponent(MsgComponent,{
          duration: 3000,
          horizontalPosition:'right',
          data:{title:'נשמר בהצלחה',detail:this.companyForm.value.name +' נשמר ' ,art:'add',place:'company'}
        });
        this.companyForm.value.name='';
        this.ngOnInit();
       });
      
      this.loadData();
      this.setForm();
    }
  }
  private setForm() {
    this.companyForm = this.formBuilder.group({
      name: [this.item.name,Validators.compose([ Validators.required])],
      name_ar: [this.item.name_ar], 
      name_en: [this.item.name_en],
      created_at:[this.item.created_at]
    });
    // console.log("test");
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
    this.companyService.getCompanys().subscribe(res => {
        this.loading=false;
        if(!res['message']) {
        this.companys = res;
        }
      });
  }
  clear() {
  }

  openDialog(id=0): void {
    let dialogRef = this.dialog.open(AddCompany, {
      width: '250px',
      data: { company:this,id:id}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  delete(id:number){
    let dialogRef=this.dialog.open(DeleteDialog,{
      width:'310px',
      data:{ id: id,company:this.companys.filter(company=> company.id==id)[0].name,data:this }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
@Component({
  selector: 'add-company',
  templateUrl: 'add-company.html',
  providers: [ValidationService]
})
export class AddCompany {
  constructor(
    public dialogRef: MatDialogRef<AddCompany>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if(this.data.id!=0){
        this.data.company.item=this.data.company.companys.filter(el=>el.id==this.data.id)[0];
      }
      else{
        this.data.company.item = {name: '',name_ar: '',name_en: '', id:0,created_at:'',created_at_sec:'',last_update:'',last_update_sec:'' };
      }
      this.data.company.setForm();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    save(){
      this.data.company.save(this.data.id);
      this.dialogRef.close();
    }
}
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  providers: [YnPipe],
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService:CompanyService,private authService:AuthenticationService,
    public snackBar: MatSnackBar) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id:number,todelete:string){
    this.data.loading=true;
    this.companyService.delete(id).subscribe(res=>{
      this.snackBar.open(this.data.company, todelete, {
        duration: 2000,
      });
      this.data.loading=false;
    });
  }
}