import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const BASE_URL = 'http://127.0.0.1:8000';
@Injectable({
  providedIn: 'root',
})
export class APIService {
  $loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  startLoading() {
    this.$loading.next(true);
  }
  endLoading() {
    this.$loading.next(false);
  }
  isLoading(): Observable<boolean> {
    return this.$loading.asObservable();
  }

  getUser(): Observable<AppUser> {
    this.startLoading();
    let res = this.http.get<AppUser>(`${BASE_URL}/user`);
    res.subscribe(() => {
      this.endLoading();
    });
    return res;
  }

  getAllModifications(): Observable<PCModification[]> {
    this.startLoading();
    let res = this.http.get<PCModification[]>(
      `${BASE_URL}/configurator/modifications`
    );
    res.subscribe(() => {
      this.endLoading();
    });
    return res;
  }

  getMyModifications(): Observable<PCModification[]> {
    this.startLoading();
    let res = this.http.get<PCModification[]>(
      `${BASE_URL}/configurator/modifications/my`
    );
    res.subscribe(() => {
      this.endLoading();
    });
    return res;
  }

  getComponents(): Observable<PCComponent[]> {
    this.startLoading();
    let res = this.http.get<PCComponent[]>(
      `${BASE_URL}/configurator/components`
    );
    res.subscribe(() => {
      this.endLoading();
    });
    return res;
  }
}
