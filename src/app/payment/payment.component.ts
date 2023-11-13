import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';

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
    taxes: new FormControl(),
    totalPay: new FormControl(),
  });

  constructor(private userService: UserService) { }

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
      });
    });
  }
}
