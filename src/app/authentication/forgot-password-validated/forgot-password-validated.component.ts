import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password-validated',
  template: `
    <div class="sub-container">
      <img class="img-nextG" src="../../assets/nextG.png" />
      <div class="content">
        <div class="heading-5 color-default">{{title}}</div>
        <div class="body-7 color-gray-300">Please enter new password.</div>
      </div>
      <app-form-input-password class="w-100" [form]="form" (goToSignIn)="goToSignIn.emit()" (continue)="submit()"></app-form-input-password>
      <div class="foot">
        <div class="body-5 gray-1">Already have an account?</div>
        <div class="button-3 pointer color-primary" (click)="goToSignIn.emit()">Sign In</div>
      </div>
    </div>
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class ForgotPasswordValidatedComponent {
  @Output() goToSignIn = new EventEmitter<void>();
  title: string = 'Create Password';
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    newPass: new FormControl(),
    confirmPass: new FormControl(),
    token: new FormControl(),
  });

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private authService: AuthService) {
    if (dataService.getData()) {            
      this.form.patchValue({
        phone: this.dataService.getData().phone,
        token: this.dataService.getData().token,
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      if (email) this.form.patchValue({ email: email });
      if (token) this.form.patchValue({ token: token });
    });
  }

  submit() {
    console.log(this.form.value)
    if (this.form.value.email) {
      const formResetPassword = {
        'email': this.form.value.email,
        'newPassword': this.form.value.newPass,
        'tokenChangePass': this.form.value.token,
      }
      this.authService.resetPasswordEmail(formResetPassword).subscribe(data => {
        const obj = {
          "email": data.email,
          "password": data.newPass
        }
        this.authService.loginEmail(obj).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    } else if (this.form.value.phone) {
      const formResetPassword = {
        'phoneNumber': this.form.value.phone,
        'newPassword': this.form.value.newPass,
        'tokenChangePass': this.form.value.token,
      }
      this.authService.resetPasswordPhone(formResetPassword).subscribe(data => {
        const obj = {
          "email": data.email,
          "password": data.newPass
        }
        this.authService.loginEmail(obj).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    }
  }
}
