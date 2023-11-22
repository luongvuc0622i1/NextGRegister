import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-form-input-email-pass',
  templateUrl: './form-input-email-pass.component.html',
  styleUrls: ['../../authentication/authentication.component.css']
})
export class FormInputEmailPassComponent implements AfterViewInit {
  // @ts-ignore
  @Input() title: string;
  @Output() switchTemplate = new EventEmitter<void>();
  @Output() goToForgotPassword = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<any>();
  errorMessage: string = '';
  statusEmail: string = '';
  statusPassword: string = '';
  arr: string[] = ['email', 'password'];
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

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

  validateEmail() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.form.value.email) {
      this.statusEmail = 'Email is require';
    } else if (!emailRegex.test(this.form.value.email)) {
      this.statusEmail = 'Email format is not correct';
    } else this.statusEmail = '';
  }

  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!this.form.value.password) {
      this.statusPassword = 'Password is require';
    } else if (!passwordRegex.test(this.form.value.password)) {
      this.statusPassword = 'Minimum is 8 characters with at least 1 upcase';
    } else this.statusPassword = '';
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
    if (this.statusEmail === '' && this.statusPassword === '') {
      this.signIn.emit(this.form.value);
    }
  }
}