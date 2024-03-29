import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

export function getDeployment(network: string, name?: string) {
  const deployment = require(`../deployments/${network}`);
  return name ? deployment[name] : deployment;
}

task("transfer")
  .addParam("to", "address to send")
  .addParam("amount", "amount to send")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    await signers[0].sendTransaction({
      to: taskArguments.to,
      value: ethers.utils.parseEther(taskArguments.amount),
    });
  });
