import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verification-phone',
  template: `
    <div class="form-container sign-in-container">
      <div class="verification">
        <h2>Enter Verification Code</h2>
        <span>Your verification codes is sent via number</span>
        <p>{{phoneInput}}</p>
        <input />
        <button (click)='switchTo()'>Back</button>
        <button>Continue</button>
      </div>
    </div>
`,
  styleUrls: ['../../security/security.component.css']
})
export class VerificationPhoneComponent {
  // @ts-ignore
  @Input() phoneInput: string;
  @Output() switchTemplate = new EventEmitter<string>();

  switchTo() {
    this.switchTemplate.emit('phone');
  }
}
