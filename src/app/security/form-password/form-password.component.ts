import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-password',
  template: `
    <form [formGroup]="form">
      <p style="color: red">{{statusLogin}}</p>
      <input type="text" formControlName="password" placeholder="Password" />
      <input type="text" formControlName="confirm" placeholder="Confirm Password" />
      <button (click)="back()">Back</button>
      <button (click)="continue()">Continue</button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormPasswordComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Output() switchTemplate = new EventEmitter<string>();
  @Output() register = new EventEmitter<void>();
  statusLogin: string = '';

  constructor() {}

  ngOnInit(): void {}

  back() {
    this.switchTemplate.emit('name');
  }

  continue() {
    if (this.form.value.token) {
      this.register.emit();
    }
  }
}