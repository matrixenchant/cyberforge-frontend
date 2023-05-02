import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { DeckComponent } from './deck/deck.component';
import { __components } from 'src/mockup';
import { ApiService } from '../services/api.service';
import { snakeCase } from 'src/utils';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfiguratorComponent implements OnInit {
  @ViewChild(DeckComponent) deckComponent: DeckComponent | undefined;

  showFilter: boolean = false;
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

  name: string = '';

  assembly: PCModification = {
    id: 0,
    name: '',
    description: '',
    author_name: '',
    likes: 0,
    components: __components
  };

  types: PCTypes[] = [
    { type: 'Housing', label: 'Корпус', component: null },
    { type: 'CPU', label: 'CPU', component: null },
    { type: 'GPU', label: 'Видеокарта', component: null },
    { type: 'Motherboard', label: 'Мат. плата', component: null },
    { type: 'RAM', label: 'ОЗУ', component: null },
    { type: 'Memory', label: 'Память', component: null },
    { type: 'PowerSupplyUnit', label: 'Блок питания', component: null },
  ];
  activeType: string | null = null;

  components: PCComponent[] = [];

  deck = [] as any;

  constructor(public notification: NotificationService, public api: ApiService) {}

  ngOnInit(): void {
    
  }

  saveAssembly() {
    this.notification.notify('Сборка сохранена');
  }

  getHousing() {
    return this.types[0]
  }
  getRenderTypes() {
    return this.types.filter(x => x.type !== 'Housing')
  }

  onSearch(data: any) {
    console.log('filter', data);
    const type = this.types.filter((x) => x.type === this.activeType)[0];
  
    const byName = (name: string) => data.name ? name.toLowerCase().includes(data.name.toLowerCase()) : true
    const byCostMin = (cost: number) => data.costMin ? cost >= data.costMin : true
    const byCostMax = (cost: number) => data.costMax ? cost <= data.costMax  : true
    
    this.deckComponent?.changeDeck(
      this.assembly.components.filter(
        (x: any) => x.type === type.type &&
        x.id !== type?.component?.id &&
        byName(x.name) &&
        byCostMin(x.cost) &&
        byCostMax(x.cost)
      )
    );
  }

  getCost() {
    let cost = 0;

    this.types.forEach((x: PCTypes) => {
      if (!x.component?.cost) return
      cost += x.component.cost
    });
    return cost || '--';
  }

  getChoicesComponents() {
    return this.types
      .filter((x) => x.component !== null)
      .map((x) => x.component) as any;
  }

  addComponentEvent(comp: any) {
    this.types = this.types.map((x) =>
      x.type == comp.type ? { ...x, component: comp } : x
    );
    if (this.deckComponent?.deck)
      this.deckComponent.deck = this.assembly.components.filter(
        (x: any) => x.type === this.activeType && x.id !== comp?.id
      );
  }

  getTypeLabel(type: string) {
    return this.types.filter((x) => x.type === type)[0].label;
  }

  changeType(type: string) {
    if (type === this.activeType) return;
    this.activeType = type;
    const component = this.types.filter((x) => x.type === type)[0].component;

    this.api.getListPCComponent(snakeCase(type)).subscribe(x => {
      console.log('api', x);
    })

    this.deckComponent?.changeDeck(
      this.assembly.components.filter(
        (x: any) => x.type === type && x.id !== component?.id
      )
    );
  }
}

