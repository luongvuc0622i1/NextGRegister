import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-forgot-password-validated',
  template: `
    <div class="sub-container">
      <img class="img-nextG" src="../../assets/nextG.png" />
      <div class="content">
        <div class="heading-5 color-default">{{title}}</div>
        <div class="body-7 color-gray-300">Please enter new password.</div>
      </div>
      <app-form-input-password class="w-100" [form]="form" (goToSignIn)="goToSignIn.emit()" (continue)="submit()"></app-form-input-password>
      <div class="foot">
        <div class="body-5 gray-1">Already have an account?</div>
        <div class="button-3 pointer color-primary" (click)="goToSignIn.emit()">Sign In</div>
      </div>
    </div>
  `,
  styleUrls: ['../../authentication/authentication.component.css']
})
export class ForgotPasswordValidatedComponent {
  @Output() goToSignIn = new EventEmitter<void>();
  title: string = 'Create Password';
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    newPass: new FormControl(),
    confirmPass: new FormControl(),
    token: new FormControl(),
  });

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
    if (dataService.getData()) {            
      this.form.patchValue({
        phone: this.dataService.getData().phone,
        token: this.dataService.getData().token,
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      if (email) this.form.patchValue({ email: email });
      if (token) this.form.patchValue({ token: token });
    });
  }

  submit() {}
}
