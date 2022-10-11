/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../../common";
import type {
  ERC721A,
  ERC721AInterface,
} from "../../../../erc721a/contracts/ERC721A.sol/ERC721A";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000fed38038062000fed8339810160408190526200003491620001df565b8151620000499060029060208501906200006c565b5080516200005f9060039060208401906200006c565b5050600080555062000286565b8280546200007a9062000249565b90600052602060002090601f0160209004810192826200009e5760008555620000e9565b82601f10620000b957805160ff1916838001178555620000e9565b82800160010185558215620000e9579182015b82811115620000e9578251825591602001919060010190620000cc565b50620000f7929150620000fb565b5090565b5b80821115620000f75760008155600101620000fc565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013a57600080fd5b81516001600160401b038082111562000157576200015762000112565b604051601f8301601f19908116603f0116810190828211818310171562000182576200018262000112565b816040528381526020925086838588010111156200019f57600080fd5b600091505b83821015620001c35785820183015181830184015290820190620001a4565b83821115620001d55760008385830101525b9695505050505050565b60008060408385031215620001f357600080fd5b82516001600160401b03808211156200020b57600080fd5b620002198683870162000128565b935060208501519150808211156200023057600080fd5b506200023f8582860162000128565b9150509250929050565b600181811c908216806200025e57607f821691505b602082108114156200028057634e487b7160e01b600052602260045260246000fd5b50919050565b610d5780620002966000396000f3fe6080604052600436106100dd5760003560e01c80636352211e1161007f578063a22cb46511610059578063a22cb46514610224578063b88d4fde14610244578063c87b56dd14610257578063e985e9c51461027757600080fd5b80636352211e146101cf57806370a08231146101ef57806395d89b411461020f57600080fd5b8063095ea7b3116100bb578063095ea7b31461017157806318160ddd1461018657806323b872dd146101a957806342842e0e146101bc57600080fd5b806301ffc9a7146100e257806306fdde0314610117578063081812fc14610139575b600080fd5b3480156100ee57600080fd5b506101026100fd3660046109e8565b6102c0565b60405190151581526020015b60405180910390f35b34801561012357600080fd5b5061012c610312565b60405161010e9190610a5d565b34801561014557600080fd5b50610159610154366004610a70565b6103a4565b6040516001600160a01b03909116815260200161010e565b61018461017f366004610aa5565b6103e8565b005b34801561019257600080fd5b50600154600054035b60405190815260200161010e565b6101846101b7366004610acf565b6104a0565b6101846101ca366004610acf565b610631565b3480156101db57600080fd5b506101596101ea366004610a70565b610651565b3480156101fb57600080fd5b5061019b61020a366004610b0b565b61065c565b34801561021b57600080fd5b5061012c6106ab565b34801561023057600080fd5b5061018461023f366004610b26565b6106ba565b610184610252366004610b78565b610726565b34801561026357600080fd5b5061012c610272366004610a70565b610770565b34801561028357600080fd5b50610102610292366004610c54565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b60006301ffc9a760e01b6001600160e01b0319831614806102f157506380ac58cd60e01b6001600160e01b03198316145b8061030c5750635b5e139f60e01b6001600160e01b03198316145b92915050565b60606002805461032190610c87565b80601f016020809104026020016040519081016040528092919081815260200182805461034d90610c87565b801561039a5780601f1061036f5761010080835404028352916020019161039a565b820191906000526020600020905b81548152906001019060200180831161037d57829003601f168201915b5050505050905090565b60006103af82610802565b6103cc576040516333d1c03960e21b815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b60006103f382610651565b9050336001600160a01b0382161461042c5761040f8133610292565b61042c576040516367d9dca160e11b815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006104ab82610829565b9050836001600160a01b0316816001600160a01b0316146104de5760405162a1148160e81b815260040160405180910390fd5b60008281526006602052604090208054338082146001600160a01b0388169091141761052b5761050e8633610292565b61052b57604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b03851661055257604051633a954ecd60e21b815260040160405180910390fd5b801561055d57600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040902055600160e11b83166105e857600184016000818152600460205260409020546105e65760005481146105e65760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b61064c83838360405180602001604052806000815250610726565b505050565b600061030c82610829565b60006001600160a01b038216610685576040516323d3ad8160e21b815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b60606003805461032190610c87565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6107318484846104a0565b6001600160a01b0383163b1561076a5761074d8484848461088a565b61076a576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b606061077b82610802565b61079857604051630a14c4b560e41b815260040160405180910390fd5b60006107af60408051602081019091526000815290565b90508051600014156107d057604051806020016040528060008152506107fb565b806107da84610981565b6040516020016107eb929190610cc2565b6040516020818303038152906040525b9392505050565b600080548210801561030c575050600090815260046020526040902054600160e01b161590565b60008160005481101561087157600081815260046020526040902054600160e01b811661086f575b806107fb575060001901600081815260046020526040902054610851565b505b604051636f96cda160e11b815260040160405180910390fd5b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a02906108bf903390899088908890600401610cf1565b602060405180830381600087803b1580156108d957600080fd5b505af1925050508015610909575060408051601f3d908101601f1916820190925261090691810190610d2d565b60015b610964573d808015610937576040519150601f19603f3d011682016040523d82523d6000602084013e61093c565b606091505b50805161095c576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a9004806109b8576109bd565b61099b565b50819003601f19909101908152919050565b6001600160e01b0319811681146109e557600080fd5b50565b6000602082840312156109fa57600080fd5b81356107fb816109cf565b60005b83811015610a20578181015183820152602001610a08565b8381111561076a5750506000910152565b60008151808452610a49816020860160208601610a05565b601f01601f19169290920160200192915050565b6020815260006107fb6020830184610a31565b600060208284031215610a8257600080fd5b5035919050565b80356001600160a01b0381168114610aa057600080fd5b919050565b60008060408385031215610ab857600080fd5b610ac183610a89565b946020939093013593505050565b600080600060608486031215610ae457600080fd5b610aed84610a89565b9250610afb60208501610a89565b9150604084013590509250925092565b600060208284031215610b1d57600080fd5b6107fb82610a89565b60008060408385031215610b3957600080fd5b610b4283610a89565b915060208301358015158114610b5757600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610b8e57600080fd5b610b9785610a89565b9350610ba560208601610a89565b925060408501359150606085013567ffffffffffffffff80821115610bc957600080fd5b818701915087601f830112610bdd57600080fd5b813581811115610bef57610bef610b62565b604051601f8201601f19908116603f01168101908382118183101715610c1757610c17610b62565b816040528281528a6020848701011115610c3057600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610c6757600080fd5b610c7083610a89565b9150610c7e60208401610a89565b90509250929050565b600181811c90821680610c9b57607f821691505b60208210811415610cbc57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351610cd4818460208801610a05565b835190830190610ce8818360208801610a05565b01949350505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152610d236080830184610a31565b9695505050505050565b600060208284031215610d3f57600080fd5b81516107fb816109cf56fea164736f6c6343000809000a";

type ERC721AConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721A__factory extends ContractFactory {
  constructor(...args: ERC721AConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721A> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721A>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721A {
    return super.attach(address) as ERC721A;
  }
  override connect(signer: Signer): ERC721A__factory {
    return super.connect(signer) as ERC721A__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new utils.Interface(_abi) as ERC721AInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721A {
    return new Contract(address, _abi, signerOrProvider) as ERC721A;
  }
}
