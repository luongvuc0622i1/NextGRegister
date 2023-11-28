import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-verify',
  template: `
    <ng-container *ngIf="template != 'email'; else formVerifyEmail">
      <ng-container *ngIf="template != 'phone'; else formVerifyPhone">
      </ng-container>
    </ng-container>
    <ng-template #formVerifyEmail>
      <app-verify-email (sendVerificationEmail)="sendVerificationEmail.emit($event)" (return)="return()"></app-verify-email>
    </ng-template>
    <ng-template #formVerifyPhone>
      <app-verify-phone (sendOtp)="sendOtp.emit($event)" (verificationPhone)="verificationPhone.emit($event)" (return)="return()"></app-verify-phone>
    </ng-template>
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class VerifyComponent {
  // @ts-ignore
  @Input() template: string;
  @Output() sendOtp = new EventEmitter<any>();
  @Output() sendVerificationEmail = new EventEmitter<any>();
  @Output() verificationPhone = new EventEmitter<any>();

  return() {
    window.history.back();
  }
}
