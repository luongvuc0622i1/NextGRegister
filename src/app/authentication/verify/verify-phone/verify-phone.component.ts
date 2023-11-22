import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verify-phone',
  template: `
    <div class="verify-phone-container">
      <div class="content">
        <div class="sub-content relative">
          <div class="back pointer" (click)="goBack()">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7593 7.90674L4.66602 16.0001L12.7593 24.0934" stroke="#314DD3" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M27.3365 16H4.89648" stroke="#314DD3" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="heading-5 color-blue-600">Enter Verification Code</div>
          <div class="ta-center">
            <div class="body-4 color-gray-1">Your verification codes is sent via number</div>
            <div class="button-1 color-primary">{{phone}}</div>
          </div>
          <div class="component">
            <input class="input-field body-4 hv" />
            <input class="input-field body-4 hv" />
            <input class="input-field body-4 hv" />
            <input class="input-field body-4 hv" />
            <input class="input-field body-4 hv" />
            <input class="input-field body-4 hv" />
          </div>
        </div>
        <div class="button-pay button-1 color-gray-1 button-pay-hover">Continue</div>
      </div>
      <div class="resend">
        <div class="body-5 color-gray-1">Did not receive the code?</div>
        <div class="button-3 color-primary pointer">Resend</div>
      </div>
    </div>
  `,
  styleUrls: ['../../../authentication/authentication.component.css']
})
export class VerifyPhoneComponent {
  // @ts-ignore
  @Input() phone: string;

  goBack() {
    // Quay lại trang trước đó
    window.history.back();
  }
}
