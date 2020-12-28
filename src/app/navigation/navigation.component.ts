import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss', './icon-burger.scss']
})

export class NavigationComponent {
  isMenuOpen: boolean = true;

  menuClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
