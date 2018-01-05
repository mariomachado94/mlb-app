import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../games.service';
import { Game } from '../games-request';
import { TEAMS } from '../mlb-teams';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  date: NgbDateStruct;
  games: Game[];
  teams = TEAMS;
  favTeam = "Blue Jays";

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    if(this.gamesService.hadPreviousState()) {
      //todo create this method
      this.restoreState();
    }
    else {
      this.selectToday();
      this.getGames();
    }
  }

  selectToday(): void {
  	const today = new Date();
    this.date = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  restoreState(): void {
    let pstate = this.gamesService.getPreviousState();
    this.date = pstate.date;
    this.games = pstate.games;
    this.favTeam = pstate.favTeam;
  }

  /*
   * Get array of games from gameService.
   */
  getGames(): void {
  	this.gamesService.getGames(this.date, this.favTeam)
      .subscribe(games => {
      	this.games = games;
      	this.favSort();
      });
  }

  /*
   * Pull favourite game to the beginning of the games array.
   */
  private favSort(): void {
  	this.games.find((game, index) => {
  		if(game.home_team_name === this.favTeam || game.away_team_name === this.favTeam) {
  			this.games.splice(index, 1);
  			this.games.unshift(game);
  			return true;
  		}
  		return false;
  	});
  }

  setFavTeam(team: string): void {
  	this.favTeam = team;
    this.gamesService.setFavTeam(team);
  	this.favSort();
  }

  // returns whether or not the home team won the given game
  homeWin(game): boolean {
  	return game.linescore &&
  		(Number(game.linescore.r.home) > Number(game.linescore.r.away))
  }

  selectGame(game: Game): void {
    this.gamesService.selectGame(game);
  }

}
