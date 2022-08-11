import { ethers, network } from "hardhat";

export const withIncreaseTime = async (seconds: number, callback: () => Promise<any>) => {
  await network.provider.send("evm_increaseTime", [seconds]);
  await network.provider.send("evm_mine");
  await callback();
  await network.provider.send("evm_increaseTime", [-seconds]);
  await network.provider.send("evm_mine");
};

export const getNow = async () => {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
};
