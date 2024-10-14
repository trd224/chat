import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../_shared/_services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err)
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authService.logout();
        location.reload();
      }
      const error = err.error.message || err.statusText;
      //console.log(error);
      return throwError(() => error);
    }));
  }
}
