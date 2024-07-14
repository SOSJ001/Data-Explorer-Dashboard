import type { Connection, TransactionSignature } from "@solana/web3.js";

export async function getTransactionInfo(connection: Connection, signature : TransactionSignature) {
    let transactionDetails= await connection.getParsedTransaction(signature)
        
    console.log("ts", transactionDetails);
    return transactionDetails
}