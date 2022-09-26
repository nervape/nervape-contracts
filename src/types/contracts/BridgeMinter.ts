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

export interface BridgeMinterInterface extends utils.Interface {
  functions: {
    "character()": FunctionFragment;
    "item()": FunctionFragment;
    "mintMany(address,uint256[],uint256[],uint256[])": FunctionFragment;
    "operator()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "scene()": FunctionFragment;
    "setOperator(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "character"
      | "item"
      | "mintMany"
      | "operator"
      | "owner"
      | "renounceOwnership"
      | "scene"
      | "setOperator"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "character", values?: undefined): string;
  encodeFunctionData(functionFragment: "item", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mintMany",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(functionFragment: "operator", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "scene", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setOperator",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "character", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "item", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintMany", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "operator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "scene", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
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

export interface BridgeMinter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BridgeMinterInterface;

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

    item(overrides?: CallOverrides): Promise<[string]>;

    mintMany(
      to: PromiseOrValue<string>,
      characterIds: PromiseOrValue<BigNumberish>[],
      sceneIds: PromiseOrValue<BigNumberish>[],
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    operator(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    scene(overrides?: CallOverrides): Promise<[string]>;

    setOperator(
      operator_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  character(overrides?: CallOverrides): Promise<string>;

  item(overrides?: CallOverrides): Promise<string>;

  mintMany(
    to: PromiseOrValue<string>,
    characterIds: PromiseOrValue<BigNumberish>[],
    sceneIds: PromiseOrValue<BigNumberish>[],
    itemIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  operator(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  scene(overrides?: CallOverrides): Promise<string>;

  setOperator(
    operator_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    character(overrides?: CallOverrides): Promise<string>;

    item(overrides?: CallOverrides): Promise<string>;

    mintMany(
      to: PromiseOrValue<string>,
      characterIds: PromiseOrValue<BigNumberish>[],
      sceneIds: PromiseOrValue<BigNumberish>[],
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    operator(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    scene(overrides?: CallOverrides): Promise<string>;

    setOperator(
      operator_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
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
  };

  estimateGas: {
    character(overrides?: CallOverrides): Promise<BigNumber>;

    item(overrides?: CallOverrides): Promise<BigNumber>;

    mintMany(
      to: PromiseOrValue<string>,
      characterIds: PromiseOrValue<BigNumberish>[],
      sceneIds: PromiseOrValue<BigNumberish>[],
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    scene(overrides?: CallOverrides): Promise<BigNumber>;

    setOperator(
      operator_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    character(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    item(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintMany(
      to: PromiseOrValue<string>,
      characterIds: PromiseOrValue<BigNumberish>[],
      sceneIds: PromiseOrValue<BigNumberish>[],
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    operator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    scene(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setOperator(
      operator_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}