import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./../default-layout.component.css']
})
export class NavigationComponent {
  @Output() setSecurity = new EventEmitter<string>();
  token: any;
  username: any;
  role: any;
  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token) {
      if (this.tokenService.getUsername() === null) {
        this.username = this.tokenService.getUsername();
      } else {
        this.username = '';
      }
      this.role = this.tokenService.getRole().slice(5);
    }
  }

  constructor(private tokenService: TokenService, private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  goToSignIn() {
    this.setSecurity.emit('Sign In');
  }

  goToSignUp() {
    this.setSecurity.emit('Sign Up');
  }
}