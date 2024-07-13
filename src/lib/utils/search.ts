import bs58 from "bs58";
import { searchTokens } from "./token-search";



 
// transaction or account 
export function identifyInput(queryInput: string) {
     let search = queryInput.trim();
    let options = []
    try {
        const decoded = bs58.decode(search);
        if (decoded.length === 32) {
            console.log("Account ", search)
            // options.push({
            //     label: 'Account',
            //     options: [
            //         {
            //             label: search,
            //             pathname: '/address/' + search,
            //             value: [search],
            //         },
            //     ],
            // });
        } else if (decoded.length === 64) {
            console.log("transaction", search)
            // options.push({
            //     label: 'Transaction',
            //     options: [
            //         {
            //             label: search,
            //             pathname: '/tx/' + search,
            //             value: [search],
            //         },
            //     ],
            // });
        }
    } catch (err) {
        /* empty */
    }
}



// check if the srarch value has .sol 
const hasDomainSyntax = (value: string) => {
	return value.length > 4 && value.substring(value.length - 4) === '.sol';
};

// domain search below 
async function buildDomainOptions(search: string) {
	const domainInfoResponse = await fetch(`/getDomain/${search}`);
	const domainInfo = (await domainInfoResponse.json());

	if (domainInfo && domainInfo.owner && domainInfo.address) {
		return [
			{
				label: 'Domain Owner',
				options: [
					{
						label: domainInfo.owner,
						pathname: '/address/' + domainInfo.owner,
						value: [search]
					}
				]
			},
			{
				label: 'Name Service Account',
				options: [
					{
						label: search,
						pathname: '/address/' + domainInfo.address,
						value: [search]
					}
				]
			}
		];
	}
}
// token search below 
async function buildTokenOptions(
	search: string,
	chainid: number
) {
	const matchedTokens = await searchTokens(search, chainid);

	if (matchedTokens.length > 0) {
		return {
			label: 'Tokens',
			options: matchedTokens
		};
	}
}