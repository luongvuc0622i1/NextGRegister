import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {Auth_interceptor} from "./service/auth_interceptor";
import { DataService } from './service/data.service';
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
import { ErrorService } from './service/error.service';
import { PasswordComponent } from './settings/password/password.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormInputEmailPassComponent } from './authentication/form-input-email-pass/form-input-email-pass.component';
import { FormInputEmailComponent } from './authentication/form-input-email/form-input-email.component';
import { FormInputPhoneComponent } from './authentication/form-input-phone/form-input-phone.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyComponent } from './authentication/verify/verify.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyPhoneComponent } from './authentication/verify/verify-phone/verify-phone.component';
import { VerifyEmailComponent } from './authentication/verify/verify-email/verify-email.component';
import { FormInputNameComponent } from './authentication/form-input-name/form-input-name.component';
import { SignUpValidatedComponent } from './authentication/sign-up-validated/sign-up-validated.component';
import { ForgotPasswordValidatedComponent } from './authentication/forgot-password-validated/forgot-password-validated.component';
import { FormInputPasswordComponent } from './authentication/form-input-password/form-input-password.component';
import { BillingComponent } from './settings/billing/billing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
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
    LandingPageComponent,
    PasswordComponent,
    AuthenticationComponent,
    FormInputEmailPassComponent,
    FormInputEmailComponent,
    FormInputPhoneComponent,
    SignInComponent,
    VerifyPhoneComponent,
    VerifyEmailComponent,
    VerifyComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    FormInputNameComponent,
    SignUpValidatedComponent,
    ForgotPasswordValidatedComponent,
    FormInputPasswordComponent,
    BillingComponent
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
      useClass: Auth_interceptor,
      multi: true
    },
    DataService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
