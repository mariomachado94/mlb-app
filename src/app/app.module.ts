import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesService } from './games.service';
import { GameDetailsComponent } from './game-details/game-details.component';


@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
