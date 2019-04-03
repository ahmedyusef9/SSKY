import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ValidationService } from '../../validation.service';
import { MatSort, MatPaginator, MatDialog, MatPaginatorIntl, MatSnackBar } from '@angular/material';
import { UsersService } from '../../users/users.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { ExcelService } from '../../excel.service';
import { AuthenticationService } from '../../login/authentication.service';
import { IpPermissonService } from '../ip-permisson.service';

@Component({
  selector: 'app-ip-permisson',
  templateUrl: './ip-permisson.component.html',
  styleUrls: ['./ip-permisson.component.scss'],
  providers: [ValidationService],
})
export class IpPermissonComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lan:any;
  loading:Boolean=false;
  agents:any[]=null;
  permissons:any[]=null;
  constructor(
    private ipPermissonService:IpPermissonService,
    private usersService:UsersService,
    public  dialog: MatDialog,
    private validationService:ValidationService,
    private formBuilder:FormBuilder,
    private mdPaginatorIntl:MatPaginatorIntl,
     private trans:TranslateService,
    private lsService:LocalStorageService,
    public snackBar: MatSnackBar,
    // private excelService:ExcelService,
    public authService:AuthenticationService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      localStorage.setItem('currentComponent','app-ip-permisson');
     }

  ngOnInit() {
    this.loadAgents();
  }
  loadAgents(){
    this.loading=true;
    this.usersService.getAgents().subscribe(res=>{
      this.loading=false;
        this.agents=res;
    });
  }
  loadPermissons(){
    this.loading=true;
    this.ipPermissonService.get().subscribe(res=>{
      this.loading=false;
        this.agents=res;
    });
  }
}
