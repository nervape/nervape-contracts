/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface CampaignMinterInterface extends utils.Interface {
  functions: {
    "campaigns(uint256)": FunctionFragment;
    "character()": FunctionFragment;
    "claim(uint256,uint256[])": FunctionFragment;
    "claimMany(uint256,uint256[][])": FunctionFragment;
    "createCampaign(uint16[],uint16,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "mint(uint256,uint256)": FunctionFragment;
    "minted(uint256,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "participated(uint16,uint256)": FunctionFragment;
    "recipient()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "scene()": FunctionFragment;
    "setRecipient(address)": FunctionFragment;
    "totalCampaign()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateCampaign(uint256,uint16[],uint16,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "campaigns"
      | "character"
      | "claim"
      | "claimMany"
      | "createCampaign"
      | "mint"
      | "minted"
      | "owner"
      | "participated"
      | "recipient"
      | "renounceOwnership"
      | "scene"
      | "setRecipient"
      | "totalCampaign"
      | "transferOwnership"
      | "updateCampaign"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "campaigns",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "character", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimMany",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "createCampaign",
    values: [
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "minted",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "participated",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "recipient", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "scene", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setRecipient",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalCampaign",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCampaign",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "campaigns", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "character", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimMany", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minted", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "participated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "recipient", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "scene", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCampaign",
    data: BytesLike
  ): Result;

  events: {
    "Claimed(address,uint256,uint256[],uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface ClaimedEventObject {
  sender: string;
  campaignId: BigNumber;
  tokenIds: BigNumber[];
  sceneId: BigNumber;
}
export type ClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber[], BigNumber],
  ClaimedEventObject
>;

export type ClaimedEventFilter = TypedEventFilter<ClaimedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface CampaignMinter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CampaignMinterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        sceneClassId: number;
        price: BigNumber;
        claimStartTime: BigNumber;
        claimEndTime: BigNumber;
        startTime: BigNumber;
        maxPerWallet: BigNumber;
      }
    >;

    character(overrides?: CallOverrides): Promise<[string]>;

    claim(
      campaignId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimMany(
      campaignId: PromiseOrValue<BigNumberish>,
      groupedTokenIds: PromiseOrValue<BigNumberish>[][],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCampaign(
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mint(
      campaignId: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    minted(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    participated(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    recipient(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    scene(overrides?: CallOverrides): Promise<[string]>;

    setRecipient(
      recipient_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalCampaign(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateCampaign(
      campaignId: PromiseOrValue<BigNumberish>,
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  campaigns(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      sceneClassId: number;
      price: BigNumber;
      claimStartTime: BigNumber;
      claimEndTime: BigNumber;
      startTime: BigNumber;
      maxPerWallet: BigNumber;
    }
  >;

  character(overrides?: CallOverrides): Promise<string>;

  claim(
    campaignId: PromiseOrValue<BigNumberish>,
    tokenIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimMany(
    campaignId: PromiseOrValue<BigNumberish>,
    groupedTokenIds: PromiseOrValue<BigNumberish>[][],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCampaign(
    characterClassIds: PromiseOrValue<BigNumberish>[],
    sceneClassId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    claimStartTime: PromiseOrValue<BigNumberish>,
    claimEndTime: PromiseOrValue<BigNumberish>,
    startTime: PromiseOrValue<BigNumberish>,
    maxPerWallet: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mint(
    campaignId: PromiseOrValue<BigNumberish>,
    count: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  minted(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  participated(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  recipient(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  scene(overrides?: CallOverrides): Promise<string>;

  setRecipient(
    recipient_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalCampaign(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateCampaign(
    campaignId: PromiseOrValue<BigNumberish>,
    characterClassIds: PromiseOrValue<BigNumberish>[],
    sceneClassId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    claimStartTime: PromiseOrValue<BigNumberish>,
    claimEndTime: PromiseOrValue<BigNumberish>,
    startTime: PromiseOrValue<BigNumberish>,
    maxPerWallet: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        sceneClassId: number;
        price: BigNumber;
        claimStartTime: BigNumber;
        claimEndTime: BigNumber;
        startTime: BigNumber;
        maxPerWallet: BigNumber;
      }
    >;

    character(overrides?: CallOverrides): Promise<string>;

    claim(
      campaignId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    claimMany(
      campaignId: PromiseOrValue<BigNumberish>,
      groupedTokenIds: PromiseOrValue<BigNumberish>[][],
      overrides?: CallOverrides
    ): Promise<void>;

    createCampaign(
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    mint(
      campaignId: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    minted(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    participated(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    recipient(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    scene(overrides?: CallOverrides): Promise<string>;

    setRecipient(
      recipient_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalCampaign(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateCampaign(
      campaignId: PromiseOrValue<BigNumberish>,
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Claimed(address,uint256,uint256[],uint256)"(
      sender?: PromiseOrValue<string> | null,
      campaignId?: null,
      tokenIds?: null,
      sceneId?: null
    ): ClaimedEventFilter;
    Claimed(
      sender?: PromiseOrValue<string> | null,
      campaignId?: null,
      tokenIds?: null,
      sceneId?: null
    ): ClaimedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    character(overrides?: CallOverrides): Promise<BigNumber>;

    claim(
      campaignId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimMany(
      campaignId: PromiseOrValue<BigNumberish>,
      groupedTokenIds: PromiseOrValue<BigNumberish>[][],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCampaign(
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mint(
      campaignId: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    minted(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    participated(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recipient(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    scene(overrides?: CallOverrides): Promise<BigNumber>;

    setRecipient(
      recipient_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalCampaign(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateCampaign(
      campaignId: PromiseOrValue<BigNumberish>,
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    character(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claim(
      campaignId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimMany(
      campaignId: PromiseOrValue<BigNumberish>,
      groupedTokenIds: PromiseOrValue<BigNumberish>[][],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCampaign(
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      campaignId: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    minted(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    participated(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    scene(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setRecipient(
      recipient_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalCampaign(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateCampaign(
      campaignId: PromiseOrValue<BigNumberish>,
      characterClassIds: PromiseOrValue<BigNumberish>[],
      sceneClassId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      claimStartTime: PromiseOrValue<BigNumberish>,
      claimEndTime: PromiseOrValue<BigNumberish>,
      startTime: PromiseOrValue<BigNumberish>,
      maxPerWallet: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
