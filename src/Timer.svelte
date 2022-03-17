<script lang="ts">
	import Display from "./Display.svelte";

	let timer: number;
	let time: number;
	let displayTime = "00:00";

	export function start() {
		time = 0;
		timer = setInterval(() => {
			time += 1;
			const hours = Math.floor(time / 3600);
			displayTime =
				(hours ? `${hours}:`.padStart(3, "0") : "") +
				`${Math.floor((time % 3600) / 60)}:`.padStart(3, "0") +
				`${time % 60}`.padStart(2, "0");
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
