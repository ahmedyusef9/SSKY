import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationService } from 'src/app/validation.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  lan:any;
  loading:Boolean;
  public note:string='';
  @ViewChild('fileInput') fileInput;
  constructor( public dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private validationService:ValidationService,
    private formBuilder:FormBuilder,
    private trans:TranslateService,
    private lsService:LocalStorageService,
    public authService:AuthenticationService,
    private agentService:AgentService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
    }
    ngOnInit() {}
    public valid(){return this.note && this.note!='';}
    save(){
      this.loading=true;
      this.agentService.addNote({agent_id:this.data.agent.id,note:this.note}).subscribe(
        res=>{
          if(res['_body'] ){
            let r=JSON.parse(res['_body']);
            this.loading=false;
            this.data.data.ngOnInit();
          }
      });
      this.loading=false;
      this.dialogRef.close();
    }
    onNoClick(){
      this.dialogRef.close();
    }
}