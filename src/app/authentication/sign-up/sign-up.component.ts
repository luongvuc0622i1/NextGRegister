import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="sub-container">
      <img class="img-nextG" src="../../assets/nextG.png" />
      <div class="content">
        <div class="heading-5 color-default">{{title}}</div>
        <div class="body-7 color-gray-300">Please enter account information.</div>
      </div>
      <ng-container *ngIf="template != 'email'; else formInputEmail">
        <ng-container *ngIf="template != 'phone'; else formInputPhone">
        </ng-container>
      </ng-container>
      <ng-template #formInputEmail>
        <app-form-input-email class="w-100" [title]="title" (switchTemplate)="switchTemplate.emit()" (sendVerificationEmail)="sendVerificationEmail.emit($event)"></app-form-input-email>
      </ng-template>
      <ng-template #formInputPhone>
        <app-form-input-phone class="w-100" [title]="title" (switchTemplate)="switchTemplate.emit()" (sendOtp)="sendOtp.emit($event)"></app-form-input-phone>
      </ng-template>
      <div class="foot">
        <div class="body-5 gray-1">Already have an account?</div>
        <div class="button-3 pointer color-primary" (click)="goToSignIn.emit()">Sign In</div>
      </div>
    </div>
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class SignUpComponent {
  // @ts-ignore
  @Input() template: string;
  @Output() switchTemplate = new EventEmitter<void>();
  @Output() goToSignIn = new EventEmitter<void>();
  @Output() sendVerificationEmail = new EventEmitter<any>();
  @Output() sendOtp = new EventEmitter<any>();
  title: string = 'Sign Up';
}
