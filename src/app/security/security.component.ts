import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  title: string = 'Sign In';
  templateType: string = 'email-pass';
  labelSwitch: string = 'With SMS';
  footer: string = 'Not register yet? Create An Account';

  signInSignUp() {
    if (this.title == 'Sign In') {
      this.title = 'Sign Up';
      this.templateType = 'email';
      this.footer = 'Already have an account? Sign In';
    } else if (this.title == 'Sign Up') {
      this.title = 'Sign In';
      this.templateType = 'email-pass';
      this.footer = 'Not register yet? Create An Account';
    }
  }

  switchTemplate() {
    if (this.templateType == 'email-pass' || this.templateType == 'email') {
      this.templateType = 'phone';
      this.labelSwitch = 'With Email';
    } else if (this.templateType == 'phone') {
      if (this.title == 'Sign In') {
        this.templateType = 'email-pass';
      } else {
        this.templateType = 'email';
      }
      this.labelSwitch = 'With SMS';
    }
  }

  forgotPassword() {
    this.title = 'Forgot Password';
    this.templateType = 'email';
    this.footer = 'Already have an account? Sign In';
  }

  handleTitleChange(newTitle: string) {
    this.title = newTitle;
  }
}