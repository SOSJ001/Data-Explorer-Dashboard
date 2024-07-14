<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
    let displaySupply:any
    $:{
		  displaySupply  = $connection.getVoteAccounts();
	}
    // displaySupply.then(value => console.log(value.current.length)
</script>
{#await displaySupply}
    <span>loading...</span>
{:then display} 
    <span class="font-mono font-bold">{display.current.length}</span>
{/await}

