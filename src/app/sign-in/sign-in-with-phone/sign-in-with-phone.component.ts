import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { TokenService } from "../../service/token.service";

@Component({
  selector: 'app-sign-in-with-phone',
  templateUrl: './sign-in-with-phone.component.html',
  styleUrls: ['../../sign-in/sign-in.component.css']
})
export class SignInWithPhoneComponent implements OnInit {
  signInWithPhoneForm: FormGroup = new FormGroup({
    phone: new FormControl(),
    password: new FormControl(),
  });
  statusLogin: string = '';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  @Output() switchLoginType = new EventEmitter<void>();

  switchToEmail() {
    this.switchLoginType.emit();
  }

  login() {
    const form = this.signInWithPhoneForm.value;
    this.authService.login(form).subscribe(data => {
      if (data.jwt != undefined) {
        // this.tokenService.setID(data.id);
        this.tokenService.setToken(data.jwt);
        // this.tokenService.setUsername(data.username);
        // this.tokenService.setRole(data.authorities[0].authority);

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
      // @ts-ignore
      if (data.message === 'lock') {
        this.statusLogin = 'Your account has been disabled, please contact admin!';
        return;
      }

    },
      we => {
        console.log('we of login ---> ', we);
        if (we.status == 400) {
          console.log('Login Failed!');
          this.statusLogin = 'Login Failed! Please check your account or password!';
        }
        else {
          this.statusLogin = 'Error!!!!!!';
        }
      })
  }
}
