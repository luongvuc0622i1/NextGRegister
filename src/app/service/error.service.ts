import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { errorDescriptions } from '../../environments/error-codes';

@Injectable()
export class ErrorService {
  private errorMessageSubject = new Subject<string>();
  private errorDescriptions = errorDescriptions;

  errorMessage$ = this.errorMessageSubject.asObservable();

  getDescription(errorCode: string): string {
    return this.errorDescriptions[errorCode] || 'Unknown Error';
  }

  setErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
  }
}