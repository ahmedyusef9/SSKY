import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/home/home/home.component";
import { AuthGuard } from "src/app/login/auth.guard";
import { LoginComponent } from './login/login/login.component';
import { NewChargeComponent } from './agent/new-charge/new-charge.component';
import { SimComponent } from './sim/sim/sim.component';
import { CanEditGuard } from './login/can-edit.guard';
import * as AppConst from './app.const'; 
import { ConsumerComponent } from './consumer/consumer/consumer.component';
import { AddConsumerComponent } from './consumer/add-consumer/add-consumer.component';
import { EditConsumerComponent } from './consumer/edit-consumer/edit-consumer.component';
import { ProfileComponent } from './consumer/profile/profile.component';
import { AgentComponent } from './agent/agent/agent.component';
import { PhoneInfoComponent } from './phone/phone-info/phone-info.component';
import { PhoneComponent } from './phone/phone/phone.component';
import { CompanyComponent } from './company/company/company.component';
import { IpPermissonComponent } from './ip-permission/ip-permisson/ip-permisson.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { UsersComponent } from './users/users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ProductComponent } from './product/product/product.component';
import { PriceListComponent } from './product/price-list/price-list.component';
import { GlobalDiscountComponent } from './global-discount/global-discount/global-discount.component';
import { BlockPackagesComponent } from './block-packages/block-packages/block-packages.component';
import { MemberComponent } from './member/member/member.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { OrderComponent } from './order/order/order.component';
import { MobilityNumbersComponent } from './phone/mobility-numbers/mobility-numbers.component';
import { ReportComponent } from './agent/report/report.component';
import { ComparisonsComponent } from './comparisons/comparisons/comparisons.component';
import { ExcelOrderComponent } from './excel-order/excel-order/excel-order.component';
import { ExcelChargeComponent } from './excel-order/excel-charge/excel-charge.component';
import { HotmobileStatusComponent } from './hotmobile-status/hotmobile-status/hotmobile-status.component';
import { CellcomStatusComponent } from './cellcom-status/cellcom-status/cellcom-status.component';
import { NewGeneralReportComponent } from './report/new-general-report/new-general-report.component';
import { AgentsCreditsComponent } from './agents-credits/agents-credits/agents-credits.component';
import { AutoUpdateComponent } from './order/auto-update/auto-update.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';

const routes: Routes = [
  { path: AppConst.Routes.home.path,component: HomeComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.consumers.path,component: ConsumerComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.new_order.path,component: NewChargeComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.addConsumer.path,component: AddConsumerComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.editConsumer.path,component: EditConsumerComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.viewConsumer.path,component: ProfileComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.viewAgent.path,component: AgentComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.login.path, component: LoginComponent },
  { path: AppConst.Routes.viewPhoneInfo.path, component: PhoneInfoComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.phones.path, component: PhoneComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.companies.path, component: CompanyComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.permissions.path, component: IpPermissonComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.settings.path, component: SettingsComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.users.path, component: UsersComponent , canActivate: [AuthGuard] },  
  { path: AppConst.Routes.users.add.path, component: AddUserComponent , canActivate: [AuthGuard] },  
  { path: AppConst.Routes.users.edit.path, component: EditUserComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.products.path, component: ProductComponent , canActivate: [AuthGuard] }, 
  { path: AppConst.Routes.price_list.path, component: PriceListComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.discounts.path, component: GlobalDiscountComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.block_packages.path, component: BlockPackagesComponent , canActivate: [AuthGuard] },   
  { path: AppConst.Routes.members.path, component: MemberComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.payments.path, component: PaymentComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.orders.path, component: OrderComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.mobility_numbers.path, component: MobilityNumbersComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.agents_report.path, component: ReportComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.comparisons.path, component: ComparisonsComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.excel_order.path, component: ExcelOrderComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.excel_charge.path, component: ExcelChargeComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.status_hotmobile.path, component: HotmobileStatusComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.status_cellcom.path, component: CellcomStatusComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.general_report.path, component: NewGeneralReportComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.agents_acounts.path, component: AgentsCreditsComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.automatic_update.path, component: AutoUpdateComponent , canActivate: [AuthGuard] },
  { path: AppConst.Routes.viewOrderInfo.path, component: OrderInfoComponent , canActivate: [AuthGuard] },
  
  // { path: AppConst.Routes.new_charge.path,      component: NewChargeComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.sims.path, component: SimComponent , canActivate: [AuthGuard,CanEditGuard]},
  { path: AppConst.Routes.redirect_to.path, redirectTo: '', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
