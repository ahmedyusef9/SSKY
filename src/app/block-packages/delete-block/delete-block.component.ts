import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BlockPackegesService } from '../block-packeges.service';
import { AuthenticationService } from '../../login/authentication.service';

@Component({
  selector: 'app-delete-block',
  templateUrl: './delete-block.component.html',
  styleUrls: ['./delete-block.component.scss']
})
export class DeleteBlockComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blockPackegesService:BlockPackegesService,
    private authService:AuthenticationService,
    public snackBar: MatSnackBar) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id:number,todelete:string){
    this.data.loading=true;
    this.blockPackegesService.delete(id).subscribe(res=>{
      this.snackBar.open(this.data.company, todelete, {
        duration: 2000,
      });
      this.data.loading=false;
      this.data.data.ngOnInit();
    });
  }

}
