import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { ObligationComponent } from './obligation/obligation.component';
import { TranslateModule } from 'ng2-translate';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms/src/forms';
import { YnModule } from '../pipes/yn.module';
import { ObligationService } from '../users/obligation.service';
import { AuthenticationService } from '../login/authentication.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../order/order.service';
import { UsersService } from '../users/users.service';
import { PhoneService } from '../phone/phone.service';
import { MemberService } from '../member/member.service';
import { ConsumerService } from '../consumer/consumer.service';

@NgModule({
  declarations: [
    HomeComponent, 
    MemberSearchComponent, 
    ObligationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    RouterModule,
    YnModule,
    FormsModule
  ],
    providers:[
    {provide: PhoneService, useClass: PhoneService},
    {provide: MemberService, useClass: MemberService},
    {provide: ConsumerService, useClass: ConsumerService},
    {provide: UsersService, useClass: UsersService},
    {provide: ObligationService, useClass: ObligationService},
    AuthenticationService,
    {provide: OrderService, useClass: OrderService}
  ],
  entryComponents: [
    HomeComponent,
    MemberSearchComponent,
    ObligationComponent
  ]
})
export class HomeModule { }
