<script lang="ts">
	export let value: string | number;
</script>

<div class="display">{value}</div>

<style>
	.display {
		font-size: var(--tile-size);
		font-weight: bold;
		border: 0.2em solid;
		border-color: var(--border-color);
		min-width: calc(4 * var(--tile-size));
		display: grid;
		place-items: center;
		color: var(--red);
		background-color: black;
	}
</style>
