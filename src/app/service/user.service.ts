import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/User';

const API_URL = environment.apiUrl + '/account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

//   getAll(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(API_URL + '/employees');
//   }

//   create(employee : FormEmployee): Observable<Employee> {
//     return this.http.post<Employee>(API_URL + '/employees', employee);
//   }

  findById(): Observable<any> {
    return this.http.get<any>(`${API_URL}/info`);
  }

  findRankById(): Observable<any> {
    return this.http.get<any>(`${API_URL}/account-rank`);
  }

  update(user : any): Observable<User> {
    return this.http.put<User>(`${API_URL}/update-info`, user);
  }

  changePass(obj : any): Observable<any> {
    return this.http.post<any>(`${API_URL}/changePass`, obj);
  }

//   delete(id: number): Observable<Employee> {
//     return this.http.delete<Employee>(`${API_URL}/employees/${id}`);
//   }
  
//   reset() {
//     //
//   }

  findAllCountry(): Observable<any[]> {
    return this.http.get<any[]>(`https://restcountries.com/v3.1/all`);
  }

  findDiscount(obj: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/getDiscountPercent`, obj);
  }

  payWithPaypal(obj: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/pay`, obj);
  }

  payWithCard(obj: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/pay-card`, obj);
  }

  findAllBank(): Observable<any> {
    return this.http.get<any>(`https://api.vietqr.io/v2/banks`);
  }
}
