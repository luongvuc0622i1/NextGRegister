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
import { RegisterComponent } from './security/register.component';
import { FormNameComponent } from './security/form-name/form-name.component';
import { FormPasswordComponent } from './security/form-password/form-password.component';
import { ResetPasswordComponent } from './security/resetPassword.component';
import { DataService } from './service/data.service';
import { GeneralProfileComponent } from './home/general-profile/general-profile.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { PaymentComponent } from './payment/payment.component';
import { PaymentCardComponent } from './payment/payment-card/payment-card.component';
import { CardComponent } from './payment/card/card.component';
import { AlipayComponent } from './payment/alipay/alipay.component';
import { PaymentPaypalComponent } from './payment/payment-paypal/payment-paypal.component';
import { BankComponent } from './payment/bank/bank.component';
import { SettingsComponent } from './settings/settings.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { NavigationComponent } from './default-layout/navigation/navigation.component';
import { FooterComponent } from './default-layout/footer/footer.component';
import { GeneralComponent } from './settings/general/general.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

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
    ResetPasswordComponent,
    RegisterComponent,
    FormNameComponent,
    FormPasswordComponent,
    NavigationComponent,
    GeneralProfileComponent,
    PaymentComponent,
    PaymentCardComponent,
    CardComponent,
    PaymentPaypalComponent,
    AlipayComponent,
    BankComponent,
    SettingsComponent,
    FooterComponent,
    DefaultLayoutComponent,
    GeneralComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth_interceptor, multi: true
    },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
