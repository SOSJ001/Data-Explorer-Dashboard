<script lang="ts">
	import { clusterApiUrl, PublicKey } from '@solana/web3.js';
	import { Search, Button } from 'flowbite-svelte';
	import Card from '$lib/components/Card.svelte';
	import { identifyInput } from '$lib/utils/search';
	import SearchLoader from '$lib/components/SearchLoader.svelte';
	import SearchTable from '$lib/components/SearchTable.svelte';
	import { connection } from '$lib/utils/connection';
	import { fetchAccountHistory } from '$lib/utils/signature-search';
	import { beforeVariable } from '$lib/utils/signature-search';

	$: typing = false; //keep track if the input field
	$: searchResult = false; //keep track ff the search result
	let value: string; //search value
	$: reactiveValue = value;
	let transactionRows: any;
	$: reactivetransactionRows = transactionRows;
	let click = async () => {
		if(reactiveValue.length > 0)searchResult = true ;
		console.log("here");
		transactionRows = await fetchAccountHistory(
			new PublicKey(value),
			$connection,
			7,
			$beforeVariable
		);

		// identifyInput(value);
	};
</script>

<div class="mt-10 h-full w-full space-y-5 overflow-x-hidden overflow-y-hidden px-5 md:px-20">
	<!-- search field -->
	<Search
		on:input={() => {
			typing = true;
			//set typing === false if string.length ===0
			if (reactiveValue?.length == 0) {
				typing = false;
				$beforeVariable = undefined;
				reactivetransactionRows = [];
				searchResult = !searchResult
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
		<div class="flex h-full flex-col items-center">
			<SearchTable transactionRows={reactivetransactionRows} />
			<div class="flex flex-row gap-3">
				<Button on:click={click}>More</Button>
			</div>
		</div>

		<!-- <div>showing search result</div> -->
		<!-- search display ends  -->
	{:else}
		<!-- showing typing status -->
		{#if typing}
			<div>
				<Button on:click={click} class="w-full">{reactiveValue}</Button>
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
