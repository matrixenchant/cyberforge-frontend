import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input()
  card: PCComponent | null = {
    id: 0,
    name: 'Карта',
    images: '../../assets/hero.png',
    type: 'CPU',
    price: 0,
    rating: 0,
    spec: []
  };

  @Input()
  accessDragging = false;

  @Input()
  deckClass = '';

  @Input()
  index: number | null = null;

  @Output()
  mouseEnter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  onMouseEnter(e: MouseEvent): void {
    this.mouseEnter.emit(e);
  }

  @Output()
  mouseLeave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  onMouseLeave(e: MouseEvent): void {
    this.mouseLeave.emit(e);
  }

  @Output()
  mouseUp: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output()
  mouseDown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  
  tiltSettings = {
    max: 10,
    reverse: true,
  };

  offsets = {
    x: 0,
    y: 0,
  };
  $main: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.$main = document.querySelector('.configurator-main');
  }

  getSpec() {
    return this.card?.spec?.slice(0, 4) || []
  }

  dragging = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    gsap.to(this.el.nativeElement.children[0], {x: x - this.offsets.x + 16, y: y - this.offsets.y + 18, duration: 0.1})

    if (isColliding(this.$main!, x, y)) {
      this.$main?.classList.add('active')
    } else this.$main?.classList.remove('active')
  };

  stopDrag = (event: MouseEvent) => {
    this.mouseUp.emit(event);
    window.removeEventListener('mousemove', this.dragging);
    //this.$main?.classList.remove('active')

    this.el.nativeElement.children[0].style.pointerEvents = 'none'
    setTimeout(() => {
      this.el.nativeElement.children[0].style.pointerEvents = 'all'
    }, 400);
  };

  startDrag = (event: MouseEvent) => {
    if (!this.accessDragging) return;

    this.mouseDown.emit(event);
    this.offsets = {
      x: event.offsetX,
      y: event.offsetY,
    };
    window.addEventListener('mousemove', this.dragging);
  };
}

function isColliding(el: HTMLElement, x: number, y: number) {
  const rect = el.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function isCollide(a: HTMLElement | null, b: HTMLElement | null) {
  if (!a || !b) return false;
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}
