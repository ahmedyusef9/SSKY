import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidErrModule } from '../valid-err/valid-err.module';
import { TranslateModule } from 'ng2-translate';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { YnModule } from '../pipes/yn.module';
import { MemberComponent } from './member/member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { BlockMemberComponent } from './block-member/block-member.component';
import { ResetMemberComponent } from './reset-member/reset-member.component';
import { DeleteDialog } from './member/member.component';
import { MemberService } from './member.service';
import { ConsumerService } from '../consumer/consumer.service';
import { UsersService } from '../users/users.service';
import { SimService } from '../sim/sim.service';
import { PhoneService } from '../phone/phone.service';
import { ProductService } from '../product/product.service';
import { ExcelService } from '../excel.service';
import { AuthenticationService } from '../login/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ValidErrModule,
    TranslateModule,
    MaterialModule,
    RouterModule,YnModule
  ],
  exports:[
    TranslateModule,
    ValidErrModule,
    MemberComponent, 
    AddMemberComponent, 
    EditMemberComponent,
    BlockMemberComponent,
    ResetMemberComponent,
    DeleteDialog
  ],
  declarations: [
    MemberComponent, 
    AddMemberComponent, 
    EditMemberComponent,
    DeleteDialog,
    BlockMemberComponent,
    ResetMemberComponent
  ],
  providers: [
    { provide: MemberService, useClass: MemberService },
    { provide: ConsumerService, useClass: ConsumerService },
    { provide: UsersService, useClass: UsersService },
    { provide: SimService, useClass: SimService },
    { provide: PhoneService, useClass: PhoneService },
    { provide: ProductService, useClass: ProductService },
    // {
    //   provide:ExcelService ,
    //   useClass:ExcelService 
    // },
    AuthenticationService
  ],
  entryComponents: [
    AddMemberComponent,
    EditMemberComponent,
    BlockMemberComponent,
    ResetMemberComponent,
    DeleteDialog

  ],
})
export class MemberModule { }
