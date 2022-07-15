# nervape contracts

nervape solidity smart contracts

## Deployed Contracts

### Godwoken v1 testnet

Nervape NFT: 0xD0Df7A0C50D9c222cc66208D81549B2D96108bd9

MockToken: 0x42502Bd78fCdB4CB807b9E20b80Aa0e0d9833663

### Godwoken v1 mainnet

TODO

## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set a BIP-39 compatible mnemonic as an environment
variable. Follow the example in `.env.example`. If you don't already have a mnemonic, use this [website](https://iancoleman.io/bip39/) to generate one.

Then, proceed with installing dependencies:

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

### Deploy

Deploy the contracts to Hardhat Network:

Deploy to testnet

```sh
# deploy ape factory
$ yarn deploy:factory --network godwoken-testnet
```

```sh
# deploy ape minter
$ yarn deploy:minter --network godwoken-testnet
```

## Syntax Highlighting

If you use VSCode, you can get Solidity syntax highlighting via the [vscode-solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) extension.

## Caveats

### Ethers and Waffle

If you can't get the [Waffle matchers](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) to work, try to
make your `ethers` package version match the version used by the `@ethereum-waffle/chai` package. See
[#111](https://github.com/paulrberg/solidity-template/issues/111) for more details.

## License

[Unlicense](./LICENSE.md)
