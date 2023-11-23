import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-form-input-password',
  templateUrl: './form-input-password.component.html',
  styleUrls: ['../../authentication/authentication.component.css']
})
export class FormInputPasswordComponent implements AfterViewInit {
  // @ts-ignore
  @Input() form: FormGroup;
  @Output() continue = new EventEmitter<void>();
  errorMessage: string = '';
  statusNewPass: string = '';
  statusConfirmPass: string = '';
  arr: string[] = ['newPass', 'confirmPass'];

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
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

  validateNewPassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.form.value.newPass) {
      this.statusNewPass = 'New Password is require';
    } else if (!passwordRegex.test(this.form.value.newPass)) {
      this.statusNewPass = 'Minimum is 8 characters with at least 1 upcase';
    } else this.statusNewPass = '';
  }

  validateConfirmPassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.form.value.confirmPass) {
      this.statusConfirmPass = 'Confirm Password is require';
    } else if (!passwordRegex.test(this.form.value.confirmPass)) {
      this.statusConfirmPass = 'Minimum is 8 characters with at least 1 upcase';
    } else if (this.form.value.newPass !== this.form.value.confirmPass) {
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
    if (this.statusNewPass === '' && this.statusConfirmPass === '') {
      this.continue.emit();
    }
  }
}
