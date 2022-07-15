/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../common";
import type { Factory, FactoryInterface } from "../../contracts/Factory";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ape",
        type: "address",
      },
    ],
    name: "ApeCreated",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allApes",
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
    name: "allApesLength",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "apes",
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
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxSupply_",
        type: "uint256",
      },
    ],
    name: "createApe",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6127b58061007e6000396000f3fe60806040523480156200001157600080fd5b5060043610620000875760003560e01c80638da5cb5b11620000625780638da5cb5b14620000f8578063d08f2130146200010a578063e85713d2146200011c578063f2fde38b146200013357600080fd5b806325383e96146200008c578063715018a614620000a55780637c4985ec14620000af575b600080fd5b620000a36200009d366004620005af565b6200014a565b005b620000a362000347565b620000db620000c03660046200066f565b6001602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6000546001600160a01b0316620000db565b600254604051908152602001620000ef565b620000db6200012d3660046200066f565b6200035f565b620000a36200014436600462000689565b6200038a565b6200015462000420565b600086866040516020016200016b929190620006e1565b60408051601f198184030181529181528151602092830120600081815260019093529120549091506001600160a01b031615620001ef5760405162461bcd60e51b815260206004820152600a60248201527f417065206578697374730000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60008188888888876040516200020590620004d9565b6200021595949392919062000742565b8190604051809103906000f590508015801562000236573d6000803e3d6000fd5b5060405163f2fde38b60e01b81526001600160a01b0386811660048301529192509082169063f2fde38b90602401600060405180830381600087803b1580156200027f57600080fd5b505af115801562000294573d6000803e3d6000fd5b505050600083815260016020818152604080842080546001600160a01b03881673ffffffffffffffffffffffffffffffffffffffff1991821681179092556002805495860181559095527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace9093018054909416831790935591519081527f093f29eef90b7c95d2f031a6e2f2454bbcb32ef73b7ff7b37cb3b37a48a610b592500160405180910390a15050505050505050565b6200035162000420565b6200035d60006200047c565b565b600281815481106200037057600080fd5b6000918252602090912001546001600160a01b0316905081565b6200039462000420565b6001600160a01b038116620004125760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401620001e6565b6200041d816200047c565b50565b6000546001600160a01b031633146200035d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401620001e6565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61200980620007a083390190565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200050f57600080fd5b813567ffffffffffffffff808211156200052d576200052d620004e7565b604051601f8301601f19908116603f01168101908282118183101715620005585762000558620004e7565b816040528381528660208588010111156200057257600080fd5b836020870160208301376000602085830101528094505050505092915050565b80356001600160a01b0381168114620005aa57600080fd5b919050565b60008060008060008060c08789031215620005c957600080fd5b863567ffffffffffffffff80821115620005e257600080fd5b620005f08a838b01620004fd565b975060208901359150808211156200060757600080fd5b620006158a838b01620004fd565b965060408901359150808211156200062c57600080fd5b506200063b89828a01620004fd565b9450506200064c6060880162000592565b92506200065c6080880162000592565b915060a087013590509295509295509295565b6000602082840312156200068257600080fd5b5035919050565b6000602082840312156200069c57600080fd5b620006a78262000592565b9392505050565b60005b83811015620006cb578181015183820152602001620006b1565b83811115620006db576000848401525b50505050565b60008351620006f5818460208801620006ae565b8351908301906200070b818360208801620006ae565b01949350505050565b600081518084526200072e816020860160208601620006ae565b601f01601f19169290920160200192915050565b60a0815260006200075760a083018862000714565b82810360208401526200076b818862000714565b9050828103604084015262000781818762000714565b6001600160a01b03959095166060840152505060800152939250505056fe60806040523480156200001157600080fd5b50604051620020093803806200200983398101604081905262000034916200028d565b8451859085906200004d9060009060208501906200011a565b508051620000639060019060208401906200011a565b505050620000806200007a620000c460201b60201c565b620000c8565b82516200009590600b9060208601906200011a565b50600c80546001600160a01b0319166001600160a01b039390931692909217909155600d555062000389915050565b3390565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000128906200034c565b90600052602060002090601f0160209004810192826200014c576000855562000197565b82601f106200016757805160ff191683800117855562000197565b8280016001018555821562000197579182015b82811115620001975782518255916020019190600101906200017a565b50620001a5929150620001a9565b5090565b5b80821115620001a55760008155600101620001aa565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001e857600080fd5b81516001600160401b0380821115620002055762000205620001c0565b604051601f8301601f19908116603f01168101908282118183101715620002305762000230620001c0565b816040528381526020925086838588010111156200024d57600080fd5b600091505b8382101562000271578582018301518183018401529082019062000252565b83821115620002835760008385830101525b9695505050505050565b600080600080600060a08688031215620002a657600080fd5b85516001600160401b0380821115620002be57600080fd5b620002cc89838a01620001d6565b96506020880151915080821115620002e357600080fd5b620002f189838a01620001d6565b955060408801519150808211156200030857600080fd5b506200031788828901620001d6565b606088015190945090506001600160a01b03811681146200033757600080fd5b80925050608086015190509295509295909350565b600181811c908216806200036157607f821691505b602082108114156200038357634e487b7160e01b600052602260045260246000fd5b50919050565b611c7080620003996000396000f3fe608060405234801561001057600080fd5b50600436106101985760003560e01c80636a627842116100e3578063b88d4fde1161008c578063e985e9c511610066578063e985e9c51461033a578063f2fde38b14610376578063fca3b5aa1461038957600080fd5b8063b88d4fde1461030b578063c87b56dd1461031e578063d5abeb011461033157600080fd5b80638da5cb5b116100bd5780638da5cb5b146102df57806395d89b41146102f0578063a22cb465146102f857600080fd5b80636a627842146102b157806370a08231146102c4578063715018a6146102d757600080fd5b806323b872dd116101455780634f6ccce71161011f5780634f6ccce71461027857806355f804b31461028b5780636352211e1461029e57600080fd5b806323b872dd1461023f5780632f745c591461025257806342842e0e1461026557600080fd5b8063081812fc11610176578063081812fc14610205578063095ea7b31461021857806318160ddd1461022d57600080fd5b806301ffc9a71461019d57806306fdde03146101c557806307546172146101da575b600080fd5b6101b06101ab3660046117d8565b61039c565b60405190151581526020015b60405180910390f35b6101cd6103c7565b6040516101bc919061184d565b600c546101ed906001600160a01b031681565b6040516001600160a01b0390911681526020016101bc565b6101ed610213366004611860565b610459565b61022b610226366004611895565b610480565b005b6008545b6040519081526020016101bc565b61022b61024d3660046118bf565b61059b565b610231610260366004611895565b610613565b61022b6102733660046118bf565b6106bb565b610231610286366004611860565b6106d6565b61022b610299366004611987565b61077a565b6101ed6102ac366004611860565b610799565b61022b6102bf3660046119d0565b6107fe565b6102316102d23660046119d0565b6108c0565b61022b61095a565b600a546001600160a01b03166101ed565b6101cd61096e565b61022b6103063660046119eb565b61097d565b61022b610319366004611a27565b610988565b6101cd61032c366004611860565b610a07565b610231600d5481565b6101b0610348366004611aa3565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61022b6103843660046119d0565b610a6e565b61022b6103973660046119d0565b610afb565b60006001600160e01b0319821663780e9d6360e01b14806103c157506103c182610b25565b92915050565b6060600080546103d690611ad6565b80601f016020809104026020016040519081016040528092919081815260200182805461040290611ad6565b801561044f5780601f106104245761010080835404028352916020019161044f565b820191906000526020600020905b81548152906001019060200180831161043257829003601f168201915b5050505050905090565b600061046482610b75565b506000908152600460205260409020546001600160a01b031690565b600061048b82610799565b9050806001600160a01b0316836001600160a01b031614156104fe5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061051a575061051a8133610348565b61058c5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016104f5565b6105968383610bd9565b505050565b6105a53382610c47565b6106085760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016104f5565b610596838383610cc6565b600061061e836108c0565b82106106925760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e647300000000000000000000000000000000000000000060648201526084016104f5565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61059683838360405180602001604052806000815250610988565b60006106e160085490565b82106107555760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e6473000000000000000000000000000000000000000060648201526084016104f5565b6008828154811061076857610768611b11565b90600052602060002001549050919050565b610782610e85565b805161079590600b906020840190611729565b5050565b6000818152600260205260408120546001600160a01b0316806103c15760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104f5565b600c546001600160a01b031633146108585760405162461bcd60e51b815260206004820152600a60248201527f4e6f74206d696e7465720000000000000000000000000000000000000000000060448201526064016104f5565b600d54600854106108ab5760405162461bcd60e51b815260206004820152601360248201527f4578636565646564206d617820737570706c790000000000000000000000000060448201526064016104f5565b6108bd816108b860085490565b610edf565b50565b60006001600160a01b03821661093e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016104f5565b506001600160a01b031660009081526003602052604090205490565b610962610e85565b61096c6000610ef9565b565b6060600180546103d690611ad6565b610795338383610f4b565b6109923383610c47565b6109f55760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016104f5565b610a018484848461101a565b50505050565b6060610a1282610b75565b6000610a1c611098565b90506000815111610a3c5760405180602001604052806000815250610a67565b80610a46846110a7565b604051602001610a57929190611b27565b6040516020818303038152906040525b9392505050565b610a76610e85565b6001600160a01b038116610af25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104f5565b6108bd81610ef9565b610b03610e85565b600c80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160e01b031982166380ac58cd60e01b1480610b5657506001600160e01b03198216635b5e139f60e01b145b806103c157506301ffc9a760e01b6001600160e01b03198316146103c1565b6000818152600260205260409020546001600160a01b03166108bd5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104f5565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610c0e82610799565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610c5383610799565b9050806001600160a01b0316846001600160a01b03161480610c9a57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610cbe5750836001600160a01b0316610cb384610459565b6001600160a01b0316145b949350505050565b826001600160a01b0316610cd982610799565b6001600160a01b031614610d555760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016104f5565b6001600160a01b038216610db75760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104f5565b610dc28383836111bd565b610dcd600082610bd9565b6001600160a01b0383166000908152600360205260408120805460019290610df6908490611b6c565b90915550506001600160a01b0382166000908152600360205260408120805460019290610e24908490611b83565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600a546001600160a01b0316331461096c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f5565b610795828260405180602001604052806000815250611275565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03161415610fad5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104f5565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611025848484610cc6565b611031848484846112f3565b610a015760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016104f5565b6060600b80546103d690611ad6565b6060816110cb5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156110f557806110df81611b9b565b91506110ee9050600a83611bcc565b91506110cf565b60008167ffffffffffffffff811115611110576111106118fb565b6040519080825280601f01601f19166020018201604052801561113a576020820181803683370190505b5090505b8415610cbe5761114f600183611b6c565b915061115c600a86611be0565b611167906030611b83565b60f81b81838151811061117c5761117c611b11565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506111b6600a86611bcc565b945061113e565b6001600160a01b0383166112185761121381600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b61123b565b816001600160a01b0316836001600160a01b03161461123b5761123b838261144b565b6001600160a01b03821661125257610596816114e8565b826001600160a01b0316826001600160a01b031614610596576105968282611597565b61127f83836115db565b61128c60008484846112f3565b6105965760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016104f5565b60006001600160a01b0384163b1561144057604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611337903390899088908890600401611bf4565b602060405180830381600087803b15801561135157600080fd5b505af1925050508015611381575060408051601f3d908101601f1916820190925261137e91810190611c30565b60015b611426573d8080156113af576040519150601f19603f3d011682016040523d82523d6000602084013e6113b4565b606091505b50805161141e5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016104f5565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cbe565b506001949350505050565b60006001611458846108c0565b6114629190611b6c565b6000838152600760205260409020549091508082146114b5576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906114fa90600190611b6c565b6000838152600960205260408120546008805493945090928490811061152257611522611b11565b90600052602060002001549050806008838154811061154357611543611b11565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061157b5761157b611c4d565b6001900381819060005260206000200160009055905550505050565b60006115a2836108c0565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160a01b0382166116315760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016104f5565b6000818152600260205260409020546001600160a01b0316156116965760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104f5565b6116a2600083836111bd565b6001600160a01b03821660009081526003602052604081208054600192906116cb908490611b83565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b82805461173590611ad6565b90600052602060002090601f016020900481019282611757576000855561179d565b82601f1061177057805160ff191683800117855561179d565b8280016001018555821561179d579182015b8281111561179d578251825591602001919060010190611782565b506117a99291506117ad565b5090565b5b808211156117a957600081556001016117ae565b6001600160e01b0319811681146108bd57600080fd5b6000602082840312156117ea57600080fd5b8135610a67816117c2565b60005b838110156118105781810151838201526020016117f8565b83811115610a015750506000910152565b600081518084526118398160208601602086016117f5565b601f01601f19169290920160200192915050565b602081526000610a676020830184611821565b60006020828403121561187257600080fd5b5035919050565b80356001600160a01b038116811461189057600080fd5b919050565b600080604083850312156118a857600080fd5b6118b183611879565b946020939093013593505050565b6000806000606084860312156118d457600080fd5b6118dd84611879565b92506118eb60208501611879565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561192c5761192c6118fb565b604051601f8501601f19908116603f01168101908282118183101715611954576119546118fb565b8160405280935085815286868601111561196d57600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561199957600080fd5b813567ffffffffffffffff8111156119b057600080fd5b8201601f810184136119c157600080fd5b610cbe84823560208401611911565b6000602082840312156119e257600080fd5b610a6782611879565b600080604083850312156119fe57600080fd5b611a0783611879565b915060208301358015158114611a1c57600080fd5b809150509250929050565b60008060008060808587031215611a3d57600080fd5b611a4685611879565b9350611a5460208601611879565b925060408501359150606085013567ffffffffffffffff811115611a7757600080fd5b8501601f81018713611a8857600080fd5b611a9787823560208401611911565b91505092959194509250565b60008060408385031215611ab657600080fd5b611abf83611879565b9150611acd60208401611879565b90509250929050565b600181811c90821680611aea57607f821691505b60208210811415611b0b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b60008351611b398184602088016117f5565b835190830190611b4d8183602088016117f5565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611b7e57611b7e611b56565b500390565b60008219821115611b9657611b96611b56565b500190565b6000600019821415611baf57611baf611b56565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611bdb57611bdb611bb6565b500490565b600082611bef57611bef611bb6565b500690565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611c266080830184611821565b9695505050505050565b600060208284031215611c4257600080fd5b8151610a67816117c2565b634e487b7160e01b600052603160045260246000fdfea164736f6c6343000809000aa164736f6c6343000809000a";

type FactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Factory__factory extends ContractFactory {
  constructor(...args: FactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Factory> {
    return super.deploy(overrides || {}) as Promise<Factory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Factory {
    return super.attach(address) as Factory;
  }
  override connect(signer: Signer): Factory__factory {
    return super.connect(signer) as Factory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FactoryInterface {
    return new utils.Interface(_abi) as FactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Factory {
    return new Contract(address, _abi, signerOrProvider) as Factory;
  }
}