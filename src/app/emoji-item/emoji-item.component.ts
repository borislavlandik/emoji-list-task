import {Component, Input} from '@angular/core';
import {EmojiModel} from '../emoji.model';

@Component({
  selector: 'app-emoji-item',
  templateUrl: './emoji-item.component.html',
  styleUrls: ['./emoji-item.component.scss']
})
export class EmojiItemComponent {
  @Input() emoji: EmojiModel;
}
