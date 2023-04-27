import { ViewEncapsulation } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assembly-card',
  templateUrl: './assembly-card.component.html',
  styleUrls: ['./assembly-card.component.scss']
})
export class AssemblyCardComponent implements OnInit {
  @Input()
  canLiked: boolean = false;

  @Input()
  isLiked: boolean = false;

  @Input()
  assembly = {
    user: {
      id: 453,
      login: 'matrixenchant'
    },
    case: {
      url: '../../../assets/case.png',
    },
    likes: 10,
    name: 'Oblivion',
    power: 15,
    cost: 120,
    components: [
      {
        type: 'cpu',
        label: 'CPU',
        component: {
          id: 1,
          label: 'AMD Epyc 7262 N',
          hero: '../../../assets/hero.png',
          type: 'cpu',
        },
      },
      {
        type: 'gpu',
        label: 'Видеокарта',
        component: {
          id: 12,
          label: 'NVIDIA 2060 RTX',
          hero: '../../../assets/gpu.png',
          type: 'gpu',
        },
      },
      { type: 'motherboard', label: 'Мат. плата', component: null },
      { type: 'ram', label: 'ОЗУ', component: null },
      { type: 'memory', label: 'Память', component: null },
      { type: 'power', label: 'Блок питания', component: null },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  likeHandler() {
    this.isLiked = !this.isLiked
  }

  getComponents() {
    return this.assembly.components.filter(x => x.component !== null).slice(0, 4).map(x => x.component) as PCComponent[]
  }
}
