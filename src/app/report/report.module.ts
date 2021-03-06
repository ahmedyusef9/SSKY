import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralReportComponent } from './general-report/general-report.component';
import { MomentModule } from 'angular2-moment';
import { MaterialModule } from '../material/material.module';
import { YnModule } from '../pipes/yn.module';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { RouterModule } from '@angular/router';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderService } from '../order/order.service';
import { ExcelService } from '../excel.service';
import { ReportService } from './report.service';
import { AuthenticationService } from '../login/authentication.service';
import { RefreshConnectComponent } from './refresh-connect/refresh-connect.component';
import { HotmobileStatusService } from '../hotmobile-status/hotmobile-status.service';
import { CellcomStatusService } from '../cellcom-status/cellcom-status.service';
import { AddRestComponent } from '../payment/add-rest/add-rest.component';
import { PaymentService } from '../payment/payment.service';
import { DisconnectMemberComponent } from './disconnect-member/disconnect-member.component';
import { NewGeneralReportComponent } from '../report/new-general-report/new-general-report.component';
import { LocalStorageService } from '../local-storage.service';
import { UsersService } from '../users/users.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ValidErrModule,
    RouterModule,
    TranslateModule, 
    YnModule,
    MaterialModule,
    MomentModule
  ],
  declarations: [
    GeneralReportComponent, 
    RefreshConnectComponent,
    AddRestComponent,
    DisconnectMemberComponent,
    NewGeneralReportComponent
  ],
  entryComponents: [
    GeneralReportComponent,
    RefreshConnectComponent,
    AddRestComponent,
    DisconnectMemberComponent,
    NewGeneralReportComponent
  ],
  providers: [
    { provide: OrderService, useClass: OrderService },
    { provide: HotmobileStatusService, useClass: HotmobileStatusService },
    { provide: CellcomStatusService, useClass: CellcomStatusService },
    // { provide: ExcelService, useClass: ExcelService },
    { provide: ReportService, useClass: ReportService },
    { provide: TranslateService,useClass: TranslateService},
    { provide: LocalStorageService,useClass:LocalStorageService},
    { provide: PaymentService, useClass: PaymentService }, 
    { provide: UsersService,useClass:UsersService},
      AuthenticationService
  ],
})
export class ReportModule { }
