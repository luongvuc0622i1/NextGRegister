import { AfterViewInit, Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  template: `
    <form [formGroup]="formPayByCard">
      <div class="mb-20">
        <div class="relative">
          <input class="input-card" formControlName="cardNumber" (input)="checkType($event)" (input)="onInputChange($event)" >
          <i class="fa-brands icon-input fs-30" [ngClass]="{
            'fa-cc-visa': formPayByCard.value.cardType === 'Visa' || !formPayByCard.value.cardType,
            'fa-cc-mastercard': formPayByCard.value.cardType === 'MasterCard',
            'fa-cc-amex': formPayByCard.value.cardType === 'American Express',
            'fa-cc-discover': formPayByCard.value.cardType === 'Discover',
            'fa-cc-jcb': formPayByCard.value.cardType === 'JCB',
            'fa-cc-diners-club': formPayByCard.value.cardType === 'Diners Club'
          }" style="color: blue;"></i>
        </div>
        <span class="error">{{statusCardNumber}}</span>
      </div>
      <div class="mb-20 relative">
        <label class="input-label" for="cardholderName">Cardholder Name</label>
        <input class="input-card input-field" type="text" id="cardholderName" formControlName="cardholderName" (input)="onInputCardholderName()" />
      </div>
      <div class="input-container mb-20">
        <div class="pc50 relative">
          <label class="input-label" for="expriration">Expriration</label>
          <input class="input-card input-field" type="text" id="expriration" formControlName="expriration" (input)="onInputExpriration()" />
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
      <div class="input-card button-pay button-pay-hover" *ngIf="formTotal.value.totalPay" (click)="payWithCard()">Pay {{ '$' + (formTotal.value.totalPay | number: '1.2-2') }}</div>
    </form>
  `,
  styleUrls: ['../payment.component.css']
})
export class CardComponent implements AfterViewInit, DoCheck {
  // @ts-ignore
  @Input countries: string[];
  // @ts-ignore
  @Input formTotal: FormGroup;
  @Output() findDiscountPer = new EventEmitter<string>();
  @Output() payByCard = new EventEmitter<any>();
  statusCardNumber: string = '';
  formPayByCard: FormGroup = new FormGroup({
    cardNumber: new FormControl(),
    cardType: new FormControl(),
    cardholderName: new FormControl(),
    expriration: new FormControl(),
    cvc: new FormControl(),
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
    const arr = ['cardholderName', 'expriration', 'cvc', 'billingAddress', 'postalCode', 'taxIDNumber', 'discountCode'];
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

  onInputExpriration() {
    // Loại bỏ các ký tự không phải số
    let expriration = this.formPayByCard.value.expriration.replace(/[^\d-]/g, '');

    if (expriration.length > 7) {
      // Nếu đủ, cắt chuỗi lại thành "YYYY-MM"
      expriration = expriration.slice(0, 7);
    }

    // Thêm dấu gạch ngang vào vị trí thích hợp
    if (expriration.length >= 4 && expriration.charAt(4) !== '-') {
      expriration = expriration.slice(0, 4) + '-' + expriration.slice(4);
    }
    this.formPayByCard.patchValue({ 'expriration': expriration });
  }

  onInputCardholderName() {
    this.formPayByCard.patchValue({ 'cardholderName': this.formPayByCard.value.cardholderName.toUpperCase() });
  }

  checkType(event: any) {
    const cardNumber = event.target.value;
    let cardType = "";
    if (/^4/.test(cardNumber)) {
      cardType = "Visa";
      this.statusCardNumber = "";
    } else if (/^5[1-5]/.test(cardNumber)) {
      cardType = "MasterCard";
      this.statusCardNumber = "";
    } else if (/^3[47]/.test(cardNumber)) {
      cardType = "American Express";
      this.statusCardNumber = "";
    } else if (/^6(?:011|5)/.test(cardNumber)) {
      cardType = "Discover";
      this.statusCardNumber = "";
    } else if (/^(?:2131|1800|35)/.test(cardNumber)) {
      cardType = "JCB";
      this.statusCardNumber = "";
    } else if (/^3(?:0[0-5]|[68])/.test(cardNumber)) {
      cardType = "Diners Club";
      this.statusCardNumber = "";
    } else this.statusCardNumber = "Your card number is incorrect";
    this.formPayByCard.patchValue({ cardType: cardType });
  }

  onInputChange(event: any): void {
    const inputValue = event.target.value;
    
    // Lọc ra chỉ số và loại bỏ các ký tự không phải số
    const filteredValue = inputValue.replace(/\D/g, '');

    // Cập nhật giá trị của cardNumber
    this.formPayByCard.patchValue({ cardNumber: filteredValue });

    // Ngắt sau mỗi chữ số
    if (filteredValue.length > 0) {
      const formattedNumber = filteredValue.match(/\d{1,4}/g).join(' ');
      this.formPayByCard.patchValue({ cardNumber: formattedNumber });
    }
  }

  findDiscount() {
    this.findDiscountPer.emit(this.formTotal.value.discountCode);
  }

  payWithCard() {
    // this.statusCardNumber = 'Your card has insufficient funds';
    this.payByCard.emit({
      'formTotal': this.formTotal,
      'formPayByCard': this.formPayByCard,
    });
  }
}