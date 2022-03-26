<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { fade } from "svelte/transition";
	import Radio, { groups } from "./Radio.svelte";
	import { applyDifficulty } from "./settings";
	export let visible = false;
	const dispatch = createEventDispatcher();
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
		applyDifficulty(Number(groups.get("difficulty").value));
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
		<Radio value="2" name="difficulty">Hard</Radio>
		<Radio value="3" name="difficulty">Expert</Radio>
		<Radio value="4" name="difficulty">Custom</Radio>
		<div class="custom">
			<h4>Width</h4>
			<input type="range" id="width" step="1" />
			<h4>Height</h4>
			<input type="range" id="height" step="1" />
			<h4>Bombs</h4>
			<input type="range" id="bombs" step="1" />
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
	:global(div[checked="true"] + .custom) {
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
