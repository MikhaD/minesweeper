<script lang="ts">
	import Board from "./Board.svelte";
	import { settings } from "./settings";

	settings.bombs = 10;

	settings.width = 10;
	settings.height = 10;
</script>

<Board />
