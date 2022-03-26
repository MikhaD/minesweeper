<script lang="ts" context="module">
	type RadioObj = {
		value: string;
		uncheck: () => void;
		isChecked: () => boolean;
	};

	class Group {
		private elements: Set<RadioObj>;
		public value: string;
		public size: number;
		constructor() {
			this.elements = new Set<RadioObj>();
			this.value = null;
			this.size = 0;
		}
		public add(element: RadioObj) {
			if (element.isChecked()) this.check(element);
			this.elements.add(element);
			++this.size;
		}
		public delete(element: RadioObj) {
			this.elements.delete(element);
			--this.size;
			if (element.isChecked()) this.value = null;
		}
		public check(element: RadioObj) {
			this.value = element.value;
			for (const el of this.elements) {
				// Checking first because setting it may cause extra updates even if it doesn't change
				console.log(el.isChecked());
				if (el.isChecked() && el !== element) {
					el.uncheck();
				}
			}
		}
	}

	export const groups = new Map<string, Group>();
</script>

<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	export let checked = false;
	export let name: string = null;
	export let value: string;

	const self: RadioObj = {
		value,
		uncheck: () => (checked = false),
		isChecked: () => checked,
	};

	$: if (checked && name) groups.get(name).check(self);

	onMount(() => {
		if (name) {
			if (!groups.has(name)) {
				groups.set(name, new Group());
			}
			groups.get(name).add(self);
		}
	});
	onDestroy(() => {
		if (name) {
			const group = groups.get(name);
			if (group.size === 1) groups.delete(name);
			else group.delete(self);
		}
	});
</script>

<div class="radio" on:click={() => (checked = true)} {checked}>
	<span class="button" />
	<span class="label">
		<slot />
	</span>
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
