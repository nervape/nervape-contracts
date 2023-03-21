import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { NervapeComposite, NervapeComposite__factory } from "../../src/types";
import { getDeployment } from "./helpers";

task("deploy:nacp").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nacapFactory = <NervapeComposite__factory>await ethers.getContractFactory("NervapeComposite");
  const ncap = <NervapeComposite>await nacapFactory.connect(signers[0]).deploy();
  await ncap.deployed();
  console.log("NervapeComposite deployed to: ", ncap.address);
});

task("deploy:setSigner").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nacapFactory = <NervapeComposite__factory>await ethers.getContractFactory("NervapeComposite");
  const ncap = <NervapeComposite>await nacapFactory.connect(signers[0]).attach(getDeployment(network.name, "NACP"));
  const tx = await ncap.setSigner(getDeployment(network.name, "Signer"));
  const receipt = await tx.wait();
  console.log("NervapeComposite setSigner = ", receipt.status);
});
