import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from "./token.service";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
  // @ts-ignore
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.tokenService.isValidToken(this.tokenService.getToken())) {
    //   return true;
    // } else {
    //   // Swal.fire({
    //   //   icon: 'error',
    //   //   title: 'Oops...',
    //   //   text: 'Can not Access!',
    //   //   footer: '<a href="">Why do I have this issue?</a>'
    //   // })
    //   this.router.navigate(['']);
    // }

    const token = this.tokenService.getToken();

    if (this.tokenService.isValidToken(token)) {
      // Kiểm tra tính hợp lệ của token thông qua API
      return this.authService.checkTokenValidity(token);
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
