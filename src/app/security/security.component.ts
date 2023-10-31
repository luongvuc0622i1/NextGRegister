import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  title: string = 'Sign In';
  templateType: string = 'email-pass';
  labelSwitch: string = 'With SMS';
  footer: string = 'Not register yet? Create An Account';
  emailInput: string = '';
  phoneInput: string = '';
  statusLogin: string = '';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  switchPage() {
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

  switchTemplate(template: string) {
    this.templateType = template;
    if (this.templateType == 'email-pass' || this.templateType == 'email') {
      this.labelSwitch = 'With Email';
    } else if (this.templateType == 'phone') {
      this.labelSwitch = 'With SMS';
    }
  }

  forgotPassword() {
    this.title = 'Forgot Password';
    this.templateType = 'email';
    this.footer = 'Already have an account? Sign In';
  }

  // actions
  signIn(formSignUp: any) {
    this.authService.login(formSignUp).subscribe(data => {
      if (data.token != undefined) {
        this.tokenService.setID(data.id);
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setRole(data.roles[0]);

        this.statusLogin = 'Login Success!';
        this.router.navigate(['/home']);
        // if (data.roleSet[0].name == 'MANAGER') {
        //   this.router.navigate(['/manager/profile']);
        // } else if (data.roleSet[0].name == 'USER') {
        //   this.router.navigate(['/user/home']);
        // } else if (data.roleSet[0].name == 'ADMIN') {
        //   this.router.navigate(['/admin/profile']);
        // }
      }
    })
  }

  sendVerificationEmail(email: string) {
    this.emailInput = email;
    this.authService.sendVerificationEmail(email).subscribe();
  }

  sendVerificationPhone(phone: string) {
    this.phoneInput = phone;
    // this.authService.sendVerificationPhone(phone).subscribe();
  }
}