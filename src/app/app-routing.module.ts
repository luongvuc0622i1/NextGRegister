import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInWithEmailComponent } from './sign-in-with-email/sign-in-with-email.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    component: SignInWithEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
