import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { YnModule } from '../pipes/yn.module';
import { MomentModule } from 'angular2-moment';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteDialog } from './users/users.component';
import { UsersService } from './users.service';
import { ExcelService } from '../excel.service';
import { AuthenticationService } from '../login/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ValidErrModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    YnModule,
    MomentModule
  ],
  exports : [UsersComponent,AddUserComponent,EditUserComponent,TranslateModule,DeleteDialog],
  declarations: [UsersComponent, AddUserComponent, EditUserComponent,DeleteDialog],
  providers: [
    { provide: UsersService, useClass: UsersService },
    // { provide: ExcelService, useClass: ExcelService },
    AuthenticationService
  ],
  entryComponents: [DeleteDialog]
})
export class UsersModule { }
