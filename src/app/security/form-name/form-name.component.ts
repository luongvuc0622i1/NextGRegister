import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-name',
  template: `
    <form [formGroup]="form" (ngSubmit)="continue()">
      <p style="color: red">{{statusLogin}}</p>
      <div style="display: flex;">
        <div class="group-col left">
          <input type="text" formControlName="firstName" placeholder="First Name" />
        </div>
        <div class="group-col right">
          <input type="text" formControlName="lastName" placeholder="Last Name" />
        </div>
      </div>
      <input type="text" formControlName="email" placeholder="Email" [attr.readonly]="form.value.email ? true : null" />
      <button class="button-form">Continue<span class="material-symbols-outlined">east</span></button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormNameComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  // @ts-ignore
  // @Input() email: string;
  @Output() switchTemplate = new EventEmitter<string>();
  statusLogin: string = '';

  continue() {
    this.switchTemplate.emit('password');
  }
}