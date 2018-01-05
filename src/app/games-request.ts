/**
 * Defining mlb api master_scoreboard response object
 */
export interface GamesRequest {
	data: {
		games: {
			game;
		}
	}
}

/**
 * Defining mlb api game interface
 */
export interface Game {
	home_team_name: string;
	away_team_name: string;
	status: {
		status: string;
	}
	linescore: {
		r: {
			home: string;
			away: string;
		}
	}
	game_data_directory: string;
}