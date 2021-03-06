import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Api } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseService {

  getGenres(): Observable<Api> {
    return this.http.get<Api>(`${this.API_URL_V1}genres`);
  }
}
