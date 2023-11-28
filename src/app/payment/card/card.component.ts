import { AfterViewInit, Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['../payment.component.css']
})
export class CardComponent implements AfterViewInit, DoCheck {
  // @ts-ignore
  @Input countries: string[];
  // @ts-ignore
  @Input formTotal: FormGroup;
  // @ts-ignore
  @Input discountMessage: string;
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
        label.classList.add('input-label');
      } else if (inputField.previousElementSibling) {
        const label = inputField.previousElementSibling as HTMLElement;
        label.classList.remove('input-label');
      }

      inputField.addEventListener('focus', () => {
        if (inputField.previousElementSibling) {
          const label = inputField.previousElementSibling as HTMLElement;
          label.classList.add('input-label');
        }
      });

      inputField.addEventListener('blur', () => {
        if (inputField.value === '' && inputField.previousElementSibling) {
          const label = inputField.previousElementSibling as HTMLElement;
          label.classList.remove('input-label');
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