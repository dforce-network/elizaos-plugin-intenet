import {privateKeyToAccount} from "viem/accounts";
import {http, createWalletClient, createPublicClient, Chain} from "viem";

export const setup = (chain: Chain) => {
    const pk =
        process.env["EVM_PRIVATE_KEY"] ||
        "0x0000000000000000000000000000000000000000000000000000000000000000";
    const account = privateKeyToAccount(pk as `0x${string}`);

    // console.log(account);

    const walletClient = createWalletClient({
        account,
        chain,
        transport: http(),
    });

    const publicClient = createPublicClient({
        chain,
        transport: http(),
    });

    return {walletClient, publicClient};
};
