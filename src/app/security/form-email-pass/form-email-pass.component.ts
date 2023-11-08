import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMessages } from '../../../environments/error-messages';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-form-email-pass',
  template: `
    <div class="form" style="margin-top: 40px;">
      <img src="../../assets/nextG.png" />
      <h4>{{title}}</h4>
      <span>Please enter your credentials to access your account.</span>
    </div>
    <form [formGroup]="form" (ngSubmit)="login()">
      <input type="email" formControlName="email" placeholder="Email" (keyup)="validateEmail()" />
      <span class="error">{{statusEmail}}</span>
      <div class="relative">
        <input type="password" formControlName="password" placeholder="Password" autocomplete="current-password" required=""
          id="id_password" (keyup)="validatePassword()" />
        <span class="material-symbols-outlined eye" id="togglePassword">visibility</span>
      </div>
      <span class="error">{{statusPassword}}</span>
      <div>
        <a style="float: left;" (click)="switchTo()">{{title}} {{labelSwitch}}</a>
        <a style="float: right;" (click)="forgotPassword()">Forgot password?</a>
      </div>
      <div *ngIf="error">
        {{ errorMessages[error.status] || 'Lỗi không xác định' }}
      </div>
      <button class="button-form">Sign In</button>
    </form>
    <div class="form">
      <a style="text-align: center;" (click)="this.switchPage.emit()">{{footer}}</a>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormEmailPassComponent implements AfterViewInit {
  // @ts-ignore
  @Input() title: string;
  // @ts-ignore
  @Input() labelSwitch: string;
  // @ts-ignore
  @Input() footer: string;
  @Output() switchPage = new EventEmitter<void>();
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() forgotPass = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<any>();
  error: HttpErrorResponse | null = null;
  errorMessages = errorMessages;
  statusEmail: string = '';
  statusPassword: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private errorService: ErrorService) { }

  ngAfterViewInit() {
    // Show password click eye
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');

    // @ts-ignore
    togglePassword.addEventListener('click', function (e) {
      // @ts-ignore
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      // @ts-ignore
      password.setAttribute('type', type);
    });
  }

  switchTo() {
    this.switchTemplate.emit('phone');
  }

  forgotPassword() {
    this.forgotPass.emit();
  }

  login() {
    if (this.statusEmail === '' && this.statusPassword === '') {
      this.errorService.error$.subscribe((error) => {
        this.error = error;
      });
      this.signIn.emit(this.form.value);
    }
  }

  validateEmail() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.form.value.email) {
      this.statusEmail = 'Email is require';
    } else if (!emailRegex.test(this.form.value.email)) {
      this.statusEmail = 'Email format is not correct';
    } else this.statusEmail = '';
  }

  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.form.value.password) {
      this.statusPassword = 'Password is require';
    } else if (!passwordRegex.test(this.form.value.password)) {
      this.statusPassword = 'Minimum is 8 characters with at least 1 upcase';
    } else this.statusPassword = '';
  }
}