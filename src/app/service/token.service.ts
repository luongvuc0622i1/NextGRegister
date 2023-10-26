import { Injectable } from '@angular/core';
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
}