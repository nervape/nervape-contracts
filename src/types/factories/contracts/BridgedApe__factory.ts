/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../common";
import type {
  BridgedApe,
  BridgedApeInterface,
} from "../../contracts/BridgedApe";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";

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
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        internalType: "address",
        name: "minter_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxSupply_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    stateMutability: "nonpayable",
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
    name: "maxSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
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
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "nonpayable",
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
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter_",
        type: "address",
      },
    ],
    name: "setMinter",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620020013803806200200183398101604081905262000034916200028d565b8451859085906200004d9060009060208501906200011a565b508051620000639060019060208401906200011a565b505050620000806200007a620000c460201b60201c565b620000c8565b82516200009590600b9060208601906200011a565b50600c80546001600160a01b0319166001600160a01b039390931692909217909155600d555062000389915050565b3390565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000128906200034c565b90600052602060002090601f0160209004810192826200014c576000855562000197565b82601f106200016757805160ff191683800117855562000197565b8280016001018555821562000197579182015b82811115620001975782518255916020019190600101906200017a565b50620001a5929150620001a9565b5090565b5b80821115620001a55760008155600101620001aa565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001e857600080fd5b81516001600160401b0380821115620002055762000205620001c0565b604051601f8301601f19908116603f01168101908282118183101715620002305762000230620001c0565b816040528381526020925086838588010111156200024d57600080fd5b600091505b8382101562000271578582018301518183018401529082019062000252565b83821115620002835760008385830101525b9695505050505050565b600080600080600060a08688031215620002a657600080fd5b85516001600160401b0380821115620002be57600080fd5b620002cc89838a01620001d6565b96506020880151915080821115620002e357600080fd5b620002f189838a01620001d6565b955060408801519150808211156200030857600080fd5b506200031788828901620001d6565b606088015190945090506001600160a01b03811681146200033757600080fd5b80925050608086015190509295509295909350565b600181811c908216806200036157607f821691505b602082108114156200038357634e487b7160e01b600052602260045260246000fd5b50919050565b611c6880620003996000396000f3fe608060405234801561001057600080fd5b50600436106101985760003560e01c80636352211e116100e3578063b88d4fde1161008c578063e985e9c511610066578063e985e9c51461033a578063f2fde38b14610376578063fca3b5aa1461038957600080fd5b8063b88d4fde1461030b578063c87b56dd1461031e578063d5abeb011461033157600080fd5b80638da5cb5b116100bd5780638da5cb5b146102df57806395d89b41146102f0578063a22cb465146102f857600080fd5b80636352211e146102b157806370a08231146102c4578063715018a6146102d757600080fd5b806323b872dd1161014557806342842e0e1161011f57806342842e0e146102785780634f6ccce71461028b57806355f804b31461029e57600080fd5b806323b872dd1461023f5780632f745c591461025257806340c10f191461026557600080fd5b8063081812fc11610176578063081812fc14610205578063095ea7b31461021857806318160ddd1461022d57600080fd5b806301ffc9a71461019d57806306fdde03146101c557806307546172146101da575b600080fd5b6101b06101ab3660046117d0565b61039c565b60405190151581526020015b60405180910390f35b6101cd6103c7565b6040516101bc9190611845565b600c546101ed906001600160a01b031681565b6040516001600160a01b0390911681526020016101bc565b6101ed610213366004611858565b610459565b61022b61022636600461188d565b610480565b005b6008545b6040519081526020016101bc565b61022b61024d3660046118b7565b61059b565b61023161026036600461188d565b610613565b61022b61027336600461188d565b6106bb565b61022b6102863660046118b7565b610776565b610231610299366004611858565b610791565b61022b6102ac36600461197f565b610835565b6101ed6102bf366004611858565b610850565b6102316102d23660046119c8565b6108b5565b61022b61094f565b600a546001600160a01b03166101ed565b6101cd610963565b61022b6103063660046119e3565b610972565b61022b610319366004611a1f565b61097d565b6101cd61032c366004611858565b6109fc565b610231600d5481565b6101b0610348366004611a9b565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61022b6103843660046119c8565b610a63565b61022b6103973660046119c8565b610af3565b60006001600160e01b0319821663780e9d6360e01b14806103c157506103c182610b1d565b92915050565b6060600080546103d690611ace565b80601f016020809104026020016040519081016040528092919081815260200182805461040290611ace565b801561044f5780601f106104245761010080835404028352916020019161044f565b820191906000526020600020905b81548152906001019060200180831161043257829003601f168201915b5050505050905090565b600061046482610b6d565b506000908152600460205260409020546001600160a01b031690565b600061048b82610850565b9050806001600160a01b0316836001600160a01b031614156104fe5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061051a575061051a8133610348565b61058c5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016104f5565b6105968383610bd1565b505050565b6105a53382610c3f565b6106085760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016104f5565b610596838383610cbe565b600061061e836108b5565b82106106925760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e647300000000000000000000000000000000000000000060648201526084016104f5565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b600c546001600160a01b031633146107155760405162461bcd60e51b815260206004820152600a60248201527f4e6f74206d696e7465720000000000000000000000000000000000000000000060448201526064016104f5565b600d54600854106107685760405162461bcd60e51b815260206004820152601360248201527f4578636565646564206d617820737570706c790000000000000000000000000060448201526064016104f5565b6107728282610e7d565b5050565b6105968383836040518060200160405280600081525061097d565b600061079c60085490565b82106108105760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e6473000000000000000000000000000000000000000060648201526084016104f5565b6008828154811061082357610823611b09565b90600052602060002001549050919050565b61083d610e97565b805161077290600b906020840190611721565b6000818152600260205260408120546001600160a01b0316806103c15760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104f5565b60006001600160a01b0382166109335760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016104f5565b506001600160a01b031660009081526003602052604090205490565b610957610e97565b6109616000610ef1565b565b6060600180546103d690611ace565b610772338383610f43565b6109873383610c3f565b6109ea5760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016104f5565b6109f684848484611012565b50505050565b6060610a0782610b6d565b6000610a11611090565b90506000815111610a315760405180602001604052806000815250610a5c565b80610a3b8461109f565b604051602001610a4c929190611b1f565b6040516020818303038152906040525b9392505050565b610a6b610e97565b6001600160a01b038116610ae75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104f5565b610af081610ef1565b50565b610afb610e97565b600c80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160e01b031982166380ac58cd60e01b1480610b4e57506001600160e01b03198216635b5e139f60e01b145b806103c157506301ffc9a760e01b6001600160e01b03198316146103c1565b6000818152600260205260409020546001600160a01b0316610af05760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104f5565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610c0682610850565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610c4b83610850565b9050806001600160a01b0316846001600160a01b03161480610c9257506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610cb65750836001600160a01b0316610cab84610459565b6001600160a01b0316145b949350505050565b826001600160a01b0316610cd182610850565b6001600160a01b031614610d4d5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016104f5565b6001600160a01b038216610daf5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104f5565b610dba8383836111b5565b610dc5600082610bd1565b6001600160a01b0383166000908152600360205260408120805460019290610dee908490611b64565b90915550506001600160a01b0382166000908152600360205260408120805460019290610e1c908490611b7b565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b61077282826040518060200160405280600081525061126d565b600a546001600160a01b031633146109615760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f5565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03161415610fa55760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104f5565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61101d848484610cbe565b611029848484846112eb565b6109f65760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016104f5565b6060600b80546103d690611ace565b6060816110c35750506040805180820190915260018152600360fc1b602082015290565b8160005b81156110ed57806110d781611b93565b91506110e69050600a83611bc4565b91506110c7565b60008167ffffffffffffffff811115611108576111086118f3565b6040519080825280601f01601f191660200182016040528015611132576020820181803683370190505b5090505b8415610cb657611147600183611b64565b9150611154600a86611bd8565b61115f906030611b7b565b60f81b81838151811061117457611174611b09565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506111ae600a86611bc4565b9450611136565b6001600160a01b0383166112105761120b81600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611233565b816001600160a01b0316836001600160a01b031614611233576112338382611443565b6001600160a01b03821661124a57610596816114e0565b826001600160a01b0316826001600160a01b03161461059657610596828261158f565b61127783836115d3565b61128460008484846112eb565b6105965760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016104f5565b60006001600160a01b0384163b1561143857604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061132f903390899088908890600401611bec565b602060405180830381600087803b15801561134957600080fd5b505af1925050508015611379575060408051601f3d908101601f1916820190925261137691810190611c28565b60015b61141e573d8080156113a7576040519150601f19603f3d011682016040523d82523d6000602084013e6113ac565b606091505b5080516114165760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016104f5565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cb6565b506001949350505050565b60006001611450846108b5565b61145a9190611b64565b6000838152600760205260409020549091508082146114ad576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906114f290600190611b64565b6000838152600960205260408120546008805493945090928490811061151a5761151a611b09565b90600052602060002001549050806008838154811061153b5761153b611b09565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061157357611573611c45565b6001900381819060005260206000200160009055905550505050565b600061159a836108b5565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160a01b0382166116295760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016104f5565b6000818152600260205260409020546001600160a01b03161561168e5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104f5565b61169a600083836111b5565b6001600160a01b03821660009081526003602052604081208054600192906116c3908490611b7b565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b82805461172d90611ace565b90600052602060002090601f01602090048101928261174f5760008555611795565b82601f1061176857805160ff1916838001178555611795565b82800160010185558215611795579182015b8281111561179557825182559160200191906001019061177a565b506117a19291506117a5565b5090565b5b808211156117a157600081556001016117a6565b6001600160e01b031981168114610af057600080fd5b6000602082840312156117e257600080fd5b8135610a5c816117ba565b60005b838110156118085781810151838201526020016117f0565b838111156109f65750506000910152565b600081518084526118318160208601602086016117ed565b601f01601f19169290920160200192915050565b602081526000610a5c6020830184611819565b60006020828403121561186a57600080fd5b5035919050565b80356001600160a01b038116811461188857600080fd5b919050565b600080604083850312156118a057600080fd5b6118a983611871565b946020939093013593505050565b6000806000606084860312156118cc57600080fd5b6118d584611871565b92506118e360208501611871565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611924576119246118f3565b604051601f8501601f19908116603f0116810190828211818310171561194c5761194c6118f3565b8160405280935085815286868601111561196557600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561199157600080fd5b813567ffffffffffffffff8111156119a857600080fd5b8201601f810184136119b957600080fd5b610cb684823560208401611909565b6000602082840312156119da57600080fd5b610a5c82611871565b600080604083850312156119f657600080fd5b6119ff83611871565b915060208301358015158114611a1457600080fd5b809150509250929050565b60008060008060808587031215611a3557600080fd5b611a3e85611871565b9350611a4c60208601611871565b925060408501359150606085013567ffffffffffffffff811115611a6f57600080fd5b8501601f81018713611a8057600080fd5b611a8f87823560208401611909565b91505092959194509250565b60008060408385031215611aae57600080fd5b611ab783611871565b9150611ac560208401611871565b90509250929050565b600181811c90821680611ae257607f821691505b60208210811415611b0357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b60008351611b318184602088016117ed565b835190830190611b458183602088016117ed565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611b7657611b76611b4e565b500390565b60008219821115611b8e57611b8e611b4e565b500190565b6000600019821415611ba757611ba7611b4e565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611bd357611bd3611bae565b500490565b600082611be757611be7611bae565b500690565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611c1e6080830184611819565b9695505050505050565b600060208284031215611c3a57600080fd5b8151610a5c816117ba565b634e487b7160e01b600052603160045260246000fdfea164736f6c6343000809000a";

type BridgedApeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgedApeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgedApe__factory extends ContractFactory {
  constructor(...args: BridgedApeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    uri_: PromiseOrValue<string>,
    minter_: PromiseOrValue<string>,
    maxSupply_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BridgedApe> {
    return super.deploy(
      name_,
      symbol_,
      uri_,
      minter_,
      maxSupply_,
      overrides || {}
    ) as Promise<BridgedApe>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    uri_: PromiseOrValue<string>,
    minter_: PromiseOrValue<string>,
    maxSupply_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      uri_,
      minter_,
      maxSupply_,
      overrides || {}
    );
  }
  override attach(address: string): BridgedApe {
    return super.attach(address) as BridgedApe;
  }
  override connect(signer: Signer): BridgedApe__factory {
    return super.connect(signer) as BridgedApe__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgedApeInterface {
    return new utils.Interface(_abi) as BridgedApeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgedApe {
    return new Contract(address, _abi, signerOrProvider) as BridgedApe;
  }
}
