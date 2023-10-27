import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {Auth_interceptor} from "./service/auth_interceptor";
import { SignInWithEmailComponent } from './sign-in/sign-in-with-email/sign-in-with-email.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInWithPhoneComponent } from './sign-in/sign-in-with-phone/sign-in-with-phone.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignInWithEmailComponent,
    SignInWithPhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth_interceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
