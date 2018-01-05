import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Game } from '../games-request';
import { GamesService } from '../games.service';
import { Boxscore, Batter, TeamIndex } from '../game-details-request';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  boxscore: Boxscore;
  batters: Batter[];
  homeIndex = TeamIndex.Home;
  awayIndex = TeamIndex.Away;

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.getGameDetails();
  }

  /**
   * Retrieve game details from gamesService
   */
  getGameDetails(): void {
  	this.gamesService.getGameDetails()
      .subscribe(boxscore => {
        this.boxscore = boxscore;
        this.setTeamIndex(this.homeIndex);
      });
  }

  /*
   * Updates team batters to display
   */
  setTeamIndex(i: TeamIndex): void {
    if(this.boxscore.batting) {
      this.batters = this.boxscore.batting[i].batter;
    }
  }

}
