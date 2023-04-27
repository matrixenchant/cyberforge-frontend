import { Component, OnInit } from '@angular/core';
import { MatrixTransitionService } from 'src/app/services/matrix.transition';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(public matrix: MatrixTransitionService) { }

  ngOnInit(): void {
  }

}
