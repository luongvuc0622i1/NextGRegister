import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verification-phone',
  template: `
    <div class="verification">
      <div style="display: flex; align-items: center">
        <button class="arrow" (click)='switchTo()'>
          <span class="material-symbols-outlined">keyboard_backspace</span>
        </button>
        <h4>Enter Verification Code</h4>
      </div>
      <span>Your verification codes is sent via number</span>
      <p>(+84) {{displayPhone}}</p>
      <form class="wr-otp-inp" [formGroup]="formNo">
        <input [maxLength]="1" class="otp-inp" type="text" formControlName="no1" (keyup)="next(1)" />
        <input #no2 [maxLength]="1" class="otp-inp" type="text" formControlName="no2" (keyup)="next(2)" />
        <input #no3 [maxLength]="1" class="otp-inp" type="text" formControlName="no3" (keyup)="next(3)" />
        <input #no4 [maxLength]="1" class="otp-inp" type="text" formControlName="no4" (keyup)="next(4)" />
        <input #no5 [maxLength]="1" class="otp-inp" type="text" formControlName="no5" (keyup)="next(5)" />
        <input #no6 [maxLength]="1" class="otp-inp" type="text" formControlName="no6" />
      </form>
      <button class="button-form" (click)="continue()">Continue<span class="material-symbols-outlined">east</span></button>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class VerificationPhoneComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() verificationPhone = new EventEmitter<any>();
  // @ts-ignore
  @ViewChild('no2') no2Input: ElementRef;
  // @ts-ignore
  @ViewChild('no3') no3Input: ElementRef;
  // @ts-ignore
  @ViewChild('no4') no4Input: ElementRef;
  // @ts-ignore
  @ViewChild('no5') no5Input: ElementRef;
  // @ts-ignore
  @ViewChild('no6') no6Input: ElementRef;
  formNo: FormGroup = new FormGroup({
    no1: new FormControl(),
    no2: new FormControl(),
    no3: new FormControl(),
    no4: new FormControl(),
    no5: new FormControl(),
    no6: new FormControl(),
  });
  displayPhone: string = '';

  ngOnInit(): void {
    this.displayPhone = this.form.value.phone
    if (this.displayPhone.startsWith("0")) {
      this.displayPhone = this.form.value.phone.slice(1);
    } else if (this.displayPhone.startsWith("+")) {
      this.displayPhone = this.form.value.phone.slice(3);
    }
  }

  switchTo() {
    this.switchTemplate.emit('phone');
  }

  continue() {
    const obj = {
      "phoneNumber": this.form.value.phone,
      "otpNumber": this.formNo.value.no1 + this.formNo.value.no2 + this.formNo.value.no3 + this.formNo.value.no4 + this.formNo.value.no5 + this.formNo.value.no6,
    }
    this.verificationPhone.emit(obj);
  }

  next(id: number) {
    if (id === 1) this.no2Input.nativeElement.focus();
    if (id === 2) this.no3Input.nativeElement.focus();
    if (id === 3) this.no4Input.nativeElement.focus();
    if (id === 4) this.no5Input.nativeElement.focus();
    if (id === 5) this.no6Input.nativeElement.focus();
  }
}