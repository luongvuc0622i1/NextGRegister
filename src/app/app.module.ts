import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {Auth_interceptor} from "./service/auth_interceptor";
import { HomeComponent } from './home/home.component';
import { FormPhoneComponent } from './security/form-phone/form-phone.component';
import { SecurityComponent } from './security/security.component';
import { FormEmailComponent } from './security/form-email/form-email.component';
import { FormEmailPassComponent } from './security/form-email-pass/form-email-pass.component';
import { VerificationEmailComponent } from './security/verification-email/verification-email.component';
import { VerificationPhoneComponent } from './security/verification-phone/verification-phone.component';
import { FormNameComponent } from './security/form-name/form-name.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecurityComponent,
    FormEmailPassComponent,
    FormPhoneComponent,
    FormEmailComponent,
    VerificationEmailComponent,
    VerificationPhoneComponent,
    FormNameComponent
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
