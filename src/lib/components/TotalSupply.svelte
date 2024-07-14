<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
    let displaySupply  = $connection.getSupply();
</script>
{#await displaySupply}
    <span>loading...</span>
{:then display} 
    <span class="font-mono font-bold">{((display.value.total/LAMPORTS_PER_SOL)/1000000).toFixed(2) +"M"}</span>
{/await}

