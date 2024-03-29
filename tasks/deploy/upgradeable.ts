import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import {
  BridgeMinter,
  BridgeMinter__factory,
  Nervape,
  Nervape__factory,
  ProxyAdmin,
  ProxyAdmin__factory,
  TransparentUpgradeableProxy,
  TransparentUpgradeableProxy__factory,
} from "../../src/types";

function getDeployment(network: string, name?: string) {
  const deployment = require(`../deployments/${network}`);
  return name ? deployment[name] : deployment;
}

task("deploy:proxyAdmin").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const proxyAdminFactory = <ProxyAdmin__factory>await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = <ProxyAdmin>await proxyAdminFactory.connect(signers[0]).deploy();
  await proxyAdmin.deployed();
  console.log("ProxyAdmin deployed to: ", proxyAdmin.address);
});

task("deploy:nervape").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).deploy();
  await nervape.deployed();
  console.log("Nervape NFT deployed to: ", nervape.address);
});

task("deploy:bridgeMinter").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const bridgeMinterFactory = <BridgeMinter__factory>await ethers.getContractFactory("BridgeMinter");
  const minter = <BridgeMinter>(
    await bridgeMinterFactory
      .connect(signers[0])
      .deploy(
        getDeployment(network.name, "CharacterProxy"),
        getDeployment(network.name, "SceneProxy"),
        getDeployment(network.name, "ItemProxy"),
        getDeployment(network.name, "SpecialProxy"),
      )
  );
  await minter.deployed();
  console.log("BridgeMinter deployed to ", minter.address);

  const tx = await minter.setOperator(getDeployment(network.name, "BridgeMinterOperator"));
  const receipt = await tx.wait();
  console.log("setOperator = ", receipt.status);
});

task("deploy:characterProxy").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const proxyFactory = <TransparentUpgradeableProxy__factory>(
    await ethers.getContractFactory("TransparentUpgradeableProxy")
  );

  const iface = Nervape__factory.createInterface();

  const data = iface.encodeFunctionData("initialize", ["Nervape Character", "NAC", 1]);

  const logic = getDeployment(network.name, "Nervape");
  const admin = getDeployment(network.name, "ProxyAdmin");

  const proxy = <TransparentUpgradeableProxy>await proxyFactory.connect(signers[0]).deploy(logic, admin, data);
  await proxy.deployed();
  console.log("CharacterProxy deployed to: ", proxy.address);
});

task("deploy:sceneProxy").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const proxyFactory = <TransparentUpgradeableProxy__factory>(
    await ethers.getContractFactory("TransparentUpgradeableProxy")
  );

  const iface = Nervape__factory.createInterface();
  // Nervape Scene, NAS
  const data = iface.encodeFunctionData("initialize", ["Nervape Scene", "NAS", 4]);

  const logic = getDeployment(network.name, "Nervape");
  const admin = getDeployment(network.name, "ProxyAdmin");

  const proxy = <TransparentUpgradeableProxy>await proxyFactory.connect(signers[0]).deploy(logic, admin, data);
  await proxy.deployed();
  console.log("SceneProxy deployed to: ", proxy.address);
});

task("deploy:itemProxy").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const proxyFactory = <TransparentUpgradeableProxy__factory>(
    await ethers.getContractFactory("TransparentUpgradeableProxy")
  );

  const iface = Nervape__factory.createInterface();
  const data = iface.encodeFunctionData("initialize", ["Nervape Item", "NAI", 3]);

  const logic = getDeployment(network.name, "Nervape");
  const admin = getDeployment(network.name, "ProxyAdmin");

  const proxy = <TransparentUpgradeableProxy>await proxyFactory.connect(signers[0]).deploy(logic, admin, data);
  await proxy.deployed();
  console.log("ItemProxy deployed to: ", proxy.address);
});

task("deploy:specialProxy").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const proxyFactory = <TransparentUpgradeableProxy__factory>(
    await ethers.getContractFactory("TransparentUpgradeableProxy")
  );

  const iface = Nervape__factory.createInterface();
  const data = iface.encodeFunctionData("initialize", ["Nervape Special", "NASP", 9]);

  const logic = getDeployment(network.name, "Nervape");
  const admin = getDeployment(network.name, "ProxyAdmin");

  const proxy = <TransparentUpgradeableProxy>await proxyFactory.connect(signers[0]).deploy(logic, admin, data);
  await proxy.deployed();
  console.log("SpecialProxy deployed to: ", proxy.address);
});

task("deploy:addCharacterClasses").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const character = getDeployment(network.name, "CharacterProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(character);
  for (let id = 1; id <= 7; id++) {
    await nervape.addNewClass(256, 0);
    console.log("add bridge class: ", id);
  }

  console.log("baseURI = ", await nervape.baseURI());
  const tx = await nervape.setBaseURI("https://api.nervape.com/metadata/character/");
  const receipt = await tx.wait();
  console.log("setBaseURI = ", receipt.status);
});

task("deploy:addSceneClasses").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const scene = getDeployment(network.name, "SceneProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(scene);

  await nervape.addNewClass(256, 0); // Groovy Party
  await nervape.addNewClass(128, 0); // Story 001

  const tx = await nervape.setBaseURI("https://api.nervape.com/metadata/scene/");
  const receipt = await tx.wait();
  console.log("setBaseURI = ", receipt.status);
  console.log("baseURI = ", await nervape.baseURI());
});

task("deploy:addItemClasses").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const item = getDeployment(network.name, "ItemProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(item);
  for (let id = 1; id <= 2; id++) {
    await nervape.addNewClass(256, 0);
    console.log("add bridge class: ", id);
  }

  const tx = await nervape.setBaseURI("https://api.nervape.com/metadata/item/");
  const receipt = await tx.wait();
  console.log("setBaseURI = ", receipt.status);
  console.log("baseURI = ", await nervape.baseURI());
});

task("deploy:addSpecialClasses").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const special = getDeployment(network.name, "SpecialProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(special);
  await nervape.addNewClass(10, 0);
});

task("deploy:getCharacter").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const character = getDeployment(network.name, "CharacterProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(character);
  const name = await nervape.name();
  const symbol = await nervape.symbol();
  const baseURI = await nervape.baseURI();

  console.log("name = ", name);
  console.log("symbol = ", symbol);
  console.log("baseURI = ", baseURI);
});

task("deploy:setConfig").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");

  const character = <Nervape>(
    await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "CharacterProxy"))
  );

  let tx = await character.setBridge(getDeployment(network.name, "BridgeMinter"));
  let receipt = await tx.wait();
  console.log("Character setBridge = ", receipt.status);

  const item = <Nervape>await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "ItemProxy"));
  tx = await item.setBridge(getDeployment(network.name, "BridgeMinter"));
  receipt = await tx.wait();
  console.log("Item setBridge = ", receipt.status);

  const scene = <Nervape>await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "SceneProxy"));
  tx = await scene.setBridge(getDeployment(network.name, "BridgeMinter"));
  receipt = await tx.wait();
  console.log("Scene setBridge = ", receipt.status);

  const special = <Nervape>await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "SpecialProxy"));
  tx = await special.setBridge(getDeployment(network.name, "BridgeMinter"));
  receipt = await tx.wait();
  console.log("Special setBridge = ", receipt.status);

  console.log("Character Bridge = ", await character.bridge());
  console.log("Item Bridge = ", await item.bridge());
  console.log("Scene Bridge = ", await scene.bridge());
  console.log("Special Bridge = ", await special.bridge());
});

task("deploy:setBridgeConfig").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const bridgeMinterFactory = <BridgeMinter__factory>await ethers.getContractFactory("BridgeMinter");
  const bridgeMinter = getDeployment(network.name, "BridgeMinter");
  const minter = <BridgeMinter>await bridgeMinterFactory.connect(signers[0]).attach(bridgeMinter);
  const tx = await minter.setOperator(getDeployment(network.name, "BridgeMinterOperator"));
  const receipt = await tx.wait();
  console.log("setOperator = ", receipt.status);
});

task("deploy:mintSpecial").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const special = <Nervape>await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "SpecialProxy"));
  const lastClassId = await special.lastClassId();
  const winnerAddrs = [
    "0x5C30755fb63e910200016A9be44652F20B8d0164",
    "0xA326889A8938EB49FCfF4ca288D931e2b04fF625",
    "0xDb1e5634fca44EcD4d1c459E1eEf9E162Bfa11B0",
    "0x0D0Ee8453A0dD6BEd0208E0651D290F51fD1eA4c",
    "0x2799c776e4A58693e85f9ad8ddA432e7b0e09866",
    "0xcB46E951551E5046630F5BA49eD55f71EA28A179",
    "0x327b0c7EdB1efFD6d1325DA8d9f2ce92d633C840",
    "0x7846e738f5509A23de53820FEa3031EBe4deF351",
    "0x481f16167E1AE237593dD7AC80912d130E4235C8",
    "0xe568C0DDfad18FD631E1Ee155373e2D02DB6723f",
  ];
  for (let addr of winnerAddrs) {
    const tx = await special.mint(2, addr);
    const receipt = await tx.wait();
    console.log("minted = ", addr, receipt.status);
  }
});
