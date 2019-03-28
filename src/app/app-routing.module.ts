import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/home/home/home.component";
import { AuthGuard } from "src/app/login/auth.guard";
import { LoginComponent } from './login/login/login.component';
import { NewChargeComponent } from './agent/new-charge/new-charge.component';
import { SimComponent } from './sim/sim/sim.component';
import { CanEditGuard } from './login/can-edit.guard';
import { ConsumerComponent } from './consumer/consumer/consumer.component';

const routes: Routes = [
  { path: '',component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'התחברות', component: LoginComponent },

  { path: 'טעינה-חדשה',      component: NewChargeComponent , canActivate: [AuthGuard]},
  { path: 'מספרי-סים', component: SimComponent , canActivate: [AuthGuard,CanEditGuard]},
  { path: 'לקוחות',      component: ConsumerComponent , canActivate: [AuthGuard,CanEditGuard]},

  { path: '**', redirectTo: '', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
