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
  selectedGame: Game;

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.selectToday();
    this.getGames();
  }

  selectToday() {
  	const today = new Date();
    this.date = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  /*
   * Get array of games from gameService.
   */
  getGames(): void{
  	this.gamesService.getGames(this.date)
      .subscribe(games => {
      	this.games = games;
      	this.selectedGame = undefined;
      	this.favSort();
      });
  }

  /*
   * Pull favourite game to the beginning of the games array.
   */
  private favSort(): void{
  	this.games.find((game, index) => {
  		if(game.home_team_name === this.favTeam || game.away_team_name === this.favTeam) {
  			this.games.splice(index, 1);
  			this.games.unshift(game);
  			return true;
  		}
  		return false;
  	});
  }

  setFavTeam(team: string): void{
  	this.favTeam = team;
  	this.favSort();
  }

  // returns whether or not the home team won the given game
  homeWin(game): boolean {
  	return game.linescore &&
  		(Number(game.linescore.r.home) > Number(game.linescore.r.away))
  }

  selectGame(game: Game): void {
  	this.selectedGame = game;
  }

}
