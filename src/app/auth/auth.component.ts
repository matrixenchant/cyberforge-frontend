import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login: string = ''; 
  password: string = '';
  repeatPassword: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginHandler() {
    console.log(this.login, this.password);
    this.auth.login(this.login, this.password)
  }

  registerHandler() {
    console.log(this.login, this.password);
  }

}
