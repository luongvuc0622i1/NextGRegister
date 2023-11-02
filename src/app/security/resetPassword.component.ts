import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./security.component.css']
})
// export class ResetPasswordComponent {
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl(),
    token: new FormControl(),
  });

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      this.form.patchValue({
        email: email,
        token: token,
      });
    });
  }

  updateForm(updatedValues: any) {
    // Cập nhật FormGroup từ dữ liệu đã được cập nhật từ component con
    this.form.patchValue(updatedValues);
  }

  resetPassword() {
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