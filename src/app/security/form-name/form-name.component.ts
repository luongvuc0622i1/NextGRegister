import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-name',
  template: `
    <form [formGroup]="form" (ngSubmit)="continue()">
      <p style="color: red">{{statusLogin}}</p>
      <div style="display: flex;">
        <div class="group-col left">
          <input type="text" formControlName="firstName" placeholder="First Name" (keyup)="validateFName()" />
          <span class="error">{{statusFName}}</span>
        </div>
        <div class="group-col right">
          <input type="text" formControlName="lastName" placeholder="Last Name" (keyup)="validateLName()" />
          <span class="error">{{statusLName}}</span>
        </div>
      </div>
      <input type="text" formControlName="email" placeholder="Email" (keyup)="validateEmail()" *ngIf="status" readonly />
      <input type="text" formControlName="email" placeholder="Email" *ngIf="!status" />
      <span class="error">{{statusEmail}}</span>
      <button class="button-form">Continue<span class="material-symbols-outlined">east</span></button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormNameComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Output() switchTemplate = new EventEmitter<string>();
  statusLogin: string = '';
  statusFName: string = '';
  statusLName: string = '';
  statusEmail: string = '';
  status: boolean = false;

  ngOnInit(): void {
    if (this.form.value.email) {
      this.status = true;
    }
  }

  continue() {
    if (!this.statusFName && !this.statusLName && !this.statusEmail) {
      this.switchTemplate.emit('password');
    }
  }

  validateFName() {
    if (!this.form.value.firstName) {
      this.statusFName = 'First Name is require';
    } else this.statusFName = '';
  }

  validateLName() {
    if (!this.form.value.lastName) {
      this.statusLName = 'Last Name is require';
    } else this.statusLName = '';
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