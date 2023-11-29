import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['../settings.component.css']
})
export class BillingComponent {
  rankName: string = '';
  expiredDateYear: string = '';
  expiredDateMonth: string = '';
  expiredDateDay: string = '';
  @Output() goPro = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.userService.findRankById().subscribe(data => {
      this.rankName = data.rankName;
      const dateString = data.expiredDate;

      // Tách ngày và giờ
      const [datePart, timePart] = dateString.split(' ');

      // Tách năm, tháng và ngày từ phần ngày
      const [year, month, day] = datePart.split('-');

      this.expiredDateYear = year;
      this.expiredDateMonth = monthNames[parseInt(month, 10) - 1];
      this.expiredDateDay = day;
    });
  }
}
