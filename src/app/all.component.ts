import {Component, OnInit} from '@angular/core';
import {EmojiModel} from './emoji.model';
import {EmojiService} from './emoji.service';

@Component({
  selector: 'all-app',
  template: `
    <header class="header">
      <h1 class="header__title">Все</h1>
      <app-search-box class="header__search" (onInput)="filter = $event"></app-search-box>
    </header>
    <ng-container *ngFor="let emoji of emojis | filter:'name':filter.toLowerCase(); index as i; trackBy: trackBy">
      <app-emoji-item [emoji]="emoji" *ngIf="!emoji.isDeleted">
        <button actions (click)="favorite(emoji.name, emoji.isFavorite)">
          <img *ngIf="emoji.isFavorite; else elseImage" src="../assets/icons/filled-star.svg" alt="filled star icon">
          <ng-template #elseImage>
            <img src="../assets/icons/star.svg" alt="star icon">
          </ng-template>
        </button>
        <button actions (click)="delete(emoji.name)">
          <img src="../assets/icons/close.svg" alt="cross icon">
        </button>
      </app-emoji-item>
    </ng-container>
  `,
  styleUrls: ['./page.component.scss']
})

export class AllComponent implements OnInit {
  filter: string = '';
  emojis: EmojiModel[] = [];

  constructor(private emojiService: EmojiService) {}

  trackBy(index: number, element: EmojiModel): string {
    return element.name;
  }

  delete(name: string): void {
    this.emojiService.setDeleted(name, true);
  }

  favorite(name: string, currentValue: boolean): void {
    this.emojiService.setFavorite(name, !currentValue);
  }

  ngOnInit(): void {
    this.emojiService.emojis.subscribe(data => {
      this.emojis = data;
    });
  }
}
