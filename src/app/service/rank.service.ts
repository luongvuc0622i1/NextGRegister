import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl + '/admin-rank';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  allRank: any;
  allRankDes: any;

  constructor(private http: HttpClient) { }

  getAllRank(): Observable<any[]> {
    this.allRank = this.http.get<any[]>(API_URL + '/all-rank');
    return this.http.get<any[]>(API_URL + '/all-rank');
  }

  getAllRankDes(): Observable<any[]> {
    this.allRankDes = this.http.get<any[]>(API_URL + '/all-rank-des');
    return this.http.get<any[]>(API_URL + '/all-rank-des');
  }

  // findMenu(): Observable<any> {// Sử dụng forkJoin để gọi cả hai API đồng thời
  //   return forkJoin([
  //     this.getAllRank(),
  //     this.getAllRankDes()
  //   ]).pipe(
  //     // Sử dụng map để kết hợp dữ liệu từ cả hai API
  //     map(([allRank, allRankDes]) => {
  //       // Thực hiện bất kỳ xử lý nào bạn muốn ở đây để kết hợp dữ liệu
  //       allRank.forEach(rank => {
  //         let arr: number[] = [];
  //         if (rank.rankDesId) arr = rank.rankDesId.split(',').map(Number);
  //         const arrTrue = arr.map(id => allRankDes.find(item => item.id === id));
  //         const arrFalse = allRankDes.filter(item => !arr.includes(item.id)).map(item => ({ ...item, status: false }));
  //         rank.rankDesId = arrTrue.concat(arrFalse);
  //       });
  //       return allRank;
  //     })
  //   );
  // }

  findMenu(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + '/allRanks');
  }
}
