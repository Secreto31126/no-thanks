<script>
    import { Card, Players, Turn } from './stores';

    let ended = false;
    Card.subscribe(c => ended = !c);

    let turn = 0;
    Turn.subscribe(t => turn = t);
    
	let players = [];
	$: Players.subscribe(p => players = turn === -1 || ended ? p : [...p.slice(turn), ...p.slice(0, turn)]);

    function removePlayer(i) {
        Players.update(p => { p.splice(i, 1); return p; });
    }
</script>

<div class="players" class:ended>
    {#if ended}
        <h1>Leaderboard:</h1>
    {/if}
    {#each players as player, i}
        <div class="player">
            <h1>{player.name}</h1>
            {#if turn === -1}
                <button on:click={() => removePlayer(i)}>Remove</button>
            {:else}
                {#if player.cards.length}
                    <p>Cards: {player.cards.join(", ")}</p>
                {:else}
                    <p>No cards yet</p>
                {/if}
                <p>{player.tokens} {player.tokens > 1 ? "Tokens" : "Token"}</p>
            {/if}
            {#if ended}
                <h2>{player.score} points</h2>
            {/if}
        </div>
    {/each}
</div>

<style>
    .players {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        column-gap: 5%;
    }

    .players.ended {
        flex-direction: column;
        align-items: center;
    }
    
    .player {
        flex-grow: 1;
        flex-basis: 0;
        padding: 0 1%;
		min-width: 200px;
		max-width: 300px;
        margin-bottom: 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .player h1 {
        overflow-wrap: break-word;
    }
</style>
