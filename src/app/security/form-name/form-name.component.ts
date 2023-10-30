import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

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
      <input type="text" formControlName="email" placeholder="Email" readonly />
      <button>Continue</button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormNameComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
  });
  statusLogin: string = '';
  token: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      this.form.patchValue({
        email: email,
      });
      this.token = token;
    });
  }

  continue() {
    if (this.token != undefined) {
      console.log(this.token);
    }
  }
}
