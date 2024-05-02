import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Noble } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000';

  fetchAllNobles(): Observable<Noble[]> {
    return this.http.get<Noble[]>(`${this.baseUrl}/api/nobles`);
  }

  createNewNoble(noble: any) {
    return this.http.post(`${this.baseUrl}/api/nobles`, noble);
  }

  deleteNoble(id: string) {
    return this.http.delete(`${this.baseUrl}/api/nobles/${id}`);
  }

  test() {
    console.log('test');
  }
}
