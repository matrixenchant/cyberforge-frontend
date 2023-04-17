import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  @Input()
  deck = [
    {
      label: 'Карта 1',
      hero: '../../../assets/hero.png',
    },
    {
      label: 'Карта 2',
      hero: '../../../assets/hero.png',
    },
    {
      label: 'Карта 3',
      hero: '../../../assets/hero.png',
    },
    {
      label: 'Карта 4',
      hero: '../../../assets/hero.png',
    },
    {
      label: 'Карта 5',
      hero: '../../../assets/hero.png',
    },
  ];

  accessDragging = false;
  isDragging = false;
  isDropping = false;
  cardRect = {
    width: 323,
    height: 418,
  };

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    this.render.listen('window', 'load', () => {
      this.placeCards(null, true);
    });
  }

  placeCards(index: number | null = null, isFrom: boolean = false) {
    if (this.isDragging) return;

    const spec = document
      .querySelector('.configurator-spec')!
      .getBoundingClientRect();

    const centerX = spec.x + spec.width / 2 - this.cardRect.width / 2;
    const bottom = window.innerHeight - this.cardRect.height * 0.9;

    this.deck.map((card, i) => {
      if (index !== null && index !== i) return;

      const midI = Math.round(this.deck.length / 2) - 1;
      let coords = {
        x: centerX,
        y: bottom,
        zIndex: this.deck.length,
        rotate: 0,
      };

      if (i < midI)
        coords = {
          x: centerX - (midI - i) * this.cardRect.width + (midI - i) * 90,
          y: bottom + Math.exp(midI - i) * 15,
          zIndex: this.deck.length - (midI - i),
          rotate: (midI - i) * -5,
        };

      if (i > midI)
        coords = {
          x: centerX + (i - midI) * this.cardRect.width - (i - midI) * 90,
          y: bottom + Math.exp(i - midI) * 15,
          zIndex: this.deck.length - (i - midI),
          rotate: (i - midI) * 5,
        };

      if (isFrom)
        gsap.fromTo(
          `.card-${i}`,
          { x: window.innerWidth / 2, y: window.innerHeight * 1.5 },
          coords
        );
      else gsap.to(`.card-${i}`, coords);
    });
  }

  cardMouseEnter(e: MouseEvent, i: number) {
    if (this.isDragging) return;

    setTimeout(() => {
      this.accessDragging = true;
    }, 400);

    const _ = (s: string) => document.querySelector(s);
    const midI = Math.round(this.deck.length / 2) - 1;
    const exp = Math.exp(Math.abs(midI - i)) * 0.8;

    gsap.to(`.card-${i}`, {
      y: window.innerHeight - this.cardRect.height - 50,
      zIndex: 10,
      rotate: 0,
    });
    if (_(`.card-${i - 1}`))
      gsap.to(`.card-${i - 1}`, {
        rotate: `-=${5}`,
        x: `-=${80}`,
      });
    if (_(`.card-${i + 1}`))
      gsap.to(`.card-${i + 1}`, {
        rotate: `+=${5}`,
        x: `+=${80}`,
      });
  }
  cardMouseLeave(e: MouseEvent, i: number) {
    if (this.isDropping) return
    this.placeCards();
  }
  cardMouseDown(e: MouseEvent, i: number) {
    this.isDragging = true;
  }
  cardMouseUp(e: MouseEvent, i: number) {
    this.isDragging = false;
    this.accessDragging = false;

    const main = document.querySelector('.configurator-main');
    const rect = main?.getBoundingClientRect();
    if (rect && main?.classList.contains('active')) {
      this.isDropping = true;
      gsap.to(`.card-${i}`, {
        x: rect.x + rect.width / 2 - this.cardRect.width / 2,
        y: rect.y + rect.height / 2 - this.cardRect.height / 2,
        opacity: 0,
        scale: 0,
        pointerEvents: 'none'
      });
      setTimeout(() => {
        this.deck = this.deck.filter((x, j) => j !== i)
        this.placeCards()
      }, 400);
      
    } else {
      this.placeCards();
    }
  }
}
