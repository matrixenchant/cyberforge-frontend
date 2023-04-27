import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications: AppNotification[] = [];

  constructor(private router: Router) { }

  notify(message: string) {
    const id = `${Date.now()}`
    this.notifications.push({id, message});
    setTimeout(() => {
      this.remove(id);
    }, 4600);
  }

  remove(id: string) {
    document.getElementById(`n-${id}`)?.classList.add('hide')
    setTimeout(() => {
      this.notifications = this.notifications.filter(x => x.id !== id)
    }, 400);
  }
}