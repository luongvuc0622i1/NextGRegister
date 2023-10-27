import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verification-email',
  template: `
    <div class="form-container sign-in-container">
      <div class="verification">
        <h2>Email Verification</h2>
        <span>We have sent an email to this address to verify your email address and activate your account.</span>
        <p>{{emailInput}}</p>
        <span>If you did not receive any email. Resend verification email.</span>
        <button (click)='switchTo()'>Back</button>
      </div>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class VerificationEmailComponent {
  // @ts-ignore
  @Input() emailInput: string;
  @Output() switchTemplate = new EventEmitter<string>();

  switchTo() {
    this.switchTemplate.emit('email');
  }
}