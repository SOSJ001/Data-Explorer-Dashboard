<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
	import { Skeleton, Spinner } from 'flowbite-svelte';
     let displaySupply:any
    $:{
		  displaySupply  = $connection.getTransactionCount();
	}
</script>
{#await displaySupply}
    <Spinner/>
{:then display} 
    <span class="font-mono font-bold">{(display/1000000000).toFixed(2) +"B"}</span>
{/await}

