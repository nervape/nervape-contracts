import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { Factory, Factory__factory, Minter, Minter__factory, Nervape, Nervape__factory } from "../../src/types";

function getDeployment(network: string, name?: string) {
  const deployment = require(`../deployments/${network}`);
  return name ? deployment[name] : deployment;
}

task("deploy:Nervape").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).deploy();
  await nervape.deployed();
  console.log("Nervape deployed to: ", nervape.address);
});

task("deploy:Factory").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const factory: Factory__factory = <Factory__factory>await ethers.getContractFactory("Factory");
  const contract: Factory = <Factory>await factory.connect(signers[0]).deploy();
  await contract.deployed();
  console.log("Ape Factory deployed to: ", contract.address);
});

task("deploy:Minter")
  .addParam("recipient", "payment recipient")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const minterFactory: Minter__factory = <Minter__factory>await ethers.getContractFactory("Minter");
    const minter: Minter = <Minter>await minterFactory.connect(signers[0]).deploy(taskArguments.recipient);
    await minter.deployed();
    console.log("Ape Minter deployed to: ", minter.address);
  });

task("deploy:Minter:createGroup")
  .addParam("group", "group index")
  .addParam("price", "ape mint price each")
  .addParam("wlstarttime", "whitelisted mint start time")
  .addParam("starttime", "normal mint start time")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const price = ethers.utils.parseEther(taskArguments.price);
    const groupIndex = parseInt(taskArguments.group);
    const group = getDeployment(network.name, "groups")[groupIndex];
    const apeAddresses = group.apes.map((a: any) => a && a.address);

    console.log("apes: ", group.apes);
    console.log("price: ", taskArguments.price);
    console.log("WL start time: ", taskArguments.wlstarttime);
    console.log("Start time: ", taskArguments.starttime);

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner = signers[0];
    const minterFactory: Minter__factory = <Minter__factory>await ethers.getContractFactory("Minter");
    const minter: Minter = <Minter>await minterFactory.connect(owner).attach(getDeployment(network.name, "Minter"));
    const tx = await minter.createGroup(apeAddresses, price, taskArguments.wlstarttime, taskArguments.starttime);
    const receipt = await tx.wait();
    console.log("receipt = ", receipt);
    console.log("Minter Group %d created", groupIndex + 1);
  });

task("deploy:Minter:mintableApes")
  .addParam("group", "group index")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const groupIndex = parseInt(taskArguments.group);
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner = signers[0];
    const minterFactory: Minter__factory = <Minter__factory>await ethers.getContractFactory("Minter");
    const minter: Minter = <Minter>await minterFactory.attach(getDeployment(network.name, "Minter"));
    const result = await minter.mintableApes(groupIndex);
    console.log("apes: ", result.apes);
    console.log("mintableLength: ", result.mintableLength.toNumber());
    console.log("maxMintable: ", result.maxMintable.toNumber());
  });

task("deploy:createApe")
  .addParam("name", "Ape NFT name")
  .addParam("symbol", "Ape NFT symbol")
  .addParam("uri", "Ape NFT baseURI")
  .addParam("owner", "APE NFT owner")
  .addParam("maxsupply", "APE max supply")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    console.log(taskArguments);
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const factory: Factory__factory = <Factory__factory>await ethers.getContractFactory("Factory");
    const contract: Factory = <Factory>await factory.connect(signers[0]).attach(getDeployment(network.name, "Factory"));

    const tx = await contract.createApe(
      taskArguments.name,
      taskArguments.symbol,
      taskArguments.uri,
      getDeployment(network.name, "Minter"),
      taskArguments.owner,
      taskArguments.maxsupply,
    );
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      console.log("receipt = ", receipt.events);
      const event = receipt.events?.find(e => e.event === "ApeCreated");
      console.log("Ape created to: ", event?.args?.ape);
    } else {
      console.log("transact failed");
    }
  });

task("deploy:test:send-tx").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  // const signers: SignerWithAddress[] = await ethers.getSigners();
  // const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  // const nervape: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(getAddress(network.name, "Nervape"));
  // const totalSupply = await nervape.totalSupply()
  // const tx = await nervape.mint(1, { value: ethers.utils.parseEther('100') })
  // const receipt = await tx.wait()
  // console.log("tx =  ", tx);
  // console.log("response =  ", receipt.events && receipt.events[0].topics);
  // console.log("totalSupply =  ", totalSupply.toNumber());
});
