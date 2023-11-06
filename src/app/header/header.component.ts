import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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