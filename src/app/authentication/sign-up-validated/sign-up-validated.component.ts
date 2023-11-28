import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-sign-up-validated',
  template: `
    <div class="sub-container">
      <img class="img-nextG" src="../../assets/nextG.png" />
      <div class="content">
        <div class="heading-5 color-default">{{title}}</div>
        <div class="body-7 color-gray-300">Please enter account information.</div>
      </div>
      <div class="change">
        <div class="rectangle bg-gray-3 pointer" (click)="template = 'name'" [ngClass]="{ 'bg-primary': template === 'name' }"></div>
        <div class="rectangle bg-gray-3 pointer" (click)="template = 'password'" [ngClass]="{ 'bg-primary': template === 'password' }"></div>
      </div>
      <ng-container *ngIf="template != 'name'; else formInputName">
        <ng-container *ngIf="template != 'password'; else formInputPassword">
        </ng-container>
      </ng-container>
      <ng-template #formInputName>
        <app-form-input-name class="w-100" [form]="form" [checkEmail]="checkEmail" (continue)="template = 'password'"></app-form-input-name>
      </ng-template>
      <ng-template #formInputPassword>
        <app-form-input-password class="w-100" [form]="form" (goToSignIn)="goToSignIn.emit()" (continue)="submit()"></app-form-input-password>
      </ng-template>
      <div class="foot">
        <div class="body-5 gray-1">Already have an account?</div>
        <div class="button-3 pointer color-primary" (click)="goToSignIn.emit()">Sign In</div>
      </div>
    </div>
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class SignUpValidatedComponent {
  @Output() goToSignIn = new EventEmitter<void>();
  template: string = 'name';
  title: string = 'Create New Account';
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    token: new FormControl(),
    phone: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    newPass: new FormControl(),
    confirmPass: new FormControl(),
  });
  checkEmail: boolean = false;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private authService: AuthService) {
    if (dataService.getData()) {
      this.form.patchValue({
        phone: this.dataService.getData().phone,
        token: this.dataService.getData().token,
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      if (email) {
        this.form.patchValue({ email: email });
        this.checkEmail = true;
      }
      if (token) this.form.patchValue({ token: token });
    });
  }

  submit() {
    if (this.checkEmail) {
      const formRegister = {
        'username': this.form.value.username,
        'password': this.form.value.newPass,
        'email': this.form.value.email,
        'firstName': this.form.value.firstName,
        'lastName': this.form.value.lastName,
        'tokenSignup': this.form.value.token,
        'status': 1,
      }
      this.authService.registerEmail(formRegister).subscribe(data => {
        this.authService.loginEmail(data).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    } else if (!this.checkEmail) {
      const formRegister = {
        'username': this.form.value.username,
        'password': this.form.value.newPass,
        'email': this.form.value.email,
        'phone': this.form.value.phone,
        'firstName': this.form.value.firstName,
        'lastName': this.form.value.lastName,
        'token': this.form.value.token,
        'status': 1,
      }
      this.authService.registerPhone(formRegister).subscribe(data => {
        const obj = {
          "email": data.email,
          "password": data.password
      }
        this.authService.loginEmail(obj).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    }
  }
}