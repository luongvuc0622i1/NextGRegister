import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-form-input-phone',
  templateUrl: './form-input-phone.component.html',
  styleUrls: ['../../authentication/authentication.component.css']
})
export class FormInputPhoneComponent implements AfterViewInit {
  // @ts-ignore
  @Input() title: string;
  @Output() switchTemplate = new EventEmitter<void>();
  @Output() sendOtp = new EventEmitter<string>();
  errorMessage: string = '';
  statusPhone: string = '';
  arr: string[] = ['phone'];
  form: FormGroup = new FormGroup({
    phone: new FormControl(),
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

  validatePhone() {
    if (!this.form.value.phone) {
      this.statusPhone = 'Phone Number is require';
    } else this.statusPhone = '';
  }

  submit() {
    if (!this.statusPhone) {
      this.sendOtp.emit(this.form.value.phone);
    }
  }
}