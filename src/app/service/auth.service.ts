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

  // signUp(form: any): Observable<any> {
  //   return this.http.post(`${API_URL}/register`, signUpForm);
  // }

  login(form: any): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/login`, form);
  }
}
