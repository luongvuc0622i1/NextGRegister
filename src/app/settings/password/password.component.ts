import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../settings.component.css']
})
export class PasswordComponent implements AfterViewInit {
  // @ts-ignore
  @Input() formChangePassword: FormGroup;
  @Output() saveChanges = new EventEmitter<void>();
  arr: string[] = ['oldPass', 'newPass', 'confirmPass'];
  errorMessage: string = '';
  statusOldPass: string = '';
  statusNewPass: string = '';
  statusConfirmPass: string = '';
  check1: boolean = true;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
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

  validateOldPassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.formChangePassword.value.oldPass) {
      this.statusOldPass = 'Current Password is require';
    } else if (!passwordRegex.test(this.formChangePassword.value.oldPass)) {
      this.statusOldPass = 'Minimum is 8 characters with at least 1 upcase';
    } else this.statusOldPass = '';
  }

  validateNewPassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.formChangePassword.value.newPass) {
      this.statusNewPass = 'New Password is require';
    } else if (!passwordRegex.test(this.formChangePassword.value.newPass)) {
      this.statusNewPass = 'Minimum is 8 characters with at least 1 upcase';
    } else this.statusNewPass = '';
  }

  validateConfirmPassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.formChangePassword.value.confirmPass) {
      this.statusConfirmPass = 'Confirm Password is require';
    } else if (!passwordRegex.test(this.formChangePassword.value.confirmPass)) {
      this.statusConfirmPass = 'Minimum is 8 characters with at least 1 upcase';
    } else if (this.formChangePassword.value.newPass !== this.formChangePassword.value.confirmPass) {
      this.statusConfirmPass = 'Confirm Password must be the same with Password';
    } else this.statusConfirmPass = '';
  }

  toggleEye(event: any) {
    const target = event.target || event.srcElement;
    const inputField = target.closest('.relative').querySelector('.input-field');
    const eyeClosed = target.querySelector('.eye-closed');
    const eyeOpen = target.querySelector('.eye-open');
  
    if (inputField && eyeClosed && eyeOpen) {
      // Đảo ngược giá trị của thuộc tính 'type'
      inputField.type = (inputField.type === 'password') ? 'text' : 'password';
  
      // Đảo ngược hiển thị của biểu tượng mắt
      eyeClosed.style.display = (inputField.type === 'password') ? 'initial' : 'none';
      eyeOpen.style.display = (inputField.type === 'password') ? 'none' : 'initial';
    }
  }

  submit() {
    this.saveChanges.emit();
  }
}
