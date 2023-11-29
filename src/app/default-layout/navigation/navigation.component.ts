import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./../default-layout.component.css']
})
export class NavigationComponent {
  username: any;
  img: any;
  isTokenValid: boolean = false;

  constructor(private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.userService.findById().subscribe(data => {
      this.username = data.firstName + ' ' + data.lastName;
      if (data.imageUrl) this.img = data.imageUrl;
      else this.img = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThRSug_V2Rrhkaz0SHavzG-uqzh8M8fms_IzQH3rz5gMy9tyXZ";
      this.isTokenValid = true;
    }, () => { this.isTokenValid = false });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  goToSignIn() {
    this.router.navigate(['/users/sign-in'], { queryParams: { template: 'email' } });
  }

  goToSignUp() {
    this.router.navigate(['/users/sign-up'], { queryParams: { template: 'email' } });
  }

  onClick(navi: string) {
    this.router.navigate(['/' + navi]);
  }
}