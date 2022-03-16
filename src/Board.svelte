<script lang="ts">
	import { onMount } from "svelte";
	import { GAMESTATE } from "./enums";

	import { settings } from "./settings";
	import { gameState } from "./stores";
	import Tile from "./Tile.svelte";
	import { randint } from "./utils";

	const tiles: Tile[][] = new Array(settings.height).fill(null).map(() => []);
	let remaining = settings.width * settings.height;
	let started = false;

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
		if (!started) {
			started = true;
			generateBombs(e.detail.row, e.detail.col, e.detail.neighbors);
		}
		remaining -= 1;
		if (remaining === settings.bombs) {
			$gameState = GAMESTATE.WIN;
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

<main>
	<div
		class="board"
		style="grid-template: repeat({settings.height}, 1fr) / repeat({settings.width}, 1fr)"
	>
		{#each Array(settings.height) as _, i}
			{#each Array(settings.width) as _, j}
				<Tile bind:this={tiles[i][j]} row={i} col={j} on:clicked={clicked} />
			{/each}
		{/each}
	</div>
	<div>
		<h1>
			{#if $gameState === GAMESTATE.WIN}
				You Win
			{:else if $gameState === GAMESTATE.LOSS}
				You Lose
			{:else}
				{remaining}
			{/if}
		</h1>
	</div>
</main>

<style>
	main {
		margin: 1rem 2rem;
	}
	.board {
		width: fit-content;
		display: grid;
	}
</style>
