import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Api } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends BaseService {

  getBooks(params?: any): Observable<Api> {
      const queryParams = this.resolveQueryParams(params);

      return this.http.get<Api>(`${this.API_URL_V1}books${queryParams}`);
  }


  getBook(id: number, params?: any): Observable<Api> {
    const queryParams = this.resolveQueryParams(params);

    return this.http.get<Api>(`${this.API_URL_V1}books/${id}${queryParams}`);
  }

  createOrUpdateBook(data: any, id?: number): Observable<Api> {
    if (id) {
      return this.updatedBook(data, id);
    }

    return this.createBook(data);
  }

  createBook(data: any): Observable<Api> {
    return this.http.post<Api>(`${this.API_URL_V1}books`, data);
  }

  updatedBook(data: any, id: number): Observable<Api> {
    return this.http.put<Api>(`${this.API_URL_V1}books/${id}`, data);
  }

  deleteBook(id: number): Observable<Api> {
    return this.http.delete<Api>(`${this.API_URL_V1}books/${id}`);
  }
}
