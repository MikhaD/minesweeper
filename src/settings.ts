import { ACTION } from "./enums";

export enum DIFFICULTY {
	easy,
	normal,
	hard,
	expert,
	custom,
}
export const difficulties: Difficulty[] = [
	{
		width: 11,
		height: 8,
		bombs: 10,
	},
	{
		width: 20,
		height: 14,
		bombs: 39,
	},
	{
		width: 29,
		height: 20,
		bombs: 102,
	},
	{
		width: 38,
		height: 26,
		bombs: 230,
	}
];

export const settings: Settings = {
	difficulty: DIFFICULTY.normal,
	board: difficulties[DIFFICULTY.normal],
	question: false,
	primary_action: ACTION.OPEN
};

export function applyDifficulty(difficulty: DIFFICULTY, bs?: BoardSettings) {
	if (difficulty === DIFFICULTY.custom) {
		settings.board = bs;
	} else {
		settings.board = difficulties[difficulty];
	};
}