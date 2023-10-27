import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { TokenService } from "../../service/token.service";

@Component({
  selector: 'app-form-email',
  template: `
    <div class="form-container sign-in-container">
      <div class="form" style="margin-top: 40px;">
        <img src="../../assets/nextG.png" />
        <h2>{{title}}</h2>
        <span>Please enter your credentials to access your account.</span>
      </div>
      <form [formGroup]="emailForm" (ngSubmit)="continue()">
        <p style="color: red">{{statusLogin}}</p>
          <input type="text" formControlName="email" placeholder="Email" />
          <p></p>
          <div>
            <a style="float: left;" (click)="switchTo()">{{title}} {{labelSwitch}}</a>
          </div>
          <button>Continue</button>
      </form>
      <div class="form">
        <a style="text-align: center;" (click)="switchP()">{{footer}}</a>
      </div>
    </div>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormEmailComponent implements OnInit {
  // @ts-ignore
  @Input() title: string;
  // @ts-ignore
  @Input() labelSwitch: string;
  // @ts-ignore
  @Input() footer: string;
  @Output() switchPage = new EventEmitter<void>();
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() emailInput = new EventEmitter<string>();

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(),
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

  continue() {
    this.switchTemplate.emit('verification-email');
    this.emailInput.emit(this.emailForm.value.email);
  }
}