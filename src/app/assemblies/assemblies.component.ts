import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { __modifications } from 'src/mockup';

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

  modifications: PCModification[] = __modifications;

  constructor() { }

  ngOnInit(): void {
  }

}
