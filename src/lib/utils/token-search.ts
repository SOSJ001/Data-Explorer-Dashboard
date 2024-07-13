/**
 * We use a third-party API (https://token-list-api.solana.cloud)
 * See https://github.com/solflare-wallet/utl-api
 * Note that the utl-sdk (https://github.com/solflare-wallet/utl-sdk/tree/master)
 * doesn't use a fallback for search
 * So to avoid pulling in extra dependencies we just use the public API directly for search
 */



type TokenSearchApiResponseToken = {
    address: any;
    chainId: number;
    name: string;
    symbol: string;
    verified: boolean;
    decimals: number;
    holders: number;
    logoUri: string;
    tags: string[];
};

type TokenSearchApiResponse = {
    content: TokenSearchApiResponseToken[];
};

type SearchElement = {
    label: string;
    value: string[];
    pathname: string;
};

export async function searchTokens(search: string, chainId:number): Promise<SearchElement[]> {

    const apiResponse = await fetch(
        `https://token-list-api.solana.cloud/v1/search?query=${encodeURIComponent(
            search
        )}&chainId=${chainId}&start=0&limit=20`
    );
    if (apiResponse.status >= 400) {
        try {
            const errorJsonBody = await apiResponse.json();
            console.error(new Error('Error calling token search API'), {
                chainId: chainId.toString(),
                errorJsonBody,
                search,
            });
        } catch {
            // no JSON body for error
            console.error(new Error('Error calling token search API'), { chainId: chainId.toString(), search });
        }
    }

    const { content } = (await apiResponse.json()) as TokenSearchApiResponse;
    console.log("response from api token search ", content)

    return content.map(token => ({
        label: token.name,
        pathname: '/address/' + token.address,
        value: [token.name, token.symbol, token.address],
    }));
}
