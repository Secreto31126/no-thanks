<script>
    import { Card, Tokens, Deck } from './stores';

    let card;
    Card.subscribe(c => card = c);

    let tokens;
    Tokens.subscribe(t => tokens = t);

    let cardsLeft = 24;
    Deck.subscribe(d => cardsLeft = d.length);
</script>


<div class="cards">
    <!-- HACK: .hacky has the same width as .deck, so display: flex; will make .card to be in the center :) -->
    <div class="hacky"></div>

    <div class="card">
        <div class="top">
            <h1>{card ?? "Game Over!"}</h1>
        </div>
        {#if !!tokens}
            <div class="bottom">
                {#key tokens}
                    <p>{tokens} {tokens > 1 ? "Tokens" : "Token"}</p>
                {/key}
            </div>
        {/if}
    </div>

    <div class="deck">
        <h5>{cardsLeft} card{cardsLeft === 1 ? "" : "s"} left</h5>
    </div>
</div>

<style>
    .cards {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
		max-width: 400px;
        margin: 0 auto;
    }

    .card, .deck {
        overflow: auto;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .card {
        width: 40%;
        height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .deck, .hacky {
        width: 20%;
    }
</style>
