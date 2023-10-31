import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-email-pass',
  template: `
    <div class="form-container sign-in-container">
      <div class="form" style="margin-top: 40px;">
        <img src="../../assets/nextG.png" />
        <h4>{{title}}</h4>
        <span>Please enter your credentials to access your account.</span>
      </div>
      <form [formGroup]="form" (ngSubmit)="login()">
        <p style="color: red">{{statusLogin}}</p>
        <input type="text" formControlName="email" placeholder="Email" />
        <input type="password" formControlName="password" placeholder="Password" autocomplete="current-password" required=""
          id="id_password">
        <span class="material-symbols-outlined eye" id="togglePassword">visibility</span><br>
        <div>
            <a style="float: left;" (click)="switchTo()">{{title}} {{labelSwitch}}</a>
            <a style="float: right;" (click)="forgotPassword()">Forgot password?</a>
        </div>
        <button class="button-form">Sign In</button>
      </form>
      <div class="form">
        <a style="text-align: center;" (click)="this.switchPage.emit()">{{footer}}</a>
      </div>
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
  @Input() statusLogin: string;
  // @ts-ignore
  @Input() footer: string;
  @Output() switchPage = new EventEmitter<void>();
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() forgotPass = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<any>();

  form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

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
    this.signIn.emit(this.form.value);
  }
}