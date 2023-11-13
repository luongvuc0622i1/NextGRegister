import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  menu: any[] = [];
  countries: string[] = [];
  selectedDiv: number = -1;
  activeButton: string = 'payment-card';
  formTotal: FormGroup = new FormGroup({
    subTotal: new FormControl(),
    discountCode: new FormControl(),
    discountPer: new FormControl(),
    discount: new FormControl(),
    statusApplyDiscountCode: new FormControl(),
    taxes: new FormControl(),
    totalPay: new FormControl(),
  });

  constructor(private userService: UserService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.menu = this.userService.findMenu();

    this.userService.findAllCountry().subscribe(data => {
      this.countries = data.map(item => item.name.common).sort();
    });
  }

  onDivClick(divIndex: number) {
    this.selectedDiv = divIndex;
    this.formTotal.patchValue({
      subTotal: this.menu[divIndex].price,
    });
  }

  selectButton(buttonType: string) {
    this.activeButton = buttonType;
  }

  findDiscount(discountCode: string) {
    const obj = {
      "discountCode": discountCode
    };
    this.userService.findDiscount(obj).subscribe(data => {
      this.formTotal.patchValue({
        discountPer: data,
        statusApplyDiscountCode: '',
      });
    }, () => {
      this.formTotal.patchValue({
        discountPer: 0,
        statusApplyDiscountCode: 'Invalid discount code',
      });
    });
  }

  payWithPaypal(objj: any) {
    const userId = parseInt(this.tokenService.getID());
    const obj = {
      "billingAddress": objj.formPayByPaypal.value.billingAddress,
      "postalCode": objj.formPayByPaypal.value.postalCode,
      "taxIDNumber": objj.formPayByPaypal.value.taxIDNumber,

      "total": objj.formTotal.value.totalPay,
      "currency": "USD",
      "description": "payment",
      "tax": objj.formTotal.value.taxes,
      "discountCode": objj.formTotal.value.discountCode,
      "discount": objj.formTotal.value.discount,
      "userId": userId,
      "rankId": this.selectedDiv + 2
    };
    this.userService.payWithPaypal(obj).subscribe(data => {
      // đúng
    }, () => {
      // sai
    });
  }

  payWithCard(objj: any) {
    console.log(objj)
    // const userId = parseInt(this.tokenService.getID());
    // const obj = {
    //   "billingAddress": objj.formPayByPaypal.value.billingAddress,
    //   "postalCode": objj.formPayByPaypal.value.postalCode,
    //   "taxIDNumber": objj.formPayByPaypal.value.taxIDNumber,

    //   "total": objj.formTotal.value.totalPay,
    //   "currency": "USD",
    //   "description": "payment",
    //   "tax": objj.formTotal.value.taxes,
    //   "discountCode": objj.formTotal.value.discountCode,
    //   "discount": objj.formTotal.value.discount,
    //   "userId": userId,
    //   "rankId": this.selectedDiv + 2
    // };
    // this.userService.payWithCard(obj).subscribe(data => {
    //   // đúng
    // }, () => {
    //   // sai
    // });
  }
}
