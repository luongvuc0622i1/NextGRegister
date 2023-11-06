import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./security.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl(),
    token: new FormControl(),
  });

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private dataService: DataService) {
    this.form.patchValue({
      phone: this.dataService.getData().phone,
      token: this.dataService.getData().token,
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      if (email) this.form.patchValue({ email: email });
      if (token) this.form.patchValue({ token: token });
    });
    console.log(this.form.value)
  }

  updateForm(updatedValues: any) {
    // Cập nhật FormGroup từ dữ liệu đã được cập nhật từ component con
    this.form.patchValue(updatedValues);
  }

  resetPassword() {
    if (this.form.value.email) {
      const formResetPassword = {
        'email': this.form.value.email,
        'newPassword': this.form.value.password,
        'tokenChangePass': this.form.value.token,
      }
      this.authService.resetPasswordEmail(formResetPassword).subscribe(data => {
        const obj = {
          "email": data.email,
          "password": data.newPass
        }
        this.authService.loginEmail(obj).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    } else if (this.form.value.phone) {
      const formResetPassword = {
        'phoneNumber': this.form.value.phone,
        'newPassword': this.form.value.password,
        'tokenChangePass': this.form.value.token,
      }
      this.authService.resetPasswordPhone(formResetPassword).subscribe(data => {
        const obj = {
          "email": data.email,
          "password": data.newPass
        }
        this.authService.loginEmail(obj).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    }
  }
}