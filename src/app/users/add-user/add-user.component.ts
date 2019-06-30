import { Declaration } from '@angular/language-service';
import { Component, OnInit, ViewContainerRef, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { User } from "../../model/user";
import { Level } from "../../model/level";
import { UsersService } from "../users.service";
import { FormControl, Validators, FormBuilder, FormGroup, NgModel, ValidationErrors } from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
//import { ServerDateTimeService } from "../../server-date-time.service";
import { ValidationService } from "../../validation.service";
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { AuthenticationService } from '../../login/authentication.service';
import { MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { MsgComponent } from '../../msg/msg.component';
import { Observable } from 'rxjs';
import { startWith, map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {GlobalDiscountService } from './../../global-discount/global-discount.service';
import { customerLevel } from 'src/app/model/customerLevel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [/*ServerDateTimeService*/ValidationService]
})
export class AddUserComponent implements OnInit {
  discount:any;
  searchAgent = new FormControl();
  discounts = new FormControl();
  selected_discounts:any;
  users : any;
  filteredOptions: Observable<any[]>;
  @ViewChild('copyAgent') copyAgent ;
  show:boolean|false;
  startDate = new Date(1980, 0, 1);
  public dt: ServerDateTime[];
  item: User;
  name: string;
  userForm: FormGroup;
  private sTimeout;
  editRowId:number=0;
  userLevels: Level[]=[];
   agents: User[]=[];
 
  lan:any;
  constructor(
    private formBuilder: FormBuilder,
    private GlobalDiscountService:GlobalDiscountService,
    private userService:UsersService,
    private validationService:ValidationService,
    private router:Router,private trans:TranslateService,
    private lsService:LocalStorageService,
    public authService:AuthenticationService,
    public snackBar: MatSnackBar) { 
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      this.timeout(); 
      this.timeoutMSG(); 
    }
    toggleEdit(id){
      this.editRowId = id;
    }
    ShowAgentChoose(){
      this.show = !this.show;
      // console.log(this.show);
    }
    selectAgentEmitter(option:any){
      // console.log(option);
    }
    loadLevels() {
      this.userService.getUserLevels().subscribe(res => {
        let customer_lvl = new customerLevel();
        this.userLevels = res.reverse().filter(el=>this.authService.isAdmin()?true:el.id==3);
        this.userLevels.push(customer_lvl);

        // console.log(this.userLevels);
        });
      this.userService.getAgents().subscribe(res => {
         
          this.agents = res.reverse();
        
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

  onChangeEvent({target}){
    this.name = target.value;
  }
  
  save() {
    let id = this.item.id;
    this.userForm.get("copyfrom").setValue(this.searchAgent.value.id);
    this.item = this.userForm.value;
    this.userService.add(this.item).subscribe(res => { });
    
    this.userForm.value.username='';
   // this.msgs.push({severity:'success', summary:'נשמר בהצלחה', detail:this.item.username +' נשמר '});
   // this.setForm();
   this.snackBar.openFromComponent(MsgComponent,{
    duration: 3000,
    horizontalPosition:'left',
    data:{title:'נשמר בהצלחה',detail:this.item.username +' נשמר ',art:'add',place:'user'}
  });
   this.router.navigate(['/משתמשים']);
  }
 
  private setForm() {
    this.userForm = this.formBuilder.group({
      username: [this.item.username],
      password: [null, Validators.required],
      re_password:[null,this.validationService.checkPassword],
      email: [this.item.email, this.validationService.emailValidation],
      national_id:[this.item.national_id,this.validationService.legalPersonalId],
      firstname:[this.item.firstname],
      lastname:[this.item.lastname],
      phone:[this.item.phone],
      address:[this.item.address],
      mobile:[this.item.mobile,this.validationService.phoneValidation],
      birthday:[this.item.birthday],
      level_id:[this.item.level_id,this.validationService.levelValidation],
      copyfrom:[]
    });
  }
  
  ngOnInit() {
    this.loadLevels() ;
    this.editRowId=0;
    this.item = {
        id: null,
        username: '',
        _username: '',
        password:'',
        email: '',
        national_id: '',
        firstname: '',
        lastname: '',
        phone: '',
        mobile: '',
        address: '',
        birthday: '',
        birthday_sec: '',
        created_at: '',
        created_at_sec: '',
        last_update: '',
        last_update_sec: '',
        level_id: this.authService.getCurrentUserLevel()==2?3:0,
        lang:'he',
        block_my_members:'0',
        change_price:'0',
      };
     this.setForm();



     this.userService.getUsers().subscribe(res => {
      // this.loading=false;
       if(!res['message']) {
       this.users = res.reverse();
      //  console.log(this.users);
       this.intilizeFilterAutoComplet();

      //  this.initUserDatabase();
       }
      });
    //  console.log(this.filteredStates);
    
    //  console.log(this.users);
  }
  displayFn(option?:any): string | undefined {
    return option ? option.firstname+" "+option.lastname: undefined;
  }


intilizeFilterAutoComplet(){
    this.filteredOptions = this.searchAgent.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value;
    // console.log(value);
    return this.users.filter(option => (option.firstname.indexOf(filterValue)>=0 || option.lastname.indexOf(filterValue)>=0));
  }
  
  clear() {
  }

}
