export const launchTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{walletInfo}}

Extract the following information about the token launch:
- Token name
- Token ticker symbol
- Token description
- Token image URL
- Project website URL
- Project Twitter URL
- Project Telegram URL
- Project Discord URL
- Creator address
- Chain

Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined:

\`\`\`json
{
    "name": string | null,
    "symbol": string | null,
    "description": string | null,
    "image": string | null,
    "website": string | null,
    "twitter": string | null,
    "telegram": string | null,
    "discord": string | null,
    "creatorAddress": string | null,
    "chain": string | null
}
\`\`\`
`;

export const buyTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{walletInfo}}

Extract the following information about the token purchase:
- Amount to buy in INT
- Token contract address to buy

Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined:

\`\`\`json
{
    "amount": string | null
    "tokenAddress": string | null,
    "chain": string | null
}
\`\`\`
`;

export const sellTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{walletInfo}}

Extract the following information about the token sale:
- Amount to sell in the token
- Token contract address to sell

Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined:

\`\`\`json
{
    "amount": string | null,
    "tokenAddress": string | null
    "chain": string | null
}
\`\`\`
`;
