import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { DeckComponent } from './deck/deck.component';

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
      name: 'Название',
      value: 'name',
      size: '1fr'
    },
    {
      name: 'Цена от',
      value: 'costMin',
      size: '0.5fr',
      type: 'number'
    },
    {
      name: 'Цена до',
      value: 'costMax',
      size: '0.5fr'
    },
  ];

  name: string = '';

  assembly = {
    case: {},
    name: '',
  };

  types: PCTypes[] = [
    { type: 'cpu', label: 'CPU', component: null },
    { type: 'gpu', label: 'Видеокарта', component: null },
    { type: 'motherboard', label: 'Мат. плата', component: null },
    { type: 'ram', label: 'ОЗУ', component: null },
    { type: 'memory', label: 'Память', component: null },
    { type: 'power', label: 'Блок питания', component: null },
  ];
  activeType: string | null = null;

  components: PCComponent[] = [
    {
      id: 1,
      name: 'AMD Epyc 7262 N',
      image: '../../../assets/hero.png',
      type: 'cpu',
      rating: 0,
      cost: 0,
      spec: [
        {
          name: 'Техпроцесс',
          value: '5 нм',
        },
        {
          name: 'Макс. тактовая частота',
          value: '4.5 ГГц',
        },
        {
          name: 'Ядер/потоков',
          value: '16/32',
        },
      ],
    },
    {
      id: 2,
      name: 'CPU 2',
      image: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 3,
      name: 'CPU 3',
      image: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 4,
      name: 'CPU 4',
      image: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 5,
      name: 'CPU 5',
      image: '../../../assets/hero.png',
      type: 'cpu',
    },

    {
      id: 6,
      name: 'AMD Epyc 7262 N',
      image: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 7,
      name: 'ram 2',
      image: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 8,
      name: 'ram 3',
      image: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 9,
      name: 'ram 4',
      image: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 10,
      name: 'ram 5',
      image: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 11,
      name: 'ram 5',
      image: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 12,
      name: 'ram 5',
      image: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 13,
      name: 'ram 5',
      image: '../../../assets/hero.png',
      type: 'cpu',
    },
  ];

  deck = [] as any;

  constructor(public notification: NotificationService) {}

  ngOnInit(): void {}

  saveAssembly() {
    this.notification.notify('Сборка сохранена');
  }

  onSearch(data: any) {
    console.log('filter', data);
    const type = this.types.filter((x) => x.type === this.activeType)[0];
  
    
    this.deckComponent?.changeDeck(
      this.components.filter(
        (x: any) => x.type === type.type && x.id !== type?.component?.id && x.name == data.name
      )
    );
  }

  getAvgCost() {
    if (!this.components.length) return null;
    let cost = 0;
    this.components.forEach((x: any) => (cost += x.cost));
    return Math.round(cost / this.components.length);
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
