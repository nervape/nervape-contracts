import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type {
  BridgeMinter,
  BridgeMinter__factory,
  CampaignMinter,
  CampaignMinter__factory,
  GroupMinter,
  GroupMinter__factory,
  Nervape,
  Nervape__factory,
  StoryVoting,
  StoryVoting__factory,
} from "../../src/types";

function getDeployment(network: string, name?: string) {
  const deployment = require(`../deployments/${network}`);
  return name ? deployment[name] : deployment;
}

task("init").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  await signers[0].sendTransaction({
    to: "0xcB8E18CB278e9274895530461dCe2A35834a120E",
    value: ethers.utils.parseEther("1000"),
  });
});

task("calcGas").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  // const signers: SignerWithAddress[] = await ethers.getSigners();
  const wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY as string, ethers.provider);
  const minterFactory: BridgeMinter__factory = <BridgeMinter__factory>await ethers.getContractFactory("BridgeMinter");
  const minter: BridgeMinter = <BridgeMinter>(
    await minterFactory.connect(wallet).attach(getDeployment(network.name, "BridgeMinter"))
  );

  const characterIds = [170001, 170002, 170003];
  const sceneIds = [10001, 10002, 10003];
  const itemIds = [10001, 10002, 10003];
  const gasLimit = await minter.estimateGas.mintMany(
    "0xf7D749AB1d0D27ceB04C093a9A1dEDEF7FB82F6a",
    characterIds,
    sceneIds,
    itemIds,
  );

  console.log("gasLimit=", gasLimit.toNumber());
});

task("display").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const character: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).attach("0x4493Fb86e0eb855e7641cA540f2Ac575cF8Bfe40")
  );

  const supply = await character.bridge();

  console.log(supply);
});
