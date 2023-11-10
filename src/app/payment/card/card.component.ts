import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  template: `
    <form [formGroup]="form">
      <div class="mb-20 relative">
        <input class="input-card" formControlName="cardNumber" (input)="checkType($event)">
        <i class="fa-brands icon-input fs-30" [ngClass]="{
          'fa-cc-visa': form.value.cardType === 'Visa' || !form.value.cardType,
          'fa-cc-mastercard': form.value.cardType === 'MasterCard',
          'fa-cc-amex': form.value.cardType === 'American Express',
          'fa-cc-discover': form.value.cardType === 'Discover',
          'fa-cc-jcb': form.value.cardType === 'JCB',
          'fa-cc-diners-club': form.value.cardType === 'Diners Club'
        }" style="color: blue;"></i>
      </div>

      <div class="mb-20 relative">
        <label class="input-label" for="cardholderName">Cardholder Name</label>
        <input class="input-card input-field" type="text" id="cardholderName" formControlName="cardholderName" />
      </div>
      <div class="input-container mb-20">
        <div class="pc50 relative">
          <label class="input-label" for="expriration">Expriration</label>
          <input class="input-card input-field" type="text" id="expriration" formControlName="expriration" />
          <i class="fa-solid fa-calendar-days icon-input fs-25 right-5"></i>
        </div>
        <div class="pc50 relative" style="margin-left: 20px;">
          <label class="input-label" for="cvc">CVC</label>
          <input class="input-card input-field" type="text" id="cvc" formControlName="cvc" />
        </div>
      </div>
      <div class="input-container mb-20">
        <div class="pc50 relative">
          <label class="input-label" for="billingAddress">Billing Address</label>         
          <select class="input-card input-field address" id="billingAddress">
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
      <div class="mb-20 relative">
        <label class="input-label" for="discountCode">Discount Code (Optional)</label>
        <input class="input-card input-field" type="text" id="discountCode" formControlName="discountCode" />
        <!-- <i class="fa-brands fa-cc-visa icon-input fs-30"></i> -->
        <a (click)="findDiscount()" class="apply">Apply</a>
      </div>
      <div class="input-container">
        <p class="total">Subtotal</p>
        <p class="total">{{ '$' + (form.value.subTotal | number: '1.2-2') }}</p>
      </div>
      <div class="input-container">
        <p class="total">Discount</p>
        <!-- <p class="total">{{ '-$' + (form.value.discount | number: '1.2-2') }}</p> -->
        <p class="total">{{ '-$' + (formDiscount.value.discountPer | number: '1.2-2') }}</p>
      </div>
      <div class="input-container mb-10">
        <p class="total">Taxes</p>
        <p class="total">{{ '$' + (form.value.taxes | number: '1.2-2') }}</p>
      </div>
      <div class="input-container mb-20">
        <p class="total" style="font-size: 20px; font-weight:700;">Total Pay</p>
        <p class="total" style="font-size: 20px; font-weight:700;">{{ '$' + (form.value.totalPay | number: '1.2-2') }}</p>
      </div>
    </form>
  `,
  styleUrls: ['../payment.component.css']
})
export class CardComponent implements AfterViewInit {
  // @ts-ignore
  @Input price: number;
  // @ts-ignore
  @Input countries: string[];
  // @ts-ignore
  @Input formDiscount: any;
  @Output() findDiscountPer = new EventEmitter<string>();
  form: FormGroup = new FormGroup({
    cardNumber: new FormControl(),
    cardType: new FormControl(),
    cardholderName: new FormControl(),
    expriration: new FormControl(),
    cvc: new FormControl(),
    billingAddress: new FormControl(),
    postalCode: new FormControl(),
    taxIDNumber: new FormControl(),
    discountCode: new FormControl(),
    subTotal: new FormControl(),
    discount: new FormControl(),
    taxes: new FormControl(),
    totalPay: new FormControl(),
  });

  ngOnInit() {
    this.form.patchValue({
      subTotal: this.price,
      taxes: this.price * 0.1,
    });
  }
  
  ngAfterViewInit(): void {
    this.form.patchValue({
      discount: this.formDiscount.value.discountPer,
      totalPay: this.form.value.subTotal - this.form.value.discount + this.form.value.taxes,
    });

    const arr = ['cardholderName', 'expriration', 'cvc', 'billingAddress', 'postalCode', 'taxIDNumber', 'discountCode'];
    arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;

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

  checkType(event: any) {
    const cardNumber = event.target.value;
    let cardType = "";
    if (/^4/.test(cardNumber)) {
      cardType = "Visa";
    } else if (/^5[1-5]/.test(cardNumber)) {
      cardType = "MasterCard";
    } else if (/^3[47]/.test(cardNumber)) {
      cardType = "American Express";
    } else if (/^6(?:011|5)/.test(cardNumber)) {
      cardType = "Discover";
    } else if (/^(?:2131|1800|35)/.test(cardNumber)) {
      cardType = "JCB";
    } else if (/^3(?:0[0-5]|[68])/.test(cardNumber)) {
      cardType = "Diners Club";
    }
    this.form.patchValue({ cardType: cardType });
  }

  findDiscount() {
    this.findDiscountPer.emit(this.form.value.discountCode);
  }
}