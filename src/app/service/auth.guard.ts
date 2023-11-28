import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
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

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot):
  // // @ts-ignore
  //   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   // if (this.tokenService.isValidToken(this.tokenService.getToken())) {
  //   //   return true;
  //   // } else {
  //   //   // Swal.fire({
  //   //   //   icon: 'error',
  //   //   //   title: 'Oops...',
  //   //   //   text: 'Can not Access!',
  //   //   //   footer: '<a href="">Why do I have this issue?</a>'
  //   //   // })
  //   //   this.router.navigate(['']);
  //   // }

  //   const token = this.tokenService.getToken();

  //   if (this.tokenService.isValidToken(token)) {
  //     // Kiểm tra tính hợp lệ của token thông qua API
  //     return this.authService.checkTokenValidity(token);
  //   } else {
  //     this.router.navigate(['']);
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Perform your authentication logic here
    // For example, check if the user is logged in

    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (token) {
      // Gọi hàm kiểm tra tính hợp lệ của token và cập nhật giá trị của isTokenValid
      return this.authService.checkTokenValidity(token).pipe(
        map(data => {
          return true;
        }),
        catchError(error => {
          return this.authService.refreshToken(refreshToken).pipe(
            map(data => {
              this.tokenService.setToken(data.accessToken);
              return true;
            }),
            catchError(refreshError => {
              localStorage.clear();
              this.router.navigate(['/']);
              return of(false);
            })
          );
        })
      );
    } else {
      return of(false);
    }
  }
}
