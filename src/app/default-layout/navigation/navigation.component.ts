import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./../default-layout.component.css']
})
export class NavigationComponent {
  username: any;
  role: any;
  ngOnInit(): void {
    if (this.tokenService.getUsername() === null) {
      this.username = this.tokenService.getUsername();
    } else {
      this.username = '';
    }
    this.role = this.tokenService.getRole().slice(5);
  }

  constructor(private tokenService: TokenService, private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}