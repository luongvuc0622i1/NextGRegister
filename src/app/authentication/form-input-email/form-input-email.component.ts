import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorService } from '../../service/error.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-input-email',
  templateUrl: './form-input-email.component.html',
  styleUrls: ['../../authentication/authentication.component.css']
})
export class FormInputEmailComponent implements AfterViewInit {
  // @ts-ignore
  @Input() title: string;
  @Output() switchTemplate = new EventEmitter<void>();
  @Output() sendVerificationEmail = new EventEmitter<any>();
  errorMessage: string = '';
  statusEmail: string = '';
  arr: string[] = ['email'];
  form: FormGroup = new FormGroup({
    email: new FormControl(),
  });

  constructor(private route: ActivatedRoute,
    private errorService: ErrorService) { }

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

  submit() {
    let stream;
    this.route.params.subscribe(params => {
      stream = params['path'];
    });
    if (!this.statusEmail) {
      const obj = {
        "stream": stream,
        "email": this.form.value.email,
      }
      this.sendVerificationEmail.emit(obj);
    }
  }
}
