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

export interface NervapeFactoryInterface extends utils.Interface {
  functions: {
    "allCollections(uint256)": FunctionFragment;
    "allCollectionsLength()": FunctionFragment;
    "collections(bytes32)": FunctionFragment;
    "createCollection(string,string,string,address,address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allCollections"
      | "allCollectionsLength"
      | "collections"
      | "createCollection"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allCollections",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "allCollectionsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collections",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "allCollections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allCollectionsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "CollectionCreated(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollectionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface CollectionCreatedEventObject {
  collection: string;
}
export type CollectionCreatedEvent = TypedEvent<
  [string],
  CollectionCreatedEventObject
>;

export type CollectionCreatedEventFilter =
  TypedEventFilter<CollectionCreatedEvent>;

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

export interface NervapeFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NervapeFactoryInterface;

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
    allCollections(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    allCollectionsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    collections(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    createCollection(
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      uri_: PromiseOrValue<string>,
      minter_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      maxSupply_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  allCollections(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  allCollectionsLength(overrides?: CallOverrides): Promise<BigNumber>;

  collections(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  createCollection(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    uri_: PromiseOrValue<string>,
    minter_: PromiseOrValue<string>,
    owner_: PromiseOrValue<string>,
    maxSupply_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allCollections(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    allCollectionsLength(overrides?: CallOverrides): Promise<BigNumber>;

    collections(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    createCollection(
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      uri_: PromiseOrValue<string>,
      minter_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      maxSupply_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CollectionCreated(address)"(
      collection?: null
    ): CollectionCreatedEventFilter;
    CollectionCreated(collection?: null): CollectionCreatedEventFilter;

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
    allCollections(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allCollectionsLength(overrides?: CallOverrides): Promise<BigNumber>;

    collections(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createCollection(
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      uri_: PromiseOrValue<string>,
      minter_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      maxSupply_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allCollections(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allCollectionsLength(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collections(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createCollection(
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      uri_: PromiseOrValue<string>,
      minter_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      maxSupply_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}