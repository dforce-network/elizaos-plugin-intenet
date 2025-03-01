export * from "./actions/launch";
export * from "./types";

import type {Plugin} from "@elizaos/core";
import {launchAction} from "./actions/launch";

export const intenetPlugin: Plugin = {
    name: "intenet",
    description: "intenet launchpad integration plugin",
    providers: [],
    evaluators: [],
    services: [],
    actions: [launchAction],
};

export default intenetPlugin;
