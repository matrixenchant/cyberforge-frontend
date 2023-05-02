import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { __modifications } from 'src/mockup';
import { AuthService } from '../services/auth.service';

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
      size: '1fr'
    },
    {
      label: 'Цена от',
      value: 'costMin',
      size: '0.5fr',
      type: 'number'
    },
    {
      label: 'Цена до',
      value: 'costMax',
      size: '0.5fr'
    },
  ];

  isMyAssemblies = false;

  modifications: PCModification[] = __modifications;

  constructor(public location: Location, public auth: AuthService) {
    if (this.location.path() == '/my-assemblies') this.isMyAssemblies = true
  }

  ngOnInit(): void {
  }

  getModifications() {
    if (this.isMyAssemblies) return this.modifications.filter(x => x.author_name == this.auth.user.username)
    return this.modifications
  }

}
