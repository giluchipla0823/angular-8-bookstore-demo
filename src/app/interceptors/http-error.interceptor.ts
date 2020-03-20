import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { ValidationErrors } from '../interfaces/validation-errors.interface';
import { StatusCodes } from '../utils/StatusCodes';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Api } from '../interfaces/api.interface';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
       catchError((err: HttpErrorResponse) => {
        this.handleErrors(err);

        return throwError(err);
       })
    );
  }

  private handleErrors(err: HttpErrorResponse) {
      if (err.status === 0) {
        return Swal.fire('Error', err.message, 'error');
      }

      const error: Api = err.error;
      const status: number = err.status;

      if (status === StatusCodes.HTTP_UNAUTHORIZED) {
        return this.resolveUnauthorizedError(error);
      }

      if (status === StatusCodes.HTTP_UNPROCESSABLE_ENTITY) {
        return this.showValidationErrors(error);
      }

      return Swal.fire('Error', error.message || err.message, 'error');
  }

  private resolveUnauthorizedError(error: Api) {
    const isAuthenticated: boolean = this.authService.isAuthenticated();

    Swal.fire({
      title: 'Error',
      text: error.message,
      type: 'error',
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result: any) => {
      if (result.value) {

        this.authService.logout();

        if (isAuthenticated) {
          this.router.navigate(['home']);
        }
      }
    });
  }

  private showValidationErrors(error: Api) {
    const errors: ValidationErrors[] = error.errors;

    let html = `<br /><ul class="text-left">`;

    errors.forEach(item => {
        html += `<li>${ item.message }</li>`;
    });

    html += `</ul>`;

    Swal.fire({
      title: 'Form validation failed',
      html,
      type: 'warning'
    });
  }
}
