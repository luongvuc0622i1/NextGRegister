import { Injectable } from '@angular/core';
// @ts-ignore
import * as jwt_decode from "jwt-decode";
const ID_KEY = 'ID_KEY';
const USERNAME_KEY = 'Username_Key';
const TOKEN_KEY = 'Token_Key';
const ROLE_KEY = 'Role_Key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setID(id: string) {
    localStorage.removeItem(ID_KEY);
    localStorage.setItem(ID_KEY, id);
  }

  public getID():string {
    // @ts-ignore
    return localStorage.getItem(ID_KEY);
  }

  public setUsername(username: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername():string {
    // @ts-ignore
    return localStorage.getItem(USERNAME_KEY);
  }

  public setToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken():string {
    // @ts-ignore
    return localStorage.getItem(TOKEN_KEY);
  }

  public setRole(role: string) {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): string {
    // @ts-ignore
    return localStorage.getItem(ROLE_KEY);
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
      //  && isSignatureValid;
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