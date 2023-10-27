import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth.guard';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuard],
    component: HomeComponent
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
