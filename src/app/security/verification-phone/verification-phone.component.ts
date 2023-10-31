import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verification-phone',
  template: `
    <div class="form-container sign-in-container">
      <div class="verification">
        <div style="display: flex; align-items: center">
          <button class="arrow" (click)='switchTo()'>
            <span class="material-symbols-outlined">keyboard_backspace</span>
          </button>
          <h4>Enter Verification Code</h4>
        </div>
        <span>Your verification codes is sent via number</span>
        <p>{{phoneInput}}</p>
        <input />
        <button class="button-form">Continue<span class="material-symbols-outlined">east</span></button>
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

  continue() {
    //login with phone api
  }
}
