export class EmojiModel {
  readonly name: string;
  readonly url: string;
  isDeleted: boolean;
  isFavorite: boolean;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    this.isFavorite = false;
    this.isDeleted = false;
  }
}

