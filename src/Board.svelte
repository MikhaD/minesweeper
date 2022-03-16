<script lang="ts">
	import { onMount } from "svelte";
	import { GAMESTATE, STATE } from "./enums";

	import { settings } from "./settings";
	import { flagged, gameState } from "./stores";
	import Tile from "./Tile.svelte";
	import { randint } from "./utils";

	export const tiles: Tile[][] = new Array(settings.height).fill(null).map(() => []);
	let remaining = settings.width * settings.height;

	function generateBombs(row: number, col: number, dontBomb: Tile[]) {
		const possibleBombs = new Array(settings.width * settings.height)
			.fill(null)
			.map((_, i) => i);
		const restricted = new Set<number>();
		restricted.add(col + row * settings.width);
		dontBomb.forEach((t: Tile) => restricted.add(t.col + t.row * settings.width));
		for (let i = 0; i < settings.bombs; ++i) {
			let choice = randint(possibleBombs.length);
			while (restricted.has(possibleBombs[choice])) {
				possibleBombs.splice(choice, 1);
				choice = randint(possibleBombs.length);
			}
			const bomb = possibleBombs.splice(choice, 1)[0];
			tiles[Math.floor(bomb / settings.width)][bomb % settings.width].bomb = true;
		}
	}

	function clicked(e: CustomEvent) {
		if ($gameState === GAMESTATE.UNSTARTED) {
			$gameState = GAMESTATE.ACTIVE;
			generateBombs(e.detail.row, e.detail.col, e.detail.neighbors);
		}
		remaining -= 1;
		if (remaining === settings.bombs) {
			$gameState = GAMESTATE.WON;
			for (const row of tiles) {
				row.forEach((tile) => {
					if (tile.bomb && tile.state !== STATE.flag) {
						tile.state = STATE.flag;
					}
				});
			}
			flagged.set(settings.bombs);
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
	style="grid-template: repeat({settings.height}, 1fr) / repeat({settings.width}, 1fr)"
>
	{#each Array(settings.height) as _, i}
		{#each Array(settings.width) as _, j}
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
