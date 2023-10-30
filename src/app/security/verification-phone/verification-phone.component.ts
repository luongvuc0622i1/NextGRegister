import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verification-phone',
  template: `
    <div class="form-container sign-in-container">
      <div class="verification">
        <h2>Enter Verification Code</h2>
        <span>Your verification codes is sent via number</span>
        <p>{{phoneInput}}</p>
        <input />
        <button (click)='switchTo()'>Back</button>
        <button (click)='login()'>Continue</button>
      </div>
    </div>
`,
  styleUrls: ['../../security/security.component.css']
})
export class VerificationPhoneComponent {
  // @ts-ignore
  @Input() phoneInput: string;
  @Output() switchTemplate = new EventEmitter<string>();

  switchTo() {
    this.switchTemplate.emit('phone');
  }

  login() {
    // const form = this.signInWithEmailForm.value;
    // this.authService.login(form).subscribe(data => {
    //   if (data.jwt != undefined) {
    //     // this.tokenService.setID(data.id);
    //     this.tokenService.setToken(data.jwt);
    //     // this.tokenService.setUsername(data.username);
    //     // this.tokenService.setRole(data.authorities[0].authority);

    //     this.statusLogin = 'Login Success!';
    //     this.router.navigate(['/home']);
    //     // if (data.roleSet[0].name == 'MANAGER') {
    //     //   this.router.navigate(['/manager/profile']);
    //     // } else if (data.roleSet[0].name == 'USER') {
    //     //   this.router.navigate(['/user/home']);
    //     // } else if (data.roleSet[0].name == 'ADMIN') {
    //     //   this.router.navigate(['/admin/profile']);
    //     // }
    //   }
    //   // @ts-ignore
    //   if (data.message === 'lock') {
    //     this.statusLogin = 'Your account has been disabled, please contact admin!';
    //     return;
    //   }

    // },
    //   we => {
    //     console.log('we of login ---> ', we);
    //     if (we.status == 400) {
    //       console.log('Login Failed!');
    //       this.statusLogin = 'Login Failed! Please check your account or password!';
    //     }
    //     else {
    //       this.statusLogin = 'Error!!!!!!';
    //     }
    //   })
  }
}
