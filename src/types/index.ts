export interface LaunchTokenParams {
    name: string;
    symbol: string;
    description: string;
    image: string;
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
    creatorAddress: string;
    chain?: string;
}

export interface BuyTokenParams {
    tokenAddress: string;
    amount: string;
    chain?: string;
}

export interface SellTokenParams {
    tokenAddress: string;
    amount: string;
    chain?: string;
}
