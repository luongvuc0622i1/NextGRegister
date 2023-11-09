import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  template: `
    <div class="items-pay-by-card">
      <div class="item-pay-by-card" (click)="itemChoose = 'card'" [ngClass]="{ 'item-selected': itemChoose === 'card' }">
        <div class="contentA">
          <i class="fa-solid fa-credit-card icon"></i>
          <span class="title">Card</span>
        </div>
      </div>
      <div class="item-pay-by-card" (click)="itemChoose = 'debit'" [ngClass]="{ 'item-selected': itemChoose === 'debit' }">
        <div class="contentA">
          <i class="fa-solid fa-building-columns icon"></i>
          <span class="title">Pre-authorized Debit</span>
        </div>
      </div>
      <div class="item-pay-by-card" (click)="itemChoose = 'ali'" [ngClass]="{ 'item-selected': itemChoose === 'ali' }">
        <div class="contentA">
          <i class="fa-brands fa-alipay icon"></i>
          <span class="title">Alipay</span>
        </div>
      </div>
    </div>
    <ng-container *ngIf="itemChoose != 'card'; else cardTemplate">
      <ng-container *ngIf="itemChoose != 'debit'; else debitTemplate">
        <ng-container *ngIf="itemChoose != 'ali'; else aliTemplate">
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #cardTemplate>
      <app-card [price]="price"></app-card>
    </ng-template>
    <ng-template #debitTemplate>
      debit
    </ng-template>
    <ng-template #aliTemplate>
      ali
    </ng-template>
  `,
  styleUrls: ['../payment.component.css']
})
export class PaymentCardComponent {
  // @ts-ignore
  @Input price: string;
  itemChoose: string = 'card';
  //
    //
  //
}