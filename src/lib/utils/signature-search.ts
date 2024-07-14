import { Connection, PublicKey, type Cluster } from '@solana/web3.js';
//@ts-ignore
export async function fetchAccountHistory(
	pubkey: PublicKey,
	connection: Connection,
	limit: number,
	before: any
) {
	try {
		{
			const signatures = await connection.getConfirmedSignaturesForAddress2(pubkey, {
				limit,
				before
			});
            // console.log(connection);

			let transactionRows = [];
			for (const signature of signatures) {
				const transaction: any = await connection.getConfirmedTransaction(signature.signature);
                transaction.signature = signature.signature;  
                // console.log('testing transaction \n', transaction);
				transactionRows.push(transaction);
            }
            
            console.log(transactionRows)


            
			// let pub = await Promise.all(
			// 	signatures.map((signature) => connection.getConfirmedTransaction(signature.signature))
			// );
			// for (let index = 0; index < pub.length; index++) {
			// 	const element = pub[index];
			// console.log("status ", element?.transaction.instructions)
			// console.log(new Date(element?.blockTime? * 1000).toLocaleString()) //accessing the elementon the pub array too
		}
	} catch (error) {
		console.log('This is th error ', error);
	}
}
