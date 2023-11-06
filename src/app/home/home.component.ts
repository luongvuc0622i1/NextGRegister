import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // @ts-ignore
  user: User

  isAdmin(): boolean {
    const userRole = localStorage.getItem('Role_Key');
    return userRole === 'ROLE_ADMIN';
  }

  constructor(private userService: UserService) {  }

  ngOnInit() {
    // Gọi API findById và xử lý dữ liệu khi được nhận
    this.userService.findById().subscribe(data => {
      this.user = data;
    });
    console.log(this.user);
  }
}