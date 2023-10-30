import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./security.component.css']
})
export class RegisterComponent {
  title: string = 'Create New Account';
  templateType: string = 'name';
}