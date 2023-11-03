import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-password',
  template: `
    <form [formGroup]="form">
      <p style="color: red">{{statusLogin}}</p>
      <input type="password" formControlName="password" placeholder="Password" autocomplete="current-password" required=""
          id="id_password" (keyup)="validatePassword()" />
      <span class="error">{{statusPassword}}</span>
      <span class="material-symbols-outlined eye" id="togglePassword">visibility</span><br>
      <input type="password" formControlName="confirm" placeholder="Confirm Password" autocomplete="current-password" required=""
          id="id_confirm" (keyup)="validateConfirm()" />
      <span class="error">{{statusConfirm}}</span>
      <span class="material-symbols-outlined eye" id="toggleConfirm">visibility</span><br>
      <!-- <button (click)="back()">Back</button> -->
      <button class="button-form" (click)="continue()">Continue<span class="material-symbols-outlined">east</span></button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormPasswordComponent implements AfterViewInit {
  // @ts-ignore
  @Input() form: FormGroup;
  // @ts-ignore
  @Input() isResetPassword: boolean;
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() signUp = new EventEmitter<void>();
  @Output() resetPassword = new EventEmitter<void>();
  statusLogin: string = '';
  statusPassword: string = '';
  statusConfirm: string = '';

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
    
    // Show password click eye
    const toggleConfirm = document.querySelector('#toggleConfirm');
    const confirm = document.querySelector('#id_confirm');

    // @ts-ignore
    toggleConfirm.addEventListener('click', function (e) {
      // @ts-ignore
      const type = confirm.getAttribute('type') === 'password' ? 'text' : 'password';
      // @ts-ignore
      confirm.setAttribute('type', type);
    });
  }

  back() {
    this.switchTemplate.emit('name');
  }

  continue() {
    if (!this.statusPassword && !this.statusConfirm) {
      console.log(this.form.value);
      // if (this.isResetPassword) {
      //   this.resetPassword.emit();
      // } else {
      //   if (this.form.value.token || this.form.value.otp) {
      //     this.signUp.emit();
      //   }
      // }
    }
  }

  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.form.value.password) {
      this.statusPassword = 'Password is require';
    } else if (!passwordRegex.test(this.form.value.password)) {
      this.statusPassword = 'Minimum is 8 characters with at least 1 upcase';
    } else this.statusPassword = '';
  }

  validateConfirm() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.form.value.confirm) {
      this.statusConfirm = 'Password is require';
    } else if (!passwordRegex.test(this.form.value.confirm)) {
      this.statusConfirm = 'Minimum is 8 characters with at least 1 upcase';
    } else if (this.form.value.confirm != this.form.value.password) {
      this.statusConfirm = 'Confirm Password must be the same with Password';
    } else this.statusConfirm = '';
  }
}