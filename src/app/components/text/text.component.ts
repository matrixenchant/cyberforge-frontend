import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input()
  textInit = '';

  @Input()
  delay = 0;

  @Input()
  loop: string = '';

  text = '';
  textCollection: string[] = [];
  speed = 50;
  count = 0;
  incrInterval: any = null;
  randInterval: any = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.text = this.textInit;

    this.pushCurrentTextCharacters();

    setTimeout(() => {
      this.incrInterval = setInterval(() => this.characterIncr(), this.speed);
      this.randInterval = setInterval(() => this.setRandomText(), 50);
    }, this.delay);
  }

  pushCurrentTextCharacters() {
    for (let i = 0; i < this.text.length; i++) {
      const currentChar = this.text.slice(i, i + 1);
      this.textCollection.push(currentChar);
    }
  }

  characterIncr() {
    if (this.count == this.textCollection.length) {
      clearInterval(this.incrInterval);
      clearInterval(this.randInterval);

      this.count = 0

      if (this.loop)
      setTimeout(() => {
        this.incrInterval = setInterval(() => this.characterIncr(), this.speed);
        this.randInterval = setInterval(() => this.setRandomText(), 50);
      }, (1000 + Math.round(Math.random() * 5000)));

      return;
    }

    this.count++;
  }

  getRandomText() {
    let result = '';

    if (this.count == 0) {
      for (let i = 0; i < this.textCollection.length; i++) {
        let randomCharacter = getRandomChar();

        result += randomCharacter;
      }
    } else {
      result = this.textInit.slice(0, this.count);

      for (let i = 0; i < this.textCollection.length - this.count; i++) {
        const randomCharacter = getRandomChar();

        result += randomCharacter;
      }
    }

    return result;
  }

  setRandomText() {
    this.text = this.getRandomText();
  }
}

const getRandomChar = () =>
  String.fromCharCode(0 + Math.round(Math.random() * 127));
