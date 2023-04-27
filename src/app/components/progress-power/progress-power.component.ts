import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-power',
  templateUrl: './progress-power.component.html',
  styleUrls: ['./progress-power.component.scss']
})
export class ProgressPowerComponent implements OnInit {

  @Input()
  value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
