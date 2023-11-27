import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  // @ts-ignore
  user: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    emailVerifired: new FormControl(),
    phone: new FormControl(),
    phoneVerifired: new FormControl(),
    bio: new FormControl(),
    img: new FormControl(),
  });
  formChangePassword: FormGroup = new FormGroup({
    oldPass: new FormControl(),
    newPass: new FormControl(),
    confirmPass: new FormControl(),
  });
  tabChoose: string = 'general';
  showModalSuccessfully = false;
  showModalFailed = false;

  constructor(private userService: UserService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // Gọi API findById và xử lý dữ liệu khi được nhận
    this.userService.findById().subscribe(data => {
      this.user.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        emailVerifired: data.emailVerifired,
        phone: data.phoneNumber,
        phoneVerifired: data.phoneVerifired,
        bio: data.bio,
        img: data.imageUrl ? data.imageUrl : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThRSug_V2Rrhkaz0SHavzG-uqzh8M8fms_IzQH3rz5gMy9tyXZ'
      });
    });
  }

  saveChanges() {
    const user = {
      'firstName': this.user.value.firstName,
      'lastName': this.user.value.lastName,
      'bio': this.user.value.bio,
      'imageUrl': this.user.value.img,
    };
    this.userService.update(user).subscribe(data => {
      this.showModalSuccessfully = true;
    }, () => {
      this.showModalFailed = true;
    });
  }

  saveChangesPass() {
    const form = {
      'oldPass': this.formChangePassword.value.oldPass,
      'newPass': this.formChangePassword.value.newPass,
    };
    this.userService.changePass(form).subscribe(data => {
      this.showModalSuccessfully = true;
    }, () => {
      this.showModalFailed = true;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const filePath = `nextG/${file.name}`;
    const task = this.storage.upload(filePath, file);

    // Get the file download URL when the upload is complete
    task.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.user.patchValue({ img: downloadURL });
      });
    });
  }

  sendVerifyEmail() {
    const obj = {
      'email': this.user.value.email
    }
    this.authService.sendVerificationEmailWhenVerify(obj).subscribe();
  }

  sendOtp() {
    const obj = {
      "phoneNumber": this.user.value.phone
    };
    this.authService.sendOtpRegister(obj).subscribe();
  }

  verificationPhoneWhenVerify(obj: any) {
    this.authService.sendVerificationPhoneWhenVerify(obj).subscribe(() => {
      window.location.reload();
    });
  }

  goToCard() {
    this.router.navigate(['/payment']);
  }

  chooseTab(tabName: string) {
    this.tabChoose = tabName;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  backToHomepage() {
    this.showModalSuccessfully = false;
    this.tabChoose = 'general';
    
  this.formChangePassword = new FormGroup({
    oldPass: new FormControl(),
    newPass: new FormControl(),
    confirmPass: new FormControl(),
  });
  }

  closeModal() {
    this.showModalFailed = false;
  }
}
