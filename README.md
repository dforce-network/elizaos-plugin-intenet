# @elizaos-plugins/plugin-intenet

This plugin provides actions and providers for interacting with the InteNet Protocol, a decentralized launchpad for token creation and trading.

## Description

The InteNet plugin enables seamless interaction with the InteNet Protocol, allowing users to launch new tokens, buy existing tokens, and sell tokens across multiple supported blockchains.

## Features

- Token creation and launch capabilities with customizable parameters
- Token trading functionality (buy and sell operations)
- Transaction management with detailed reporting

```bash
pnpm install github:dforce-network/elizaos-plugin-intenet
```

## Configuration

### Required Environment Variables

```env
# Required
EVM_PRIVATE_KEY=your-private-key-here
```

## Integration with Eliza

### Install the plugin

This plugin is not currently available in the Eliza registry. Manual installation is required instead of using the CLI:

```shell
cd eliza
git clone https://github.com/dforce-network/elizaos-plugin-intenet packages/plugin-intenet
pnpm add "@elizaos/core@workspace:*" --filter ./packages/plugin-intenet/
pnpm add "@elizaos-plugins/plugin-intenet@workspace:*" --filter ./agent
pnpm build
```

### Enable in charactor

```json
"plugins": ["@elizaos-plugins/plugin-intenet"],
```

## Actions

### 1. Launch

Launch a token on InteNet launchpad:

```

Launch a new token called MyToken with ticker MTK on Base, my address is 0x1234...
```

### 2. Buy

Buy tokens launched on InteNet launchpad:

```
Buy 1 INT of MTK on Base
```

### 3. Sell

Sell tokens launched on InteNet launchpad:

```
Sell 10000 MTK on Base
```

## Development

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Build the plugin:

```bash
pnpm run build
```

4. Run tests:

```bash
pnpm test
```

## Future Enhancements

- **Multi-chain Support**: Expand beyond current chains to include additional EVM-compatible networks
- **Advanced Trading Features**: Implement limit orders, stop-loss, and other advanced trading mechanisms
- **Portfolio Management**: Add tools for tracking token performance and portfolio analytics
- **Enhanced Token Analytics**: Provide deeper insights into token metrics and market performance

## Credits

This plugin integrates with and builds upon several key technologies:

- [Ethereum](https://ethereum.org/): Decentralized blockchain
- [viem](https://viem.sh/): Ethereum client library
