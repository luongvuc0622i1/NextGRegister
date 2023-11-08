import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./security.component.css']
})
export class RegisterComponent implements OnInit {
  templateType: string = 'name';
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    token: new FormControl(),
    phone: new FormControl(),
    otp: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl(),
  });

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private dataService: DataService) {
    if (dataService.getData()) {
      this.form.patchValue({
        phone: this.dataService.getData().phone,
        otp: this.dataService.getData().otp,
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

  switchTemplate(template: string) {
    this.templateType = template;
  }

  updateForm(updatedValues: any) {
    // Cập nhật FormGroup từ dữ liệu đã được cập nhật từ component con
    this.form.patchValue(updatedValues);
  }

  signUp() {
    if (this.form.value.token) {
      const formRegister = {
        'username': this.form.value.username,
        'password': this.form.value.password,
        'email': this.form.value.email,
        'firstName': this.form.value.firstName,
        'lastName': this.form.value.lastName,
        'tokenSignup': this.form.value.token,
        'status': 1,
      }
      this.authService.registerEmail(formRegister).subscribe(data => {
        this.authService.loginEmail(data).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    } else if (this.form.value.otp) {
      const formRegister = {
        'username': this.form.value.username,
        'password': this.form.value.password,
        'email': this.form.value.email,
        'phone': this.form.value.phone,
        'firstName': this.form.value.firstName,
        'lastName': this.form.value.lastName,
        'otp': this.form.value.otp,
        'status': 1,
      }
      this.authService.registerPhone(formRegister).subscribe(data => {
        const obj = {
          "email": data.email,
          "password": data.password
      }
        this.authService.loginEmail(obj).subscribe(data => {
          this.authService.signInSuccess(data);
        })
      })
    }
  }
}