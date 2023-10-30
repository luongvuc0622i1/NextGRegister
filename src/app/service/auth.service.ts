import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// @ts-ignore
import * as jwt_decode from "jwt-decode";
import { JwtResponse } from "../model/JwtResponse";
// import * as jwt from 'jsonwebtoken';
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

  // Kiểm tra tính hợp lệ của JWT
  isValidToken(token: string): boolean {
    try {
      // Giải mã JWT để truy cập vào các phần Header, Payload và Signature
      const decodedToken = jwt_decode.jwtDecode<YourPayloadInterface>(token);

      // // Kiểm tra tính hợp lệ của chữ ký (Signature Verification)
      // const isSignatureValid = this.validateSignature(token);

      // Kiểm tra thời hạn (Expiration Verification)
      const isTokenValid = this.validateExpiration(decodedToken.exp);

      return isTokenValid 
      // && isSignatureValid;
    } catch (error) {
      return false;
    }
  }

  // // Kiểm tra tính hợp lệ của chữ ký
  // private validateSignature(token: string): boolean {
  //   // Thực hiện kiểm tra chữ ký, có thể sử dụng một thư viện như 'jsonwebtoken' để thực hiện kiểm tra
  //   // Nếu chữ ký hợp lệ, trả về true; nếu không, trả về false
  //   try {
  //     const secretKey = '========================horizon=ezodo====================='; // Thay thế bằng khóa bí mật thật của bạn
  //     jwt.verify(token, secretKey);
  //     return true; // Chữ ký hợp lệ
  //   } catch (error) {
  //     return false; // Chữ ký không hợp lệ
  //   }
  // }

  // Kiểm tra thời hạn của JWT
  private validateExpiration(expirationTime: number): boolean {
    const currentTime = Date.now() / 1000; // Chuyển thời gian hiện tại sang giây
    return expirationTime > currentTime; // Nếu thời hạn chưa hết, trả về true; nếu đã hết, trả về false
  }
}

// Định nghĩa interface để biểu diễn Payload của JWT
interface YourPayloadInterface {
  // iss: string; // Issuer
  sub: string; // Subject
  // aud: string[]; // Audience
  exp: number; // Expiration Time
  iat: number; // Issued At
  // Thêm các thông tin khác mà bạn muốn lấy từ Payload
}