import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-email',
  template: `
    <div class="form-container sign-in-container">
      <div class="form" style="margin-top: 40px;">
        <img src="../../assets/nextG.png" />
        <h4>{{title}}</h4>
        <span>Please enter your credentials to access your account.</span>
      </div>
      <form [formGroup]="form" (ngSubmit)="continue()">
        <p style="color: red">{{statusLogin}}</p>
          <input type="text" formControlName="email" placeholder="Email" (keyup)="validateEmail()" />
          <span class="error">{{statusEmail}}</span>
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
export class FormEmailComponent {
  // @ts-ignore
  @Input() title: string;
  // @ts-ignore
  @Input() labelSwitch: string;
  // @ts-ignore
  @Input() footer: string;
  @Output() switchPage = new EventEmitter<void>();
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() sendVerificationEmail = new EventEmitter<string>();
  statusEmail: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(),
  });
  statusLogin: string = '';

  switchTo() {
    this.switchTemplate.emit('phone');
  }

  continue() {
    if (!this.statusEmail) {
      this.switchTemplate.emit('verification-email');
      this.sendVerificationEmail.emit(this.form.value.email);
    }
  }

  validateEmail() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.form.value.email) {
      this.statusEmail= 'Email is require';
    } else if (!emailRegex.test(this.form.value.email)) {
      this.statusEmail = 'Email format is not correct';
    } else this.statusEmail = '';
  }
}