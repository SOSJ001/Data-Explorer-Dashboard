<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
    import { Skeleton } from 'flowbite-svelte'
    let displaySupply  = $connection.getSupply();
</script>
{#await displaySupply}
    <Skeleton size="sm"/>
{:then display} 
    <span class="font-mono text-2xl font-bold">{((display.value.circulating/LAMPORTS_PER_SOL)/1000000).toFixed(2) +"M"}</span>
{/await}

