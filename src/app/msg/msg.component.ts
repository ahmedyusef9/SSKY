import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackBarRef: MatSnackBarRef<MsgComponent>) { 
                // this.snackBarRef._dismissAfter(5000);
              }

  ngOnInit() {
    console.log(this.data);
    // this.snackBarRef.dismissWithAction();
  }

}
