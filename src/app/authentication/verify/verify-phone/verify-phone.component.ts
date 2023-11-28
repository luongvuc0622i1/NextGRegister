import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ErrorService } from '../../../service/error.service';

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
            <div class="button-1 color-primary">{{displayPhone}}</div>
          </div>
          <form class="component" [formGroup]="formNumber">
            <input [maxLength]="1" class="input-field body-4 hv" type="text" formControlName="no1" (keyup)="next(1)" />
            <input #no2 [maxLength]="1" class="input-field body-4 hv" type="text" formControlName="no2" (keyup)="next(2)" />
            <input #no3 [maxLength]="1" class="input-field body-4 hv" type="text" formControlName="no3" (keyup)="next(3)" />
            <input #no4 [maxLength]="1" class="input-field body-4 hv" type="text" formControlName="no4" (keyup)="next(4)" />
            <input #no5 [maxLength]="1" class="input-field body-4 hv" type="text" formControlName="no5" (keyup)="next(5)" />
            <input #no6 [maxLength]="1" class="input-field body-4 hv" type="text" formControlName="no6" (keyup)="next(6)" />
          </form>
          <div class="mt-4 body-5 color-red">{{errorMessage}}</div>
        </div>
        <div class="button-pay button-1 color-gray-1 button-pay-hover" (click)="continue()">Continue</div>
      </div>
      <div class="resend">
        <div class="body-5 color-gray-1">Did not receive the code?</div>
        <div class="button-3 color-primary pointer" (click)="resend()">Resend</div>
      </div>
    </div>
  `,
  styleUrls: ['../../../authentication/authentication.component.css']
})
export class VerifyPhoneComponent {
  @Output() sendOtp = new EventEmitter<any>();
  @Output() verificationPhone = new EventEmitter<any>();
  @Output() return = new EventEmitter<void>();
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
  formNumber: FormGroup = new FormGroup({
    no1: new FormControl(),
    no2: new FormControl(),
    no3: new FormControl(),
    no4: new FormControl(),
    no5: new FormControl(),
    no6: new FormControl(),
  });
  phone: string = '';
  errorMessage: string = '';
  displayPhone: string = '';

  constructor(private dataService: DataService,
    private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.errorService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
    if (this.dataService.getData().phone) this.phone = this.dataService.getData().phone;
    this.displayPhone = '(+84) ' + this.phone.slice(3);
  }

  goBack() {
    this.return.emit();
  }

  next(id: number) {
    if (id === 1) this.no2Input.nativeElement.focus();
    if (id === 2) this.no3Input.nativeElement.focus();
    if (id === 3) this.no4Input.nativeElement.focus();
    if (id === 4) this.no5Input.nativeElement.focus();
    if (id === 5) this.no6Input.nativeElement.focus();
  }

  resend() {
    const obj = {
      "stream": this.dataService.getData().stream,
      "phone": this.phone,
    }
    this.sendOtp.emit(obj);
  }

  continue() {
    const obj = {
      "stream": this.dataService.getData().stream,
      "phone": this.phone,
      "otp": this.formNumber.value.no1 + this.formNumber.value.no2 + this.formNumber.value.no3 + this.formNumber.value.no4 + this.formNumber.value.no5 + this.formNumber.value.no6,
    }
    this.verificationPhone.emit(obj);
  }
}
