import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<HttpErrorResponse | null>(null);

  setError(error: HttpErrorResponse) {
    this.errorSubject.next(error);
  }

  clearError() {
    this.errorSubject.next(null);
  }

  get error$() {
    return this.errorSubject.asObservable();
  }
}