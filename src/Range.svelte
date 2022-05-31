<script lang="ts">
	function clamp(val: number, min: number, max: number, step = 1) {
		val = roundToMultiple(val, step);
		return val > min ? (val < max ? val : max) : min;
	}

	function roundToMultiple(num: number, step: number) {
		const diff = num % step;
		if (diff > step / 2) return num + step - diff;
		else return num - diff;
	}

	export let min: number;
	export let max: number;
	export let step = 1;
	export let value = null;
	let range: HTMLDivElement;
	let units = 100 / (max - min);

	// scale min, max and step to a range of 100
	step = units * step;
	let min100 = (min * units + step) % step;
	let max100 = 100 - (100 % step);

	let value100 = roundToMultiple(50, step);
	$: value = min + Math.round(value100 / units);

	function move(e: MouseEvent) {
		const { left, width } = range.getBoundingClientRect();
		value100 = clamp(((e.x - left) * 100) / width, min100, max100, step);
	}

	function up(e: MouseEvent) {
		window.removeEventListener("mousemove", move);
		window.removeEventListener("mouseup", up);
	}

	function down(e: MouseEvent) {
		const { left, width } = range.getBoundingClientRect();
		value100 = clamp(((e.x - left) * 100) / width, min100, max100, step);
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", up);
	}

	function keypress(e: KeyboardEvent) {
		const k = e.key.toLowerCase();
		if (["s", "a", "arrowleft", "arrowdown"].includes(k)) {
			value100 = clamp(value100 - step, min100, max100, step);
		} else if (["w", "d", "arrowright", "arrowup"].includes(k)) {
			value100 = clamp(value100 + step, min100, max100, step);
		}
	}
</script>

<div class="range" tabindex="0" bind:this={range} on:mousedown={down} on:keydown={keypress}>
	<div class="slider border" />
	<div class="slider bar" style:width={`${value100}%`} />
	<div
		class="knob"
		style="left: min(max({value100}%, var(--half)), calc(100% - var(--half)))"
		{value}
	/>
</div>

<style lang="scss">
	.range {
		--half: 1rem;
		position: relative;
		height: calc(var(--half) * 2);
		cursor: pointer;
		outline: none;
		margin-bottom: var(--half);
		&:focus {
			.knob {
				background-color: var(--primary);
			}
			.border {
				box-shadow: 0 0 3px 0 var(--primary);
			}
		}
	}
	.slider {
		border-radius: 50vw;
		inset: 0;
		position: absolute;
		margin: auto 0;
		height: 0.6rem;
	}
	.border {
		border: solid 1px var(--fg-secondary);
	}
	.bar {
		background-color: var(--primary);
		position: absolute;
	}
	.knob {
		height: 100%;
		aspect-ratio: 1;
		border: solid 2px var(--bg-primary);
		background-color: var(--fg-secondary);
		border-radius: 50%;
		position: absolute;
		transform: translateX(-50%);
		box-shadow: 0 1px 2px 1px #0006;
		&::before {
			font-family: monospace;
			content: attr(value);
			font-size: 1rem;
			position: absolute;
			bottom: -100%;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
