import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { TranslateModule } from 'ng2-translate';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { YnModule } from '../pipes/yn.module';
import { MomentModule } from 'angular2-moment';
import { OrderComponent } from './order/order.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { CompleteComponent } from './complete/complete.component';
import { DeleteComponent } from './delete/delete.component';
import { CancelComponent } from './cancel/cancel.component';
import { DeclineComponent } from './decline/decline.component';
import { AddComponent } from './add/add.component';
import { AutoUpdateComponent } from './auto-update/auto-update.component';
import { UsersService } from '../users/users.service';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';
import { PhoneService } from '../phone/phone.service';
import { SimService } from '../sim/sim.service';
import { MemberService } from '../member/member.service';
import { ObligationService } from '../users/obligation.service';
import { ConsumerService } from '../consumer/consumer.service';
import { ValidationService } from '../validation.service';
import { SettingsService } from '../settings/settings.service';
import { ExcelService } from '../excel.service';
import { AuthenticationService } from '../login/authentication.service';
import { ProductAgentService } from '../product/product-agent.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ValidErrModule,
    TranslateModule,
    MaterialModule,
    RouterModule,
    YnModule,
    MomentModule
  ],
  exports:[
    OrderComponent,
    OrderInfoComponent,
    TranslateModule,
    ValidErrModule,
    CompleteComponent, 
    DeleteComponent, 
    CancelComponent, 
    DeclineComponent,
    AddComponent,
    AutoUpdateComponent
  ],
  declarations: [
    OrderComponent, 
    OrderInfoComponent, 
    CompleteComponent, 
    DeleteComponent, 
    CancelComponent, 
    DeclineComponent, 
    AddComponent, 
    AutoUpdateComponent
  ],
  providers: [
    { provide: UsersService, useClass: UsersService },
    { provide: OrderService, useClass: OrderService },
    { provide: ProductService, useClass: ProductService },
    { provide: PhoneService, useClass: PhoneService },
    { provide: SimService, useClass: SimService },
    { provide: MemberService, useClass: MemberService },
    { provide: ObligationService, useClass: ObligationService },
    { provide: ConsumerService, useClass: ConsumerService },
    { provide: ValidationService, useClass: ValidationService },
    { provide: ObligationService, useClass: ObligationService },
    { provide: ProductAgentService, useClass: ProductAgentService },
    { provide: SettingsService, useClass: SettingsService },
    // { provide: ExcelService, useClass: ExcelService },
    AuthenticationService,
  ],
  entryComponents: [
    OrderInfoComponent, 
    CompleteComponent, 
    DeleteComponent, 
    CancelComponent, 
    DeclineComponent,
    AddComponent
  ],
})
export class OrderModule { }
