import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input-name',
  templateUrl: './form-input-name.component.html',
  styleUrls: ['../../authentication/authentication.component.css']
})
export class FormInputNameComponent implements AfterViewInit {
  // @ts-ignore
  @Input() form: FormGroup;
  // @ts-ignore
  @Input() checkEmail: boolean;
  @Output() continue = new EventEmitter<void>();
  statusEmail: string = '';
  statusFName: string = '';
  statusLName: string = '';
  arr: string[] = ['firstName', 'lastName', 'email'];

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
    if (!this.form.value.firstName) {
      this.statusFName = 'First Name is require';
    } else this.statusFName = '';
  }

  validateLName() {
    if (!this.form.value.lastName) {
      this.statusLName = 'Last Name is require';
    } else this.statusLName = '';
  }

  validateEmail() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (this.checkEmail) {
      this.statusEmail = '';
    } else {
      if (!this.form.value.email) {
        this.statusEmail = 'Email is require';
      } else if (!emailRegex.test(this.form.value.email)) {
        this.statusEmail = 'Email format is not correct';
      } else this.statusEmail = '';
    }
  }

  submit() {
    if (this.statusEmail === '') {
      this.continue.emit();
    }
  }
}