import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Employee } from '../model/Employee';
import { FormEmployee } from '../model/FormEmployee';

const API_URL=`http://localhost:8080`

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  value: any;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + '/employees');
  }

  create(employee : FormEmployee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/employees', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/profile/${id}`);
  }

  update(id: number, employee : FormEmployee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/employees/${id}`, employee);
  }

  delete(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${API_URL}/employees/${id}`);
  }
  
  reset() {
    //
  }
}
