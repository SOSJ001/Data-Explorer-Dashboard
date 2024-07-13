<script lang="ts">
	import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
	import { Search, Button } from 'flowbite-svelte';
	import Card from '$lib/components/Card.svelte';
	import { identifyInput } from '$lib/utils/search';

	
	const connection = new Connection(clusterApiUrl('devnet'));
	let value: string; //search value
	let click = () => {
		identifyInput(value);
	};
</script>

<div class="w-screen` mt-10 space-y-5 px-5 md:px-20">
	<!-- search field -->
	<Search bind:value placeholder="Search for accounts, transactions, and domain names">
		<Button on:click={click}>Search</Button>
	</Search>

	<!-- card display -->
	<div class="flex flex-col space-y-3 md:flex-row md:justify-between">
		<Card />
		<Card>
			<span slot="title">Transaction Count</span>
		</Card>
		<Card />
	</div>
</div>

