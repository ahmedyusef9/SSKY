import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/home/home/home.component";
import { AuthGuard } from "src/app/login/auth.guard";
import { LoginComponent } from './login/login/login.component';
import { NewChargeComponent } from './agent/new-charge/new-charge.component';
import { SimComponent } from './sim/sim/sim.component';
import { CanEditGuard } from './login/can-edit.guard';
import * as AppConst from './app.const'; 
const routes: Routes = [
  { path: AppConst.Routes.home.path,component: HomeComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.login.path, component: LoginComponent },
  { path: AppConst.Routes.new_charge.path,      component: NewChargeComponent , canActivate: [AuthGuard]},
  { path: AppConst.Routes.sims.path, component: SimComponent , canActivate: [AuthGuard,CanEditGuard]},
  { path: AppConst.Routes.redirect_to.path, redirectTo: '', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
