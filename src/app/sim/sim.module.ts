import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSimComponent } from './add-sim/add-sim.component';
import { EditSimComponent } from './edit-sim/edit-sim.component';
import { SimComponent, DeleteDialog } from './sim/sim.component';
import { TranslateModule } from 'ng2-translate';
import { SimService } from './sim.service';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { Angular2TokenService } from 'angular2-token';
import { ExcelService } from '../excel.service';
import { AuthenticationService } from '../login/authentication.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YnModule } from '../pipes/yn.module';
import { RouterModule } from '@angular/router';
import { ValidationService } from '../validation.service';
import { ValidErrModule } from '../valid-err/valid-err.module';

  //ValidErrModule
@NgModule({
  declarations: [
    AddSimComponent, EditSimComponent,
     SimComponent,DeleteDialog],
  imports: [
     CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserModule,
    ValidErrModule,
    BrowserAnimationsModule,YnModule,RouterModule
  ],
  exports:[SimComponent,TranslateModule,
     AddSimComponent, EditSimComponent,
     DeleteDialog],
  providers:[
      {provide: SimService, useClass: SimService},
      {provide: UsersService, useClass: UsersService},
      {provide: CompanyService, useClass: CompanyService},
      {provide:Angular2TokenService ,useClass:Angular2TokenService },
      ValidationService,
      //{ provide: ExcelService, useClass: ExcelService },
      AuthenticationService
    ],
  entryComponents: [
    AddSimComponent, EditSimComponent,
    DeleteDialog] 
})
export class SimModule { }
