import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginForm} from "../model/LoginForm";
import {JwtResponse} from "../model/JwtResponse";
// import {SignUpForm} from "../model/SignUpForm";

const API_URL=`http://localhost:8080`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // signUp(signUpForm: SignUpForm): Observable<any> {
  //   return this.http.post(`${API_URL}/register`, signUpForm);
  // }

  login(loginForm: LoginForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/login`, loginForm);
  }
}
