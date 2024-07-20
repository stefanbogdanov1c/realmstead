import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { City, Family, Noble } from './types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000';

  fetchAllNobles(): Observable<Noble[]> {
    return this.http.get<Noble[]>(`${this.baseUrl}/api/nobles`);
  }

  createNewNoble(noble: Noble) {
    return this.http.post(`${this.baseUrl}/api/nobles`, noble);
  }

  deleteNoble(id: string) {
    return this.http.delete(`${this.baseUrl}/api/nobles/${id}`);
  }

  updateNoble(noble: Noble) {
    return this.http.put(`${this.baseUrl}/api/nobles/${noble._id}`, noble);
  }


  fetchAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/api/cities`);
  }

  createNewCity(city: City) {
    return this.http.post(`${this.baseUrl}/api/cities`, city);
  }

  deleteCity(id: string) {
    return this.http.delete(`${this.baseUrl}/api/cities/${id}`);
  }

  updateCity(city: City) {
    return this.http.put(`${this.baseUrl}/api/cities/${city._id}`, city);
  }


  fetchAllFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.baseUrl}/api/families`);
  }

  createNewFamily(family: Family) {
    return this.http.post(`${this.baseUrl}/api/families`, family);
  }

  deleteFamily(id: string) {
    return this.http.delete(`${this.baseUrl}/api/families/${id}`);
  }

  updateFamily(family: Family) {
    return this.http.put(`${this.baseUrl}/api/families/${family._id}`, family);
  }
}
