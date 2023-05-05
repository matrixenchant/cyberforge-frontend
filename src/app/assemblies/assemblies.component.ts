import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-assemblies',
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssembliesComponent implements OnInit {
  filterFields: FilterField[] = [
    {
      label: 'Название',
      value: 'name',
      size: '1fr',
    },
    {
      label: 'Цена от',
      value: 'min_price',
      size: '0.5fr',
      type: 'number',
    },
    {
      label: 'Цена до',
      value: 'max_price',
      size: '0.5fr',
    },
  ];

  isMyAssemblies = false;
  loading: boolean = false;

  modifications: PCModification[] = [];

  constructor(
    public location: Location,
    public auth: AuthService,
    public api: ApiService,
    public notification: NotificationService
  ) {
    if (this.location.path() == '/my-assemblies') this.isMyAssemblies = true;
  }

  ngOnInit(): void {
    if (!this.isMyAssemblies) {
      this.loading = true;
      this.api
        .getListModification()
        .pipe(
          catchError((err) => {
            console.log(err);

            this.loading = false;
            return throwError(() => err);
          })
        )
        .subscribe((data) => {
          this.modifications = data.results as PCModification[];
          this.loading = false;
        });
    }
  }

  getModifications() {
    if (this.isMyAssemblies) {
      return this.auth.user.modifications;
    }

    return this.modifications;
  }

  searchHandler(e: any) {
    let params = '?'
    for (const key in e) {
      if (e[key]) {
        params += `${key}=${e[key]}&`
      }
    }
    

    this.loading = true;
    this.api
      .getListModification(params)
      .pipe(
        catchError((err) => {
          console.log(err);

          this.loading = false;
          return throwError(() => err);
        })
      )
      .subscribe((data) => {
        this.modifications = data.results as PCModification[];
        this.loading = false;
      });
  }
}
