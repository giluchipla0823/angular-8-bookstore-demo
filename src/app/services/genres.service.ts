import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseService {

  getGenres(): Observable<any> {
    return this.http.get(`${this.BASE_URL}v1/genres`);
  }
}
