import { Component, AfterViewInit, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../service/token.service";
import {LoginForm} from "../../model/LoginForm";

@Component({
    selector: 'app-sign-in-with-email',
    templateUrl: './sign-in-with-email.component.html',
    styleUrls: ['./sign-in-with-email.component.css']
})
export class SignInWithEmailComponent implements OnInit, AfterViewInit {
    loginForm: LoginForm | undefined;
    form: any = {};
    statusLogin: string = '';

    ngOnInit(): void {
    }

    constructor(private authService: AuthService,
        private tokenService: TokenService,
        private router: Router) { }

    ngAfterViewInit() {
        // Show password click eye
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#id_password');

        // @ts-ignore
        togglePassword.addEventListener('click', function (e) {
            // toggle the type attribute
            // @ts-ignore
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            // @ts-ignore
            password.setAttribute('type', type);
            // toggle the eye slash icon
            // @ts-ignore
            this.classList.toggle('fa-eye-slash');
        });
    }

    login() {
      this.loginForm = new LoginForm(
        this.form.username,
        this.form.password
      );
      this.authService.login(this.form).subscribe(data => {
          if (data.token != undefined) {
            this.tokenService.setID(data.id);
            this.tokenService.setToken(data.token);
            this.tokenService.setUsername(data.username);
            this.tokenService.setRole(data.authorities[0].authority);
  
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