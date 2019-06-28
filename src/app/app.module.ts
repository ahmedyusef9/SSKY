import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAgreementComponent } from './agent/add-agreement/add-agreement.component';
import { AddNoteComponent } from './agent/add-note/add-note.component';
import { AddPaymentComponent } from './agent/add-payment/add-payment.component';
import { AgentComponent } from './agent/agent/agent.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Http, HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
import { AuthGuard } from './login/auth.guard';
import { AdminGuard } from './login/admin.guard';
import { AuthenticationService } from './login/authentication.service';
import { CanEditGuard } from './login/can-edit.guard';
import { LocalStorageService } from './local-storage.service';
import { JwtHelper } from 'angular2-jwt';
import { SettingsModule } from './settings/settings.module';
import { MsgComponent } from './msg/msg.component';
import { ServerDateTimeService } from './server-date-time.service';
import { Angular2TokenService } from 'angular2-token';
import { NotificationService } from './notification.service';
import { SettingsService } from './settings/settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from './order/order.module';
import { AgentOrderModule } from './agent-order/agent-order.module';
import { BlockPackagesModule } from './block-packages/block-packages.module';
import { ProductModule } from './product/product.module';
import { CompanyModule } from './company/company.module';
import { SimModule } from './sim/sim.module';
import { AgentModule } from './agent/agent.module';
import { ConsumerModule } from './consumer/consumer.module';
import { PaymentModule } from './payment/payment.module';
import { MemberModule } from './member/member.module';
import { PhoneModule } from './phone/phone.module';
import { UsersModule } from './users/users.module';
import { ReportModule } from './report/report.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotmobileStatusModule } from './hotmobile-status/hotmobile-status.module';
import { CellcomStatusModule } from './cellcom-status/cellcom-status.module';
import { IpPermissionModule } from './ip-permission/ip-permission.module';
import { GlobalDiscountModule } from './global-discount/global-discount.module';
import { ComparisonsModule } from './comparisons/comparisons.module';
import { ExcelOrderModule } from './excel-order/excel-order.module';
import { AgentsCreditsModule } from './agents-credits/agents-credits.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
// import { ExcellentExport } from 'excellentexport';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'https://www.skypanel.net/api-test/lan', '.php');
}
@NgModule({
  declarations: [
    AppComponent,
    MsgComponent
  ],
  imports: [
    // ExcellentExport,
    FlexLayoutModule,
    AgentModule,
    AgentOrderModule,
    BrowserModule,
    CompanyModule,
    MemberModule,
    SimModule,
    PhoneModule,
    PaymentModule,
    OrderModule,
    HomeModule,
    ConsumerModule,
    UsersModule,
    ProductModule,
    BlockPackagesModule,
    ReportModule,
    LoginModule, 
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HotmobileStatusModule ,
    CellcomStatusModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
    PaymentModule,
    IpPermissionModule,
    SettingsModule,
    ComparisonsModule,
    GlobalDiscountModule,
    ExcelOrderModule,
    AgentsCreditsModule,
     TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
      
    }),
     SettingsModule,
     OrderModule,
     AgentOrderModule,
     BlockPackagesModule,
     ProductModule,
     CompanyModule,
     SimModule,
     AgentModule,
     ConsumerModule
  ],
  exports:[MaterialModule,FlexLayoutModule],
  providers: [
    AuthGuard,
    AdminGuard,
    CanEditGuard,
    AuthenticationService,
    LocalStorageService,
    ServerDateTimeService,
    Angular2TokenService,
    JwtHelper,
    // {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
    // ,
    { provide: 'Window',  useValue: window },
    { 
      provide: ServerDateTimeService, 
      useClass: ServerDateTimeService 
    },
    { 
      provide: NotificationService, 
      useClass: NotificationService 
    },
    { 
      provide: SettingsService, 
      useClass: SettingsService  
    },
    {provide: APP_BASE_HREF, useValue: 'alpha-crm/'}
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [MsgComponent],
})
export class AppModule { }
