import { Component } from '@angular/core';
import { MatrixTransitionService } from './services/matrix.transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cyberforge';

  constructor (public matrixTransitionService: MatrixTransitionService) {}
}
