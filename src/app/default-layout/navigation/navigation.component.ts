import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./../default-layout.component.css']
})
export class NavigationComponent {
  username: any;
  img: any;
  isTokenValid: boolean = false;

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      if(this.tokenService.getFirstname() !== 'null') this.username = this.tokenService.getFirstname();
      else this.username = "";
      if(this.tokenService.getImage() !== 'null') this.img = this.tokenService.getImage();
      else this.img = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThRSug_V2Rrhkaz0SHavzG-uqzh8M8fms_IzQH3rz5gMy9tyXZ";
      // Gọi hàm kiểm tra tính hợp lệ của token và cập nhật giá trị của isTokenValid
      this.authService.checkTokenValidity(token).subscribe(data => {
        this.isTokenValid = true;
      });
    } else {
      this.isTokenValid = false;
    }
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