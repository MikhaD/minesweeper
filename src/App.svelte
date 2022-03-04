<script>
	import Tile from "./Tile.svelte";

	let width = 20;
	let height = 30;
	let bombs = 50;
</script>

<div class="board" style="grid-template: repeat({height}, 1fr) / repeat({width}, 1fr)">
	{#each Array(height) as _, i}
		{#each Array(width) as _, j}
			<Tile />
		{/each}
	{/each}
</div>

<style>
	.board {
		width: fit-content;
		display: grid;
	}
</style>
