import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-phone',
  template: `
    <div class="form-container sign-in-container">
      <div class="form" style="margin-top: 40px;">
        <img src="../../assets/nextG.png" />
        <h4>{{title}}</h4>
        <span>Please enter your credentials to access your account.</span>
      </div>
      <form [formGroup]="form" (ngSubmit)="continue()">
        <p style="color: red">{{statusLogin}}</p>
          <input type="text" formControlName="phone" placeholder="Phone Number"  (blur)="validatePhone()" (click)="statusPhone = ''" />
          <span class="error">{{statusPhone}}</span>
          <div>
            <a style="float: left;" (click)="switchTo()">{{title}} {{labelSwitch}}</a>
          </div>
          <button class="button-form">Continue<span class="material-symbols-outlined">east</span></button>
      </form>
      <div class="form">
        <a style="text-align: center;" (click)="this.switchPage.emit()">{{footer}}</a>
      </div>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormPhoneComponent {
  // @ts-ignore
  @Input() title: string;
  // @ts-ignore
  @Input() labelSwitch: string;
  // @ts-ignore
  @Input() footer: string;
  @Output() switchPage = new EventEmitter<void>();
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() sendOtp = new EventEmitter<string>();
  statusLogin: string = '';
  statusPhone: string = '';

  form: FormGroup = new FormGroup({
    phone: new FormControl(),
    password: new FormControl(),
  });

  switchTo() {
    if (this.title == 'Sign In') {
      this.switchTemplate.emit('email-pass');
    } else {
      this.switchTemplate.emit('email');
    }
  }

  continue() {
    if (!this.statusPhone) {
      this.switchTemplate.emit('verification-phone');
      this.sendOtp.emit(this.form.value.phone);
    }
  }

  validatePhone() {
    if (!this.form.value.phone) {
      this.statusPhone = 'Phone Number is require';
    }
  }
}