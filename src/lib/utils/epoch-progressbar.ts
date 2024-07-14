import type { Connection } from '@solana/web3.js';
import { writable } from 'svelte/store';

export let progress = writable(false);
function percentage(numerator: bigint, denominator: bigint, decimals: number): number {
	// since bigint is integer, we need to multiply first to get decimals
	// see https://stackoverflow.com/a/63095380/1375972
	const pow = 10 ** decimals;
	return Number((numerator * BigInt(100 * pow)) / denominator) / pow;
}

export async function getEpochPercent(connection: Connection) {
	progress.set(false);
	let epochPercent;
	const epochInfo = await connection.getEpochInfo();
	epochPercent = percentage(BigInt(epochInfo.slotIndex), BigInt(epochInfo.slotsInEpoch), 2).toFixed(1);
	// console.log('epoch percent', epochPercent);
	progress.set(true);
	return epochPercent;

	//progress is done and you can read the value now
}
