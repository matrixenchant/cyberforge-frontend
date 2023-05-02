import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatrixTransitionService } from './matrix.transition';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  user: AppUser = {
    id: 0,
    username: 'matrixenchant'
  }

  constructor(public router: Router, public transition: MatrixTransitionService) {
    this.isAuth = !!localStorage.getItem('token')
  }

  login(username: string, password: string) {
    console.log('login');
    
    this.isAuth = true;
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
