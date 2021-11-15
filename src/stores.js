import { writable } from 'svelte/store';

export const Card = writable(3);
export const Tokens = writable(0);

// player = { name: "", cards: [], tokens: 0, score: 0 }
export const Players = writable([]);
export const Turn = writable(-1);

export const Deck = writable([]);
