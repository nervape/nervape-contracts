/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  Minter,
  MinterInterface,
} from "../../../contracts/Minter.sol/Minter";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "recipient_",
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
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "addrs",
        type: "address[]",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "apes",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "wlStartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "createGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "groupApes",
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
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isWhitelisted",
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
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ape",
        type: "address",
      },
    ],
    name: "mintable",
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
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "mintableApes",
    outputs: [
      {
        internalType: "address[]",
        name: "apes",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "mintableLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxMintable",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "minted",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "prices",
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
    inputs: [],
    name: "recipient",
    outputs: [
      {
        internalType: "address payable",
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
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "addrs",
        type: "address[]",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address payable",
        name: "recipient_",
        type: "address",
      },
    ],
    name: "setRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "startTimes",
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
    inputs: [],
    name: "totalGroup",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whiteAddressIndexes",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "whiteAddresses",
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
];

const _bytecode =
  "0x6080604052600060045534801561001557600080fd5b50604051611769380380611769833981016040819052610034916100b2565b61003d33610062565b600380546001600160a01b0319166001600160a01b03929092169190911790556100e2565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100c457600080fd5b81516001600160a01b03811681146100db57600080fd5b9392505050565b611678806100f16000396000f3fe6080604052600436106101445760003560e01c80636887a0e5116100c0578063ad0c2fa811610074578063d8e5408411610059578063d8e54084146103bb578063de34621f146103db578063f2fde38b1461041357600080fd5b8063ad0c2fa814610378578063bc31c1c11461038e57600080fd5b806376aed4f7116100a557806376aed4f7146102e55780637d22c35c146103055780638da5cb5b1461035a57600080fd5b80636887a0e514610298578063715018a6146102d057600080fd5b8063337d01271161011757806343c68d54116100fc57806343c68d541461023857806359441eae1461025857806366d003ac1461027857600080fd5b8063337d0127146101f85780633bbed4a01461021857600080fd5b80630c34f97e146101495780631b2ef1ca146101865780631d22240c1461019b578063225d49c4146101ca575b600080fd5b34801561015557600080fd5b50610169610164366004611293565b610433565b6040516001600160a01b0390911681526020015b60405180910390f35b610199610194366004611293565b61046b565b005b3480156101a757600080fd5b506101bb6101b63660046112b5565b610985565b60405161017d939291906112ce565b3480156101d657600080fd5b506101ea6101e5366004611293565b610add565b60405190815260200161017d565b34801561020457600080fd5b50610199610213366004611370565b610b02565b34801561022457600080fd5b506101996102333660046113d1565b610d01565b34801561024457600080fd5b50610199610253366004611370565b610d2b565b34801561026457600080fd5b506101ea6102733660046113d1565b610e2b565b34801561028457600080fd5b50600354610169906001600160a01b031681565b3480156102a457600080fd5b506101ea6102b33660046113f5565b600860209081526000928352604080842090915290825290205481565b3480156102dc57600080fd5b50610199610f1f565b3480156102f157600080fd5b50610169610300366004611293565b610f33565b34801561031157600080fd5b5061034a6103203660046113f5565b60009182526002602090815260408084206001600160a01b03939093168452919052902054151590565b604051901515815260200161017d565b34801561036657600080fd5b506000546001600160a01b0316610169565b34801561038457600080fd5b506101ea60045481565b34801561039a57600080fd5b506101ea6103a93660046112b5565b60066020526000908152604090205481565b3480156103c757600080fd5b506101996103d6366004611425565b610f4f565b3480156103e757600080fd5b506101ea6103f63660046113f5565b600260209081526000928352604080842090915290825290205481565b34801561041f57600080fd5b5061019961042e3660046113d1565b61106e565b6005602052816000526040600020818154811061044f57600080fd5b6000918252602090912001546001600160a01b03169150829050565b3332146104bf5760405162461bcd60e51b815260206004820152600860248201527f4f6e6c7920454f4100000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6000821180156104d157506004548211155b61051d5760405162461bcd60e51b815260206004820152601060248201527f496e76616c69642067726f75702069640000000000000000000000000000000060448201526064016104b6565b6000811161056d5760405162461bcd60e51b815260206004820152601160248201527f57726f6e67206d696e7420616d6f756e7400000000000000000000000000000060448201526064016104b6565b6000828152600860209081526040808320338452909152902054600590610595908390611495565b11156105e35760405162461bcd60e51b815260206004820152601860248201527f4578636565646564206d6178206d696e7420616d6f756e74000000000000000060448201526064016104b6565b600082815260026020908152604080832033845290915290205415610665576000828152600760205260409020544210156106605760405162461bcd60e51b815260206004820152600c60248201527f574c206e6f74207374617274000000000000000000000000000000000000000060448201526064016104b6565b6106c6565b6000828152600760205260409020600101544210156106c65760405162461bcd60e51b815260206004820152600960248201527f4e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104b6565b6000828152600660205260409020546106df90826114c3565b341461072d5760405162461bcd60e51b815260206004820152601360248201527f57726f6e67207061796d656e742076616c75650000000000000000000000000060448201526064016104b6565b600082815260086020908152604080832033845290915281208054839290610756908490611495565b90915550506003546000838152600660205260409020546001600160a01b03909116906108fc9061078790846114c3565b6040518115909202916000818181858888f193505050501580156107af573d6000803e3d6000fd5b5060008282326040516020016107ea93929190928352602083019190915260601b6bffffffffffffffffffffffff1916604082015260540190565b6040516020818303038152906040528051906020012060001c90506000610810826110fe565b905060005b8381101561097e57600080600061082b88610985565b9194509250905061083c84886114e2565b81101561088b5760405162461bcd60e51b815260206004820152600c60248201527f4e6f2061706573206c656674000000000000000000000000000000000000000060448201526064016104b6565b600060016108998682611495565b6108a49060086114c3565b6108af9060026115dd565b6108b991906114e2565b6108c4866001611495565b6108cf9060086114c3565b6108db906101006114e2565b87901c16905060006108ed84836115e9565b9050848181518110610901576109016114ad565b60209081029190910101516040516335313c2160e11b81523360048201526001600160a01b0390911690636a62784290602401600060405180830381600087803b15801561094e57600080fd5b505af1158015610962573d6000803e3d6000fd5b5050505085806109719061160b565b9650505050505050610815565b5050505050565b60008181526005602052604081205460609190819067ffffffffffffffff8111156109b2576109b2611626565b6040519080825280602002602001820160405280156109db578160200160208202803683370190505b50925060005b600085815260056020526040902054811015610ad55760008581526005602052604081208054610a36919084908110610a1c57610a1c6114ad565b6000918252602090912001546001600160a01b0316610e2b565b90508015610ac257610a488184611495565b600087815260056020526040902080549194509083908110610a6c57610a6c6114ad565b9060005260206000200160009054906101000a90046001600160a01b0316858581518110610a9c57610a9c6114ad565b6001600160a01b039092166020928302919091019091015283610abe8161160b565b9450505b81610acc8161160b565b925050506109e1565b509193909250565b60076020528160005260406000208160028110610af957600080fd5b01549150829050565b610b0a611143565b60005b81811015610cfb57610b4084848484818110610b2b57610b2b6114ad565b905060200201602081019061032091906113d1565b15610ce957600084815260026020526040812081858585818110610b6657610b666114ad565b9050602002016020810190610b7b91906113d1565b6001600160a01b031681526020808201929092526040908101600090812054888252600193849052918120805492945090929091610bb991906114e2565b81548110610bc957610bc96114ad565b60009182526020808320909101548883526001909152604090912080546001600160a01b039092169250829184908110610c0557610c056114ad565b600091825260208083209190910180546001600160a01b0319166001600160a01b039490941693909317909255878152600190915260409020805480610c4d57610c4d61163c565b60008281526020808220830160001990810180546001600160a01b0319169055909201909255878252600280825260408084206001600160a01b0386168552808452908420869055898452915290868686818110610cad57610cad6114ad565b9050602002016020810190610cc291906113d1565b6001600160a01b03166001600160a01b031681526020019081526020016000206000905550505b80610cf38161160b565b915050610b0d565b50505050565b610d09611143565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b610d33611143565b60005b81811015610cfb57610d5484848484818110610b2b57610b2b6114ad565b610e19576000848152600160205260409020838383818110610d7857610d786114ad565b9050602002016020810190610d8d91906113d1565b8154600180820184556000938452602080852090920180546001600160a01b0319166001600160a01b039490941693909317909255868352908152604080832054600290925282209091858585818110610de957610de96114ad565b9050602002016020810190610dfe91906113d1565b6001600160a01b031681526020810191909152604001600020555b80610e238161160b565b915050610d36565b6000816001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610e6657600080fd5b505afa158015610e7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9e9190611652565b826001600160a01b031663d5abeb016040518163ffffffff1660e01b815260040160206040518083038186803b158015610ed757600080fd5b505afa158015610eeb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0f9190611652565b610f1991906114e2565b92915050565b610f27611143565b610f31600061119d565b565b6001602052816000526040600020818154811061044f57600080fd5b610f57611143565b83610fa45760405162461bcd60e51b815260206004820152600760248201527f4e6f20617065730000000000000000000000000000000000000000000000000060448201526064016104b6565b808210610ff35760405162461bcd60e51b815260206004820152601c60248201527f496e76616c69642077686974656c6973742073746172742074696d650000000060448201526064016104b6565b6001600460008282546110069190611495565b909155505060045460009081526005602052604090206110279086866111ed565b50600480546000908152600660209081526040808320879055805180820182528681528083018690529354835260079091529020611066916002611250565b505050505050565b611076611143565b6001600160a01b0381166110f25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104b6565b6110fb8161119d565b50565b600061110b6001436114e2565b604080519140602083015242908201526060810183905260800160408051601f19818403018152919052805160209091012092915050565b6000546001600160a01b03163314610f315760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b6565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054828255906000526020600020908101928215611240579160200282015b828111156112405781546001600160a01b0319166001600160a01b0384351617825560209092019160019091019061120d565b5061124c92915061127e565b5090565b8260028101928215611240579160200282015b82811115611240578251825591602001919060010190611263565b5b8082111561124c576000815560010161127f565b600080604083850312156112a657600080fd5b50508035926020909101359150565b6000602082840312156112c757600080fd5b5035919050565b606080825284519082018190526000906020906080840190828801845b828110156113105781516001600160a01b0316845292840192908401906001016112eb565b505050908301949094525060400152919050565b60008083601f84011261133657600080fd5b50813567ffffffffffffffff81111561134e57600080fd5b6020830191508360208260051b850101111561136957600080fd5b9250929050565b60008060006040848603121561138557600080fd5b83359250602084013567ffffffffffffffff8111156113a357600080fd5b6113af86828701611324565b9497909650939450505050565b6001600160a01b03811681146110fb57600080fd5b6000602082840312156113e357600080fd5b81356113ee816113bc565b9392505050565b6000806040838503121561140857600080fd5b82359150602083013561141a816113bc565b809150509250929050565b60008060008060006080868803121561143d57600080fd5b853567ffffffffffffffff81111561145457600080fd5b61146088828901611324565b9099909850602088013597604081013597506060013595509350505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156114a8576114a861147f565b500190565b634e487b7160e01b600052603260045260246000fd5b60008160001904831182151516156114dd576114dd61147f565b500290565b6000828210156114f4576114f461147f565b500390565b600181815b8085111561153457816000190482111561151a5761151a61147f565b8085161561152757918102915b93841c93908002906114fe565b509250929050565b60008261154b57506001610f19565b8161155857506000610f19565b816001811461156e576002811461157857611594565b6001915050610f19565b60ff8411156115895761158961147f565b50506001821b610f19565b5060208310610133831016604e8410600b84101617156115b7575081810a610f19565b6115c183836114f9565b80600019048211156115d5576115d561147f565b029392505050565b60006113ee838361153c565b60008261160657634e487b7160e01b600052601260045260246000fd5b500690565b600060001982141561161f5761161f61147f565b5060010190565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b60006020828403121561166457600080fd5b505191905056fea164736f6c6343000809000a";

type MinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Minter__factory extends ContractFactory {
  constructor(...args: MinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    recipient_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Minter> {
    return super.deploy(recipient_, overrides || {}) as Promise<Minter>;
  }
  override getDeployTransaction(
    recipient_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(recipient_, overrides || {});
  }
  override attach(address: string): Minter {
    return super.attach(address) as Minter;
  }
  override connect(signer: Signer): Minter__factory {
    return super.connect(signer) as Minter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MinterInterface {
    return new utils.Interface(_abi) as MinterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Minter {
    return new Contract(address, _abi, signerOrProvider) as Minter;
  }
}