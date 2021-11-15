import { Card, Tokens, Players, Turn, Deck } from './stores';

let players = [];
Players.subscribe(p => players = p);

let tokens;
Tokens.subscribe(t => tokens = t);

let turn;
Turn.subscribe(t => turn = t);

let card;
Card.subscribe(c => card = c);

let deck = [];
Deck.subscribe(d => deck = d);

// Create an array with 24 unique and random numbers from 3 to 35
function generateNewDeck() {
    let deckBuilder = [];
    while (deckBuilder.length < 24) {
		let randomnumber = Math.ceil(Math.random() * 33 + 2);
        if (!deckBuilder.includes(randomnumber)) deckBuilder.push(randomnumber);
	}
    Deck.set(deckBuilder);
}

export function startGame() {
    generateNewDeck();
    // Gives tokens to all the players
    Players.update(pls => {
        let numTokens = pls.length < 6 ? 11 : pls.length == 6 ? 9 : 7;
        pls.forEach(p => p.tokens = numTokens);
        return pls;
    });
    Turn.set(0);
    nextCard();
}

export function takeCard() {
    Players.update(p => {
        p[turn].tokens += tokens;
        p[turn].cards.push(card);
        p[turn].cards.sort((a, b) => a - b);
        return p;
    });
    Tokens.set(0);
    nextCard();
}

function nextCard() {
    Card.set(deck.shift());
    Deck.set(deck);
}

export function addToken() {
    Tokens.update(t => t + 1);
    Players.update(p => { p[turn].tokens -= 1; return p; });
    Turn.update(t => (t + 1) % players.length);
}

export function addPlayer(name) {
    if (!name) return;
    Players.update(p => [...p, { name, cards: [], tokens: 0, score: 0 }]);
}

export function calculateScores() {
    Players.update(player => {
        player.forEach(pl => pl.score = calcCardsTotal(pl.cards) - pl.tokens);
        player.sort((a, b) => a.score - b.score);
        return player;
    });
}

function calcCardsTotal(cards) {
    let total = 0;
    for (let i = 0; i < cards.length; i++) {
        if (i === 0) total += cards[i]
        else if (cards[i] !== cards[i - 1] + 1) total += cards[i]
        else continue;
    }
    return total;
}
