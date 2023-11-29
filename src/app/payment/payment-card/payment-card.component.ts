import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-card',
  template: `
    <!-- <div class="items-pay-by-card mb-32">
      <div class="item-pay-by-card body-5 gray-2" (click)="itemChoose = 'card'" [ngClass]="{ 'item-selected selected': itemChoose === 'card' }">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
          <path d="M20.668 3.36719V2.3125C20.668 1.10438 19.6886 0.125 18.4805 0.125H2.85547C1.64734 0.125 0.667969 1.10438 0.667969 2.3125V3.36719C0.667969 3.47504 0.75543 3.5625 0.863281 3.5625H20.4727C20.5805 3.5625 20.668 3.47504 20.668 3.36719Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'card' }"/>
          <path d="M0.667969 5.00781V11.6875C0.667969 12.8956 1.64734 13.875 2.85547 13.875H18.4805C19.6886 13.875 20.668 12.8956 20.668 11.6875V5.00781C20.668 4.89996 20.5805 4.8125 20.4727 4.8125H0.863281C0.75543 4.8125 0.667969 4.89996 0.667969 5.00781ZM5.66797 10.125C5.66797 10.4702 5.38812 10.75 5.04297 10.75H4.41797C4.07281 10.75 3.79297 10.4702 3.79297 10.125V9.5C3.79297 9.15484 4.07281 8.875 4.41797 8.875H5.04297C5.38812 8.875 5.66797 9.15484 5.66797 9.5V10.125Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'card' }"/>
        </svg>
        Card
      </div>
      <div class="item-pay-by-card body-5 gray-2" (click)="itemChoose = 'debit'" [ngClass]="{ 'item-selected selected': itemChoose === 'debit' }">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11.543 7.89844H14.4919V13.1061H11.543V7.89844Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'debit' }"/>
          <path d="M6.52344 7.89844H9.47237V13.1061H6.52344V7.89844Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'debit' }"/>
          <path d="M15.0584 14.0488C14.5846 14.0488 1.51449 14.0488 0.941147 14.0488C0.422199 14.0488 0 14.471 0 14.99V16.088C0 16.6069 0.422199 17.0291 0.941147 17.0291H15.0584C15.5773 17.0291 15.9995 16.6069 15.9995 16.088V14.99C15.9995 14.471 15.5773 14.0488 15.0584 14.0488Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'debit' }"/>
          <path d="M15.4097 3.92526C8.16056 0.961174 8.35453 1.04045 8.34933 1.03835C8.12565 0.948845 7.87696 0.947026 7.64688 1.03967L0.589786 3.92526C0.231428 4.06944 0 4.41195 0 4.79836V6.01699C0 6.53594 0.422199 6.95813 0.941147 6.95813H15.0584C15.5773 6.95813 15.9995 6.53594 15.9995 6.01699V4.79836C15.9995 4.41195 15.7681 4.06944 15.4097 3.92526ZM8.47033 4.47975C8.47033 4.73963 8.25963 4.95032 7.99975 4.95032C7.73987 4.95032 7.52918 4.73963 7.52918 4.47975V3.47586C7.52918 3.21598 7.73987 3.00528 7.99975 3.00528C8.25963 3.00528 8.47033 3.21598 8.47033 3.47586V4.47975Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'debit' }"/>
          <path d="M1.50391 7.89844H4.45284V13.1061H1.50391V7.89844Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'debit' }"/>
        </svg>
        Bank Account
      </div>
      <div class="item-pay-by-card body-5 gray-2" (click)="itemChoose = 'ali'" [ngClass]="{ 'item-selected selected': itemChoose === 'ali' }">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
          <g clip-path="url(#clip0_201_4423)">
            <path d="M12.6606 12.0471C15.0033 12.9607 17.3821 13.7786 19.7912 14.4988C21.1101 15.04 19.7912 18.1106 18.3983 17.4765C16.8218 16.7976 13.6512 15.4094 11.2395 14.2224C9.89829 15.7812 7.79241 17.7941 4.79241 17.7941C2.12653 17.7941 0.335938 16.2435 0.335938 13.9341C0.335938 11.9882 1.69711 10.0235 4.73594 10.0235C6.47711 10.0235 8.26535 10.5118 10.4042 11.2471C10.7995 10.4635 11.1289 9.64588 11.3901 8.80235L3.66064 8.79882V7.62118L7.63594 7.63059V6.08824H2.79241V4.92824L7.63594 4.93176V3.21059C7.63594 2.76 7.88064 2.5 8.3077 2.5H10.3359V4.93882L15.1359 4.94235V6.09176H10.3359V7.64118L14.2642 7.65177C14.2642 7.65177 13.7783 10.14 12.663 12.0471H12.6606ZM1.42653 13.8353V13.8341C1.42653 14.94 2.29829 16.0576 4.42064 16.0576C6.05947 16.0576 7.66417 15.0882 9.19947 13.1753C7.1477 12.1612 6.0477 11.6729 4.45829 11.6729C2.91476 11.6729 1.42653 12.4141 1.42653 13.8353Z" fill="#999999" [ngClass]="{ 'fill-orange': itemChoose === 'ali' }"/>
          </g>
          <defs>
            <clipPath id="clip0_201_4423">
              <rect width="20" height="20" fill="white" transform="translate(0.335938)"/>
            </clipPath>
          </defs>
        </svg>
        Alipay
      </div>
    </div> -->
    <ng-container *ngIf="itemChoose != 'card'; else cardTemplate">
      <ng-container *ngIf="itemChoose != 'debit'; else debitTemplate">
        <ng-container *ngIf="itemChoose != 'ali'; else aliTemplate">
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #cardTemplate>
      <app-card [countries]="countries" (findDiscountPer)="findDiscountPer($event)" [discountMessage]="discountMessage" [formTotal]="formTotal" (payByCard)="payByCard($event)"></app-card>
    </ng-template>
    <ng-template #debitTemplate>
      <app-bank [banks]="banks" [countries]="countries" (findDiscountPer)="findDiscountPer($event)" [discountMessage]="discountMessage" [formTotal]="formTotal" (payByBank)="payByBank($event)"></app-bank>
    </ng-template>
    <ng-template #aliTemplate>
      <app-alipay [countries]="countries" (findDiscountPer)="findDiscountPer($event)" [discountMessage]="discountMessage" [formTotal]="formTotal" (payByAlipay)="payByAlipay($event)"></app-alipay>
    </ng-template>
  `,
  styleUrls: ['../payment.component.css']
})
export class PaymentCardComponent {
  // @ts-ignore
  @Input formTotal: FormGroup;
  // @ts-ignore
  @Input countries: string[];
  // @ts-ignore
  @Input banks: any[];
  // @ts-ignore
  @Input discountMessage: string;
  itemChoose: string = 'card';
  @Output() findDiscount = new EventEmitter<string>();
  @Output() payWithCard = new EventEmitter<any>();
  @Output() payWithAlipay = new EventEmitter<any>();
  @Output() payWithBank = new EventEmitter<any>();

  findDiscountPer(discountCode: string) {
    this.findDiscount.emit(discountCode);
  }

  payByCard(event: any) {
    this.payWithCard.emit(event);
  }

  payByAlipay(event: any) {
    this.payWithAlipay.emit(event);
  }

  payByBank(event: any) {
    this.payWithBank.emit(event);
  }
}