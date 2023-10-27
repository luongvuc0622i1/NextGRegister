import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { TokenService } from "../../service/token.service";

@Component({
  selector: 'app-form-email',
  template: `
    <form [formGroup]="emailForm" (ngSubmit)="login()">
      <p style="color: red">{{statusLogin}}</p>
        <input type="text" formControlName="email" placeholder="Email" />
        <p></p>
        <div>
          <a style="float: left;" (click)="switch()">{{title}} {{labelSwitch}}</a>
        </div>
        <button>Continue</button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormEmailComponent implements OnInit {
  // @ts-ignore
  @Input() title: string;
  // @ts-ignore
  @Input() labelSwitch: string;
  @Output() switchTo = new EventEmitter<void>();

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(),
  });
  statusLogin: string = '';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  switch() {
    this.switchTo.emit();
  }

  login() {
    const form = this.emailForm.value;
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