/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../common";
import type {
  BridgeMinter,
  BridgeMinterInterface,
} from "../../contracts/BridgeMinter";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "character_",
        type: "address",
      },
      {
        internalType: "address",
        name: "scene_",
        type: "address",
      },
      {
        internalType: "address",
        name: "item_",
        type: "address",
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
    inputs: [],
    name: "character",
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
    name: "item",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "characterIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "sceneIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "itemIds",
        type: "uint256[]",
      },
    ],
    name: "mintMany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "operator",
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
    inputs: [],
    name: "scene",
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
        name: "operator_",
        type: "address",
      },
    ],
    name: "setOperator",
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
  "0x608060405234801561001057600080fd5b5060405161087838038061087883398101604081905261002f916100e6565b6100383361007a565b600180546001600160a01b039485166001600160a01b031991821617909155600280549385169382169390931790925560038054919093169116179055610129565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146100e157600080fd5b919050565b6000806000606084860312156100fb57600080fd5b610104846100ca565b9250610112602085016100ca565b9150610120604085016100ca565b90509250925092565b610740806101386000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80638da5cb5b11610076578063c707ba261161005b578063c707ba261461012b578063f2a4a82e1461013e578063f2fde38b1461015157600080fd5b80638da5cb5b14610107578063b3ab15fb1461011857600080fd5b80634c447aea146100a85780634d2e03a0146100d7578063570ca735146100ea578063715018a6146100fd575b600080fd5b6002546100bb906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6001546100bb906001600160a01b031681565b6004546100bb906001600160a01b031681565b610105610164565b005b6000546001600160a01b03166100bb565b6101056101263660046105db565b610178565b610105610139366004610649565b6101af565b6003546100bb906001600160a01b031681565b61010561015f3660046105db565b610478565b61016c610508565b6101766000610562565b565b610180610508565b6004805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6004546001600160a01b0316331461020e5760405162461bcd60e51b815260206004820152600c60248201527f4e6f74206f70657261746f72000000000000000000000000000000000000000060448201526064015b60405180910390fd5b8415158061021b57508215155b8061022557508015155b6102715760405162461bcd60e51b815260206004820152600e60248201527f496e76616c696420706172616d730000000000000000000000000000000000006044820152606401610205565b60005b8581101561031a576001546001600160a01b0316638c2a993e898989858181106102a0576102a06106f4565b6040516001600160e01b031960e087901b1681526001600160a01b0390941660048501526020029190910135602483015250604401600060405180830381600087803b1580156102ef57600080fd5b505af1158015610303573d6000803e3d6000fd5b5050505080806103129061070a565b915050610274565b5060005b838110156103c4576002546001600160a01b0316638c2a993e8987878581811061034a5761034a6106f4565b6040516001600160e01b031960e087901b1681526001600160a01b0390941660048501526020029190910135602483015250604401600060405180830381600087803b15801561039957600080fd5b505af11580156103ad573d6000803e3d6000fd5b5050505080806103bc9061070a565b91505061031e565b5060005b8181101561046e576003546001600160a01b0316638c2a993e898585858181106103f4576103f46106f4565b6040516001600160e01b031960e087901b1681526001600160a01b0390941660048501526020029190910135602483015250604401600060405180830381600087803b15801561044357600080fd5b505af1158015610457573d6000803e3d6000fd5b5050505080806104669061070a565b9150506103c8565b5050505050505050565b610480610508565b6001600160a01b0381166104fc5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610205565b61050581610562565b50565b6000546001600160a01b031633146101765760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610205565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b03811681146105d657600080fd5b919050565b6000602082840312156105ed57600080fd5b6105f6826105bf565b9392505050565b60008083601f84011261060f57600080fd5b50813567ffffffffffffffff81111561062757600080fd5b6020830191508360208260051b850101111561064257600080fd5b9250929050565b60008060008060008060006080888a03121561066457600080fd5b61066d886105bf565b9650602088013567ffffffffffffffff8082111561068a57600080fd5b6106968b838c016105fd565b909850965060408a01359150808211156106af57600080fd5b6106bb8b838c016105fd565b909650945060608a01359150808211156106d457600080fd5b506106e18a828b016105fd565b989b979a50959850939692959293505050565b634e487b7160e01b600052603260045260246000fd5b600060001982141561072c57634e487b7160e01b600052601160045260246000fd5b506001019056fea164736f6c6343000809000a";

type BridgeMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeMinter__factory extends ContractFactory {
  constructor(...args: BridgeMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    character_: PromiseOrValue<string>,
    scene_: PromiseOrValue<string>,
    item_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BridgeMinter> {
    return super.deploy(
      character_,
      scene_,
      item_,
      overrides || {}
    ) as Promise<BridgeMinter>;
  }
  override getDeployTransaction(
    character_: PromiseOrValue<string>,
    scene_: PromiseOrValue<string>,
    item_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      character_,
      scene_,
      item_,
      overrides || {}
    );
  }
  override attach(address: string): BridgeMinter {
    return super.attach(address) as BridgeMinter;
  }
  override connect(signer: Signer): BridgeMinter__factory {
    return super.connect(signer) as BridgeMinter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeMinterInterface {
    return new utils.Interface(_abi) as BridgeMinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgeMinter {
    return new Contract(address, _abi, signerOrProvider) as BridgeMinter;
  }
}