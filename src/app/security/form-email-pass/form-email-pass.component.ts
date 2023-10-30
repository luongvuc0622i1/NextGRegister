import { Component, AfterViewInit, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { TokenService } from "../../service/token.service";

@Component({
  selector: 'app-form-email-pass',
  template: `
    <div class="form-container sign-in-container">
      <div class="form" style="margin-top: 40px;">
        <img src="../../assets/nextG.png" />
        <h2>{{title}}</h2>
        <span>Please enter your credentials to access your account.</span>
      </div>
      <form [formGroup]="signInWithEmailForm" (ngSubmit)="login()">
        <p style="color: red">{{statusLogin}}</p>
        <input type="text" formControlName="email" placeholder="Email" />
        <input type="password" formControlName="password" placeholder="Password" autocomplete="current-password" required=""
          id="id_password">
        <i class="fa fa-eye" id="togglePassword" style="margin-left: 250px; cursor: pointer; margin-top: -36px"></i><br>
        <div>
            <a style="float: left;" (click)="switchTo()">{{title}} {{labelSwitch}}</a>
            <a style="float: right;" (click)="forgotPassword()">Forgot password?</a>
        </div>
        <button>Sign In</button>
      </form>
      <div class="form">
        <a style="text-align: center;" (click)="switchP()">{{footer}}</a>
      </div>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormEmailPassComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @Input() title: string;
  // @ts-ignore
  @Input() labelSwitch: string;
  // @ts-ignore
  @Input() footer: string;
  @Output() switchPage = new EventEmitter<void>();
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() forgotPass = new EventEmitter<void>();

  signInWithEmailForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  statusLogin: string = '';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  switchP() {
    this.switchPage.emit();
  }

  switchTo() {
    this.switchTemplate.emit('phone');
  }

  forgotPassword() {
    this.forgotPass.emit();
  }

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
    const form = this.signInWithEmailForm.value;
    this.authService.login(form).subscribe(data => {
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