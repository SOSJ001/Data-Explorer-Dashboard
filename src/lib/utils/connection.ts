import { clusterApiUrl, Connection } from "@solana/web3.js";
import { writable } from "svelte/store";
export let chainId: number = 101 //chainid for fetching tokens

//cluster name, connection
const mainnet = 'mainnet-beta';
const testnet = 'testnet';
const devnet = 'devnet';


// creating a writeable connection store
export let connection = writable(new Connection(clusterApiUrl(mainnet)));

export function setChainId(clusterNumber:number) {
    switch (clusterNumber) {
			case 0:
            chainId = 101;
            connection.set(new Connection(clusterApiUrl(mainnet)));
				return
			case 1:
            chainId = 102;
            connection.set(new Connection(clusterApiUrl(testnet)));
				return;
			case 2:
            chainId = 103;
            connection.set(new Connection(clusterApiUrl(devnet)));
				return;
		}
}




// exporting connection url
export const MAINNET_BETA_URL = 'https://api.mainnet-beta.solana.com';
export const TESTNET_URL = 'https://api.testnet.solana.com';
export const DEVNET_URL = 'https://api.devnet.solana.com';