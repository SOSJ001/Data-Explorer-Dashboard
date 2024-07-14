import { Connection } from '@solana/web3.js';
import { json } from '@sveltejs/kit';

import { MAINNET_BETA_URL } from '$lib/utils/connection';
import { getDomainInfo } from '$lib/utils/domain-info';




export async function GET() {
    const connection = new Connection(MAINNET_BETA_URL);
    const resp = connection.getSupply

    return json(resp) 
}
