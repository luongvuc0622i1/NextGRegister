import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth.guard';
import { SecurityComponent } from './security/security.component';
import { RegisterComponent } from './security/register.component';
import { ResetPasswordComponent } from './security/resetPassword.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'card', canActivate: [AuthGuard],
    component: CardComponent
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
