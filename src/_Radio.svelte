<svelte:options accessors />

<script lang="ts">
	export let checked = false;
	export let name: string;
	export let value: string;
</script>

<div class="radio" on:click={() => (checked = true)} {checked}>
	<span class="button" />
	<span class="label"><slot /></span>
</div>

<style lang="scss">
	.radio {
		cursor: pointer;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.button {
		display: inline-block;
		height: 1em;
		aspect-ratio: 1;
		border-radius: 50%;
		position: relative;
		&::before {
			visibility: hidden;
		}
		&::before,
		&::after {
			content: "";
			width: 100%;
			height: 100%;
			border-radius: 50%;
			position: absolute;
			border: solid 0.2rem;
			transition: all 0.2s ease-in-out;
		}
	}
	.radio[checked="true"] {
		.button::after {
			border-color: teal;
			transform: scale(0.5);
			background-color: teal;
		}
		.button::before {
			visibility: visible;
			border-color: teal;
		}
	}
</style>
