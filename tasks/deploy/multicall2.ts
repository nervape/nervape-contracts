import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { Multicall2, Multicall2__factory } from "../../src/types";

task("deploy:multicall2").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const mutlcall2Factory = <Multicall2__factory>await ethers.getContractFactory("Multicall2");
  const multicall2 = <Multicall2>await mutlcall2Factory.connect(signers[0]).deploy();
  await multicall2.deployed();
  console.log("Multicall2 deployed to: ", multicall2.address);
});
