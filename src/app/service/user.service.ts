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

  findById(): Observable<User> {
    return this.http.get<User>(`${API_URL}/info`);
  }

  update(user : User): Observable<User> {
    return this.http.put<User>(`${API_URL}/update-info`, user);
  }

//   delete(id: number): Observable<Employee> {
//     return this.http.delete<Employee>(`${API_URL}/employees/${id}`);
//   }
  
//   reset() {
//     //
//   }
}
