<script lang="ts" context="module">
	import Radio from "./_Radio.svelte";
	class Group {
		private elements: Set<Radio>;
		public value: string;
		public size: number;
		constructor() {
			this.elements = new Set<Radio>();
			this.value = null;
			this.size = 0;
		}
		public add(element: Radio) {
			if (element.checked) this.check(element);
			this.elements.add(element);
			++this.size;
		}
		public delete(element: Radio) {
			this.elements.delete(element);
			--this.size;
			if (element.checked) this.value = null;
		}
		public check(element: Radio) {
			this.value = element.value;
			for (const el of this.elements) {
				// Checking first because setting it may cause extra updates even if it doesn't change
				if (el.checked && el !== element) {
					el.checked = false;
				}
			}
		}
	}

	export const groups = new Map<string, Group>();
</script>

<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	export let name: string = null;
	export let value: string;
	export let checked = false;
	let self: Radio;

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

<Radio bind:this={self} {name} {value} bind:checked>
	<slot />
</Radio>
