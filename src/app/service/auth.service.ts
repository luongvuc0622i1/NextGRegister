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
      this.tokenService.setID(data.id);
      this.tokenService.setToken(data.token);
      this.tokenService.setRefreshToken(data.refreshToken);
      this.tokenService.setRole(data.roles[0]);

      this.router.navigate(['/home']);
      // if (data.roleSet[0].name == 'MANAGER') {
      //   this.router.navigate(['/manager/profile']);
      // } else if (data.roleSet[0].name == 'USER') {
      //   this.router.navigate(['/user/home']);
      // } else if (data.roleSet[0].name == 'ADMIN') {
      //   this.router.navigate(['/admin/profile']);
      // }
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

  registerEmail(form: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, form);
  }

  sendVerificationPhone(obj: any): Observable<any> {
    return this.http.post(`${API_URL}/validate-otp`, obj);
  }

  registerPhone(form: any): Observable<any> {
    return this.http.post(`${API_URL}/registerByPhone`, form);
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
}