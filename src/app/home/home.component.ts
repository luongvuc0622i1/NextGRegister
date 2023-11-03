import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin(): boolean {
    const userRole = localStorage.getItem('Role_Key');
    return userRole === 'ROLE_ADMIN';
  }
}