import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public notification: NotificationService) {}

  canActivate(): boolean {
    if (this.auth.isAuth) {
      return true;
    } else {
      this.notification.notify('Вам необходимо войти в систему')
      return false;
    }
  }
}
