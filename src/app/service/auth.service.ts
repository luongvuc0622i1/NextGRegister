import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtResponse } from '../model/JwtResponse';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private router: Router) { }

  signInSuccess(data: any) {
    if (data.token) {
      this.tokenService.setToken(data.token);
      this.tokenService.setRefreshToken(data.refreshToken);

      this.router.navigate(['/home']);
    }
  }

  sendVerificationEmail(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/verifyEmail`, obj);
  }

  loginEmail(obj: any): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/login`, obj);
  }

  sendOtpLogin(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/send-otp-login`, obj);
  }

  loginPhone(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/loginByPhone`, obj);
  }

  sendOtpRegister(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/send-otp`, obj);
  }

  registerEmail(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, obj);
  }

  sendVerificationPhone(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/validate-otp`, obj);
  }

  registerPhone(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/registerByPhone`, obj);
  }

  sendVerificationEmailChangePass(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/verifyEmailChangePass`, obj);
  }

  resetPasswordEmail(obj: any): Observable<any> {
    return this.http.put(`${API_URL}/changePassword-using-mail`, obj);
  }

  sendVerificationPhoneChangePass(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/validate-otp-change-pass`, obj);
  }

  resetPasswordPhone(obj: any): Observable<any> {
    return this.http.put(`${API_URL}/changePassword-using-phone`, obj);
  }

  sendVerificationEmailWhenVerify(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/emailVerify`, obj);
  }

  sendVerificationPhoneWhenVerify(obj: any): Observable<any> {
    const dataToSend = {
      "phoneNumber": obj.phone,
      "otpNumber": obj.otp
    }
    return this.http.post(`${API_URL}/validate-otp-success`, dataToSend);
  }
  
  checkTokenValidity(token: string): Observable<boolean> {
    // Gọi đến API để kiểm tra tính hợp lệ của token
    return this.http.post<boolean>(`${API_URL}/checkToken`, { token });
  }
  
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/refreshtoken`, { refreshToken });
  }
}