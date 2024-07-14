<script lang="ts">
	import { clusterApiUrl, PublicKey } from '@solana/web3.js';
	import { Search, Button } from 'flowbite-svelte';
	import Card from '$lib/components/Card.svelte';
	import { identifyInput } from '$lib/utils/search';
	import SearchTable from '$lib/components/SearchTable.svelte';
	import { connection } from '$lib/utils/connection';
	import { fetchAccountHistory } from '$lib/utils/signature-search';
	import { beforeVariable } from '$lib/utils/signature-search';
	import Supply from '$lib/components/Supply.svelte';
	import TotalSupply from '$lib/components/TotalSupply.svelte';
	import TransactionCount from '$lib/components/TransactionCount.svelte';
	import VoteAccount from '$lib/components/VoteAccount.svelte';
	import DeliquentVote from '$lib/components/DeliquentVote.svelte';
	import Epoch from '$lib/components/Epoch.svelte';
	import Slot from '$lib/components/Slot.svelte';
	import BlockHeight from '$lib/components/BlockHeight.svelte';
	import EpochProgress from '$lib/components/EpochProgress.svelte';
	import heroImage from '$lib/image/image.jpg';
	import { writable } from 'svelte/store';

	$: typing = false; //keep track if the input field
	let searchResult = writable(false); //keep track ff the search result
	let value: string; //search value
	$: reactiveValue = value;
	let transactionRows: any;
	$: reactivetransactionRows = transactionRows; //aking tetransaction rows reactive
	let back = () => {
			// console.log("Backed clicked")
			typing = false;
			$beforeVariable = undefined;
			reactivetransactionRows = [];
			$searchResult = !$searchResult;
	};
	let click = async () => {
		if (reactiveValue === undefined) {
			// if value is not undefined proceed
			alert('Enter Search Value');
		} else {
			if (reactiveValue.length > 0) {
				// if the length of the array character is > 0 proceed
				const returnedValue = identifyInput(value); //identify the search value
				switch (returnedValue?.case) {
					case 1:
						$searchResult = true;
						console.log('here');
						transactionRows = await fetchAccountHistory(
							new PublicKey(value),
							$connection,
							7,
							$beforeVariable
						);
						break;
					case 2:
						alert('this is a transaction');
						// if the search string is a transaction do this
						break;
					case 3:
						alert('this is a domain');
						// if the search string is a domain do this
						break;

					default:
						alert('feature not included yet. Still developing');
						break;
				}
			}
		}
	};
</script>

<div class="mt-10 h-screen w-full space-y-5 overflow-x-hidden overflow-y-hidden px-5 md:px-20">
	<!-- <img class="w-[2000px]" src={heroImage} alt=""/> -->

	<!-- search field -->

	<Search
		on:input={() => {
			typing = true;
			//set typing === false if string.length ===0
			if (reactiveValue?.length == 0) {
				typing = false;
				$beforeVariable = undefined;
				reactivetransactionRows = [];
				$searchResult = false;
			}
		}}
		bind:value
		placeholder="Search for accounts, transactions, and domain names"
	>
		<Button on:click={click}>Search</Button>
		<!-- onclick of the search button-->
	</Search>
	{#if $searchResult}
		<!-- search display -->
		<!-- <SearchLoader /> -->
		<div class="flex h-2/3 flex-col items-center">
			<!-- components for showing transaction row below-->
			<SearchTable transactionRows={reactivetransactionRows} />
			<!-- button for next below -->
			<div class="flex flex-row gap-3">
				<Button on:click={click}>More</Button>
				<Button on:click={back}>Back</Button>

				
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
		<div class="flex h-full flex-col gap-10">
			<!-- card display -->
			<div class="flex flex-col space-y-3 md:flex-row md:justify-between">
				<Card>
					<span slot="title">Circulating Supply</span>
					<span class=" h-full" slot="data">
						<span class="text-2xl"><Supply /> </span>
						<span class="flex gap-5">
							<span> Total Supply: </span>
							<TotalSupply /></span
						>
					</span>
				</Card>
				<Card>
					<span slot="title">Transaction Count</span>
					<span class=" h-full" slot="data">
						<span class="text-2xl"><TransactionCount /> </span>
						<span class="flex w-full flex-col justify-between gap-2 md:flex-row">
							<span class="flex gap-3">
								<span class="text-nowrap"> Current Vote: </span>
								<VoteAccount /></span
							>
							<span class="flex gap-3">
								<span class="text-nowrap"> Deliquent Vote: </span>
								<DeliquentVote /></span
							>
						</span>
					</span>
				</Card>
				<Card>
					<span slot="title">Epoch Stats</span>
					<span class=" h-full" slot="data">
						<span class="text-2xl"><Epoch /> </span>
						<span class="flex w-full flex-col justify-between gap-2 md:flex-row">
							<span class="flex gap-3">
								<span class="text-nowrap"> Slot: </span>
								<Slot /></span
							>
							<span class="flex gap-3">
								<span class="text-nowrap"> Block Height: </span>
								<BlockHeight />
							</span>
						</span>
					</span>
				</Card>
				<!-- card ends -->
			</div>
			<div class=" flex flex-col items-center justify-center gap-3">
				<span class="font-mono text-2xl font-bold">Epoch progress bar </span>
				<EpochProgress />
			</div>
		</div>
	{/if}
</div>
