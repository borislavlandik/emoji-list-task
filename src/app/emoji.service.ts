import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EmojiModel } from './emoji.model'

@Injectable()
export class EmojiService {
  constructor(private http: HttpClient) {}

  public async getEmojis(): Promise<EmojiModel[]> {
    let list: EmojiModel[] = [];
    let emojiObject: Object = await this.getEmojiObject();

    for (let emoji in emojiObject) {
      list.push(new EmojiModel(emoji, emojiObject[emoji]))
    }

    return list;
  }

  private getEmojiObject(): Promise<Object> {
    return this.http.get('https://api.github.com/emojis').toPromise();
  }
}
