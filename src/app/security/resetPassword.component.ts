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
    firstName: new FormControl(),
    lastName: new FormControl(),
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

  register() {
  //   const formRegister = {
  //     'username': this.form.value.username,
  //     'password': this.form.value.password,
  //     'email': this.form.value.email,
  //     'firstName': this.form.value.firstName,
  //     'lastName': this.form.value.lastName,
  //     'status': 1,
  //   }
  //   this.authService.register(formRegister).subscribe(data => {
  //     this.authService.login(data).subscribe(data => {
  //       if (data.token != undefined) {
  //         this.tokenService.setID(data.id);
  //         this.tokenService.setToken(data.token);
  //         this.tokenService.setUsername(data.username);
  //         this.tokenService.setRole(data.roles[0]);

  //         this.router.navigate(['/home']);
  //       }
  //     })
  //   })
  }
}