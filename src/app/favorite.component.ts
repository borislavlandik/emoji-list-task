import {Component, OnInit} from '@angular/core';
import {EmojiModel} from './emoji.model';
import {EmojiService} from './emoji.service';

@Component({
  selector: 'favorite-app',
  template: `
    <header class="header">
      <h1 class="header__title">Любимые</h1>
      <app-search-box (onInput)="filter = $event"></app-search-box>
    </header>
    <ng-container *ngFor="let emoji of emojis | filter:'name':filter.toLowerCase(); index as i; trackBy: trackBy">
      <app-emoji-item [emoji]="emoji" *ngIf="emoji.isFavorite">
        <button actions (click)="removeFavorite(emoji.name)">
          <img src="../assets/icons/close.svg" alt="cross icon">
        </button>
      </app-emoji-item>
    </ng-container>
  `,
  styleUrls: ['./page.component.scss']
})

export class FavoriteComponent implements OnInit {
  filter: string = '';
  emojis: EmojiModel[] = [];

  constructor(private emojiService: EmojiService) {}

  trackBy(index: number, element: EmojiModel): string {
    return element.name;
  }

  removeFavorite(name: string): void {
    this.emojiService.setFavorite(name, false);
  }

  ngOnInit(): void {
    this.emojiService.emojis.subscribe(data => {
      this.emojis = data;
    });
  }
}
