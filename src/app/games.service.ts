import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { RestURLBuilder } from 'rest-url-builder';

import { GamesRequest, Game } from './games-request';
import { GameDetailsRequest, Boxscore } from './game-details-request';

const apiURL = "http://gd2.mlb.com/components/game/mlb/year_:year/month_:month/day_:day/master_scoreboard.json";

/**
 * The GamesService class provides data to the views.
 * It makes api requests, and caches the most recent results.
 * Furthermore, it stores state information about the games-list view
 * such as favourite team. If this application were to grow, it would
 * be a good decision to separate the api request logic from view state
 * logic into two separate service classes.
 */

@Injectable()
export class GamesService {

  private urlBuilder = new RestURLBuilder();
  cachedDate: NgbDateStruct;
  cachedGames: Game[];
  favTeam: string;
  selectedGameDir: string;

  constructor(private http: HttpClient) { }

  /**
   * Make an http request to the mlb api returning an array
   * of games on the given date.
   *
   * @param date - date of games requested.
   */
  getGames(date: NgbDateStruct, favTeam: string): Observable<Game[]> {
    this.cachedDate = date;
    this.favTeam = favTeam;
  	let request = this.buildRequest(date);
  	return this.http.get<GamesRequest>(request).pipe(
  		map(result => {
  			let games = result.data.games.game;
  			if(typeof games == 'undefined') {
  				games = [];
  			}
  			else if(!(games instanceof Array)) {
  				games = [games];
  			}

        this.cachedGames = games;
  			return games;
  		}),
  		catchError(this.handleError("getGames()",[]))
  	);
  }

  //builds api request string given a date
  private buildRequest(date: NgbDateStruct): string {
  	let builder = this.urlBuilder.buildRestURL(apiURL);
  	let fDate = this.formatDate(date);

  	builder.setNamedParameter('year', fDate.year );
  	builder.setNamedParameter('month', fDate.month );
  	builder.setNamedParameter('day', fDate.day );
  	return builder.get();
  }

  //converts date object to api friendly strings
  private formatDate(date: NgbDateStruct) {
  	return {
  		year: String(date.year),
  		month: String(date.month).padStart(2, "0"),
  		day: String(date.day).padStart(2, "0")
  	}
  }

  /**
   * Handle failed Http request by logging error and
   * returning a result that won't break the application.
   *
   * @param result - default value to return as result on failure
   */
  private handleError<T> (operation = 'operation', result: T) {
  	return (error: any): Observable<T> => {
  		//console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      console.log("Serving default value");
  		return of(result as T);
  	}
  }

  /**
   * Make an http request to the mlb api returning the boxscore
   * of the desired game.
   *
   * @param gameDataDir - the game_data_directory of the desired game
   */
  getGameDetails(): Observable<Boxscore> {
    let request = `http://gd2.mlb.com${this.selectedGameDir}/boxscore.json`;
    return this.http.get<GameDetailsRequest>(request).pipe(
      map(result => result.data.boxscore),
      catchError(this.handleError("getGameDetails()",{}))
    );
  }

  hadPreviousState(): boolean {
    return typeof this.cachedDate !== 'undefined';
  }

  getPreviousState() {
    return {
      date: this.cachedDate,
      games: this.cachedGames,
      favTeam: this.favTeam
    }
  }

  selectGame(game: Game): void {
    this.selectedGameDir = game.game_data_directory;
  }

  setFavTeam(team: string): void {
    this.favTeam = team;
  }

}
