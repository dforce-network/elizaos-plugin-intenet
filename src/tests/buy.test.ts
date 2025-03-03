import {describe, it, expect, beforeAll} from "vitest";
import {parseEther} from "viem";
import {sepolia} from "viem/chains";
import {BuyAction} from "../actions/buy";
import {setup} from "./utils";
describe("Buy Action", () => {
    let ba: BuyAction;
    let walletClient;
    let publicClient;
    let chain = sepolia;

    beforeAll(async () => {
        ({walletClient, publicClient} = setup(chain));
        ba = new BuyAction(walletClient, publicClient);
    });

    it("should buy tokens", async () => {
        const result = await ba.buy({
            tokenAddress: "0x625F0BEb1A17BDC68EfE68F3cbeeB3d211b6fc0A",
            amount: parseEther("1"),
        });

        console.log(result);

        expect(result).toBeDefined();
        expect(result.transactionHash).toBeDefined();
    });
});
