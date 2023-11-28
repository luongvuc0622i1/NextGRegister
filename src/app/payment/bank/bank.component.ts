import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['../payment.component.css']
})
export class BankComponent {
  // @ts-ignore
  @Input formTotal: FormGroup;
  // @ts-ignore
  @Input banks: any[];
  // @ts-ignore
  @Input countries: string[];
  // @ts-ignore
  @Input discountMessage: string;
  @Output() findDiscountPer = new EventEmitter<string>();
  @Output() payByBank = new EventEmitter<any>();
  banksFilter: any[] = [];
  formPayByBank: FormGroup = new FormGroup({
    shortBankName: new FormControl(),
    cardholderName: new FormControl(),
    billingAddress: new FormControl(''),
    postalCode: new FormControl(),
    taxIDNumber: new FormControl(),
  });

  ngOnInit() {
    this.banksFilter = this.banks;
  }

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

  onInputBankName(event: any) {
    const tuKhoa = event.target.value;
    this.banksFilter = this.banks.filter(bank => bank.shortName.toLowerCase().includes(tuKhoa.toLowerCase()));
  }

  setShortBankName(shortBankName: string) {
    console.log(shortBankName)
    this.formPayByBank.patchValue({ 'shortBankName': shortBankName });
  }

  onInputCardholderName() {
    this.formPayByBank.patchValue({ 'cardholderName': this.formPayByBank.value.cardholderName.toUpperCase() });
  }
  
  findDiscount() {
    this.findDiscountPer.emit(this.formTotal.value.discountCode);
  }

  payWithBank() {
    this.payByBank.emit({
      'formTotal': this.formTotal,
      'formPayByBank': this.formPayByBank,
    });
  }
}
