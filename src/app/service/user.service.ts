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

  update(user : any): Observable<User> {
    return this.http.put<User>(`${API_URL}/update-info`, user);
  }

//   delete(id: number): Observable<Employee> {
//     return this.http.delete<Employee>(`${API_URL}/employees/${id}`);
//   }
  
//   reset() {
//     //
//   }
  findMenu(): any[] {
    const value = [
      {
        "title": "Silver",
        "price": 100,
        "detail": [
          {
            "icon": "A",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd1"
          },
          {
            "icon": "B",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd"
          },
          {
            "icon": "C",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd"
          }
        ]
      },
      {
        "title": "Gold",
        "price": 150,
        "detail": [
          {
            "icon": "D",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd2"
          },
          {
            "icon": "E",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd"
          },
          {
            "icon": "F",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd"
          }
        ]
      },
      {
        "title": "Platinum",
        "price": 200,
        "detail": [
          {
            "icon": "G",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd3"
          },
          {
            "icon": "H",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd"
          },
          {
            "icon": "K",
            "title": "Title",
            "description": "hsgfsdghdfjjfdjgfdjg;kfd"
          }
        ]
      }
    ];
    return value;
  }

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
    return this.http.post<any>(`${API_URL}/pay`, obj);
  }
}
