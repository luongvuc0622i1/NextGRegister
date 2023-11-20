import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  title: string;
  templateType: string;
  labelSwitch: string;
  footer: string;

  form: FormGroup = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    otp: new FormControl(),
  });

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {
    this.title = '';//Sign In
    this.templateType = '';//email-pass
    this.labelSwitch = 'With SMS';
    this.footer = 'Not register yet? Create An Account';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const phone = params['phone'];
      const otp = params['otp'];
      this.form.patchValue({
        phone: phone,
        otp: otp,
      });
    });
  }

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
      this.labelSwitch = 'With SMS';
    } else if (this.templateType == 'phone') {
      this.labelSwitch = 'With Email';
    }
  }

  forgotPassword() {
    this.title = 'Forgot Password';
    this.templateType = 'email';
    this.footer = 'Already have an account? Sign In';
  }

  // actions
  signInEmail(formSignUp: any) {
    this.authService.loginEmail(formSignUp).subscribe(data => {
      this.authService.signInSuccess(data);
    }, error => {})
  }

  signInPhone(formSignUp: any) {
    this.authService.loginPhone(formSignUp).subscribe(data => {
      this.authService.signInSuccess(data);
    }, error => {})
  }

  sendVerificationEmail(email: string) {
    this.form.patchValue({
      email: email,
    });
    const obj = {
      'email': email
    }
    if (this.title === 'Sign Up') {
      this.authService.sendVerificationEmail(obj).subscribe();
    } else if (this.title === 'Forgot Password') {
      this.authService.sendVerificationEmailChangePass(obj).subscribe();
    }
  }

  sendOtp(phone: string) {
    this.form.patchValue({
      phone: phone,
    });
    const obj = {
      "phoneNumber": this.form.value.phone
    };
    if (this.title === 'Sign In' || this.title === 'Forgot Password') {
      this.authService.sendOtpLogin(obj).subscribe();
    } else if (this.title === 'Sign Up') {
      this.authService.sendOtpRegister(obj).subscribe();
    }
  }

  verificationPhone(obj: any) {
    if (this.title === 'Sign In') {
      this.signInPhone(obj);
    } else if (this.title === 'Sign Up') {
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
    } else if (this.title === 'Forgot Password') {
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

  setSecurity(title: string) {
    this.title = title;
    if (this.title == 'Sign Up') {
      this.templateType = 'email';
      this.footer = 'Already have an account? Sign In';
    } else if (this.title == 'Sign In') {
      this.templateType = 'email-pass';
      this.footer = 'Not register yet? Create An Account';
    }
  }
}