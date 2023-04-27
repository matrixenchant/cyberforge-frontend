import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { MatrixTransitionService } from '../services/matrix.transition';

@Component({
  selector: 'app-matrix-transition',
  templateUrl: './matrix-transition.component.html',
  styleUrls: ['./matrix-transition.component.scss'],
})
export class MatrixTransitionComponent implements OnInit {
  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  constructor(public matrixTransitionService: MatrixTransitionService) {}

  ngAfterViewInit(): void {
    const canvas = this!.canvasRef!.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();

    const pixels: Pixel[] = [];
    const num = 100;
    const trails = 30;
    const duration = 1500;

    const width = window.innerWidth / num;
    for (let i = 0; i < num; i++) {
      const speed = 28;
      const iY = Math.random() * -i * 3;
      for (let j = 0; j < trails; j++) {
        const y = iY - (j + 1) * width * 2;
        const pixel = new Pixel(context, {
          x: i * width,
          y,
          speed,
          alphaSpeed: 0,
          hasTrail: false,
          size: width + 1,
          alpha: j > trails * 0.75 ? 1 - ((j - 20) / (trails*.25)) * 0.75 : 1,
        });
        pixels.push(pixel);
      }
    }

    const ticker = gsap.ticker;
    ticker.fps(60);
    function updateTicker() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const pixel of pixels) {
        pixel.update();
        pixel.draw();
      }

      console.log('fwefwe');
    }
    ticker.add(updateTicker);
    setTimeout(() => {
      ticker.remove(updateTicker)
    }, 5000);
  }

  ngOnInit(): void {}
}

class Pixel {
  x: number;
  y: number;
  size: number;
  alpha: number = 1;
  alphaSpeed: number;
  speed: number;
  trail: Pixel[] = [];
  hasTrail: boolean = false;

  constructor(
    private context: CanvasRenderingContext2D,
    params = {
      x: 0,
      y: 0,
      size: 0,
      speed: 0,
      alphaSpeed: 0,
      alpha: 1,
      hasTrail: false,
    }
  ) {
    const { x, y, size, speed, alphaSpeed, alpha, hasTrail } = params;
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.alphaSpeed = alphaSpeed;
    this.alpha = alpha;
    this.hasTrail = hasTrail;
  }

  reset(): void {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.alpha = 0;
  }

  update(): void {
    this.y += this.speed;
    this.alpha -= this.alphaSpeed;
  }

  draw(): void {
    const _ = (val: number) =>
      Math.round(Math.random() * (2 + val - (val - 2)) + (val - 2));

    this.context.fillStyle = `rgba(${_(78)}, ${_(121)}, ${_(128)}, ${
      this.alpha
    })`;
    this.context.fillRect(this.x, this.y, this.size, this.size * 2);
  }
}
