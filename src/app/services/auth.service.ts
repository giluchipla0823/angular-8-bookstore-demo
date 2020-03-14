import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Api } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: string = 'http://127.0.0.1:8000/api/';
  token: string;
  user: any;
  private authenticated: boolean = false;

  constructor(private http: HttpClient) {
    this.loadStorage();
  }

  login(username: string, password: string): Observable<Api> {
    return this.http.post<Api>(`${this.BASE_URL}login`, {email: username, password})
              .pipe(
                map(response => {
                  this.saveStorage(response.data);

                  return response;
                })
           );
  }

  saveStorage(data: any) {
    const token: string = data.token;
    const user: any = data.user;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userdata', JSON.stringify(user));

    this.loadStorage();
  }

  loadStorage(): void {
    this.token = sessionStorage.getItem('token') || null;

    if (sessionStorage.getItem('userdata')) {
      this.user = JSON.parse(sessionStorage.getItem('userdata'));
    }

    this.authenticated = this.token ? true : false;
  }

  isAuthenticated(): boolean {
      return this.authenticated;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userdata');

    this.loadStorage();
  }

  getUserAuthenticated(): any {
    if (!this.user || !this.token) {
      return null;
    }

    return {
      data: this.user,
      token: this.token
    };
  }
}
