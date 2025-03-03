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
    formatEther,
} from "viem";
import * as viemChains from "viem/chains";
import {privateKeyToAccount} from "viem/accounts";
import {sell, SellParams, isSupportedChain} from "intenet-sdk";

import {sellTemplate} from "../templates";
import {SellTokenParams} from "../types";

export class SellAction {
    constructor(private walletClient: WalletClient, private publicClient) {}

    async sell(params: SellParams) {
        const tx = await sell(params, this.walletClient, this.publicClient);
        return tx;
    }
}

const buildSellDetails = async (
    state: State,
    runtime: IAgentRuntime
): Promise<SellTokenParams> => {
    const context = composeContext({
        state,
        template: sellTemplate,
    });

    const sellDetails = (await generateObjectDeprecated({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    })) as SellTokenParams;

    return sellDetails;
};

export const sellAction = {
    name: "SELL_TOKEN",
    description: "Sell tokens using InteNet Protocol",
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

        let details = await buildSellDetails(state, runtime);

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

        const action = new SellAction(walletClient, publicClient);

        const sellParams: SellParams = {
            tokenAddress: details.tokenAddress,
            amount: parseEther(details.amount),
        };

        try {
            const res = await action.sell(sellParams);
            if (callback) {
                callback({
                    text: `Successfully sold ${formatEther(
                        res.tokenAmount
                    )} tokens from ${
                        sellParams.tokenAddress
                    }\nTransaction Hash: ${res.transactionHash}`,
                    content: {
                        success: true,
                        hash: res.transactionHash,
                        amount: sellParams.amount.toString(),
                        tokenAddress: sellParams.tokenAddress,
                    },
                });
            }
            return true;
        } catch (error) {
            console.error("Error during token sale:", error);
            if (callback) {
                callback({
                    text: `Error selling tokens: ${error.message}`,
                    content: {error: error.message},
                });
            }
            return false;
        }
    },
    template: sellTemplate,
    validate: async (runtime: IAgentRuntime) => {
        const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
        return typeof privateKey === "string" && privateKey.startsWith("0x");
    },
    examples: [
        [
            {
                user: "assistant",
                content: {
                    text: "I'll help you sell tokens from your wallet",
                    action: "SELL_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: "Sell 10 tokens of token 0x1234...",
                    action: "SELL_TOKEN",
                },
            },
        ],
    ],
    similes: ["SELL_TOKEN", "SELL"],
};
