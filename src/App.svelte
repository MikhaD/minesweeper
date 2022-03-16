<script lang="ts">
	import Board from "./Board.svelte";
	import { flagged, gameState } from "./stores";
	import { settings } from "./settings";
	import { onDestroy } from "svelte";
	import { GAMESTATE } from "./enums";
	import type Tile from "./Tile.svelte";

	settings.bombs = 10;
	settings.width = 10;
	settings.height = 10;

	let active_tile: Tile = null;
	let board: Board;
	let anticipating = false;

	let started: number;
	let timer: number;
	let time = "00:00";

	const unsub = gameState.subscribe((gs) => {
		switch (gs) {
			case GAMESTATE.ACTIVE:
				started = new Date().getTime();
				timer = setInterval(() => {
					const t = new Date().getTime() - started;
					const hours = Math.floor(t / 3600000);
					time = hours
						? `${hours}:`.padStart(3, "0")
						: "" +
						  `${Math.floor((t % 3600000) / 60000)}:`.padStart(3, "0") +
						  `${Math.floor((t % 60000) / 1000)}`.padStart(2, "0");
				}, 1000);
				break;
			case GAMESTATE.WON:
			case GAMESTATE.LOST:
				clearInterval(timer);
				break;
		}
	});

	function mouseup(e: MouseEvent) {
		if (
			e.button === settings.primary_action &&
			(e.target as HTMLElement).classList.contains("tile")
		) {
			anticipating = false;
		}
		if (active_tile) {
			active_tile.unflattenNeighbors(e);
			active_tile = null;
		}
	}

	function mousedown(e: MouseEvent) {
		if (
			e.button === settings.primary_action &&
			(e.target as HTMLElement).classList.contains("tile")
		) {
			anticipating = true;
		}
	}

	onDestroy(unsub);
</script>

<svelte:body on:mousedown={mousedown} on:mouseup={mouseup} />

<main>
	<header>
		<h2>{settings.bombs - $flagged}</h2>
		<h2>
			{#if $gameState === GAMESTATE.WON}
				😎
			{:else if $gameState === GAMESTATE.LOST}
				😖
			{:else if anticipating}
				😮
			{:else}
				🙂
			{/if}
		</h2>
		<h2>{time}</h2>
	</header>
	<Board
		bind:this={board}
		on:flatten={(e) => (active_tile = board.tiles[e.detail.row][e.detail.col])}
	/>
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	h2 {
		flex: 1;
	}
</style>
