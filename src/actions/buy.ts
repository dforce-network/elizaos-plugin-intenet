import type {
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
} from "@elizaos/core";
import {
    generateObjectDeprecated,
    composeContext,
    ModelClass,
} from "@elizaos/core";
import {
    createWalletClient,
    createPublicClient,
    http,
    WalletClient,
    parseEther,
} from "viem";
import * as viemChains from "viem/chains";
import {privateKeyToAccount} from "viem/accounts";
import {buy, BuyParams, isSupportedChain} from "intenet-sdk";

import {buyTemplate} from "../templates";
import {BuyTokenParams} from "../types";

export class BuyAction {
    constructor(private walletClient: WalletClient, private publicClient) {}

    async buy(params: BuyParams) {
        const tx = await buy(params, this.walletClient, this.publicClient);
        return tx;
    }
}

const buildBuyDetails = async (
    state: State,
    runtime: IAgentRuntime
): Promise<BuyTokenParams> => {
    const context = composeContext({
        state,
        template: buyTemplate,
    });

    const buyDetails = (await generateObjectDeprecated({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    })) as BuyTokenParams;

    return buyDetails;
};

export const buyAction = {
    name: "BUY_TOKEN",
    description: "Buy tokens using InteNet Protocol",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: Record<string, unknown>,
        callback?: HandlerCallback
    ) => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        let details = await buildBuyDetails(state, runtime);

        if (!details.chain) {
            details = {
                ...details,
                chain: "sepolia",
            };
        }
        const chain = viemChains[details.chain.toLowerCase()];

        if (!isSupportedChain(chain.id)) {
            throw new Error(`Unsupported chain: ${details.chain}`);
        }

        const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
        const account = privateKeyToAccount(privateKey as `0x${string}`);

        const walletClient = createWalletClient({
            account,
            chain,
            transport: http(),
        });

        const publicClient = createPublicClient({
            transport: http(),
            chain,
        });

        const action = new BuyAction(walletClient, publicClient);

        const buyParams: BuyParams = {
            tokenAddress: details.tokenAddress,
            amount: parseEther(details.amount),
        };

        try {
            const res = await action.buy(buyParams);
            if (callback) {
                callback({
                    text: `Successfully bought ${res.tokenAmount} tokens at ${buyParams.tokenAddress}\nTransaction Hash: ${res.transactionHash}`,
                    content: {
                        success: true,
                        hash: res.transactionHash,
                        amount: buyParams.amount.toString(),
                        tokenAddress: buyParams.tokenAddress,
                    },
                });
            }
            return true;
        } catch (error) {
            console.error("Error during token purchase:", error);
            if (callback) {
                callback({
                    text: `Error buying tokens: ${error.message}`,
                    content: {error: error.message},
                });
            }
            return false;
        }
    },
    template: buyTemplate,
    validate: async (runtime: IAgentRuntime) => {
        const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
        return typeof privateKey === "string" && privateKey.startsWith("0x");
    },
    examples: [
        [
            {
                user: "assistant",
                content: {
                    text: "I'll help you buy tokens from the specified address",
                    action: "BUY_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: "Buy 10 INT worth of tokens of token 0x1234...",
                    action: "BUY_TOKEN",
                },
            },
        ],
    ],
    similes: ["BUY_TOKEN", "PURCHASE_TOKEN"],
};
