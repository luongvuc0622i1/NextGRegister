import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  template: string = '';
  title: string = '';
  phone: string = '';

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const template = params['template'];
      const title = params['title'];
      this.template = template;
      this.title = title;
    });
  }

  switchTemplate() {
    if (this.template === 'email') this.template = 'phone';
    else if (this.template === 'phone') this.template = 'email';
    this.router.navigate(['/authen'], { queryParams: { title: this.title, template: this.template } });
  }

  goToForgotPassword() {
    this.router.navigate(['/authen'], { queryParams: { title: 'forgot-password', template: this.template } });
  }

  goToSignUp() {
    this.router.navigate(['/authen'], { queryParams: { title: 'sign-up', template: this.template } });
  }

  // actions
  signInEmail(form: any) {
    this.authService.loginEmail(form).subscribe(data => {
      this.authService.signInSuccess(data);
    }, error => {})
  }

  sendOtp(phone: string) {
    const obj = {
      "phoneNumber": phone
    };
    // if (this.title === 'sign-in' || this.title === 'forgot-password') {
    //   this.authService.sendOtpLogin(obj).subscribe(data => {
        this.phone = phone;
        console.log(this.phone);
        this.router.navigate(['/authen'], { queryParams: { title: 'verify', template: this.template } });
    //   }, error => {});
    // } else if (this.title === 'sign-up') {
    //   this.authService.sendOtpRegister(obj).subscribe(data => {
    //     this.phone = phone;
    //     this.router.navigate(['/authen'], { queryParams: { title: 'verify', template: this.template } });
    //   }, error => {});
    // }
  }
}
