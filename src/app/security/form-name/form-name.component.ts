import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
      <input type="text" formControlName="email" placeholder="Email" [attr.readonly]="email ? true : null" />
      <button>Continue</button>
    </form>
  `,
  styleUrls: ['../../security/security.component.css']
})
export class FormNameComponent {
  // @ts-ignore
  @Input() form: FormGroup;
  @Output() switchTemplate = new EventEmitter<string>();
  statusLogin: string = '';
  email: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      this.form.patchValue({
        email: email,
        token: token,
      });
      this.email = email;
    });
  }

  continue() {
    this.switchTemplate.emit('password');
  }
}
