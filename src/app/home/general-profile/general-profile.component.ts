import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['../../home/home.component.css']
})
export class GeneralProfileComponent {
  // @ts-ignore
  @Input() user: FormGroup;
  @Output() saveChanges = new EventEmitter<void>();
  @Output() onFileSelected = new EventEmitter<any>();
  @Output() sendOtp = new EventEmitter<void>();
  @Output() sendVerifyEmail = new EventEmitter<void>();
  @Output() verificationPhoneWhenVerify = new EventEmitter<any>();
  statusFName: string = '';
  statusLName: string = '';
  statusPhone: string = '';
  statusEmail: string = '';

  showModalEmail = false;
  showModalPhone = false;

  submit() {
    this.saveChanges.emit();
  }

  uploadImg(event: any) {
    this.onFileSelected.emit(event);
  }

  verify(id: number) {
    if (id === 1) {
      this.sendOtp.emit();
      this.showModalPhone = true;
    }
    if (id === 2) {
      this.sendVerifyEmail.emit();
      this.showModalEmail = true;
    }
  }

  verificationPhone(obj: any) {
    this.verificationPhoneWhenVerify.emit(obj);
  }

  switchTemplate(event: any) {
    if (event === 1) this.showModalPhone = false;
    if (event === 2) this.showModalEmail = false;
  }

  validateFName() {
    if (!this.user.value.firstName) {
      this.statusFName = 'First Name is require';
    } else this.statusFName = '';
  }

  validateLName() {
    if (!this.user.value.lastName) {
      this.statusLName = 'Last Name is require';
    } else this.statusLName = '';
  }

  validateEmail() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.user.value.email) {
      this.statusEmail = 'Email is require';
    } else if (!emailRegex.test(this.user.value.email)) {
      this.statusEmail = 'Email format is not correct';
    } else this.statusEmail = '';
  }

  validatePhone() {
    if (!this.user.value.phone) {
      this.statusPhone = 'Phone Number is require';
    } else this.statusPhone = '';
  }
}