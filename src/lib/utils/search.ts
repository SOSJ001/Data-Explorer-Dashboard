import bs58 from 'bs58';
import { searchTokens } from './token-search';

// transaction or account
export function identifyInput(queryInput: string) {
	let search = queryInput.trim();
	let options = [];
	try {
		//check if has a .sol extension
		if (search.length > 4 && search.substring(search.length - 4) === '.sol') {
			// case value for domain will be 3
			return { searchValue: search, case: 3 };
		} else {
			const decoded = bs58.decode(search);
			if (decoded.length === 32) {
				console.log('Account ', search);
				// case value for Account will be 1
				return { searchValue: search, case: 1 };
			} else if (decoded.length === 64) {
				console.log('transaction', search);
				// case value for Transaction will be 2
				return { searchValue: search, case: 2 };
			}
		}
	} catch (err) {
		/* empty */
	}
}

// check if the srarch value has .sol
const hasDomainSyntax = (value: string) => {
	return;
};

// domain search below
async function buildDomainOptions(search: string) {
	const domainInfoResponse = await fetch(`/getDomain/${search}`);
	const domainInfo = await domainInfoResponse.json();

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
async function buildTokenOptions(search: string, chainid: number) {
	const matchedTokens = await searchTokens(search, chainid);

	if (matchedTokens.length > 0) {
		return {
			label: 'Tokens',
			options: matchedTokens
		};
	}
}
