import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AgentService } from '../agent.service';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-delete-agreement',
  templateUrl: './delete-agreement.component.html',
  styleUrls: ['./delete-agreement.component.scss']
})
export class DeleteAgreementComponent implements OnInit {

  loading:Boolean=false;
  lan:any;
  constructor(
    public dialogRef: MatDialogRef<DeleteAgreementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private agentService:AgentService,
    public snackBar: MatSnackBar,
    private trans:TranslateService,
    private lsService:LocalStorageService,
    public authService:AuthenticationService) {
      this.lan=this.lsService.getStorage('lan');
      this.trans.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lan=event.lang;
      });
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id:number,todelete:string){
    this.data.loading=true;
    this.agentService.deleteAgreement(id).subscribe(res=>{
      this.snackBar.open(this.data.row.title, todelete, {
        duration: 2000,
      });
      this.data.loading=false;
    });
  }

  ngOnInit() {
  }

}
