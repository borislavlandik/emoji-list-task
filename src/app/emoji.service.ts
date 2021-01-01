import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmojiModel } from './emoji.model'
import { map } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  private emojisList: EmojiModel[];
  private emojisSource = new BehaviorSubject<EmojiModel[]>([]);
  public emojis: Observable<EmojiModel[]> = this.emojisSource.asObservable();

  constructor(private http: HttpClient) {
    this.http.get('https://api.github.com/emojis').pipe(map(data => {
      return Object.entries(data).map(element => {
        return new EmojiModel(element[0], element[1]);
      });
    })).subscribe(data => {
      this.emojisList = data;

      let favorite = JSON.parse(localStorage.getItem('favorite')) || [];
      let deleted = JSON.parse(localStorage.getItem('deleted')) || [];

      for(let emoji of this.emojisList) {
        if(favorite.includes(emoji.name)) {
          emoji.isFavorite = true;
        }

        if(deleted.includes(emoji.name)) {
          emoji.isDeleted = true;
        }
      }

      this.emojisSource.next(this.emojisList);
    });
  }

  private static updateLocalStorage(value: boolean, name: string, key: string): void {
    let array = JSON.parse(localStorage.getItem(key)) || [];

    if(value) {
      array.push(name);
    } else {
      array.splice(array.indexOf(name), 1);
    }

    localStorage.setItem(key, JSON.stringify(array));
  }

  setDeleted(name: string, value: boolean) {
    let emoji: EmojiModel = this.emojisList.find(item => item.name === name);
    emoji.isDeleted = value;
    EmojiService.updateLocalStorage(value, emoji.name, 'deleted');

    this.emojisSource.next(this.emojisList);
  }

  setFavorite(name: string, value: boolean) {
    let emoji: EmojiModel = this.emojisList.find(item => item.name === name);
    emoji.isFavorite = value;
    EmojiService.updateLocalStorage(value, emoji.name, 'favorite');

    this.emojisSource.next(this.emojisList);
  }
}
