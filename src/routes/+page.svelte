<script lang="ts">
	import { clusterApiUrl, PublicKey } from '@solana/web3.js';
	import { Search, Button } from 'flowbite-svelte';
	import Card from '$lib/components/Card.svelte';
	import { identifyInput } from '$lib/utils/search';
	import SearchLoader from '$lib/components/SearchLoader.svelte';
	import SearchTable from '$lib/components/SearchTable.svelte';
	import { connection } from '$lib/utils/connection';
	import { fetchAccountHistory } from '$lib/utils/signature-search';

	$: typing = false; //keep track if the input field
	$: searchResult = true; //keep track if the search result
	let value: string; //search value
	$: reactiveValue = value;
	let transactionRows: any
	$: reactivetransactionRows = transactionRows
	let click = async() => {
		 transactionRows = await fetchAccountHistory(new PublicKey(value),$connection,10,null);

		// identifyInput(value);
	};
</script>

<div class="w-full h-full mt-10 space-y-5 px-5 md:px-20 overflow-x-hidden overflow-y-hidden">
	<!-- search field -->
	<Search
		on:input={() => {
			typing = true;
			//set typing === false if string.length ===0
			if (reactiveValue?.length == 0) {
				typing = false;
			}
		}}
		bind:value
		placeholder="Search for accounts, transactions, and domain names"
	>
		<Button on:click={click}>Search</Button>
	</Search>

	{#if searchResult}
		<!-- search display -->
		<!-- <SearchLoader /> -->
		<SearchTable transactionRows={reactivetransactionRows}/>
		<!-- <div>showing search result</div> -->
		<!-- search display ends  -->
	{:else}
		<!-- showing typing status -->
		{#if typing}
			<div>
				<Button class="w-full">{reactiveValue}</Button>
			</div>
		{/if}

		<!-- card display -->
		<div class="flex flex-col space-y-3 md:flex-row md:justify-between">
			<Card />
			<Card>
				<span slot="title">Transaction Count</span>
			</Card>
			<Card />
		</div>
	{/if}
</div>
