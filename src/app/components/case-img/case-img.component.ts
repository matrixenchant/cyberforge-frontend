import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-img',
  templateUrl: './case-img.component.html',
  styleUrls: ['./case-img.component.scss']
})
export class CaseImgComponent implements OnInit {

  @Input()
  url: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
