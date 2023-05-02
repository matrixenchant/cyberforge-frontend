import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { DeckComponent } from './deck/deck.component';
import { __components } from 'src/mockup';

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

  types: PCTypes[] = [
    { type: 'housing', label: 'Корпус', component: null },
    { type: 'cpu', label: 'CPU', component: null },
    { type: 'gpu', label: 'Видеокарта', component: null },
    { type: 'mboard', label: 'Мат. плата', component: null },
    { type: 'ram', label: 'ОЗУ', component: null },
    { type: 'memory', label: 'Память', component: null },
    { type: 'power', label: 'Блок питания', component: null },
  ];
  activeType: string | null = null;

  components: PCComponent[] = __components;

  deck = [] as any;

  constructor(public notification: NotificationService) {}

  ngOnInit(): void {}

  saveAssembly() {
    this.notification.notify('Сборка сохранена');
  }

  getHousing() {
    return this.types[0]
  }
  getRenderTypes() {
    return this.types.filter(x => x.type !== 'housing')
  }

  onSearch(data: any) {
    console.log('filter', data);
    const type = this.types.filter((x) => x.type === this.activeType)[0];
  
    const byName = (name: string) => data.name ? name.toLowerCase().includes(data.name.toLowerCase()) : true
    const byCostMin = (cost: number) => data.costMin ? cost >= data.costMin : true
    const byCostMax = (cost: number) => data.costMax ? cost <= data.costMax  : true
    
    this.deckComponent?.changeDeck(
      this.components.filter(
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
      this.deckComponent.deck = this.components.filter(
        (x: any) => x.type === this.activeType && x.id !== comp?.id
      );
  }

  getTypeLabel(type: string) {
    return this.types.filter((x) => x.type === type)[0].label;
  }

  changeType(type: string) {
    console.log(type);
    
    if (type === this.activeType) return;
    this.activeType = type;
    const component = this.types.filter((x) => x.type === type)[0].component;

    this.deckComponent?.changeDeck(
      this.components.filter(
        (x: any) => x.type === type && x.id !== component?.id
      )
    );
  }
}
