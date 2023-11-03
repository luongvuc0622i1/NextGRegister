import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verification-email',
  template: `
    <div class="form-container sign-in-container">
      <div class="verification">
        <div style="display: flex; align-items: center">
          <button class="arrow" (click)='switchTo()'>
            <span class="material-symbols-outlined">keyboard_backspace</span>
          </button>
          <h4>Email Verification</h4>
        </div>
        <span>We have sent an email to this address to verify your email address and activate your account.</span>
        <p>{{this.form.value.email}}</p>
        <span>If you did not receive any email. Resend verification email.</span>
      </div>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class VerificationEmailComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Output() switchTemplate = new EventEmitter<string>();

  switchTo() {
    this.switchTemplate.emit('email');
  }
}