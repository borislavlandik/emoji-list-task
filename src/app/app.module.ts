import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AllComponent } from './all.component';
import { FavoriteComponent } from './favorite.component';
import { RemovedComponent } from './removed.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmojiService } from './emoji.service';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'removed', component: RemovedComponent },
  { path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent, AllComponent, FavoriteComponent, RemovedComponent, NavigationComponent
  ],
    imports: [
        BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule
    ],
  providers: [EmojiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
