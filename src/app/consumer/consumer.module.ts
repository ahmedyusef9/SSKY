import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMembersComponent } from './customer-members/customer-members.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from '../login/authentication.service';
import { OrderService } from '../order/order.service';
import { MemberService } from '../member/member.service';
import { UsersService } from '../users/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { YnModule } from '../pipes/yn.module';
import { MaterialModule } from '../material/material.module';
import { ConsumerComponent, DeleteDialog } from './consumer/consumer.component';
import { AddConsumerComponent } from './add-consumer/add-consumer.component';
import { EditConsumerComponent } from './edit-consumer/edit-consumer.component';
import { ConsumerService } from './consumer.service';
import { AgentService } from '../agent/agent.service';
import { MomentModule } from 'angular2-moment';

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
    MomentModule,
  ],
  exports : [
    ConsumerComponent,
    AddConsumerComponent,
    EditConsumerComponent,
    TranslateModule,
    DeleteDialog,
    ProfileComponent,
    CustomerInfoComponent,
    CustomerMembersComponent
  ],
  declarations: [
    ConsumerComponent, 
    AddConsumerComponent, 
    EditConsumerComponent,
    DeleteDialog,
    ProfileComponent,
    CustomerInfoComponent,
    CustomerMembersComponent
  ],
  providers: [
    { provide: ConsumerService, useClass: ConsumerService },
    { provide: AgentService, useClass: AgentService },
    { provide: UsersService, useClass: UsersService },
    { provide: MemberService, useClass: MemberService },
    { provide: OrderService, useClass: OrderService },
    // { provide: ExcelService, useClass: ExcelService },
    AuthenticationService
  ],
  entryComponents: [
    DeleteDialog,
    ProfileComponent,
    CustomerInfoComponent,
    CustomerMembersComponent

  ],
})
export class ConsumerModule { }
