import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin = true;

  login = {
    username: '',
    password: ''
  }

  register = {
    username: '',
    password: '',
    repeatPassword: '',
  }

  constructor(public auth: AuthService, public notification: NotificationService) { }

  ngOnInit(): void {
  }

  loginHandler() {
    if (!this.login.username || !this.login.password) {
      return this.notification.notify('Заполните все поля')
    }
    if (this.login.password.length < 6) {
      return this.notification.notify('Пароль должен быть длиннее 6 символов')
    }

    this.auth.login(this.login.username, this.login.password)
  }

  registerHandler() {
    if (!this.register.username || !this.register.password || !this.register.password) {
      return this.notification.notify('Заполните все поля')
    }
    if (this.register.password !== this.register.repeatPassword) {
      return this.notification.notify('Пароли не совпадают')
    }

  }

}
