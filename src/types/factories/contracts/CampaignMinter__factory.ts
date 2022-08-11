/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../common";
import type {
  CampaignMinter,
  CampaignMinterInterface,
} from "../../contracts/CampaignMinter";
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
        name: "",
        type: "uint256",
      },
    ],
    name: "campaigns",
    outputs: [
      {
        internalType: "uint16",
        name: "sceneClassId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimStartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPerWallet",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
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
    inputs: [
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        internalType: "uint256[][]",
        name: "groupedTokenIds",
        type: "uint256[][]",
      },
    ],
    name: "claimMany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "characterClassIds",
        type: "uint16[]",
      },
      {
        internalType: "uint16",
        name: "sceneClassId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimStartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPerWallet",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "campaignId",
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
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "participated",
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
    inputs: [],
    name: "totalCampaign",
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
        name: "campaignId",
        type: "uint256",
      },
      {
        internalType: "uint16[]",
        name: "characterClassIds",
        type: "uint16[]",
      },
      {
        internalType: "uint16",
        name: "sceneClassId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimStartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPerWallet",
        type: "uint256",
      },
    ],
    name: "updateCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260006004553480156200001657600080fd5b5060405162001782380380620017828339810160408190526200003991620000ee565b620000443362000085565b600380546001600160a01b03199081166001600160a01b03938416179091556001805482169483169490941790935560028054909316911617905562000142565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620000eb57600080fd5b50565b6000806000606084860312156200010457600080fd5b83516200011181620000d5565b60208501519093506200012481620000d5565b60408501519092506200013781620000d5565b809150509250925092565b61163080620001526000396000f3fe6080604052600436106100f35760003560e01c8063715018a61161008a578063c746e37711610059578063c746e37714610338578063e3dfa94314610358578063e42e290d14610378578063f2fde38b1461038e57600080fd5b8063715018a6146102c55780638da5cb5b146102da5780639d38fd5c146102f8578063b1b666521461031857600080fd5b80634c447aea116100c65780634c447aea146102075780634d2e03a01461023f57806366d003ac1461025f5780636887a0e51461027f57600080fd5b8063141961bc146100f85780631b2ef1ca146101875780633a6bffd51461019c5780633bbed4a0146101e7575b600080fd5b34801561010457600080fd5b5061015061011336600461129b565b600560208190526000918252604090912060018101546002820154600383015460048401549484015460069094015461ffff909316949193909286565b6040805161ffff90971687526020870195909552938501929092526060840152608083015260a082015260c0015b60405180910390f35b61019a6101953660046112b4565b6103ae565b005b3480156101a857600080fd5b506101d76101b73660046112e6565b600660209081526000928352604080842090915290825290205460ff1681565b604051901515815260200161017e565b3480156101f357600080fd5b5061019a610202366004611327565b610756565b34801561021357600080fd5b50600254610227906001600160a01b031681565b6040516001600160a01b03909116815260200161017e565b34801561024b57600080fd5b50600154610227906001600160a01b031681565b34801561026b57600080fd5b50600354610227906001600160a01b031681565b34801561028b57600080fd5b506102b761029a36600461134b565b600760209081526000928352604080842090915290825290205481565b60405190815260200161017e565b3480156102d157600080fd5b5061019a6107e3565b3480156102e657600080fd5b506000546001600160a01b0316610227565b34801561030457600080fd5b5061019a6103133660046113c7565b6107f7565b34801561032457600080fd5b5061019a610333366004611453565b61095b565b34801561034457600080fd5b5061019a610353366004611453565b610ee3565b34801561036457600080fd5b5061019a61037336600461149f565b610f28565b34801561038457600080fd5b506102b760045481565b34801561039a57600080fd5b5061019a6103a9366004611327565b611092565b3332146103ed5760405162461bcd60e51b81526020600482015260086024820152674f6e6c7920454f4160c01b60448201526064015b60405180910390fd5b6000821180156103ff57506004548211155b61044b5760405162461bcd60e51b815260206004820152601360248201527f496e76616c69642063616d706169676e2069640000000000000000000000000060448201526064016103e4565b6000828152600560209081526040808320815181546101009481028201850190935260e081018381529093919284928491908401828280156104d457602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff168152602001906002019060208260010104928301926001038202915080841161049b5790505b5050509183525050600182015461ffff166020820152600282015460408201526003820154606082015260048201546080820152600582015460a08083019190915260069092015460c0909101528101519091504210156105775760405162461bcd60e51b815260206004820152601760248201527f4d696e74696e6720686173206e6f74207374617274656400000000000000000060448201526064016103e4565b60c081015160008481526007602090815260408083203384529091529020546105a1908490611537565b11156105ef5760405162461bcd60e51b815260206004820152601860248201527f4578636565646564206d6178206d696e7420616d6f756e74000000000000000060448201526064016103e4565b60408101516105fe908361154f565b341461064c5760405162461bcd60e51b815260206004820152601360248201527f57726f6e67207061796d656e742076616c75650000000000000000000000000060448201526064016103e4565b600083815260076020908152604080832033845290915281208054849290610675908490611537565b909155505060035460408201516001600160a01b03909116906108fc9061069c908561154f565b6040518115909202916000818181858888f193505050501580156106c4573d6000803e3d6000fd5b5060005b82811015610750576002546020830151604051639c20551360e01b815261ffff90911660048201523360248201526001600160a01b0390911690639c20551390604401600060405180830381600087803b15801561072557600080fd5b505af1158015610739573d6000803e3d6000fd5b5050505080806107489061156e565b9150506106c8565b50505050565b61075e611122565b6001600160a01b0381166107b45760405162461bcd60e51b815260206004820152600f60248201527f496e76616c69642061646472657373000000000000000000000000000000000060448201526064016103e4565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6107eb611122565b6107f5600061117c565b565b6107ff611122565b6004548911156108515760405162461bcd60e51b815260206004820152601360248201527f496e76616c69642063616d706169676e2069640000000000000000000000000060448201526064016103e4565b8284106108a05760405162461bcd60e51b815260206004820152601660248201527f496e76616c696420636c61696d20656e642074696d650000000000000000000060448201526064016103e4565b60008981526005602052604090206003015442106109005760405162461bcd60e51b815260206004820152601b60248201527f43616e6e6f74207570646174652061667465722073746172746564000000000060448201526064016103e4565b600454600090815260056020526040902061091c818a8a6111d9565b5060018101805461ffff191661ffff98909816979097179096556002860194909455600385019290925560048401556005830155600690910155505050565b3332146109955760405162461bcd60e51b81526020600482015260086024820152674f6e6c7920454f4160c01b60448201526064016103e4565b6000838152600560209081526040808320815181546101009481028201850190935260e08101838152909391928492849190840182828015610a1e57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116109e55790505b5050509183525050600182015461ffff166020820152600282015460408201526003820154606082015260048201546080820152600582015460a082015260069091015460c0909101528051519091508214610abc5760405162461bcd60e51b815260206004820152601560248201527f496e76616c696420746f6b656e73206c656e677468000000000000000000000060448201526064016103e4565b42816060015110610b0f5760405162461bcd60e51b815260206004820152601860248201527f43616d706169676e20686173206e6f742073746172746564000000000000000060448201526064016103e4565b42816080015111610b625760405162461bcd60e51b815260206004820152601260248201527f43616d706169676e2068617320656e646564000000000000000000000000000060448201526064016103e4565b60005b82811015610e6f57600082600001518281518110610b8557610b85611589565b60200260200101519050600660008261ffff1661ffff1681526020019081526020016000206000868685818110610bbe57610bbe611589565b602090810292909201358352508101919091526040016000205460ff1615610c285760405162461bcd60e51b815260206004820152601460248201527f416c72656164792070617274696369706174656400000000000000000000000060448201526064016103e4565b60015433906001600160a01b0316636352211e878786818110610c4d57610c4d611589565b905060200201356040518263ffffffff1660e01b8152600401610c7291815260200190565b60206040518083038186803b158015610c8a57600080fd5b505afa158015610c9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc2919061159f565b6001600160a01b031614610d185760405162461bcd60e51b815260206004820152600960248201527f4e6f74206f776e6572000000000000000000000000000000000000000000000060448201526064016103e4565b60015461ffff8216906001600160a01b0316634324aa21878786818110610d4157610d41611589565b905060200201356040518263ffffffff1660e01b8152600401610d6691815260200190565b60206040518083038186803b158015610d7e57600080fd5b505afa158015610d92573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db691906115bc565b61ffff1614610e075760405162461bcd60e51b815260206004820152601160248201527f496e76616c69642063686172616374657200000000000000000000000000000060448201526064016103e4565b61ffff81166000908152600660205260408120600191878786818110610e2f57610e2f611589565b90506020020135815260200190815260200160002060006101000a81548160ff021916908315150217905550508080610e679061156e565b915050610b65565b506002546020820151604051639c20551360e01b815261ffff90911660048201523360248201526001600160a01b0390911690639c20551390604401600060405180830381600087803b158015610ec557600080fd5b505af1158015610ed9573d6000803e3d6000fd5b5050505050505050565b60005b8181101561075057610f1684848484818110610f0457610f04611589565b905060200281019061033391906115d9565b80610f208161156e565b915050610ee6565b610f30611122565b86610f7d5760405162461bcd60e51b815260206004820152601a60248201527f496e76616c69642072656c61746564206368617261637465727300000000000060448201526064016103e4565b60008661ffff1611610fd15760405162461bcd60e51b815260206004820152600d60248201527f496e76616c6964207363656e650000000000000000000000000000000000000060448201526064016103e4565b8284106110205760405162461bcd60e51b815260206004820152601660248201527f496e76616c696420636c61696d20656e642074696d650000000000000000000060448201526064016103e4565b6001600460008282546110339190611537565b90915550506004546000908152600560205260409020611054818a8a6111d9565b5060018101805461ffff191661ffff989098169790971790965560028601949094556003850192909255600484015560058301556006909101555050565b61109a611122565b6001600160a01b0381166111165760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016103e4565b61111f8161117c565b50565b6000546001600160a01b031633146107f55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103e4565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b82805482825590600052602060002090600f016010900481019282156112765791602002820160005b8382111561124657833561ffff1683826101000a81548161ffff021916908361ffff1602179055509260200192600201602081600101049283019260010302611202565b80156112745782816101000a81549061ffff0219169055600201602081600101049283019260010302611246565b505b50611282929150611286565b5090565b5b808211156112825760008155600101611287565b6000602082840312156112ad57600080fd5b5035919050565b600080604083850312156112c757600080fd5b50508035926020909101359150565b61ffff8116811461111f57600080fd5b600080604083850312156112f957600080fd5b8235611304816112d6565b946020939093013593505050565b6001600160a01b038116811461111f57600080fd5b60006020828403121561133957600080fd5b813561134481611312565b9392505050565b6000806040838503121561135e57600080fd5b82359150602083013561137081611312565b809150509250929050565b60008083601f84011261138d57600080fd5b50813567ffffffffffffffff8111156113a557600080fd5b6020830191508360208260051b85010111156113c057600080fd5b9250929050565b60008060008060008060008060006101008a8c0312156113e657600080fd5b8935985060208a013567ffffffffffffffff81111561140457600080fd5b6114108c828d0161137b565b90995097505060408a0135611424816112d6565b989b979a5095986060810135976080820135975060a0820135965060c0820135955060e0909101359350915050565b60008060006040848603121561146857600080fd5b83359250602084013567ffffffffffffffff81111561148657600080fd5b6114928682870161137b565b9497909650939450505050565b60008060008060008060008060e0898b0312156114bb57600080fd5b883567ffffffffffffffff8111156114d257600080fd5b6114de8b828c0161137b565b90995097505060208901356114f2816112d6565b979a9699509697604081013597506060810135966080820135965060a0820135955060c0909101359350915050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561154a5761154a611521565b500190565b600081600019048311821515161561156957611569611521565b500290565b600060001982141561158257611582611521565b5060010190565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156115b157600080fd5b815161134481611312565b6000602082840312156115ce57600080fd5b8151611344816112d6565b6000808335601e198436030181126115f057600080fd5b83018035915067ffffffffffffffff82111561160b57600080fd5b6020019150600581901b36038213156113c057600080fdfea164736f6c6343000809000a";

type CampaignMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CampaignMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CampaignMinter__factory extends ContractFactory {
  constructor(...args: CampaignMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    character_: PromiseOrValue<string>,
    scene_: PromiseOrValue<string>,
    recipient_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CampaignMinter> {
    return super.deploy(
      character_,
      scene_,
      recipient_,
      overrides || {}
    ) as Promise<CampaignMinter>;
  }
  override getDeployTransaction(
    character_: PromiseOrValue<string>,
    scene_: PromiseOrValue<string>,
    recipient_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      character_,
      scene_,
      recipient_,
      overrides || {}
    );
  }
  override attach(address: string): CampaignMinter {
    return super.attach(address) as CampaignMinter;
  }
  override connect(signer: Signer): CampaignMinter__factory {
    return super.connect(signer) as CampaignMinter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CampaignMinterInterface {
    return new utils.Interface(_abi) as CampaignMinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CampaignMinter {
    return new Contract(address, _abi, signerOrProvider) as CampaignMinter;
  }
}
