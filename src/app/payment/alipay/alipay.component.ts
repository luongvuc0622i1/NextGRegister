import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alipay',
  template: `
    <form [formGroup]="formPayByAlipay">
      <div class="mb-20 relative">
        <label class="input-label" for="cardholderName">Cardholder Name</label>
        <input class="input-card input-field" type="text" id="cardholderName" formControlName="cardholderName" />
      </div>
      <div class="input-container mb-20">
        <div class="pc50 relative">
          <label class="input-label" for="billingAddress">Billing Address</label>         
          <select class="input-card input-field address" id="billingAddress" formControlName="billingAddress">
            <option selected disabled hidden></option>
            <option *ngFor="let option of countries">{{ option }}</option>
          </select>
          <i class="fa-solid fa-chevron-down icon-input fs-20 right-5"></i>
        </div>
        <div class="pc50 relative" style="margin-left: 20px;">
          <label class="input-label" for="postalCode">Postal Code</label>
          <input class="input-card input-field" type="text" id="postalCode" formControlName="postalCode" />
        </div>
      </div>
      <div class="mb-20 relative">
        <label class="input-label" for="taxIDNumber">Tax ID Number (Optional)</label>
        <input class="input-card input-field" type="text" id="taxIDNumber" formControlName="taxIDNumber" />
      </div>
    </form>
    <form [formGroup]="formTotal">
      <div class="mb-20">
        <div class="relative">
          <label class="input-label" for="discountCode">Discount Code (Optional)</label>
          <input class="input-card input-field" type="text" id="discountCode" formControlName="discountCode" />
          <!-- <i class="fa-brands fa-cc-visa icon-input fs-30"></i> -->
          <a (click)="findDiscount()" class="apply">Apply</a>
        </div>
        <span class="error">{{formTotal.value.statusApplyDiscountCode}}</span>
      </div>
      <div class="input-container">
        <p class="total">Subtotal</p>
        <p class="total" *ngIf="formTotal.value.subTotal">{{ '$' + (formTotal.value.subTotal | number: '1.2-2') }}</p>
      </div>
      <div class="input-container">
        <p class="total">Discount</p>
        <p class="total" *ngIf="formTotal.value.discount">{{ '-$' + (formTotal.value.discount | number: '1.2-2') }}</p>
      </div>
      <div class="input-container mb-10">
        <p class="total">Taxes</p>
        <p class="total" *ngIf="formTotal.value.taxes">{{ '$' + (formTotal.value.taxes | number: '1.2-2') }}</p>
      </div>
      <div class="input-container mb-20">
        <p class="total" style="font-size: 20px; font-weight:700;">Total Pay</p>
        <p class="total" style="font-size: 20px; font-weight:700;" *ngIf="formTotal.value.totalPay">{{ '$' + (formTotal.value.totalPay | number: '1.2-2') }}</p>
      </div>
      <div class="input-card button-pay" *ngIf="!formTotal.value.totalPay">Pay</div>
      <div class="input-card button-pay button-pay-hover" *ngIf="formTotal.value.totalPay" (click)="payWithAlipay()">Pay {{ '$' + (formTotal.value.totalPay | number: '1.2-2') }}</div>
    </form>
  `,
  styleUrls: ['../payment.component.css']
})
export class AlipayComponent {
  // @ts-ignore
  @Input formTotal: FormGroup;
  // @ts-ignore
  @Input countries: string[];
  @Output() findDiscountPer = new EventEmitter<string>();
  @Output() payByAlipay = new EventEmitter<any>();
  formPayByAlipay: FormGroup = new FormGroup({
    cardholderName: new FormControl(),
    billingAddress: new FormControl(''),
    postalCode: new FormControl(),
    taxIDNumber: new FormControl(),
  });

  ngDoCheck(): void {
    const subTotal = this.formTotal.value.subTotal;
    const discount = subTotal * this.formTotal.value.discountPer / 100;
    const taxes = subTotal * 0.1;
    const totalPay = subTotal - discount + taxes;
    this.formTotal.patchValue({
      discount: discount,
      taxes: taxes,
      totalPay: totalPay,
    });
  }

  ngAfterViewInit(): void {
    const arr = ['cardholderName', 'billingAddress', 'postalCode', 'taxIDNumber', 'discountCode'];
    arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;

      if (inputField.value !== '' && inputField.previousElementSibling) {
        const label = inputField.previousElementSibling as HTMLElement;
        label.style.fontSize = '12px';
        label.style.transform = 'translateY(-10px)';
        label.style.color = '#333';
      } else if (inputField.previousElementSibling) {
        const label = inputField.previousElementSibling as HTMLElement;
        label.style.fontSize = '';
        label.style.transform = '';
        label.style.color = '#999';
      }

      inputField.addEventListener('focus', () => {
        if (inputField.previousElementSibling) {
          const label = inputField.previousElementSibling as HTMLElement;
          label.style.fontSize = '12px';
          label.style.transform = 'translateY(-10px)';
          label.style.color = '#333';
        }
      });

      inputField.addEventListener('blur', () => {
        if (inputField.value === '' && inputField.previousElementSibling) {
          const label = inputField.previousElementSibling as HTMLElement;
          label.style.fontSize = '';
          label.style.transform = '';
          label.style.color = '#999';
        }
      });
    });
  }
  
  findDiscount() {
    this.findDiscountPer.emit(this.formTotal.value.discountCode);
  }

  payWithAlipay() {
    this.payByAlipay.emit({
      'formTotal': this.formTotal,
      'formPayByAlipay': this.formPayByAlipay,
    });
  }
}