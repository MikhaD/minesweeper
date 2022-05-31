type Settings = {
	board: BoardSettings,
	question: boolean,
	primary_action: ACTION;
};

type BoardSettings = {
	width: number,
	height: number,
	bombs: number,
};

type Difficulty = {
	width: number,
	height: number,
	bombs: number;
};