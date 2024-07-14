<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
    import {LAMPORTS_PER_SOL} from "@solana/web3.js"
	export let transactionRows: any;
	$: reactiveTransactionRows = transactionRows;
	$: console.log('table ', reactiveTransactionRows);
</script>

<Table hoverable={true}>
	<TableHead class="bg-gray-300 hover:bg-none">
		<TableHeadCell>Signature</TableHeadCell>
		<TableHeadCell class="text-nowrap">Time of Transaction</TableHeadCell>
		<TableHeadCell class="text-nowrap">Date of Transaction</TableHeadCell>

		<TableHeadCell class="text-nowrap">Fees Paid</TableHeadCell>
		<TableHeadCell class="text-nowrap">Fee Payer</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
        {#if reactiveTransactionRows !== undefined }
            {#each reactiveTransactionRows as row, i}
			<TableBodyRow class="bg-gray-500 hover:bg-opacity-25">
				<TableBodyCell class="text-gray-200"
					><slot name="signature">{row.signature}</slot></TableBodyCell
				>
				<TableBodyCell class="text-gray-200"
					><slot name="timeAndDate">{new Date(row.blockTime * 1000).toLocaleTimeString()}</slot></TableBodyCell
				>
                <TableBodyCell class="text-gray-200"
					><slot name="timeAndDate">{new Date(row.blockTime * 1000).toLocaleDateString()}</slot></TableBodyCell
				>
				<TableBodyCell class="text-gray-200"
					><slot name="feesPaid">{row.meta.fee/LAMPORTS_PER_SOL} SOL</slot></TableBodyCell
				>
				<TableBodyCell class="text-gray-200"
					><slot name="feePayer">{row.transaction.feePayer}</slot></TableBodyCell
				>
			</TableBodyRow>
		{/each}
        {/if}
		
	</TableBody>
</Table>
