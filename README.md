# @elizaos/plugin-intenet

This plugin provides actions and providers for interacting with the InteNet launch pad protocol.

## Description

The InteNet plugin provides comprehensive functionality for interacting with the InteNet launch pad protocol, including token launches, trading.

## Features

- Multi-chain support for InteNet protocol
- Token launch participation
- Token trade

## Installation

```bash
pnpm install github:dforce-network/elizaos-plugin-intenet
```

## Configuration

### Required Environment Variables

```env
# Required
EVM_PRIVATE_KEY=your-private-key-here
```

## Integration with eliza

### Install the plugin

Currently this plugin is not in the eliza registry, manually installation is needed instead of using the cli

```shell
cd eliza
git clone https://github.com/dforce-network/elizaos-plugin-intenet packages/plugin-intenet
pnpm add "@elizaos/core@workspace:*" --filter ./packages/plugin-intenet/
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

## Credits

This plugin integrates with and builds upon several key technologies:

- [Ethereum](https://ethereum.org/): Decentralized blockchain
- [viem](https://viem.sh/): Ethereum client library
