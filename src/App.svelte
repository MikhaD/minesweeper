<script lang="ts">
	import Board from "./Board.svelte";
	import Face from "./Face.svelte";
	import { flagged, gameState } from "./stores";
	import { settings } from "./settings";
	import { onDestroy, onMount } from "svelte";
	import { GAMESTATE } from "./enums";
	import type Tile from "./Tile.svelte";
	import Display from "./Display.svelte";
	import Timer from "./Timer.svelte";
	import Settings from "./Settings.svelte";

	let played = 0;
	let active_tile: Tile = null;
	let board: Board;
	let anticipating = false;
	let timer: Timer;
	let scale: string;
	let main: HTMLElement;
	// Toggle regenBoard every time it needs to be regenerated. Actual value doesn't matter.
	let regenBoard = false;
	let showSettings = true;

	if (window.innerWidth > window.innerHeight) {
		scale = `${100 / (settings.board.height + 1.5)}vmin`;
	} else {
		scale = `${100 / settings.board.width}vmin`;
	}
	if (main) main.style.setProperty("--tile-size", scale);

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
		} else {
			showSettings = true;
		}
	}

	onMount(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth > window.innerHeight) {
				scale = `${100 / (settings.board.height + 1.5)}vmin`;
			} else {
				scale = `${100 / settings.board.width}vmin`;
			}
			if (main) main.style.setProperty("--tile-size", scale);
		});
	});

	function regenerate() {
		if (window.innerWidth > window.innerHeight) {
			scale = `${100 / (settings.board.height + 1.5)}vmin`;
		} else {
			scale = `${100 / settings.board.width}vmin`;
		}
		if (main) main.style.setProperty("--tile-size", scale);
		regenBoard = !regenBoard;
	}
	onDestroy(unsub);
</script>

<svelte:body on:mousedown={mousedown} on:mouseup={mouseup} />

{#key regenBoard}
	<main bind:this={main} style="--tile-size: {scale}">
		<header>
			<Display value={settings.board.bombs - $flagged} />
			<Face {anticipating} on:click={faceClick} />
			<Timer bind:this={timer} />
		</header>
		{#key played}
			<Board
				bind:this={board}
				on:flatten={(e) => (active_tile = board.tiles[e.detail.row][e.detail.col])}
			/>
		{/key}
	</main>
{/key}

<Settings bind:visible={showSettings} on:close={regenerate} />

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	main {
		font-size: 1rem;
		font-size: 3vmin;
	}
</style>
