import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable()
export class Auth_interceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("Token_Key");
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token }
      });
    }
    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res.error && res.error.errorCode) {
          const errorCode = res.error.errorCode;
          const errorDescription = this.errorService.getDescription(errorCode);
          this.errorService.setErrorMessage(errorDescription);
        }

        // Pass the error through to the next error handler
        return throwError(res);
      })
    );
  }
}
