import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationState', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('hide => show', animate('300ms ease-in')),
      transition('show => hide', animate('300ms ease-out'))
    ])
  ]
})
export class NotificationComponent implements OnInit {

  @Input()
  message: string = '';

  @Input()
  id: string = '';

  visible: boolean = true;

  constructor(public service: NotificationService) { }

  ngOnInit(): void {}

  hide() {
    this.visible = false;
  }

  remove() {
    this.service.remove(this.id);
  }
}
