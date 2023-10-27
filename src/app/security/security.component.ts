import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  currentLoginType: string = 'email';

  switchToEmail() {
    this.currentLoginType = 'email';
  }

  switchToPhone() {
    this.currentLoginType = 'phone';
  }
}
