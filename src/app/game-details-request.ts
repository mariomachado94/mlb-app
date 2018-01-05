/**
 * Defining mlb api response object
 */
export interface GameDetailsRequest {
	data: {
		boxscore;
	}
}

/**
 * Defining mlb api boxscore interface
 */
export interface Boxscore {
	home_fname: string;
	away_fname: string;
	home_team_code: string;
	away_team_code: string;

	linescore: {
		home_team_runs: string;
		home_team_hits: string;
		home_team_errors: string;
		away_team_runs: string;
		away_team_hits: string;
		away_team_errors: string;

		inning_line_score: InningScore[];
	}

	//batting[0] is home team
	//batting[1] is away team
	batting: TeamBatting[];
}

/**
 * TeamIndex is defined to allow for easy mapping of
 * batting array
 */
export enum TeamIndex {
	Home = 0,
	Away = 1
}

interface InningScore {
	home: string;
	away: string;
	inning: string;
}

interface TeamBatting {
	batter: Batter[];
}

export interface Batter {
	name: string;
	ab: string;
	r: string;
	h: string;
	rbi: string;
	bb: string;
	so: string;
	avg: string;
}