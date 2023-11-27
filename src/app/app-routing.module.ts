import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {
    path: 'users/:path',
    component: AuthenticationComponent
  },
  {
    path: 'settings', canActivate: [AuthGuard],
    component: DefaultLayoutComponent
  },
  {
    path: 'payment', canActivate: [AuthGuard],
    component: DefaultLayoutComponent
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: DefaultLayoutComponent
  },
  {
    path: '**', // Catch-all route cho những đường dẫn không hợp lệ
    component: DefaultLayoutComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
