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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface StoryVotingInterface extends utils.Interface {
  functions: {
    "character()": FunctionFragment;
    "createProposal(uint16[],uint16[],uint256,uint256,uint8)": FunctionFragment;
    "finalize(uint256)": FunctionFragment;
    "getAllVotes(uint256)": FunctionFragment;
    "getProposal(uint256)": FunctionFragment;
    "getUserVotesLength(uint256,address)": FunctionFragment;
    "getVotes(uint256,uint8)": FunctionFragment;
    "owner()": FunctionFragment;
    "proposals(uint256)": FunctionFragment;
    "redeem(uint256,uint256,uint256)": FunctionFragment;
    "redeemAll(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "stateOf(uint256)": FunctionFragment;
    "totalProposal()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "userVotes(uint256,address,uint256)": FunctionFragment;
    "vote(uint256,uint256[],uint8)": FunctionFragment;
    "votes(uint256,uint8)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "character"
      | "createProposal"
      | "finalize"
      | "getAllVotes"
      | "getProposal"
      | "getUserVotesLength"
      | "getVotes"
      | "owner"
      | "proposals"
      | "redeem"
      | "redeemAll"
      | "renounceOwnership"
      | "stateOf"
      | "totalProposal"
      | "transferOwnership"
      | "userVotes"
      | "vote"
      | "votes"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "character", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "createProposal",
    values: [
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "finalize",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllVotes",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserVotesLength",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVotes",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposals",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemAll",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stateOf",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalProposal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "userVotes",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "votes",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "character", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "finalize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserVotesLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVotes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeemAll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stateOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userVotes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Voted(address,uint256,uint256[],uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Voted"): EventFragment;
}

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

export interface VotedEventObject {
  sender: string;
  proposalId: BigNumber;
  tokenIds: BigNumber[];
  support: number;
}
export type VotedEvent = TypedEvent<
  [string, BigNumber, BigNumber[], number],
  VotedEventObject
>;

export type VotedEventFilter = TypedEventFilter<VotedEvent>;

export interface StoryVoting extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StoryVotingInterface;

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
    character(overrides?: CallOverrides): Promise<[string]>;

    createProposal(
      classIds: PromiseOrValue<BigNumberish>[],
      newClassIds: PromiseOrValue<BigNumberish>[],
      startTime: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      choices: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    finalize(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { allVotes: BigNumber[] }>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number[], number[], BigNumber, BigNumber, number, number, number] & {
        classIds: number[];
        newClassIds: number[];
        startTime: BigNumber;
        endTime: BigNumber;
        choices: number;
        finalizedChoice: number;
        state: number;
      }
    >;

    getUserVotesLength(
      proposalId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      support: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, number, boolean, boolean, BigNumber, BigNumber] & {
        choices: number;
        finalizedChoice: number;
        canceled: boolean;
        finalized: boolean;
        startTime: BigNumber;
        endTime: BigNumber;
      }
    >;

    redeem(
      proposalId: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    redeemAll(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stateOf(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    totalProposal(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    userVotes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, number, boolean] & {
        tokenId: BigNumber;
        timestamp: BigNumber;
        support: number;
        redeemed: boolean;
      }
    >;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      support: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  character(overrides?: CallOverrides): Promise<string>;

  createProposal(
    classIds: PromiseOrValue<BigNumberish>[],
    newClassIds: PromiseOrValue<BigNumberish>[],
    startTime: PromiseOrValue<BigNumberish>,
    endTime: PromiseOrValue<BigNumberish>,
    choices: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  finalize(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllVotes(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getProposal(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number[], number[], BigNumber, BigNumber, number, number, number] & {
      classIds: number[];
      newClassIds: number[];
      startTime: BigNumber;
      endTime: BigNumber;
      choices: number;
      finalizedChoice: number;
      state: number;
    }
  >;

  getUserVotesLength(
    proposalId: PromiseOrValue<BigNumberish>,
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVotes(
    proposalId: PromiseOrValue<BigNumberish>,
    support: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  proposals(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, number, boolean, boolean, BigNumber, BigNumber] & {
      choices: number;
      finalizedChoice: number;
      canceled: boolean;
      finalized: boolean;
      startTime: BigNumber;
      endTime: BigNumber;
    }
  >;

  redeem(
    proposalId: PromiseOrValue<BigNumberish>,
    start: PromiseOrValue<BigNumberish>,
    end: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  redeemAll(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stateOf(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  totalProposal(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  userVotes(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, number, boolean] & {
      tokenId: BigNumber;
      timestamp: BigNumber;
      support: number;
      redeemed: boolean;
    }
  >;

  vote(
    proposalId: PromiseOrValue<BigNumberish>,
    tokenIds: PromiseOrValue<BigNumberish>[],
    support: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  votes(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    character(overrides?: CallOverrides): Promise<string>;

    createProposal(
      classIds: PromiseOrValue<BigNumberish>[],
      newClassIds: PromiseOrValue<BigNumberish>[],
      startTime: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      choices: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    finalize(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number[], number[], BigNumber, BigNumber, number, number, number] & {
        classIds: number[];
        newClassIds: number[];
        startTime: BigNumber;
        endTime: BigNumber;
        choices: number;
        finalizedChoice: number;
        state: number;
      }
    >;

    getUserVotesLength(
      proposalId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      support: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, number, boolean, boolean, BigNumber, BigNumber] & {
        choices: number;
        finalizedChoice: number;
        canceled: boolean;
        finalized: boolean;
        startTime: BigNumber;
        endTime: BigNumber;
      }
    >;

    redeem(
      proposalId: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    redeemAll(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    stateOf(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    totalProposal(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    userVotes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, number, boolean] & {
        tokenId: BigNumber;
        timestamp: BigNumber;
        support: number;
        redeemed: boolean;
      }
    >;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      support: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Voted(address,uint256,uint256[],uint8)"(
      sender?: PromiseOrValue<string> | null,
      proposalId?: null,
      tokenIds?: null,
      support?: null
    ): VotedEventFilter;
    Voted(
      sender?: PromiseOrValue<string> | null,
      proposalId?: null,
      tokenIds?: null,
      support?: null
    ): VotedEventFilter;
  };

  estimateGas: {
    character(overrides?: CallOverrides): Promise<BigNumber>;

    createProposal(
      classIds: PromiseOrValue<BigNumberish>[],
      newClassIds: PromiseOrValue<BigNumberish>[],
      startTime: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      choices: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    finalize(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserVotesLength(
      proposalId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      support: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeem(
      proposalId: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    redeemAll(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stateOf(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalProposal(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    userVotes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      support: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    character(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createProposal(
      classIds: PromiseOrValue<BigNumberish>[],
      newClassIds: PromiseOrValue<BigNumberish>[],
      startTime: PromiseOrValue<BigNumberish>,
      endTime: PromiseOrValue<BigNumberish>,
      choices: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    finalize(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserVotesLength(
      proposalId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVotes(
      proposalId: PromiseOrValue<BigNumberish>,
      support: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    redeem(
      proposalId: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    redeemAll(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stateOf(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalProposal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    userVotes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      tokenIds: PromiseOrValue<BigNumberish>[],
      support: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
