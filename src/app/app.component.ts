import { Component, OnInit } from '@angular/core';
import { MatrixTransitionService } from './services/matrix.transition';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cyberforge';

  constructor (public matrixTransitionService: MatrixTransitionService, public notification: NotificationService, public auth: AuthService) {}

  ngOnInit() {
    console.log('app');
    this.auth.ngOnInit()
    const images = ['assemblies', 'auth', 'configurator', 'home']
    for (const image of images) {
      (new Image()).src = `../assets/backgrounds/${image}.png`
    }
  }
}
