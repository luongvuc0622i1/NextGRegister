import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {Auth_interceptor} from "./service/auth_interceptor";
import { SignInWithEmailComponent } from './security/sign-in-with-email/sign-in-with-email.component';
import { HomeComponent } from './home/home.component';
import { SignInWithPhoneComponent } from './security/sign-in-with-phone/sign-in-with-phone.component';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecurityComponent,
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
