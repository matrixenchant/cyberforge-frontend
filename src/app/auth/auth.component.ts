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
    email: '',
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
    if (!this.register.username || !this.register.password || !this.register.password || !this.register.email) {
      return this.notification.notify('Заполните все поля')
    }
    if (this.register.password.length < 6) {
      return this.notification.notify('Пароль должен быть длиннее 6 символов')
    }
    if (this.register.password !== this.register.repeatPassword) {
      return this.notification.notify('Пароли не совпадают')
    }
    if (!validateEmail(this.register.email)) {
      return this.notification.notify('Неверная почта')
    }
    
    this.auth.register(this.register.username, this.register.password, this.register.email)
  }

}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
