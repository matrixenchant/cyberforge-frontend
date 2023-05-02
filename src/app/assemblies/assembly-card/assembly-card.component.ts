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
    likes: 10,
    components: []
  };

  constructor() {}

  ngOnInit(): void {}

  likeHandler() {
    this.isLiked = !this.isLiked
  }

  getHousingImage() {
    return this.assembly.components.find(x => x.type === 'Housing')?.images
  }

  getRating() {
    const sum = this.assembly.components.reduce((prev, val) => val.rating + prev, 0)
    return Math.round(sum / this.assembly.components.length)
  }
  getCost() {
    return this.assembly.components.reduce((prev, val) => +val.price + prev, 0)
  }
  getComponents() {
    return this.assembly.components.slice(0, 4)
  }
}
