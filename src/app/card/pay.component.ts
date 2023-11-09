import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  menu: any[] = [];
  selectedDiv: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.menu = this.userService.findMenu();
  }

  onDivClick(divIndex: number) {
    this.selectedDiv = divIndex;
  }
}
