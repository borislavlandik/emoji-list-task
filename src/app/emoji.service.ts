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
      this.emojisSource.next(this.emojisList);
    });
  }
}
