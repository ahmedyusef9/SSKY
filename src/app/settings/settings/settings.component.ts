import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { MatDialog } from '@angular/material';
import { EditComponent } from '../edit/edit.component';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from '../../local-storage.service';
import { AuthenticationService } from '../../login/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  lan:any;
  settings:Array<{id:number,_key:string,_value:string,description:string}>;
  displayedColumns: string[] = ['name', 'active', 'value', 'action'];
  _active: string;
  constructor(private settingsService:SettingsService ,public dialog: MatDialog,private trans:TranslateService,
    private lsService:LocalStorageService,
    public authService:AuthenticationService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
      localStorage.setItem('currentComponent','app-settings');
   }

  ngOnInit() {
    this.loadSettings();
  }
  loadSettings(){
    this.settingsService.getSettings(0).subscribe(res=>{
      if(!res['message']) {
        this.settings = res.reverse();
        // console.log(this.settings);
        }
    });
  }
 
  update(item): void {
    let dialogRef = this.dialog.open(EditComponent, {
      width: '310px',
      data: { item:item,this:this}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  checkActive(value:any){
    // console.log(value);
    if(value == '1')
      this._active = 'yes';
    else
      this._active = 'no';
  }
}
