import {describe, it, expect, beforeAll} from "vitest";
import {sepolia} from "viem/chains";
import {LaunchAction} from "../actions/launch";
import {setup} from "./utils";

describe("Launch Action", () => {
    let la: LaunchAction;
    let walletClient;
    let publicClient;
    let chain = sepolia;

    beforeAll(async () => {
        ({walletClient, publicClient} = setup(chain));
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
        });

        console.log(result);

        expect(result).toBeDefined();
        expect(result.tokenAddress).toBeDefined();
        expect(result.transactionHash).toBeDefined();
    });
});
