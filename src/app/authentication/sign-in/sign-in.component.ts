import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="sub-container">
      <img class="img-nextG" src="../../assets/nextG.png" />
      <div class="content">
        <div class="heading-5 color-default">{{title}}</div>
        <div class="body-7 color-gray-300">Please enter your credentials to access your account.</div>
      </div>
      <ng-container *ngIf="template != 'email'; else formInputEmail">
        <ng-container *ngIf="template != 'phone'; else formInputPhone">
        </ng-container>
      </ng-container>
      <ng-template #formInputEmail>
        <app-form-input-email-pass class="w-100" [title]="title" (switchTemplate)="switchTemplate.emit()" (goToForgotPassword)="goToForgotPassword.emit()" (signIn)="signInEmail.emit($event)"></app-form-input-email-pass>
      </ng-template>
      <ng-template #formInputPhone>
        <app-form-input-phone class="w-100" [title]="title" (switchTemplate)="switchTemplate.emit()" (sendOtp)="sendOtp.emit($event)"></app-form-input-phone>
      </ng-template>
      <div class="foot">
        <div class="body-5 gray-1">Not register yet?</div>
        <div class="button-3 pointer color-primary" (click)="goToSignUp.emit()">Create An Account</div>
      </div>
    </div>    
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class SignInComponent {
  // @ts-ignore
  @Input() template: string;
  @Output() switchTemplate = new EventEmitter<void>();
  @Output() goToSignUp = new EventEmitter<void>();
  @Output() goToForgotPassword = new EventEmitter<void>();
  @Output() signInEmail = new EventEmitter<any>();
  @Output() sendOtp = new EventEmitter<string>();
  title: string = 'Sign In';
}
