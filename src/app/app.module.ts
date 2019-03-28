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
import { Http } from '@angular/http';
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

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'https://www.skypanel.net/api/lan', '.php');
}
@NgModule({
  declarations: [
    AppComponent,
    MsgComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
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
  exports:[MaterialModule],
  providers: [
    AuthGuard,
    AdminGuard,
    CanEditGuard,
    AuthenticationService,
    LocalStorageService,
    ServerDateTimeService,
    Angular2TokenService,
    JwtHelper,
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
  ],
  bootstrap: [AppComponent],
  entryComponents: [MsgComponent],
})
export class AppModule { }
