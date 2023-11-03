import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { FormControl, FormGroup } from '@angular/forms';

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
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute) {
    this.title = 'Sign In';
    this.templateType = 'email-pass';
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
      if (data.token != undefined) {
        this.tokenService.setID(data.id);
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setRole(data.roles[0]);

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

  signInPhone(formSignUp: any) {
    this.authService.loginPhone(formSignUp).subscribe(data => {
      if (data.token != undefined) {
        this.tokenService.setID(data.id);
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setRole(data.roles[0]);

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
    this.form.patchValue({
      email: email,
    });
    if (this.title === 'Sign Up') {
      this.authService.sendVerificationEmail(email).subscribe();
    } else if (this.title === 'Forgot Password') {
      this.authService.sendVerificationEmailChangePass(email).subscribe();
    }
  }

  sendOtp(phone: string) {
    this.form.patchValue({
      phone: phone,
    });
    let phoneNumber = '';
    if (phone.startsWith("0")) {
      phoneNumber = phone.substring(1); // Loại bỏ số 0 đầu tiên
    } else if (phone.startsWith("+84")) {
      phoneNumber = phone.substring(3); // Loại bỏ số +84 đầu tiên
    } else {
      phoneNumber = phone;
    }
    const obj = {
      'phoneNumber': phoneNumber
    };
    if (this.title === 'Sign In' || this.title === 'Forgot Password') {
      this.authService.sendOtpLogin(obj).subscribe();
    } else if (this.title === 'Sign Up') {
      this.authService.sendOtpRegister(obj).subscribe();
    }
  }

  verificationPhone(form: any) {
    if (this.title === 'Sign In') {
      this.signInPhone(form);
    } else if (this.title === 'Sign Up') {
      this.authService.sendVerificationPhone(form).subscribe(data => {
        if (data.otp) {
          this.router.navigate(['/register'], {
            queryParams: {
              phone: data.phoneNumber,
              otp: data.otp,
            }
          });
        }
      })
    } else if (this.title === 'Forgot Password') {
      this.authService.sendVerificationPhoneChangePass(form).subscribe(data => {
        if (data.token) this.router.navigate(['/resetPassword'], {
          queryParams: {
            phone: data.phoneNumber,
            token: data.token,
          }
        });
      });
    }
  }
}