import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'glitch',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input()
  delay = 0;

  @Input()
  loop: string = '';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const $el = this.el.nativeElement.children[0]
    const textInit = $el.textContent
    let text = textInit;
    const textCollection: string[] = [];
    const speed = 50;
    let count = 0;
    let incrInterval: any = null;
    let randInterval: any = null;
    const loop =  this.loop;
    

    // Push current text characters
    for (let i = 0; i < text.length; i++) {
      const currentChar = text.slice(i, i + 1);
      textCollection.push(currentChar);
    }

    setTimeout(() => {
      incrInterval = setInterval(characterIncr, speed);
      randInterval = setInterval(setRandomText, 50);
    }, this.delay);

    function setRandomText() {
      $el.textContent = getRandomText();
    }

    function characterIncr() {
      if (count == textCollection.length) {
        clearInterval(incrInterval);
        clearInterval(randInterval);
  
        count = 0
  
        if (loop)
        setTimeout(() => {
          incrInterval = setInterval(characterIncr, speed);
          randInterval = setInterval(setRandomText, 50);
        }, (1000 + Math.round(Math.random() * 5000)));
  
        return;
      }
  
      count++;
    }


    function getRandomText() {
      let result = '';
  
      if (count == 0) {
        for (let i = 0; i < textCollection.length; i++) {
          let randomCharacter = getRandomChar();
  
          result += randomCharacter;
        }
      } else {
        result = textInit.slice(0, count);
  
        for (let i = 0; i < textCollection.length - count; i++) {
          const randomCharacter = getRandomChar();
  
          result += randomCharacter;
        }
      }
  
      return result;
    }
  }

  ngOnInit(): void {}
  
}

const getRandomChar = () =>
  String.fromCharCode(0 + Math.round(Math.random() * 127));
