import {describe, it, expect, beforeAll} from "vitest";
import {parseEther} from "viem";
import {sepolia} from "viem/chains";
import {SellAction} from "../actions/sell";
import {setup} from "./utils";

describe("Sell Action", () => {
    let sa: SellAction;
    let walletClient;
    let publicClient;
    let chain = sepolia;

    beforeAll(async () => {
        ({walletClient, publicClient} = setup(chain));
        sa = new SellAction(walletClient, publicClient);
    });

    it("should sell tokens", async () => {
        const result = await sa.sell({
            tokenAddress: "0x625F0BEb1A17BDC68EfE68F3cbeeB3d211b6fc0A",
            amount: parseEther("100000"),
        });

        console.log(result);

        expect(result).toBeDefined();
        expect(result.transactionHash).toBeDefined();
    });
});
