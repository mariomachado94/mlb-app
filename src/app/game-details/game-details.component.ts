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

  @Input() game: Game;
  boxscore: Boxscore;
  batters: Batter[];
  homeIndex = TeamIndex.Home;
  awayIndex = TeamIndex.Away;

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
  }

  ngOnChanges() {
  	this.getGameDetails();
  }

  /**
   * Retrieve game details from gamesService
   */
  getGameDetails(): void {
    if(this.game) {
    	this.gamesService.getGameDetails(this.game.game_data_directory)
        .subscribe(boxscore => {
          this.boxscore = boxscore;
          this.setTeamIndex(0);
        });
    }
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
