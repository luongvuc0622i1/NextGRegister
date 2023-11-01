import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtResponse } from "../model/JwtResponse";
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(form: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, form);
  }

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
}