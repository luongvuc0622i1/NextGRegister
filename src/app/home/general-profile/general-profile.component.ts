import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-profile',
  template: `
    <form [formGroup]="user" (ngSubmit)="submit()">
        <div class="row">
            <div class="col-md-5">
                <div class="p-3 py-5">
                    <span class="font-weight-bold">Profile picture</span><br>
                    <div class="d-flex flex-column align-items-center text-center">
                        <img class="rounded-circle mt-5" width="150px"
                            src={{user.value.img}}>
                        <input type="file" (change)="uploadImg($event)" />
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="p-3 py-5">
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <label class="labels">First Name</label>
                            <input type="text" class="form-control" formControlName="firstName" placeholder="First Name">
                        </div>
                        <div class="col-md-6">
                            <label class="labels">Last Name</label>
                            <input type="text" class="form-control" formControlName="lastName" placeholder="Last Name">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <label class="labels">Phone Number</label>
                            <input type="text" class="form-control" formControlName="phone" placeholder="Phone number">
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Email</label>
                            <input type="email" class="form-control" formControlName="bio" placeholder="Email">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <label class="labels">Bio</label>
                            <textarea type="text" class="form-control" formControlName="email"></textarea>
                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="submit">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  `,
  styleUrls: ['../../home/home.component.css']
})
export class GeneralProfileComponent {
  // @ts-ignore
  @Input() user: FormGroup;
  @Output() saveChanges = new EventEmitter<void>();
  @Output() onFileSelected = new EventEmitter<any>();

  submit() {
    this.saveChanges.emit();
  }

  uploadImg(event: any) {
    this.onFileSelected.emit(event);
  }

  // validateEmail() {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   if (!this.form.value.email) {
  //     this.statusEmail= 'Email is require';
  //   } else if (!emailRegex.test(this.form.value.email)) {
  //     this.statusEmail = 'Email format is not correct';
  //   } else this.statusEmail = '';
  // }
}