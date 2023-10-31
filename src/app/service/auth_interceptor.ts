import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorMessages } from './error-messages';
import { ErrorService } from './error.service';

@Injectable()
export class Auth_interceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("Token_Key");
    if(token){
      request = request.clone({
        setHeaders: {Authorization: 'Bearer '+ token}
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error.status in errorMessages) {
        //   const errorMessage = errorMessages[error.status];
        //   console.error(`Lỗi HTTP (${error.status}): ${errorMessage}`);
        // } else {
        //   console.error('Lỗi không xác định:', error);
        // }
        this.errorService.setError(error);
        return throwError(error);
      })
    );
  }
}
