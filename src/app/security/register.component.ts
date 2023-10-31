import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./security.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl(),
    token: new FormControl(),
  });
  title: string = 'Create New Account';
  statusLogin: string = '';
  templateType: string = 'name';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  switchTemplate(template: string) {
    this.templateType = template;
  }
  
  updateForm(updatedValues: any) {
    // Cập nhật FormGroup từ dữ liệu đã được cập nhật từ component con
    this.form.patchValue(updatedValues);
  }

  register() {
    const formRegister = {
      'username': this.form.value.username,
      'password': this.form.value.password,
      'email': this.form.value.email,
      'firstName': this.form.value.firstName,
      'lastName': this.form.value.lastName,
      'status': 1,
    }
    this.authService.register(formRegister).subscribe(data => {
      this.authService.login(data).subscribe(data => {
        if (data.token != undefined) {
          this.tokenService.setID(data.id);
          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.username);
          this.tokenService.setRole(data.roles[0]);

          this.statusLogin = 'Login Success!';
          this.router.navigate(['/home']);
          // if (data.roleSet[0].name == 'MANAGER') {
          //   this.router.navigate(['/manager/profile']);
          // } else if (data.roleSet[0].name == 'USER') {
          //   this.router.navigate(['/user/home']);
          // } else if (data.roleSet[0].name == 'ADMIN') {
          //   this.router.navigate(['/admin/profile']);
          // }
        }
      })
    })
  }
}