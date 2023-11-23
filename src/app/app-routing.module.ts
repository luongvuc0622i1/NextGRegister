import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { SecurityComponent } from './security/security.component';
import { RegisterComponent } from './security/register.component';
import { ResetPasswordComponent } from './security/resetPassword.component';
import { PaymentComponent } from './payment/payment.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {
    path: 'users/:path',
    component: AuthenticationComponent
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: DefaultLayoutComponent
  },
  {
    path: 'payment', canActivate: [AuthGuard],
    component: PaymentComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    component: SecurityComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
