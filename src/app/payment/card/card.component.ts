import { Component, Input } from '@angular/core';

document.addEventListener('DOMContentLoaded', function() {
const inputField = document.getElementById('name') as HTMLInputElement;

inputField.addEventListener('focus', () => {
  if (inputField.previousElementSibling) {
    const label = inputField.previousElementSibling as HTMLElement;
    label.style.fontSize = '12px';
    label.style.transform = 'translateY(-15px)';
    label.style.color = '#333';
  }
});

inputField.addEventListener('blur', () => {
  if (inputField.value === '' && inputField.previousElementSibling) {
    const label = inputField.previousElementSibling as HTMLElement;
    label.style.fontSize = '';
    label.style.transform = '';
    label.style.color = '#999';
  }
});
});

@Component({
  selector: 'app-card',
  template: `
  <div>
    <input class="input-card">
    <input class="input-card">

    <div class="input-container">
      <label for="name" class="input-label">Name</label>
      <input type="text" id="name" class="input-card input-field" />
    </div>
    card {{price}}
  </div>
  `,
  styleUrls: ['../payment.component.css']
})
export class CardComponent {
  // @ts-ignore
  @Input price: string;
  //
    //
  //
}