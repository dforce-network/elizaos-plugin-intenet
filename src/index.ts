export * from "./actions/launch";
export * from "./types";

import type {Plugin} from "@elizaos/core";
import {launchAction} from "./actions/launch";
import {buyAction} from "./actions/buy";
import {sellAction} from "./actions/sell";

export const intenetPlugin: Plugin = {
    name: "intenet",
    description: "intenet launchpad integration plugin",
    providers: [],
    evaluators: [],
    services: [],
    actions: [launchAction, buyAction, sellAction],
};

export default intenetPlugin;
