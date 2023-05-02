import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BASE_URL } from 'src/config';
import { MatrixTransitionService } from './matrix.transition';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  loading = false;
  isAuth = false;
  user: AppUser = {
    id: 0,
    username: 'matrixenchant',
  };

  constructor(
    public router: Router,
    public transition: MatrixTransitionService,
    public n: NotificationService,
    private client: HttpClient
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isAuth = true;
    } else this.isAuth = false;

    console.log(this.isAuth);
  }

  register(username: string, password: string) {
    this.loading = true;
    this.client
      .post<AuthToken>(`${BASE_URL}/users/register/`, { username, password, modifications: [] })
      .pipe(
        catchError((err) => {
          this.n.notify(err.statusText);
          this.loading = false;
          return throwError(() => err)
        })
      )
      .subscribe(({ token }) => {
        localStorage.setItem('token', 'test-token');
        this.transition.redirectTo(['/home']);
        this.isAuth = true;
        this.loading = false;
      });
  }

  login(username: string, password: string) {
    this.loading = true;
    this.client
      .post<AuthToken>(`${BASE_URL}/users/login/`, { username, password })
      .subscribe((res) => {
        console.log(res);

        this.loading = false;
      });

    //localStorage.setItem('token', 'test-token');
    //this.transition.redirectTo(['/home'])
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
