import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-name',
  template: `
    <form [formGroup]="form" (ngSubmit)="continue()">
      <p style="color: red">{{statusLogin}}</p>
      <div style="display: flex;">
        <div class="group-col left">
          <input type="text" formControlName="firstName" placeholder="First Name" (blur)="validateFName()" (click)="statusFName = ''" />
          <span class="error">{{statusFName}}</span>
        </div>
        <div class="group-col right">
          <input type="text" formControlName="lastName" placeholder="Last Name" (blur)="validateLName()" (click)="statusLName = ''" />
          <span class="error">{{statusLName}}</span>
        </div>
      </div>
      <input type="text" formControlName="email" placeholder="Email" [attr.readonly]="form.value.email ? true : null" (blur)="validateEmail()" (click)="statusEmail = ''" />
      <span class="error">{{statusEmail}}</span>
      <button class="button-form">Continue<span class="material-symbols-outlined">east</span></button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormNameComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  // @ts-ignore
  // @Input() email: string;
  @Output() switchTemplate = new EventEmitter<string>();
  statusLogin: string = '';
  statusFName: string = '';
  statusLName: string = '';
  statusEmail: string = '';

  continue() {
    if (!this.statusFName && !this.statusLName && !this.statusEmail) {
      this.switchTemplate.emit('password');
    }
  }

  validateFName() {
    if (!this.form.value.firstName) {
      this.statusFName = 'First Name is require';
    }
  }

  validateLName() {
    if (!this.form.value.lastName) {
      this.statusLName = 'Last Name is require';
    }
  }

  validateEmail() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.form.value.email) {
      this.statusEmail= 'Email is require';
    } else if (!emailRegex.test(this.form.value.email)) {
      this.statusEmail = 'Email format is not correct';
    }
  }
}