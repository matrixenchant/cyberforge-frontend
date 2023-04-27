import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatrixTransitionService } from './matrix.transition';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://127.0.0.1:8000';
  constructor(public router: Router, public transition: MatrixTransitionService) {}
  login(username: string, password: string) {
    console.log('login');
    
    localStorage.setItem('token', 'test-token');
    this.transition.redirectTo(['/home'])
  }
}
