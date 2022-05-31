<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { fade } from "svelte/transition";
	import Radio, { groups } from "./Radio.svelte";
	import Range from "./Range.svelte";
	import { applyDifficulty, difficulties, DIFFICULTY } from "./settings";
	export let visible = false;
	const dispatch = createEventDispatcher();
	let { bombs, width, height } = difficulties[DIFFICULTY.hard];

	// 	- Settings menu
	//   - board size
	//   - number of bombs
	//   - question mark
	//   - primary action
	//   - Theme
	//   - Style
	//   - Bomb generation algorythm
	//   - Zoom
	//     - Different levels (slider?)
	//     - Fit Screen
	function close() {
		const difficulty = +groups.get("difficulty").value;
		if (difficulty === DIFFICULTY.custom) {
			applyDifficulty(DIFFICULTY.custom, { bombs, width, height });
		} else {
			applyDifficulty(difficulty);
		}
		dispatch("close");
		visible = false;
	}
</script>

<div transition:fade={{ duration: 200 }} class="settings" class:visible>
	<section>
		<h1>Settings</h1>
		<svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" on:click={close}>
			<path d="M1 1L7 7M7 1L1 7" />
		</svg>
		<h2>Difficulty</h2>
		<Radio value="0" name="difficulty">Easy</Radio>
		<Radio value="1" name="difficulty">Normal</Radio>
		<Radio value="2" name="difficulty" checked={true}>Hard</Radio>
		<Radio value="3" name="difficulty">Expert</Radio>
		<Radio value="4" name="difficulty" checked={true}>Custom</Radio>
		<div class="custom">
			<h4>Width ({width})</h4>
			<!-- <input type="range" id="width" step="1" bind:value={width} /> -->
			<Range min={3} max={50} bind:value={width} />
			<h4>Height ({height})</h4>
			<Range min={5} max={50} bind:value={height} />
			<h4>Bombs ({bombs})</h4>
			<Range min={1} max={width * height - 9} bind:value={bombs} />
		</div>
	</section>
</div>

<style>
	.settings {
		position: fixed;
		inset: 0;
		z-index: 1;
		background-color: var(--bg-primary);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
	}
	section {
		max-width: 50rem;
		height: 100%;
		margin: auto;
		position: relative;
		padding: 1rem;
		box-shadow: 0 0 5px 2px #0004;
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
		stroke: var(--fg-primary);
		stroke-width: 2;
		width: 1.5rem;
		stroke-linecap: round;
		cursor: pointer;
		margin: 1rem;
		overflow: visible;
	}
	.custom {
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	:global(.visible div[checked="true"] + .custom) {
		pointer-events: initial;
		opacity: 1;
	}
	input[type="range"] {
		width: 100%;
	}
	.visible {
		opacity: 1;
		pointer-events: initial;
	}
</style>
