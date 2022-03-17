<script lang="ts">
	import { GAMESTATE } from "./enums";
	import { gameState } from "./stores";

	export let anticipating: boolean;
</script>

<div class="face" on:click>
	{#if $gameState === GAMESTATE.WON}
		😎
	{:else if $gameState === GAMESTATE.LOST}
		😖
	{:else if anticipating}
		😮
	{:else}
		🙂
	{/if}
</div>

<style>
	.face {
		font-size: 2em;
		cursor: pointer;
	}
</style>
