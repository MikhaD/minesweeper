<script lang="ts">
	import Board from "./Board.svelte";
	import Face from "./Face.svelte";
	import { flagged, gameState } from "./stores";
	import { settings } from "./settings";
	import { onDestroy } from "svelte";
	import { GAMESTATE } from "./enums";
	import type Tile from "./Tile.svelte";
	import Display from "./Display.svelte";
	import Timer from "./Timer.svelte";

	settings.bombs = 20;
	settings.width = 15;
	settings.height = 25;

	let played = 0;
	let active_tile: Tile = null;
	let board: Board;
	let anticipating = false;
	let timer: Timer;
	let scale = 46 / Math.max(settings.width, settings.height);
	console.log(scale);
	const unsub = gameState.subscribe((gs) => {
		switch (gs) {
			case GAMESTATE.ACTIVE:
				timer.start();
				break;
			case GAMESTATE.WON:
			case GAMESTATE.LOST:
				timer.stop();
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

	function faceClick() {
		if ($gameState !== GAMESTATE.UNSTARTED) {
			played += 1;
			$gameState = GAMESTATE.UNSTARTED;
			timer.reset();
			$flagged = 0;
		}
	}

	onDestroy(unsub);
</script>

<svelte:body on:mousedown={mousedown} on:mouseup={mouseup} />

<main style="font-size: {scale}vmin">
	<header>
		<Display value={settings.bombs - $flagged} />
		<Face {anticipating} on:click={faceClick} />
		<Timer bind:this={timer} />
	</header>
	{#key played}
		<Board
			bind:this={board}
			on:flatten={(e) => (active_tile = board.tiles[e.detail.row][e.detail.col])}
		/>
	{/key}
	<!-- <input type="range" id="scale" bind:value={scale} min="0.5" max="1.5" step="0.1" /> -->
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	main {
		font-size: 1rem;
		font-size: 3vmin;
	}
	input {
		width: 100%;
	}
</style>
