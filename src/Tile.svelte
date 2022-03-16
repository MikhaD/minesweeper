<svelte:options accessors immutable />

<script context="module" lang="ts">
	import { settings } from "./settings";
	import { STATE, NUM, ACTION, GAMESTATE } from "./enums";
	import { createEventDispatcher } from "svelte";
	import { gameState } from "./stores";
</script>

<script lang="ts">
	export let row: number;
	export let col: number;
	export let neighbors = [];
	export let state = STATE.closed;
	export let bomb = false;
	let adjacent_bombs = null;

	const dispatch = createEventDispatcher();

	export function calculateBombs() {
		if (adjacent_bombs === null) {
			adjacent_bombs = neighbors.reduce((p, c) => (c.bomb ? p + 1 : p), 0);
			if (!bomb) {
				open();
			}
		}
	}
	export function flatten() {
		if (state === STATE.closed) {
			state = STATE.flat;
		} else if (state === STATE.flat) {
			state = STATE.closed;
		}
	}
	export function open(recurse = true) {
		if (state === STATE.closed) {
			if (bomb) {
				$gameState = GAMESTATE.LOSS;
			} else {
				dispatch("clicked", { row, col, neighbors });
				if (adjacent_bombs === null) {
					adjacent_bombs = neighbors.reduce((p, c) => (c.bomb ? p + 1 : p), 0);
				}
				if (adjacent_bombs === 0) {
					neighbors.forEach((e) => e.calculateBombs());
				}
			}
			state = STATE.open;
		} else if (state === STATE.open && recurse) {
			const flags = neighbors.reduce((p, c) => (c.state === STATE.flag ? p + 1 : p), 0);
			if (flags >= adjacent_bombs) {
				neighbors.forEach((e) => e.open(false));
			}
		}
	}
	function flag() {
		if (state !== STATE.open) {
			state = (state + 1) % (2 + Number(settings.question));
		}
	}
	function leftClick() {
		if ($gameState === GAMESTATE.ACTIVE) {
			if (settings.primary_action === ACTION.OPEN) open();
			else flag();
		}
	}
	function rightClick() {
		if ($gameState === GAMESTATE.ACTIVE) {
			if (settings.primary_action === ACTION.OPEN) flag();
			else open();
		}
	}
	function flattenNeighbors(e) {
		if (
			$gameState === GAMESTATE.ACTIVE &&
			e.button === 0 &&
			state === STATE.open &&
			adjacent_bombs
		) {
			neighbors.forEach((e) => e.flatten());
		}
	}
</script>

<span
	class="tile {NUM[adjacent_bombs] || ''} {STATE[state]}"
	class:active={$gameState === GAMESTATE.ACTIVE}
	class:failed={bomb && state === STATE.open}
	on:click={leftClick}
	on:contextmenu|preventDefault={rightClick}
	on:mousedown={flattenNeighbors}
	on:mouseup={flattenNeighbors}
>
	{#if state === STATE.flag}
		<svg class="flagImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 9">
			<path d="M4 4H3v3H1v1H0v1h7V8H6V7H4V4z" fill="#000" />
			<path d="M0 2.5L4 0V5L0 2.5Z" fill="#fd0100" />
		</svg>
	{:else if state === STATE.question}
		?
	{:else if state === STATE.open || $gameState === GAMESTATE.LOSS}
		{#if bomb}
			<img class="bomb" src="./img/bomb.svg" alt="bomb" />
		{:else}
			{adjacent_bombs ? adjacent_bombs : ""}
		{/if}
	{/if}
</span>

<style lang="scss">
	.tile {
		background: var(--board-color);
		display: inline-block;
		width: 2.2rem;
		aspect-ratio: 1;
		overflow: hidden;
		border: 0.2rem solid;
		border-top-color: white;
		border-left-color: white;
		border-right-color: #7e7e7e;
		border-bottom-color: #7e7e7e;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
		font-size: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		&.active {
			cursor: pointer;
		}
		&.closed.active:active,
		&.open,
		&.flat {
			border: 0.5px solid #7e7e7e;
		}
		&.failed {
			background: var(--red);
		}
	}
	.flagImg {
		width: 1.2rem;
	}
	.bomb {
		width: 90%;
	}
	.one {
		color: #0b0ad5;
	}
	.two {
		color: #007c00;
	}
	.three {
		color: #d60000;
	}
	.four {
		color: #100973;
	}
	.five {
		color: #680c0d;
	}
	.six {
		color: #227d6c;
	}
	.seven {
		color: #000;
	}
	.eight {
		color: #7f7f7f;
	}
</style>
