import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { Nervape, Nervape__factory } from "../../src/types";

task("deploy:Nervape").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).deploy();
  await nervape.deployed();
  console.log("Nervape deployed to: ", nervape.address);
});
