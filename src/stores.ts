import { writable } from "svelte/store";
import { GAMESTATE } from "./enums";

export const gameState = writable<GAMESTATE>(GAMESTATE.UNSTARTED);
export const flagged = writable<number>(0);