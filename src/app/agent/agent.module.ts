import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAgreementComponent } from "src/app/agent/add-agreement/add-agreement.component";
import { AddNoteComponent } from "src/app/agent/add-note/add-note.component";
import { AddPaymentComponent } from "src/app/agent/add-payment/add-payment.component";
import { AgentComponent } from "src/app/agent/agent/agent.component";
import { AgentAgreementComponent } from './agent-agreement/agent-agreement.component';
import { AgentInfoComponent } from './agent-info/agent-info.component';
import { AgentMembersComponent } from './agent-members/agent-members.component';
import { AgentNotesComponent } from './agent-notes/agent-notes.component';
import { AgentObligationComponent } from './agent-obligation/agent-obligation.component';
import { AgentPaymentsComponent } from './agent-payments/agent-payments.component';
import { DeleteAgreementComponent } from './delete-agreement/delete-agreement.component';
import { DeleteNoteComponent } from './delete-note/delete-note.component';
import { EditComponent } from './edit/edit.component';
import { NewChargeComponent } from './new-charge/new-charge.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ObligationUpdateComponent } from './obligation-update/obligation-update.component';
import { PriceChangeComponent } from './price-change/price-change.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AddAgreementComponent,
    AddNoteComponent,
    AddPaymentComponent,
    AgentComponent,
    AgentAgreementComponent,
    AgentInfoComponent,
    AgentMembersComponent,
    AgentNotesComponent,
    AgentObligationComponent,
    AgentPaymentsComponent,
    DeleteAgreementComponent,
    DeleteNoteComponent,
    EditComponent,
    NewChargeComponent,
    NewPasswordComponent,
    ObligationUpdateComponent,
    PriceChangeComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class AgentModule { }
