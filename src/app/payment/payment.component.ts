import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RankService } from '../service/rank.service';
import { ErrorService } from '../service/error.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  menu: any[] = [];
  countries: string[] = [];
  banks: any[] = [];
  discountMessage: string = '';
  activeButton: string = 'payment-card';
  idAccount: number = 0;

  rankName: string = '';
  rankIdOld: number = 0;
  rankIdNew: number = 0;
  expiredDate: string = '';
  expiredDateYear: string = '';
  expiredDateMonth: string = '';
  expiredDateDay: string = '';
  soThang: number = 0;

  formTotal: FormGroup = new FormGroup({
    subTotal: new FormControl(),
    discountCode: new FormControl(),
    discountPer: new FormControl(),
    discount: new FormControl(),
    taxes: new FormControl(),
    totalPay: new FormControl(),
  });
  showModalSuccessfully = false;
  showModalFailed = false;
  showModalDowngrade = false;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private rankService: RankService,
    private errorService: ErrorService) { }

  ngOnInit() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.userService.findRankById().subscribe(data => {
      this.rankName = data.rankName;
      this.rankIdOld = data.rankId;
      const dateString = data.expiredDate;

      if (dateString) {
        // Tách ngày và giờ
        const [datePart, timePart] = dateString.split(' ');

        // Tách năm, tháng và ngày từ phần ngày
        const [year, month, day] = datePart.split('-');

        this.expiredDate = datePart;
        this.expiredDateYear = year;
        this.expiredDateMonth = monthNames[parseInt(month, 10) - 1];
        this.expiredDateDay = day;
      } else {
        this.expiredDate = '';
        this.expiredDateYear = '';
        this.expiredDateMonth = '';
        this.expiredDateDay = '';
      }
    });

    this.rankService.findMenu().subscribe(data => { this.menu = data });

    this.userService.findAllCountry().subscribe(data => {
      this.countries = data.map(item => item.name.common).sort();
    });

    this.userService.findAllBank().subscribe(data => {
      let list = data.data;
      // @ts-ignore
      this.banks = list.sort((a, b) => (a.shortName > b.shortName) ? 1 : -1);
    });

    this.errorService.errorMessage$.subscribe(message => {
      this.discountMessage = message;
    });

    this.userService.findById().subscribe(data => {
      this.idAccount = data.userId;
    });

    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      if (params['status']) {
        if (status === 'true') this.showModalSuccessfully = true;
        else this.showModalFailed = true;
      }
    });
  }

  calculateUpgrade(item: any, month: number): number {
    if (this.expiredDate) {
      const ngayCuThe = new Date(this.expiredDate);
      const ngayHienTai = new Date();
      const soMiligiay = ngayCuThe.getTime() - ngayHienTai.getTime();
      const soNgay = Math.ceil(Math.abs(soMiligiay) / (1000 * 60 * 60 * 24));
      return ((parseInt(item.total) - parseInt(this.menu[this.rankIdOld - 1].total)) / 30 * soNgay) + parseInt(item.total) * month;
    } else {
      return parseInt(item.total) * month;
    }
  }

  onDivClick(item: any) {
    this.rankIdNew = item.id;
    if (this.rankIdNew < this.rankIdOld) this.showModalDowngrade = true;
    else if (this.rankIdNew === this.rankIdOld) this.setSubTotal(item, 1);
    else {
      if (!this.expiredDate) this.setSubTotal(item, 1);
      else this.setSubTotal(item, 0);
    }
  }

  setSubTotal(item: any, month: number) {    
    this.soThang = month;
    this.formTotal.patchValue({
      subTotal: this.calculateUpgrade(item, month),
    });
  }

  handleSetSubTotal(event: Event, item: any, month: number) {    
    event.stopPropagation();
    this.setSubTotal(item, month);
  }

  selectButton(buttonType: string) {
    this.activeButton = buttonType;
  }

  findDiscount(discountCode: string) {
    const obj = {
      "discountCode": discountCode,
      "userId": this.idAccount
    };
    this.userService.findDiscount(obj).subscribe(data => {
      this.discountMessage = '';
      this.formTotal.patchValue({
        discountPer: data,
      });
    }, () => {
      this.formTotal.patchValue({
        discountPer: 0,
      });
    });
  }

  payWithPaypal(objj: any) {
    const obj = {
      // "billingAddress": objj.formPayByPaypal.value.billingAddress,
      // "postalCode": objj.formPayByPaypal.value.postalCode,
      // "taxIDNumber": objj.formPayByPaypal.value.taxIDNumber,
      "currency": "USD",
      "description": "Buy MemberShip",
      "discountCode": objj.formTotal.value.discountCode,
      "userId": this.idAccount,
      "rankId": this.rankIdNew,
      "soThang": this.soThang
    };
    this.userService.payWithPaypal(obj).subscribe(data => {
      window.open(data.link, '_blank');
    }, () => {
      // this.showModalFailed = true;
    });
  }

  payWithCard(objj: any) {
    objj.formPayByCard.value.cardNumber = objj.formPayByCard.value.cardNumber.replace(/\s/g, '');
    const obj = {
      "paymentType": "card",
      "cardNumber": objj.formPayByCard.value.cardNumber,
      "cardType": objj.formPayByCard.value.cardType,
      "cardholderName": objj.formPayByCard.value.cardholderName,
      "dayExpired": objj.formPayByCard.value.expriration,
      "cvc": objj.formPayByCard.value.cvc,
      // "billingAddress": objj.formPayByCard.value.billingAddress,
      // "postalCode": objj.formPayByCard.value.postalCode,
      // "taxIDNumber": objj.formPayByCard.value.taxIDNumber,
      "currency": "USD",
      "description": "Buy MemberShip",
      "discountCode": objj.formTotal.value.discountCode,
      "userId": this.idAccount,
      "rankId": this.rankIdNew,
      "soThang": this.soThang
    };
    console.log(obj)
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
    //   "rankId": this.rankIdNew
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
    //   "rankId": this.rankIdNew
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

  closeModalshowModalFailed() {
    this.showModalFailed = false;
  }

  closeModalshowModalDowngrade() {
    this.showModalDowngrade = false;
  }
}
