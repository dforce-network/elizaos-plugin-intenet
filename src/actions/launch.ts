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
    PublicClient,
    WalletClient,
} from "viem";
import * as viemChains from "viem/chains";
import {privateKeyToAccount} from "viem/accounts";
import {launch, LaunchParams, isSupportedChain} from "intenet-sdk";

import {launchTemplate} from "../templates";
import {LaunchTokenParams} from "../types";

export class LaunchAction {
    constructor(private walletClient: WalletClient, private publicClient) {}

    async launch(params: LaunchParams) {
        const tx = await launch(
            params as LaunchParams,
            this.walletClient,
            this.publicClient
        );
        return tx;
    }
}

const buildLaunchDetails = async (state: State, runtime: IAgentRuntime) => {
    const context = composeContext({
        state,
        template: launchTemplate,
    });

    const launchDetails = (await generateObjectDeprecated({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    })) as LaunchTokenParams;

    return launchDetails;
};

export const launchAction = {
    name: "LAUNCH_TOKEN",
    description: "Launch a new token using InteNet Protocol",
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

        let details = await buildLaunchDetails(state, runtime);

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

        const action = new LaunchAction(walletClient, publicClient);

        const launchParams = {
            creator: details.creatorAddress as `0x${string}`,
            name: details.name,
            ticker: details.symbol,
            cores: [1],
            description: details.description,
            image: details.image,
            urls: [
                details.website || "",
                details.twitter || "",
                details.telegram || "",
                details.discord || "",
            ] as [string, string, string, string],
            purchaseAmount: BigInt(0),
        };

        try {
            const res = await action.launch(launchParams);
            if (callback) {
                callback({
                    text: `Successfully launched ${launchParams.name} (${launchParams.ticker}) \nToken Address: ${res.tokenAddress}`,
                    content: {
                        success: true,
                        hash: res.transactionHash,
                        chain: chain.name,
                    },
                });
            }
            return true;
        } catch (error) {
            console.error("Error during launching token:", error);
            if (callback) {
                callback({
                    text: `Error launching tokens: ${error.message}`,
                    content: {error: error.message},
                });
            }
            return false;
        }
    },
    template: launchTemplate,
    validate: async (runtime: IAgentRuntime) => {
        const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
        return typeof privateKey === "string" && privateKey.startsWith("0x");
    },
    examples: [
        [
            {
                user: "assistant",
                content: {
                    text: "I'll help you launch a new token called 'MyToken' with ticker 'MTK'",
                    action: "LAUNCH_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: "Launch a new token called MyToken with ticker MTK on Base",
                    action: "LAUNCH_TOKEN",
                },
            },
        ],
    ],
    similes: ["LAUNCH_TOKEN", "CREATE_TOKEN"],
}; // TODO: add more examples
