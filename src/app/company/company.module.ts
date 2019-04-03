import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent, DeleteDialog, AddCompany } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { MaterialModule } from '../material/material.module';
import { YnModule } from '../pipes/yn.module';
import { CompanyService } from './company.service';
import { ExcelService } from '../excel.service';
import { AuthenticationService } from '../login/authentication.service';

@NgModule({
  declarations: [CompanyComponent,DeleteDialog,AddCompany],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ValidErrModule,
    TranslateModule,
    MaterialModule,
    YnModule
  ],
  exports : [CompanyComponent,TranslateModule,ValidErrModule,DeleteDialog],
  providers: [
    { provide: CompanyService, useClass: CompanyService },
    // { provide: ExcelService, useClass: ExcelService },
    TranslateService,
    AuthenticationService
  ],
  entryComponents: [AddCompany,DeleteDialog]
})
export class CompanyModule { }
