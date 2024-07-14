<script lang="ts">
	import { connection } from '$lib/utils/connection';
	import { supplyResponse } from '$lib/utils/getSupply';
	import { LAMPORTS_PER_SOL } from '@solana/web3.js';
	import { Progressbar, Skeleton } from 'flowbite-svelte';
	import { getEpochPercent } from '$lib/utils/epoch-progressbar';
	import { progress } from '$lib/utils/epoch-progressbar';
	import Spinner from './Spinner.svelte';

	let displaySupply = getEpochPercent($connection);
	// console.log("from the page", displaySupply);
</script>

{#await displaySupply}
	<Spinner/>
{:then display}
	<Progressbar progress={display} size="h-6" />
	<p class="font-mono text-xl font-bold">{display +"%"}</p>
{/await}
