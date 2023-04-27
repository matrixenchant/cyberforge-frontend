import { Component, Input, OnInit } from '@angular/core';
import { MatrixTransitionService } from 'src/app/services/matrix.transition';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  navTilt = {
    max: 10,
  };

  @Input()
  link: any

  constructor(public matrix: MatrixTransitionService) { }

  ngOnInit(): void {
  }

}
