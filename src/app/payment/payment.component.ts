import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  menu: any[] = [];
  selectedDiv: number = 0;
  activeButton: string = 'payment-card';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.menu = this.userService.findMenu();
  }

  onDivClick(divIndex: number) {
    this.selectedDiv = divIndex;
  }

  selectButton(buttonType: string) {
    this.activeButton = buttonType;
  }
}
