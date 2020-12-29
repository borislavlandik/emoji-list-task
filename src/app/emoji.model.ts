export class EmojiModel {
  name: string;
  url: string;
  isDeleted: boolean;
  isFavorite: boolean;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    this.isFavorite = false;
    this.isDeleted = false;
  }

  setIsFavorite(value: boolean): void {
    this.isFavorite = value;
  }

  setIsDeleted(value: boolean): void {
    this.isDeleted = value;
  }
}

