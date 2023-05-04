import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BASE_URL } from 'src/config';
import { MatrixTransitionService } from './matrix.transition';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  loading = false;
  isAuth = !!localStorage.getItem('token');
  user: AppUser = {
    username: '',
    modifications: [],
  };

  constructor(
    public router: Router,
    public transition: MatrixTransitionService,
    public n: NotificationService,
    private client: HttpClient
  ) {}

  ngOnInit(): void {}

  getUser() {
    this.loading = true;
    this.client
      .get<AppUser>(`${BASE_URL}/users/user/`)
      .pipe(
        catchError((err) => {
          this.n.notify('Нет доступа');

          this.loading = false;
          return throwError(() => err);
        })
      )
      .subscribe((user) => {
        this.user = user;
        this.loading = false;
      });
  }

  register(username: string, password: string, email: string) {
    this.loading = true;
    this.client
      .post<AuthUser>(`${BASE_URL}/users/register/`, {
        username,
        password,
        email,
        phone: '71234567890',
      })
      .pipe(
        catchError((err) => {
          for (let e in err?.error) {
            this.n.notify(err.error[e]);
          }

          this.loading = false;
          return throwError(() => err);
        })
      )
      .subscribe(({ token, user }) => {
        this.user = user;
        localStorage.setItem('token', token);
        this.isAuth = true;

        this.transition.redirectTo(['/home']);
        this.loading = false;
      });
  }

  login(username: string, password: string) {
    this.loading = true;
    this.client
      .post<AuthUser>(`${BASE_URL}/users/login/`, { username, password })
      .pipe(
        catchError((err) => {
          for (let e in err?.error) {
            this.n.notify(err.error[e]);
          }
          this.loading = false;
          return throwError(() => err);
        })
      )
      .subscribe(({ token, user }) => {
        this.user = user;
        localStorage.setItem('token', token);
        this.isAuth = true;
        this.transition.redirectTo(['/home']);

        this.loading = false;
      });
  }

  loginAsGuest() {
    console.log('guest');

    this.transition.redirectTo(['/home']);
  }

  logout() {
    this.isAuth = false;
    localStorage.removeItem('token');
  }
}
