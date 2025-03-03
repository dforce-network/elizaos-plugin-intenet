import {defineConfig} from "vitest/config";

export default defineConfig({
    test: {
        include: ["src/tests/**/*.test.ts"],
        environment: "node",
        fileParallelism: false,
        testTimeout: 500000,
    },
});
