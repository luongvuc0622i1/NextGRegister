import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
        <form [formGroup]="formNo">
          <input type="text" formControlName="no1" />
          <input type="text" formControlName="no2" />
          <input type="text" formControlName="no3" />
          <input type="text" formControlName="no4" />
          <input type="text" formControlName="no5" />
          <input type="text" formControlName="no6" />
        </form>
        <button class="button-form" (click)="continue()">Continue<span class="material-symbols-outlined">east</span></button>
      </div>
    </div>
`,
  styleUrls: ['../../security/security.component.css']
})
export class VerificationPhoneComponent {
  // @ts-ignore
  @Input() phoneInput: string;
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() verificationPhone = new EventEmitter<any>();
  formNo: FormGroup = new FormGroup({
    no1: new FormControl(),
    no2: new FormControl(),
    no3: new FormControl(),
    no4: new FormControl(),
    no5: new FormControl(),
    no6: new FormControl(),
  });

  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl(),
    otpNumber: new FormControl(),
  });

  switchTo() {
    this.switchTemplate.emit('phone');
  }

  continue() {
    let phoneNumber = '';
    if (this.phoneInput.startsWith("0")) {
      phoneNumber = this.phoneInput.substring(1); // Loại bỏ số 0 đầu tiên
    } else if (this.phoneInput.startsWith("+84")) {
      phoneNumber = this.phoneInput.substring(3); // Loại bỏ số +84 đầu tiên
    } else {
      phoneNumber = this.phoneInput;
    }
    this.form.setValue({
      phoneNumber: phoneNumber,
      otpNumber: this.formNo.value.no1 + this.formNo.value.no2 + this.formNo.value.no3 + this.formNo.value.no4 + this.formNo.value.no5 + this.formNo.value.no6,
    });
    this.verificationPhone.emit(this.form.value);
  }
}
