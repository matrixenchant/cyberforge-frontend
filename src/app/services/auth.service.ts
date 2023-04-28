import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatrixTransitionService } from './matrix.transition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  BASE_URL = 'http://127.0.0.1:8000';
  isAuth = false;
  user: AppUser = {
    id: 0,
    username: 'matrixenchant'
  }

  constructor(public router: Router, public transition: MatrixTransitionService) {}

  ngOnInit(): void {
      if (localStorage.getItem('token')) {
        this.isAuth = true;
      } else this.isAuth = false;

      console.log(this.isAuth);
      
  }

  login(username: string, password: string) {
    console.log('login');
    
    localStorage.setItem('token', 'test-token');
    this.transition.redirectTo(['/home'])
  }

  loginAsGuest() {
    console.log('guest');
    
    this.transition.redirectTo(['/home'])
  }

  logout() {
    this.isAuth = false;
    localStorage.removeItem('token');
  }
}
