import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-password',
  template: `
    <form [formGroup]="form" (ngSubmit)="register()">
      <p style="color: red">{{statusLogin}}</p>
      <input type="text" formControlName="password" placeholder="Password" />
      <input type="text" formControlName="confirm" placeholder="Confirm Password" />
      <button>Continue</button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormPasswordComponent {
  form: FormGroup = new FormGroup({
    password: new FormControl(),
    confirm: new FormControl(),
  });
  statusLogin: string = '';

  constructor() {}

  ngOnInit(): void {}

  register() {
  }
}
