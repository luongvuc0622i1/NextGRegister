import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verify',
  template: `
    <ng-container *ngIf="template != 'email'; else formVerifyEmail">
      <ng-container *ngIf="template != 'phone'; else formVerifyPhone">
      </ng-container>
    </ng-container>
    <ng-template #formVerifyEmail>
      <!-- <app-form-input-email-pass class="w-100" [title]="title" (switchTemplate)="switchTemplate.emit()" (goToForgotPassword)="goToForgotPassword.emit()" (signIn)="signInEmail.emit($event)"></app-form-input-email-pass> -->
      <app-verify-email></app-verify-email>
    </ng-template>
    <ng-template #formVerifyPhone>
      <!-- <app-form-input-phone class="w-100" [title]="title" (switchTemplate)="switchTemplate.emit()" (sendOtp)="sendOtp.emit($event)"></app-form-input-phone> -->
      <app-verify-phone [phone]="phone"></app-verify-phone>
    </ng-template>
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class VerifyComponent {
  // @ts-ignore
  @Input() template: string;
  // @ts-ignore
  @Input() phone: string;

  ngOnInit() { console.log(this.phone) }
}
