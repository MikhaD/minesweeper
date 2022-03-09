<script context="module" lang="ts">
	enum STATE {
		"closed",
		"question",
		"flag",
		"open",
	}
	enum NUM {
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
	}
	const tiles = [];
</script>

<script lang="ts">
	import { onMount } from "svelte";

	const instance = tiles.length;
	let tile: HTMLSpanElement;
	let state = STATE.closed;
	let bombs = 1;

	onMount(() => {
		tiles.push(tile);
	});
</script>

<span
	bind:this={tile}
	class="tile {NUM[bombs]}"
	class:open={state === STATE.open}
	on:contextmenu|preventDefault={() => (state = STATE.flag)}
>
	{#if state === STATE.flag}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 9">
			<path d="M4 4H3v3H1v1H0v1h7V8H6V7H4V4z" fill="#000" />
			<path d="M0 2.5L4 0V5L0 2.5Z" fill="#fd0100" />
		</svg>
	{:else if state === STATE.question}
		?
	{:else if state === STATE.open}
		{bombs}
	{/if}
</span>

<style lang="scss">
	.tile {
		background: var(--board-color);
		display: inline-block;
		width: 2.3rem;
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
		cursor: pointer;
		&:hover,
		&.open {
			border: 0.5px solid #7e7e7e;
		}
	}
	svg {
		width: 1.2rem;
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
