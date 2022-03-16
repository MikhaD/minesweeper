import { writable } from "svelte/store";
import { GAMESTATE } from "./enums";

export const gameState = writable<GAMESTATE>(GAMESTATE.ACTIVE);
export const flagged = writable<number>(0);