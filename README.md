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
