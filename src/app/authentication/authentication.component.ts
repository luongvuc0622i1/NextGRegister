import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  template: string = '';
  title: string = '';

  constructor(private authService: AuthService,
    private dataService: DataService,
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

  goToSignIn() {
    this.router.navigate(['/authen'], { queryParams: { title: 'sign-in', template: this.template } });
  }

  goToSignUp() {
    this.router.navigate(['/authen'], { queryParams: { title: 'sign-up', template: this.template } });
  }

  goToForgotPassword() {
    this.router.navigate(['/authen'], { queryParams: { title: 'forgot-password', template: this.template } });
  }

  // actions
  signInEmail(form: any) {
    this.authService.loginEmail(form).subscribe(data => {
      this.authService.signInSuccess(data);
    }, error => { })
  }

  signInPhone(form: any) {
    this.authService.loginPhone(form).subscribe(data => {
      this.authService.signInSuccess(data);
    }, error => { })
  }

  sendVerificationEmail(objC: any) {
    const obj = {
      'email': objC.email
    }
    if (objC.stream === 'sign-up') {
      this.authService.sendVerificationEmail(obj).subscribe(data => {
        const dataToSend = {
          email: objC.email,
          stream: objC.stream,
        }
        this.dataService.setData(dataToSend);
        this.router.navigate(['/authen'], { queryParams: { title: 'verify', template: this.template } });
      }, error => { });
    } else if (objC.stream === 'forgot-password') {
      this.authService.sendVerificationEmailChangePass(obj).subscribe(data => {
        const dataToSend = {
          email: objC.email,
          stream: objC.stream,
        }
        this.dataService.setData(dataToSend);
        this.router.navigate(['/authen'], { queryParams: { title: 'verify', template: this.template } });
      }, error => { });
    }
  }

  sendOtp(objC: any) {
    if (objC.phone.startsWith("0")) {
      objC.phone = '+84' + objC.phone.slice(1);
    } else if (objC.phone.startsWith("+")) {
      objC.phone = objC.phone;
    } else objC.phone = null;
    const obj = {
      "phoneNumber": objC.phone
    };
    if (objC.stream === 'sign-in' || objC.stream === 'forgot-password') {
      this.authService.sendOtpLogin(obj).subscribe(data => {
        const dataToSend = {
          phone: objC.phone,
          stream: objC.stream,
        }
        this.dataService.setData(dataToSend);
        this.router.navigate(['/authen'], { queryParams: { title: 'verify', template: this.template } });
      }, error => { });
    } else if (objC.stream === 'sign-up') {
      this.authService.sendOtpRegister(obj).subscribe(data => {
        const dataToSend = {
          phone: objC.phone,
          stream: objC.stream,
        }
        this.dataService.setData(dataToSend);
        this.router.navigate(['/authen'], { queryParams: { title: 'verify', template: this.template } });
      }, error => { });
    }
  }

  verificationPhone(objC: any) {
    const obj = {
      "phone": objC.phoneNumber,
      "otp": objC.otpNumber,
    }
    if (objC.stream === 'sign-in') {
      this.signInPhone(obj);
    } else if (objC.stream === 'sign-up') {
      this.authService.sendVerificationPhone(obj).subscribe(data => {
        if (data.otp) {
          const dataToSend = {
            phone: data.phoneNumber,
            otp: data.otp,
          }
          this.dataService.setData(dataToSend);
          this.router.navigate(['/register']);
        }
      })
    } else if (objC.stream === 'forgot-password') {
      this.authService.sendVerificationPhoneChangePass(obj).subscribe(data => {
        if (data.token) {
          const dataToSend = {
            phone: data.phoneNumber,
            token: data.token,
          };
          this.dataService.setData(dataToSend);
          this.router.navigate(['/resetPassword']);
        }
      });
    }
  }
}
