import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrixTransitionService {
  private showMatrixTransitionSubject = new BehaviorSubject<boolean>(false);
  public showMatrixTransition$ = this.showMatrixTransitionSubject.asObservable();

  constructor(private router: Router, private location: Location) { }

  show() {
    this.showMatrixTransitionSubject.next(true);
  }

  hide() {
    this.showMatrixTransitionSubject.next(false);
  }

  getStatus() {
    return this.showMatrixTransitionSubject.value
  }

  redirectTo(route: any[]) {
    if (this.location.path() == route[0]) return
    this.show()
    setTimeout(() => {
      this.router.navigate(route);
    }, 700);
    setTimeout(() => {
      this.hide()
    }, 1200);
  }
}