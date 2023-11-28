import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-verify-email',
  template: `
    <div class="verify-email-container">
      <div class="content">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="126" height="129" viewBox="0 0 126 129" fill="none">
            <path d="M63.53 105.759C88.8771 105.759 109.433 85.3581 109.433 60.1655C109.433 34.9729 88.8771 14.5715 63.53 14.5715C38.1829 14.5715 17.627 34.9729 17.627 60.1655C17.627 85.3581 38.1829 105.759 63.53 105.759Z" fill="#EAEEF9"/>
            <path d="M108.262 38.3732C110.012 38.3732 111.431 36.9546 111.431 35.2048C111.431 33.4549 110.012 32.0364 108.262 32.0364C106.512 32.0364 105.094 33.4549 105.094 35.2048C105.094 36.9546 106.512 38.3732 108.262 38.3732Z" fill="#EAEEF9"/>
            <path d="M105.092 28.0951C106.287 28.0951 107.255 27.1264 107.255 25.9314C107.255 24.7363 106.287 23.7676 105.092 23.7676C103.896 23.7676 102.928 24.7363 102.928 25.9314C102.928 27.1264 103.896 28.0951 105.092 28.0951Z" fill="#EAEEF9"/>
            <path d="M17.4587 35.2048C18.6537 35.2048 19.6225 34.236 19.6225 33.041C19.6225 31.846 18.6537 30.8772 17.4587 30.8772C16.2637 30.8772 15.2949 31.846 15.2949 33.041C15.2949 34.236 16.2637 35.2048 17.4587 35.2048Z" fill="#EAEEF9"/>
            <path d="M12.5907 82.8079C14.81 82.8079 16.6092 81.0088 16.6092 78.7894C16.6092 76.5701 14.81 74.771 12.5907 74.771C10.3714 74.771 8.57227 76.5701 8.57227 78.7894C8.57227 81.0088 10.3714 82.8079 12.5907 82.8079Z" fill="#EAEEF9"/>
            <g filter="url(#filter0_d_2_89252)">
              <path d="M105.819 48.8774V90.7162C105.819 90.8887 105.819 90.975 105.819 91.1475C105.733 93.5629 104.611 95.6333 102.886 97.0998C101.42 98.3938 99.4355 99.2565 97.2788 99.2565H29.733C28.2665 99.2565 26.8862 98.9114 25.6785 98.2213C25.1609 97.9625 24.6433 97.6174 24.212 97.1861C23.2631 96.4097 22.4004 95.2883 21.9691 94.0805C21.624 93.2179 21.3652 92.269 21.3652 91.32V48.8774C21.3652 48.8774 24.9021 45.8582 29.9918 41.7174C35.254 37.3179 42.1552 31.6244 48.1938 26.621C51.6444 23.6879 51.2993 24.033 56.6478 19.5472C60.7023 16.0966 66.6546 16.0966 70.7091 19.5472C71.7442 20.4098 72.8657 21.445 73.9009 22.3077C76.1438 24.1193 78.5592 26.1896 81.1472 28.3463C86.5819 32.8321 92.5342 37.8355 97.1926 41.7174C101.937 45.5994 105.388 48.5324 105.819 48.8774Z" fill="url(#paint0_linear_2_89252)"/>
            </g>
            <path d="M97.1936 41.631V56.6412L82.4422 65.5266L78.0427 68.2008L68.726 73.808L64.3265 76.4823L62.4286 77.6037L60.6171 76.4823L56.4763 73.808L47.591 68.2008L43.4503 65.5266L29.8203 56.9863V41.7173C35.0825 37.3178 41.9837 31.6242 48.0223 26.6208L81.062 28.2599C86.583 32.832 92.5353 37.7491 97.1936 41.631Z" fill="#989FB0"/>
            <path d="M94.2589 29.7264V56.1236L80.8015 64.1463L76.8333 66.5618L68.293 71.5652L64.3248 73.9806L62.5995 74.9295L60.9604 73.9806L57.1647 71.5652L49.0558 66.5618L45.2601 64.1463L32.8379 56.3824V29.7264C32.8379 26.9659 35.0808 24.723 37.9276 24.723H89.1692C91.9297 24.6368 94.2589 26.9659 94.2589 29.7264Z" fill="white"/>
            <path opacity="0.5" d="M21.7109 48.7051L62.2557 51.3793L105.216 48.7051L103.577 56.3827C103.577 56.3827 63.2046 77.4315 63.4634 77.4315C63.7222 77.4315 21.7972 52.5008 21.7972 52.5008L21.7109 48.7051Z" fill="url(#paint1_linear_2_89252)"/>
            <path d="M105.819 48.8774V91.1475C105.733 93.5629 104.611 95.6333 102.886 97.0998C101.42 98.3938 99.4355 99.2565 97.2788 99.2565H29.733C28.2665 99.2565 26.8862 98.9114 25.6785 98.2213C25.1609 97.9625 24.6433 97.6174 24.212 97.1861C23.2631 96.4097 22.4004 95.2882 21.9691 94.0805C21.624 93.2179 21.3652 92.269 21.3652 91.32V91.2338V48.8774L59.1495 72.5142L62.4276 74.5845L63.549 73.8944L64.5842 73.2906L105.819 48.8774Z" fill="#738DFF"/>
            <path d="M102.972 97.0998C101.506 98.3938 99.5217 99.2565 97.3651 99.2565H29.733C28.2665 99.2565 26.8862 98.9114 25.6785 98.2213C25.1609 97.9625 24.6433 97.6174 24.212 97.1861C23.2631 96.4097 22.4004 95.2882 21.9691 94.0805C21.624 93.2179 21.3652 92.269 21.3652 91.32V91.2338V48.8774L25.7648 51.5517L63.549 73.8944L64.5842 74.4983L64.6705 74.5845L98.5728 94.5981L102.972 97.0998Z" fill="url(#paint2_linear_2_89252)"/>
            <path d="M64.5839 73.2041V76.1372L25.6782 98.2211C25.1606 97.9623 24.643 97.6173 24.2117 97.1859C23.2627 96.4095 22.4001 95.2881 21.9688 94.0804L59.8393 71.6514L63.1174 73.7217L63.5487 73.8943L64.5839 73.2041Z" fill="url(#paint3_linear_2_89252)"/>
            <path d="M21.3652 48.8774L63.549 73.8944" stroke="white" stroke-width="0.901575" stroke-miterlimit="10"/>
            <path d="M105.82 48.8774V91.1475C105.734 93.5629 104.612 95.6333 102.887 97.0998C101.42 98.3938 99.4364 99.2565 97.2797 99.2565H29.7339C28.2674 99.2565 26.8871 98.9114 25.6794 98.2213C25.1618 97.9625 24.6442 97.6174 24.2129 97.1861L28.5262 94.5981L62.4285 74.5845L63.5499 73.8944L64.5851 73.2906L101.334 51.4654L105.82 48.8774Z" fill="url(#paint4_linear_2_89252)"/>
            <path d="M105.82 48.8774L64.5851 73.2043L63.5499 73.8944L62.4285 74.5845L24.2129 97.0998" stroke="white" stroke-width="0.901575" stroke-miterlimit="10"/>
            <path d="M95.6397 78.4664H73.2106C72.693 78.4664 72.2617 78.0351 72.2617 77.5175C72.2617 76.9999 72.693 76.5686 73.2106 76.5686H95.6397C96.1572 76.5686 96.5886 76.9999 96.5886 77.5175C96.6748 78.0351 96.2435 78.4664 95.6397 78.4664Z" fill="#CED7E2"/>
            <path d="M95.6397 84.9364H73.2106C72.693 84.9364 72.2617 84.5051 72.2617 83.9875C72.2617 83.4699 72.693 83.0386 73.2106 83.0386H95.6397C96.1572 83.0386 96.5886 83.4699 96.5886 83.9875C96.6748 84.5051 96.2435 84.9364 95.6397 84.9364Z" fill="#CED7E2"/>
            <path d="M61.3927 57.7045C60.7241 57.7045 60.0948 57.4588 59.5835 56.9264L50.8917 47.8756C49.9085 46.8517 49.9085 45.1316 50.8917 44.1078C51.875 43.084 53.5268 43.084 54.51 44.1078L61.3927 51.2747L77.5964 34.4427C78.5797 33.4188 80.2315 33.4188 81.2147 34.4427C82.198 35.4665 82.198 37.1866 81.2147 38.2104L63.2018 56.9264C62.7299 57.4588 62.0613 57.7045 61.3927 57.7045Z" fill="url(#paint5_linear_2_89252)"/>
            <defs>
              <filter id="filter0_d_2_89252" x="1.53058" y="7.0419" width="124.122" height="121.966" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="9.91733"/>
                <feGaussianBlur stdDeviation="9.91733"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_89252"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_89252" result="shape"/>
              </filter>
              <linearGradient id="paint0_linear_2_89252" x1="63.5583" y1="17.9239" x2="63.5583" y2="79.3528" gradientUnits="userSpaceOnUse">
                <stop stop-color="#B0BACC"/>
                <stop offset="1" stop-color="#969EAE"/>
              </linearGradient>
              <linearGradient id="paint1_linear_2_89252" x1="63.4263" y1="86.5388" x2="63.4263" y2="50.6409" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8A90B5"/>
                <stop offset="1" stop-color="#A7AED2" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="paint2_linear_2_89252" x1="62.1422" y1="47.7121" x2="62.1422" y2="99.7996" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FDFEFF"/>
                <stop offset="0.9964" stop-color="#ECF0F5"/>
              </linearGradient>
              <linearGradient id="paint3_linear_2_89252" x1="45.7098" y1="87.3694" x2="42.4019" y2="82.528" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D5D8E4"/>
                <stop offset="1" stop-color="#E1E4F0" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="paint4_linear_2_89252" x1="64.9899" y1="47.7121" x2="64.9899" y2="99.7996" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FDFEFF"/>
                <stop offset="0.9964" stop-color="#ECF0F5"/>
              </linearGradient>
              <linearGradient id="paint5_linear_2_89252" x1="66.0557" y1="34.5096" x2="66.0557" y2="47.9972" gradientUnits="userSpaceOnUse">
                <stop stop-color="#B0BACC"/>
                <stop offset="1" stop-color="#969EAE"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="sub-content ta-center">
          <div class="heading-6 color-black">Email Verification</div>
          <div class="body-5 color-black">We have sent an email to this address to verify your email address and activate your account. </div>
        </div>
          <div class="body-5 color-primary">{{email}}</div>
        <div class="resend">
          <div class="body-5 color-gray-1">Did not receive the email?</div>
          <div class="button-3 color-primary pointer" (click)="resend()">Resend</div>
        </div>
      </div>
      <div class="button-pay button-1 color-gray-1 button-pay-hover" (click)="goBack()">Back</div>
    </div>
  `,
  styleUrls: ['../../../authentication/authentication.component.css']
})
export class VerifyEmailComponent {
  email: string = '';
  @Output() sendVerificationEmail = new EventEmitter<any>();
  @Output() return = new EventEmitter<void>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.dataService.getData().email) this.email = this.dataService.getData().email;
  }

  goBack() {
    this.return.emit();
  }

  resend() {
    const obj = {
      "stream": this.dataService.getData().stream,
      "email": this.email,
    }
    this.sendVerificationEmail.emit(obj);
  }
}
