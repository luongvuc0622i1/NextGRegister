import { Component, AfterViewInit, Input, DoCheck, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['../settings.component.css']
})
export class GeneralComponent implements AfterViewInit, DoCheck {
  // @ts-ignore
  @Input() user: FormGroup;
  @Output() saveChanges = new EventEmitter<void>();
  @Output() onFileSelected = new EventEmitter<any>();
  @Output() sendOtp = new EventEmitter<void>();
  @Output() sendVerifyEmail = new EventEmitter<void>();
  @Output() verificationPhoneWhenVerify = new EventEmitter<any>();
  arr: string[] = ['firstName', 'lastName', 'phone', 'email', 'bio'];
  errorMessage: string = '';
  statusFName: string = '';
  statusLName: string = '';
  statusPhone: string = '';
  statusEmail: string = '';

  showModalEmail = false;
  showModalPhone = false;

  constructor(private dataService: DataService,
    private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
  }

  ngDoCheck(): void {
    this.arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;
      const label = inputField.previousElementSibling as HTMLElement;
      
      if (this.user.value[element] && label) {
        label.classList.add('input-label');
      }
    });
  }

  ngAfterViewInit(): void {
    this.arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;
      const label = inputField.previousElementSibling as HTMLElement;

      inputField.addEventListener('focus', () => {
        if (label) {
          label.classList.add('input-label');
        }
      });

      inputField.addEventListener('blur', () => {
        if (inputField.value === '' && label) {
          label.classList.remove('input-label');
        }
      });
    });
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

  verify(id: number) {
    if (id === 1) {
      const dataToSend = {
        phone: this.user.value.phone,
      }
      this.dataService.setData(dataToSend);
      this.sendOtp.emit();
      this.showModalPhone = true;
    }
    if (id === 2) {
      const dataToSend = {
        email: this.user.value.email,
      }
      this.dataService.setData(dataToSend);
      this.sendVerifyEmail.emit();
      this.showModalEmail = true;
    }
  }

  verificationPhone(obj: any) {
    this.verificationPhoneWhenVerify.emit(obj);
  }

  return() {
    this.showModalPhone = false;
    this.showModalEmail = false;
  }

  uploadImg(event: any) {
    this.onFileSelected.emit(event);
  }

  submit() {
    this.saveChanges.emit();
  }
}