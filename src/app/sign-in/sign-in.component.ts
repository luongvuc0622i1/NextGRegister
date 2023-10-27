import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  currentLoginType: string = 'email';

  switchToEmail() {
    this.currentLoginType = 'email';
  }

  switchToPhone() {
    this.currentLoginType = 'phone';
  }
}
