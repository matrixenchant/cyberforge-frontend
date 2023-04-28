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
  assembly: PCModification = {
    id: 0,
    name: '',
    author_name: '',
    likes: 10
  };

  constructor() {}

  ngOnInit(): void {}

  likeHandler() {
    this.isLiked = !this.isLiked
  }

  getComponents() {
    const result = []
    const mods: any = this.assembly
    for (let key in mods) {
      if (['cpu', 'gpu', 'ram', 'memory'].includes(key)) {
        result.push(mods[key]) 
      }
    }
    return result;
  }

  getRating() {
    const comps = this.getComponents()
    const sum = comps.reduce((prev, val) => val.rating + prev, 0)
    return Math.round(sum / comps.length)
  }
  getCost() {
    return this.getComponents().reduce((prev, val) => val.cost + prev, 0)
  }
}
