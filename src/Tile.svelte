<script lang="ts">
	let state = tile.closed;
</script>

<span class="tile" on:contextmenu|preventDefault={() => (state = tile.flag)} />

<style lang="scss">
	.tile {
		background: var(--board-color);
		display: inline-block;
		width: 2.5rem;
		border: 2px inset white;
		aspect-ratio: 1;
		cursor: pointer;
		&:hover {
			background: #aaaaaa;
		}
	}
</style>
