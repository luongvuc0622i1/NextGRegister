import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CssService } from '../service/css.service';

const cssImportUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

  constructor(private userService: UserService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router,
    private cssService: CssService) { }

  ngOnInit(): void {
    this.cssService.addCss(cssImportUrl);
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
        img: data.imageUrl ? data.imageUrl : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
      });
    });
  }

  ngOnDestroy() {
    this.cssService.removeCss(cssImportUrl);
  }

  saveChanges() {
    const user = {
      'firstName': this.user.value.firstName,
      'lastName': this.user.value.lastName,
      'bio': this.user.value.bio,
      'imageUrl': this.user.value.img,
    };
    this.userService.update(user).subscribe(data => {
      console.log("update done!");
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}