import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends BaseService {

  getBooks(params?: any): Observable<any> {
      const queryParams = this.resolveQueryParams(params);

      return this.http.get(`${this.BASE_URL}v1/books${queryParams}`);
  }

  getBook(id: number, params?: any): Observable<any> {
    const queryParams = this.resolveQueryParams(params);

    return this.http.get(`${this.BASE_URL}v1/books/${id}${queryParams}`);
  }

  createOrUpdateBook(data: any, id?: number): Observable<any> {
    if (id) {
      return this.updatedBook(data, id);
    }

    return this.createBook(data);
  }

  createBook(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}v1/books`, data);
  }

  updatedBook(data: any, id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}v1/books/${id}`, data);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}v1/books/${id}`);
  }
}
