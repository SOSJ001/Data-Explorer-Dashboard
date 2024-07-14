<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import { Drawer, Button, CloseButton } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { connection } from '$lib/utils/connection';
	import { setChainId } from '$lib/utils/connection';

	let cluster: string; //variable to display connection string

	$: reactiveConnection = $connection.rpcEndpoint;
	$: {
		console.log('iniyial rpc ', reactiveConnection);
		if (reactiveConnection.toLowerCase().includes('devnet')) {
			cluster = 'DEVNET';
		}
		if (reactiveConnection.toLowerCase().includes('mainnet-beta')) {
			cluster = 'MAINNET-BETA';
		}
		if (reactiveConnection.toLowerCase().includes('testnet')) {
			cluster = 'TESTNET';
		}
	}
	// checking the cluster connected to and returning the name

	// for transition of the cluster drawer
	let hidden6 = true;
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	}; //   transition ends
</script>


<div class="h-screen w-screen overflow-x-hidden overflow-y-auto">
	
	<div class="h- m-5">
		<Navbar>
			<span slot="clusterDrawer">
				<Button
					on:click={() => {
						hidden6 = false;
					}}>{cluster}</Button
				>
			</span>
		</Navbar>
		<div>
			<slot></slot>
		</div>
	</div>
	<!-- cluster drawer below -->
<Drawer
	class="bg-gray-800 text-white"
	placement="right"
	transitionType="fly"
	transitionParams={transitionParamsRight}
	bind:hidden={hidden6}
	id="sidebar6"
>
	<!-- info and close button  -->
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="mb-4 inline-flex items-center font-mono text-xl font-bold text-gray-400"
		>
			Choose Cluster
		</h5>
		<CloseButton on:click={() => (hidden6 = true)} class="mb-4 text-white" />
	</div>
	<div class="flex w-full flex-col space-y-5">
		<Button
			on:click={() => {
				setChainId(0);
			}}>Mainnet-beta</Button
		>
		<Button
			on:click={() => {
				setChainId(1);
			}}>Testnet</Button
		>
		<Button
			on:click={() => {
				setChainId(2);
			}}>Devnet</Button
		>
	</div>
</Drawer>
</div>
