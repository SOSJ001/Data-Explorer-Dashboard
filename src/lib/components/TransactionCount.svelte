<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
	import { Skeleton } from 'flowbite-svelte';
    let displaySupply  = $connection.getTransactionCount();
</script>
{#await displaySupply}
    <Skeleton size="sm"/>
{:then display} 
    <span class="font-mono font-bold">{(display/1000000000).toFixed(2) +"B"}</span>
{/await}

