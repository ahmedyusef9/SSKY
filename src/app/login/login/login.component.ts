import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/login/authentication.service";
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from "src/app/local-storage.service";
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = { username: '', password:''};
    loading = false;
    userfocus=false;
    passwordfocus=false;
    error = '';
    _login=true;
    lan:any;
    _loginform: FormGroup;
  constructor(
        private router: Router,
        public authenticationService: AuthenticationService,private trans:TranslateService, private lsService:LocalStorageService
    /*private _cookieService:CookieService*/) { 
        this.lan='he';
        if(this.lsService.getStorage('lan')){
            this.lan = this.lsService.getStorage('lan');
        }
        this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
          this.lan=event.lang;
        });
    }

    ngOnInit() {
     
        this.authenticationService.logout();
       
    }
    _userfocus(){
        this.userfocus=true;
    }
    _userfocusout(){
        this.userfocus=false;
    }
    _passwordfocus(){
        this.passwordfocus=true;
    }
    _passwordfocusout(){
        this.passwordfocus=false;
    }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'שם המשתמש או הסיסמה שגויים!!';
                   
                    this.loading = false;
                }
            });
    }
    checkPass(e){
        console.log(this.model);
        if(this.model.password.length>4 && this.model.username!=''){
            this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if(result === true)
                this.login();
            });
        }
    }
    public  isloged(){
        return decodeURIComponent(this.router.url)!='/התחברות';
      }
}

