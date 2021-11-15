<script>
    import CardUI from './Card.svelte';
    import PlayersUI from './Player.svelte';
    import { Card, Players, Turn } from './stores';
	import { startGame, takeCard, addToken, addPlayer, calculateScores } from './game';

	let ended = false;
	Card.subscribe(c => ended = !c);
	$: if (ended) calculateScores();

	let players = [];
	Players.subscribe(p => players = p);

	let turn;
	let started = false;
	Turn.subscribe(t => {
		turn = t;
		started = t !== -1;
	});

	let newPlayerName;
	function newPlayerHandler(e) {
		if ((!!e.code && e.code !== 'Enter') || turn !== -1) return;
		addPlayer(newPlayerName);
		newPlayerName = "";
	}

	let twice = false;
	function failSafe() {
		if (twice) location.reload();
		twice = true;
	}
</script>

<svelte:window on:keydown={newPlayerHandler}/>

<main>
	<div class="top">
		<h2>No Thanks!</h2>
		{#if started && !ended}
			<CardUI />
			<h2>{players[turn].name}'s turn</h2>
			<div class="decisions">
				<button on:click={takeCard}>Take card</button>
				{#if players[turn].tokens > 0}
					<button on:click={addToken}>Add token</button>
				{/if}
			</div>
		{:else if !started && !ended}
			<div class="init">
				<p>You need 3 to 7 players to play</p>
				{#if players.length < 7}
					<input type="text" bind:value={newPlayerName} placeholder="Name">
					<button on:click={newPlayerHandler}>Add player</button>
				{/if}
				{#if players.length > 2 && players.length < 8}
					<br>
					<button on:click={startGame}>Start game</button>
				{/if}
			</div>
		{:else}
			<CardUI />
			<br>
			<button on:click={failSafe}>{!twice ? "Play Again!" : "Press again to restart"}</button>
		{/if}
	</div>
	<div class="bottom">
		<PlayersUI />
	</div>
</main>

<footer>
	<p><a href="https://www.amigo.games/content/ap/rule/18414--014-NoThanks-Manual_001-LAYOUT.pdf" referrerpolicy="noreferrer" target="_blank">Rules</a></p>
</footer>

<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		row-gap: 1em;
		padding: 0 2em;
	}

	footer {
		text-align: center;
		padding-bottom: 1em;
	}
</style>