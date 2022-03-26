<script lang="ts">
	import { onMount } from "svelte";
	import { GAMESTATE, STATE } from "./enums";

	import { settings } from "./settings";
	import { flagged, gameState } from "./stores";
	import Tile from "./Tile.svelte";
	import { randint } from "./utils";

	export const tiles: Tile[][] = new Array(settings.board.height).fill(null).map(() => []);
	let remaining = settings.board.width * settings.board.height;

	function generateBombs(row: number, col: number, dontBomb: Tile[]) {
		const possibleBombs = new Array(settings.board.width * settings.board.height)
			.fill(null)
			.map((_, i) => i);
		const restricted = new Set<number>();
		restricted.add(col + row * settings.board.width);
		dontBomb.forEach((t: Tile) => restricted.add(t.col + t.row * settings.board.width));
		for (let i = 0; i < settings.board.bombs; ++i) {
			let choice = randint(possibleBombs.length);
			while (restricted.has(possibleBombs[choice])) {
				possibleBombs.splice(choice, 1);
				choice = randint(possibleBombs.length);
			}
			const bomb = possibleBombs.splice(choice, 1)[0];
			tiles[Math.floor(bomb / settings.board.width)][bomb % settings.board.width].bomb = true;
		}
	}

	function clicked(e: CustomEvent) {
		if ($gameState === GAMESTATE.UNSTARTED) {
			$gameState = GAMESTATE.ACTIVE;
			generateBombs(e.detail.row, e.detail.col, e.detail.neighbors);
		}
		remaining -= 1;
		if (remaining === settings.board.bombs) {
			$gameState = GAMESTATE.WON;
			flagged.set(settings.board.bombs);
		}
	}

	onMount(() => {
		for (let row = 0; row < tiles.length; ++row) {
			for (let col = 0; col < tiles[row].length; ++col) {
				const neighbors = [];
				for (let i = -1; i <= 1; ++i) {
					for (let j = -1; j <= 1; ++j) {
						if ((i || j) && tiles[row + i] && tiles[row + i][col + j]) {
							neighbors.push(tiles[row + i][col + j]);
						}
					}
				}
				tiles[row][col].neighbors = neighbors;
			}
		}
	});
</script>

<div
	class="board"
	class:disabled={$gameState === GAMESTATE.WON || $gameState === GAMESTATE.LOST}
	style="grid-template: repeat({settings.board.height}, 1fr) / repeat({settings.board
		.width}, 1fr)"
>
	{#each Array(settings.board.height) as _, i}
		{#each Array(settings.board.width) as _, j}
			<Tile bind:this={tiles[i][j]} row={i} col={j} on:clicked={clicked} on:flatten />
		{/each}
	{/each}
</div>

<style>
	.board {
		width: fit-content;
		display: grid;
	}
	.disabled {
		pointer-events: none;
	}
</style>
