import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatrixTransitionService } from 'src/app/services/matrix.transition';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss'],
})
export class UserWidgetComponent implements OnInit {
  popupActive: boolean = false;

  constructor(
    public auth: AuthService,
    public transition: MatrixTransitionService,
    public location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => this.popupActive = false)
  }

  logout() {
    this.popupActive = false;
    this.auth.logout();
  }
}
