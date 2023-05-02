import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private api: ApiService, private auth: AuthService, public n: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `JWT ${token}`),
      });
      return next.handle(authReq).pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            this.n.notify('Нет доступа');
            this.auth.logout();
          }

          this.api.loading = false;

          return throwError(() => error);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        this.api.loading = false;
        return throwError(() => error);
      })
    );
  }
}
