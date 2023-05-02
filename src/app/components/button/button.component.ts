import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  type: string = '';

  @Input()
  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();
}
