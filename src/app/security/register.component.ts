import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";

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
              private tokenService: TokenService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      const phone = params['phone'];
      const otp = params['otp'];
      if (email) this.form.patchValue({ email: email });
      if (token) this.form.patchValue({ token: token });
      if (phone) this.form.patchValue({ phone: phone });
      if (otp) this.form.patchValue({ otp: otp });
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
          if (data.token != undefined) {
            this.tokenService.setID(data.id);
            this.tokenService.setToken(data.token);
            this.tokenService.setUsername(data.username);
            this.tokenService.setRole(data.roles[0]);
  
            this.router.navigate(['/home']);
          }
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
          if (data.token != undefined) {
            this.tokenService.setID(data.id);
            this.tokenService.setToken(data.token);
            this.tokenService.setUsername(data.username);
            this.tokenService.setRole(data.roles[0]);
  
            this.router.navigate(['/home']);
          }
        })
      })
    }
  }
}