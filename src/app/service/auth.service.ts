import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtResponse } from "../model/JwtResponse";
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`${API_URL}/verifyEmail?email=${email}`, {});
  }

  loginEmail(form: any): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/login`, form);
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

  sendVerificationPhone(form: any): Observable<any> {
    return this.http.post(`${API_URL}/validate-otp?phone=${form.phoneNumber}&otp=${form.otpNumber}`, {});
  }

  registerPhone(form: any): Observable<any> {
    return this.http.post(`${API_URL}/registerByPhone`, form);
  }

  sendVerificationEmailChangePass(email: string): Observable<any> {
    return this.http.post(`${API_URL}/verifyEmailChangePass?email=${email}`, {});
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