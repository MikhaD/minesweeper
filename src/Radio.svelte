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
				// Checking first ∵ setting it may cause extra updates even if it doesn't change
				if (el.isChecked() && el !== element) el.uncheck();
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
		isChecked: () => checked,
		uncheck: () => (checked = false),
	};
	let loaded = false;

	$: if (checked && loaded) groups.get(name).check(self);

	onMount(() => {
		if (name) {
			if (!groups.has(name)) {
				groups.set(name, new Group());
			}
			groups.get(name).add(self);
		}
		loaded = true;
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
	<slot />
</div>

<style lang="scss">
	.radio {
		padding-left: 1.25em;
		cursor: pointer;
		position: relative;
		&::after {
			visibility: hidden;
		}
		&::before,
		&::after {
			content: "";
			position: absolute;
			left: 0;
			width: 1em;
			aspect-ratio: 1;
			border-radius: 50%;
			border: solid 0.15em var(--fg-primary);
			transition: all 0.2s ease-in-out;
		}
		&[checked="true"] {
			&::before {
				width: 0.5em;
				margin: 0.25em;
				border-color: var(--primary);
				background-color: var(--primary);
			}
			&::after {
				visibility: visible;
				border-color: var(--primary);
			}
		}
	}
</style>
