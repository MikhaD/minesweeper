<svelte:options accessors />

<script context="module" lang="ts">
	export function formatTime(time: number) {
		const hours = Math.floor(time / 3600);
		return (
			(hours ? `${hours}:`.padStart(3, "0") : "") +
			`${Math.floor((time % 3600) / 60)}:`.padStart(3, "0") +
			`${time % 60}`.padStart(2, "0")
		);
	}
</script>

<script lang="ts">
	import Display from "./Display.svelte";

	export let time = 0;
	let timer: number;
	let displayTime = "00:00";

	export function start() {
		time = 0;
		timer = setInterval(() => {
			time += 1;
			displayTime = formatTime(time);
		}, 1000);
	}
	export function stop() {
		clearInterval(timer);
	}
	export function reset() {
		clearInterval(timer);
		displayTime = "00:00";
	}
</script>

<Display value={displayTime} />
