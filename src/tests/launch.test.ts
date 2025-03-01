import {describe, it, expect, beforeAll} from "vitest";
import {privateKeyToAccount} from "viem/accounts";
import {
    Account,
    http,
    createWalletClient,
    createPublicClient,
    WalletClient,
    PublicClient,
} from "viem";
import {sepolia} from "viem/chains";
import {LaunchAction} from "../actions/launch";

describe("Launch Action", () => {
    let la: LaunchAction;
    let walletClient: WalletClient;
    let publicClient;

    beforeAll(async () => {
        const pk =
            process.env["EVM_PRIVATE_KEY"] ||
            "0x0000000000000000000000000000000000000000000000000000000000000000";
        const account = privateKeyToAccount(pk as `0x${string}`);

        console.log(account);

        walletClient = createWalletClient({
            account,
            chain: sepolia,
            transport: http(),
        });

        publicClient = createPublicClient({
            chain: sepolia,
            transport: http(),
        });

        la = new LaunchAction(walletClient, publicClient);
    });

    it("should launch a token", async () => {
        const result = await la.launch({
            name: "MyToken",
            ticker: "MTK",
            cores: [1],
            description: "MyToken is a token",
            image: "https://example.com/image.png",
            urls: [
                "https://example.com",
                "https://twitter.com/mytoken",
                "https://t.me/mytoken",
                "https://discord.com/mytoken",
            ],
            purchaseAmount: BigInt(0),
            creator: walletClient.account.address,
            network: sepolia,
        });

        console.log(result);

        expect(result).toBeDefined();
        expect(result.tokenAddress).toBeDefined();
        expect(result.transactionHash).toBeDefined();
    });
});
