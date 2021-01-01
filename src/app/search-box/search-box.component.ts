import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: `
  <div class="search-box">
    <input class="search-box__input" placeholder="Искать..." type="text" [(ngModel)]="filter" (input)="input()"/>
  </div>
  `,
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent {
  @Output() onInput = new EventEmitter<string>();

  filter: string;

  input() {
    this.onInput.emit(this.filter);
  }
}
