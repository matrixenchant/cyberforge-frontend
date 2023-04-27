import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input()
  fields: FilterField[] = [];

  data: any = {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.fields);
    this.fields.forEach((x: any) => {
      this.data[x.value] = ''
    });
  }

  @Output()
  onSearch: EventEmitter<void> = new EventEmitter<void>();

  onClick () {
    this.onSearch.emit()
  }

  getFieldsGridStyle() {
    return this.fields.map(x => x.size).join(' ')
  }
}
