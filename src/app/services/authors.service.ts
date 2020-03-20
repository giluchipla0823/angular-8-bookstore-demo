import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Api } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseService {

  getAuthors(): Observable<Api> {
    return this.http.get<Api>(`${this.API_URL_V1}authors`);
  }
}
