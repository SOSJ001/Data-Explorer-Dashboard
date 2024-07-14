import type { Connection } from "@solana/web3.js";
import { writable } from "svelte/store";
export let supplyResponse: any = writable()
export async function getSupply(connection:Connection) {
   let  response = await connection.getSupply();
    supplyResponse.set(response)
}
