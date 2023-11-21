import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { RankService } from '../service/rank.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  menu: any[] = [];
  countries: string[] = [];
  banks: any[] = [];
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
  showModalSuccessfully = false;
  showModalFailed = false;

  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private rankService: RankService) { }

  ngOnInit() {
    this.rankService.findMenu().subscribe(data => { this.menu = data });

    this.userService.findAllCountry().subscribe(data => {
      this.countries = data.map(item => item.name.common).sort();
    });

    this.userService.findAllBank().subscribe(data => {
      let list = data.data;
      // @ts-ignore
      this.banks = list.sort((a, b) => (a.shortName > b.shortName) ? 1 : -1);
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
    const userId = parseInt(this.tokenService.getID());
    const obj = {
      "discountCode": discountCode,
      "userId": userId
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
      this.showModalSuccessfully = true;
    }, () => {
      this.showModalFailed = true;
    });
  }

  payWithCard(objj: any) {
    objj.formPayByCard.value.cardNumber = objj.formPayByCard.value.cardNumber.replace(/\s/g, '');
    const userId = parseInt(this.tokenService.getID());
    const obj = {
      "paymentType": "card",

      "cardNumber": objj.formPayByCard.value.cardNumber,
      "cardType": objj.formPayByCard.value.cardType,
      "cardholderName": objj.formPayByCard.value.cardholderName,
      "dayExpired": objj.formPayByCard.value.expriration,
      "cvc": objj.formPayByCard.value.cvc,
      "billingAddress": objj.formPayByCard.value.billingAddress,
      "postalCode": objj.formPayByCard.value.postalCode,
      "taxIDNumber": objj.formPayByCard.value.taxIDNumber,

      "amount": objj.formTotal.value.totalPay,
      "currency": "USD",
      "description": "Buy MemberShip",
      "tax": objj.formTotal.value.taxes,
      "discountCode": objj.formTotal.value.discountCode,
      "discount": objj.formTotal.value.discount,
      "userId": userId,
      "rankId": this.selectedDiv + 2
    };
    this.userService.payWithCard(obj).subscribe(data => {
      this.showModalSuccessfully = true;
    }, () => {
      this.showModalFailed = true;
    });
  }

  payWithAlipay(objj: any) {
    console.log(objj);
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
    //   this.showModalSuccessfully = true;
    // }, () => {
    //   this.showModalFailed = true;
    // });
  }

  payWithBank(objj: any) {
    console.log(objj);
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
    //   this.showModalSuccessfully = true;
    // }, () => {
    //   this.showModalFailed = true;
    // });
  }

  backToHomepage() {
    this.router.navigate(['/home']);
  }

  closeModal() {
    this.showModalFailed = false;
  }
}
