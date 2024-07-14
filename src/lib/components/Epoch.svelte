<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
	import { Skeleton } from 'flowbite-svelte';
	import Spinner from './Spinner.svelte';
	let displaySupply:any
	$:{
		  displaySupply  = $connection.getEpochInfo()
	}
   ;
</script>
{#await displaySupply}
    <Spinner/>
{:then display} 
    <span class="font-mono font-bold">{display.epoch}</span>
{/await}

