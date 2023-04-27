import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DeckComponent } from './deck/deck.component';

interface CComponents {
  type: string;
  label: string
  component: null | PCComponent
}

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfiguratorComponent implements OnInit {
  @ViewChild(DeckComponent) deckComponent: DeckComponent | undefined;

  assembly = {
    case: {},
    name: '',
  };

  components: CComponents[] = [
    { type: 'cpu', label: 'CPU', component: null },
    { type: 'gpu', label: 'Видеокарта', component: null },
    { type: 'motherboard', label: 'Мат. плата', component: null },
    { type: 'ram', label: 'ОЗУ', component: null },
    { type: 'memory', label: 'Память', component: null },
    { type: 'power', label: 'Блок питания', component: null },
  ];
  activeType: string | null = null;

  cards: PCComponent[] = [
    {
      id: 1,
      label: 'AMD Epyc 7262 N',
      hero: '../../../assets/hero.png',
      type: 'cpu',
      power: 0,
      spec: [
        {
          label: 'Техпроцесс',
          value: '5 нм'
        },
        {
          label: 'Макс. тактовая частота',
          value: '4.5 ГГц'
        },
        {
          label: 'Ядер/потоков',
          value: '16/32'
        },
      ]
    },
    {
      id: 2,
      label: 'CPU 2',
      hero: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 3,
      label: 'CPU 3',
      hero: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 4,
      label: 'CPU 4',
      hero: '../../../assets/hero.png',
      type: 'cpu',
    },
    {
      id: 5,
      label: 'CPU 5',
      hero: '../../../assets/hero.png',
      type: 'cpu',
    },

    {
      id: 6,
      label: 'AMD Epyc 7262 N',
      hero: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 7,
      label: 'ram 2',
      hero: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 8,
      label: 'ram 3',
      hero: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 9,
      label: 'ram 4',
      hero: '../../../assets/hero.png',
      type: 'ram',
    },
    {
      id: 10,
      label: 'ram 5',
      hero: '../../../assets/hero.png',
      type: 'ram',
    },
  ];

  deck = [] as any

  constructor() {}

  ngOnInit(): void {}

  getAvgCost() {
    if (!this.components.length) return null;
    let cost = 0;
    this.components.forEach((x: any) => (cost += x.cost));
    return Math.round(cost / this.components.length);
  }

  getChoicesComponents() {
    return this.components.filter(x => x.component !== null).map(x => x.component) as any
  }

  addComponentEvent(comp: any) {
    this.components = this.components.map(x => x.type == comp.type ? {...x, component: comp} : x)
    if (this.deckComponent?.deck)
    this.deckComponent.deck = this.cards.filter((x: any) => x.type === this.activeType && x.id !== comp?.id)
  }

  getTypeLabel(type: string) {
    return this.components.filter(x => x.type === type)[0].label;
  }

  changeType(type: string) {
    if (type === this.activeType) return;
    this.activeType = type;
    const component = this.components.filter(x => x.type === type)[0].component

    this.deckComponent?.changeDeck(this.cards.filter((x: any) => x.type === type && x.id !== component?.id));
  }
}
