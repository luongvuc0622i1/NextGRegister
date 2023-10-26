import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  template: `
  <div class="containerBody">
    <div *ngIf="byPhone(); else userContent">
      <app-sign-in-with-email></app-sign-in-with-email>
    </div>
    <ng-template #userContent>
      <app-sign-in-with-phone></app-sign-in-with-phone>
    </ng-template>
  </div>
  `,
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  byPhone(): boolean {
    // const userRole = localStorage.getItem('Role_Key');
    // return userRole === 'ROLE_ADMIN';
    return false;
  }
}
