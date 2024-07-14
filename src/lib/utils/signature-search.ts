import { Connection, PublicKey, type Cluster } from '@solana/web3.js';
import { writable } from 'svelte/store';
export let prevBeforeVariable = writable();
export let beforeVariable = writable();
//@ts-ignore
export async function fetchAccountHistory(
	pubkey: PublicKey,
	connection: Connection,
	limit: number,
	before?: any
) {
	try {
		{
			const signatures = await connection.getConfirmedSignaturesForAddress2(pubkey, {
				limit,
				before
			});

			let transactionRows = [];
			for (const signature of signatures) {
				const transaction: any = await connection.getConfirmedTransaction(signature.signature);
				beforeVariable.set(signature.signature); //setting the more button
                transaction.signature = signature.signature;  
				transactionRows.push(transaction);
			}
			// console.log('before after', before);
            
            return transactionRows

		}
	} catch (error) {
		console.log('This is th error ', error);
	}
}
