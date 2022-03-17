<svelte:options accessors immutable />

<script context="module" lang="ts">
	import { settings } from "./settings";
	import { STATE, NUM, ACTION, GAMESTATE } from "./enums";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { gameState, flagged } from "./stores";
</script>

<script lang="ts">
	export let row: number;
	export let col: number;
	export let neighbors = [];
	export let state: STATE = STATE.closed;
	export let bomb = false;
	let adjacent_bombs = null;
	let exploded = false;

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
				$gameState = GAMESTATE.LOST;
				exploded = true;
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
	export function unflattenNeighbors(e: MouseEvent) {
		if (e.button === 0) {
			neighbors.forEach((e) => e.flatten());
		}
	}
	function flattenNeighbors(e: MouseEvent) {
		if (e.button === 0 && state === STATE.open && adjacent_bombs) {
			dispatch("flatten", { row, col });
			neighbors.forEach((e) => e.flatten());
		}
	}
	function flag() {
		switch (state) {
			case STATE.closed:
				if ($flagged < settings.bombs) {
					state = STATE.flag;
					$flagged += 1;
				} else if (settings.question) {
					state = STATE.question;
				}
				break;
			case STATE.flag:
				state = settings.question ? STATE.question : STATE.closed;
				$flagged -= 1;
				break;
			case STATE.question:
				state = STATE.closed;
				break;
		}
	}
	function leftClick() {
		if ($gameState === GAMESTATE.ACTIVE) {
			if (settings.primary_action === ACTION.OPEN) open();
			else flag();
		} else if ($gameState === GAMESTATE.UNSTARTED) open();
	}
	function rightClick() {
		if ($gameState === GAMESTATE.ACTIVE) {
			if (settings.primary_action === ACTION.OPEN) flag();
			else open();
		} else if ($gameState === GAMESTATE.UNSTARTED) open();
	}

	const unsub = gameState.subscribe((gs) => {
		switch (gs) {
			case GAMESTATE.LOST:
				if (state === STATE.closed && bomb) state = STATE.open;
				else if (state === STATE.flag && !bomb) state = STATE.wrong_flag;
				break;

			case GAMESTATE.WON:
				if (bomb && state !== STATE.flag) state = STATE.flag;
				break;
		}
	});
	onDestroy(unsub);
</script>

<span
	class="tile {NUM[adjacent_bombs] || ''} {STATE[state]}"
	class:exploded
	on:click={leftClick}
	on:contextmenu|preventDefault={rightClick}
	on:mousedown={flattenNeighbors}
>
	{#if state === STATE.flag || state === STATE.wrong_flag}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
			<path d="M2 10v-1h1v-1h2v-3h1v3h2v1h1v1z" fill="#000" />
			<path d="M2 3.5l4-2.5v5z" fill="red" />
			{#if state === STATE.wrong_flag}
				<path d="M0 0L11 11zM0 11L11 0" stroke="#000" stroke-width="0.5" />
			{/if}
		</svg>
	{:else if state === STATE.question}
		?
	{:else if state === STATE.open}
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
		width: 1em;
		aspect-ratio: 1;
		overflow: hidden;
		border: 0.1em solid;
		border-color: var(--border-color);
		font-weight: bold;
		font-size: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		&.closed:active,
		&.open,
		&.flat {
			border: 0.5px solid #7e7e7e;
		}
		&.exploded {
			background: var(--red);
		}
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
