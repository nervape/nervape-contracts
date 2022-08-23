import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type {
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

task("deploy:all").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const character: Nervape = <Nervape>(
    await nervapeFactory
      .connect(signers[0])
      .deploy("Nervape Character", "NCHARACTER", "https://dev.nervape.com/metadata-server/character/")
  );
  await character.deployed();
  console.log("Nervape Character deployed to: ", character.address);

  const scene: Nervape = <Nervape>(
    await nervapeFactory
      .connect(signers[0])
      .deploy("Nervape Scene", "NSCENE", "https://dev.nervape.com/metadata-server/scene/")
  );
  await scene.deployed();
  console.log("Nervape Scene deployed to: ", scene.address);

  const item: Nervape = <Nervape>(
    await nervapeFactory
      .connect(signers[0])
      .deploy("Nervape Item", "NITEM", "https://dev.nervape.com/metadata-server/item/")
  );

  await item.deployed();
  console.log("Nervape Item deployed to: ", item.address);

  const recipient = network.name == "hardhat" ? signers[0].address : getDeployment(network.name, "recipient");

  const groupMinterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
  const groupMinter: GroupMinter = <GroupMinter>(
    await groupMinterFactory.connect(signers[0]).deploy(character.address, recipient)
  );
  await groupMinter.deployed();
  console.log("GroupMinter deployed to: ", groupMinter.address);

  const campaignMinterFactory: CampaignMinter__factory = <CampaignMinter__factory>(
    await ethers.getContractFactory("CampaignMinter")
  );
  const campaignMinter: CampaignMinter = <CampaignMinter>(
    await campaignMinterFactory.connect(signers[0]).deploy(character.address, scene.address, recipient)
  );
  await campaignMinter.deployed();
  console.log("CampaignMinter deployed to: ", campaignMinter.address);

  const storyVotingFactory: StoryVoting__factory = <StoryVoting__factory>await ethers.getContractFactory("StoryVoting");
  const storyVoting: StoryVoting = <StoryVoting>await storyVotingFactory.connect(signers[0]).deploy(character.address);
  await storyVoting.deployed();
  console.log("StoryVoting deployed to: ", storyVoting.address);

  await character.setMinter(groupMinter.address);
  await character.setMinter(storyVoting.address);
  await scene.setMinter(campaignMinter.address);
});

task("deploy:addAllClasses").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const character: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "Character"))
  );
  for (let id = 1; id <= 7; id++) {
    await character.addNewClass(256, 0);
    console.log("add bridge class: ", id);
  }
  await character.addNewClass(10, 0); // 8
  console.log("add bridge class: ", 8);

  await character.addNewClass(256, 5); // 9
  console.log("add new class: ", 9);
  await character.addNewClass(256, 5); // 10
  console.log("add new class: ", 10);
  await character.addNewClass(128, 5); // 11
  console.log("add new class: ", 11);
  await character.addNewClass(15, 5); // 12
  console.log("add new class: ", 12);

  await character.addNewClass(256, 5); // 13
  console.log("add new class: ", 13);

  await character.addNewClass(256, 5); // 14
  console.log("add new class: ", 14);

  await character.addNewClass(256, 5); // 15
  console.log("add new class: ", 15);

  await character.addNewClass(256, 5); // 16
  console.log("add new class: ", 16);

  const scene: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "Scene"));

  await scene.addNewClass(256, 0); // groovy party
  console.log("add scene groovy party");
  await scene.addNewClass(128, 0); // story 001
  console.log("add scene story 001");

  await scene.addNewClass(256, 0); // test scene
  console.log("add scene test");

  const item: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "Item"));
  await item.addNewClass(256, 0); // B-Book
  console.log("add item B-Book");
  await item.addNewClass(256, 0); // B-Boat
  console.log("add item B-Boat");
});

task("deploy:createAll").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const wlprice = ethers.utils.parseEther("10");
  const price = ethers.utils.parseEther("15");
  const group = getDeployment(network.name, "groups")[0];
  const classIds = group.characterClasses;

  const wlStartTime = parseInt((Date.now() / 1000).toString()) + 10;
  const startTime = wlStartTime + 2 * 24 * 3600;

  console.log("classes: ", classIds);
  console.log("price: ", price);
  console.log("WL price: ", wlprice);
  console.log("WL start time: ", wlStartTime);
  console.log("Start time: ", startTime);
  console.log("Max per wallet: ", 5);

  const signers: SignerWithAddress[] = await ethers.getSigners();
  const owner = signers[0];
  const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
  const minter: GroupMinter = <GroupMinter>(
    await minterFactory.connect(owner).attach(getDeployment(network.name, "GroupMinter"))
  );

  const lastGroupId = await minter.totalGroup();

  if (lastGroupId.toNumber() === 0) {
    let tx = await minter.createGroup(classIds, wlprice, price, wlStartTime, startTime, 5);
    let receipt = await tx.wait();
    console.log("Group %d created at %s", 1, receipt.transactionHash);
  }

  const campaignMinterFactory: CampaignMinter__factory = <CampaignMinter__factory>(
    await ethers.getContractFactory("CampaignMinter")
  );
  const campaignMinter: CampaignMinter = <CampaignMinter>(
    await campaignMinterFactory.connect(owner).attach(getDeployment(network.name, "CampaignMinter"))
  );

  const claimStartTime = parseInt((Date.now() / 1000).toString()) + 10;
  const claimEndTime = claimStartTime + 10 * 24 * 3600;
  const campaignStartTime = claimStartTime + 2 * 24 * 3600;

  const campaign = getDeployment(network.name, "campaigns")[0];

  const lastCampaignId = await campaignMinter.totalCampaign();

  if (lastCampaignId.toNumber() == 0) {
    let tx = await campaignMinter.createCampaign(
      campaign.characterClasses,
      campaign.sceneClass,
      price,
      claimStartTime,
      claimEndTime,
      campaignStartTime,
      2,
    );
    let receipt = await tx.wait();
    console.log("Campaign %d created at %s", 1, receipt.transactionHash);
  }
});

task("deploy:character").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).deploy("Nervape ", "NAPE", "https://metadata.nervape.com/nape/")
  );
  await nervape.deployed();
  console.log("Nervape character deployed to: ", nervape.address);
  for (let id = 1; id <= 7; id++) {
    await nervape.addNewClass(256, 0);
    console.log("add bridge class: ", id);
  }
  await nervape.addNewClass(10, 0); // Mirana Special
  console.log("add bridge class: ", 8);
});

task("deploy:addClass")
  .addParam("maxsupply", "max supply of class")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
    const nervape: Nervape = <Nervape>(
      await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "Character"))
    );
    const tx = await nervape.addNewClass(taskArguments.maxsupply, 5);
    const receipt = await tx.wait();
    if (receipt.status) {
      const classId = await nervape.lastClassId();
      console.log("added class ", classId);
    } else {
      console.log("failed to add new class");
    }
  });

task("deploy:scene").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).deploy("Nervape Scene", "NSCENE", "https://metadata.nervape.com/scene/")
  );
  await nervape.deployed();
  console.log("Nervape scene deployed to: ", nervape.address);
  await nervape.addNewClass(256, 0); // groovy party
  console.log("add scene groovy party");
  await nervape.addNewClass(128, 0); // story 001
  console.log("add scene story 001");
});

task("deploy:item").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).deploy("Nervape Item", "NITEM", "https://metadata.nervape.com/item/")
  );
  await nervape.deployed();

  await nervape.addNewClass(256, 0); // B-Book
  console.log("add item B-Book");
  await nervape.addNewClass(256, 0); // B-Boat
  console.log("add item B-Boat");
  console.log("Nervape item deployed to: ", nervape.address);
});

task("deploy:GroupMinter")
  .addParam("character", "character contract address")
  .addParam("recipient", "payment recipient")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
    const minter: GroupMinter = <GroupMinter>(
      await minterFactory.connect(signers[0]).deploy(taskArguments.character, taskArguments.recipient)
    );
    await minter.deployed();
    console.log("GroupMinter deployed to: ", minter.address);
  });

task("Nervape:setMinter")
  .addParam("nervape", "contract address of nervape")
  .addParam("minter", "minter of nervape")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
    const nervape: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(taskArguments.nervape);
    await nervape.setMinter(taskArguments.minter);
    console.log("minter %s added", taskArguments.minter);
  });

task("deploy:CampaignMinter")
  .addParam("character", "character contract address")
  .addParam("scene", "scene contract address")
  .addParam("recipient", "payment recipient")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const { character, scene, recipient } = taskArguments;
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const minterFactory: CampaignMinter__factory = <CampaignMinter__factory>(
      await ethers.getContractFactory("CampaignMinter")
    );
    const minter: CampaignMinter = <CampaignMinter>(
      await minterFactory.connect(signers[0]).deploy(character, scene, recipient)
    );
    await minter.deployed();
    console.log("CampaignMinter deployed to: ", minter.address);
  });

task("deploy:StoryVoting").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const { character, scene } = taskArguments;
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const storyVotingFactory: StoryVoting__factory = <StoryVoting__factory>await ethers.getContractFactory("StoryVoting");
  const storyVoting: StoryVoting = <StoryVoting>await storyVotingFactory.connect(signers[0]).deploy(character, scene);
  await storyVoting.deployed();
  console.log("StoryVoting deployed to: ", storyVoting.address);
});

task("GroupMinter:createGroup")
  .addParam("groupindex", "group index")
  .addParam("wlprice", "whitelist mint price")
  .addParam("price", "normal mint price each")
  .addParam("wlstarttime", "whitelisted mint start time")
  .addParam("starttime", "normal mint start time")
  .addParam("maxperwallet", "max mint per wallet")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const wlprice = ethers.utils.parseEther(taskArguments.wlprice);
    const price = ethers.utils.parseEther(taskArguments.price);
    const groupIndex = parseInt(taskArguments.groupindex);
    const group = getDeployment(network.name, "groups")[groupIndex];
    const classIds = group.characterClasses;

    console.log("classes: ", classIds);
    console.log("price: ", taskArguments.price);
    console.log("WL price: ", taskArguments.wlprice);
    console.log("WL start time: ", taskArguments.wlstarttime);
    console.log("Start time: ", taskArguments.starttime);
    console.log("Max per wallet: ", taskArguments.maxperwallet);

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner = signers[0];
    const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
    const minter: GroupMinter = <GroupMinter>(
      await minterFactory.connect(owner).attach(getDeployment(network.name, "GroupMinter"))
    );
    const tx = await minter.createGroup(
      classIds,
      wlprice,
      price,
      taskArguments.wlstarttime,
      taskArguments.starttime,
      taskArguments.maxperwallet,
    );
    const receipt = await tx.wait();
    console.log("Minter Group %d created at %s", groupIndex + 1, receipt.transactionHash);
  });

task("Whitelist:add")
  .addParam("group", "group id")
  .addParam("address", "address to add")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner = signers[0];
    const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
    const minter: GroupMinter = <GroupMinter>(
      await minterFactory.connect(owner).attach(getDeployment(network.name, "GroupMinter"))
    );
    const tx = await minter.add(taskArguments.group, [taskArguments.address]);
    const receipt = await tx.wait();
    console.log("%s added to whitelist of group %d", taskArguments.address, taskArguments.group);
  });

task("GroupMinter:whitelistMint")
  .addParam("group", "group id")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const account = signers[0];
    const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
    const minter: GroupMinter = <GroupMinter>(
      await minterFactory.connect(account).attach(getDeployment(network.name, "GroupMinter"))
    );

    const count = parseInt(taskArguments.count);
    const tx = await minter.whitelistMint(taskArguments.group, { value: ethers.utils.parseEther("10") });
    const receipt = await tx.wait();
    console.log(receipt);
    console.log("%d minted in group %d at %s", count, taskArguments.group, receipt.transactionHash);
  });

task("CampaignMinter:createCampaign")
  .addParam("campaign", "campaign index")
  .addParam("price", "normal mint price each")
  .addParam("claimstarttime", "claim start time")
  .addParam("claimendtime", "claim end time")
  .addParam("starttime", "normal mint start time")
  .addParam("maxperwallet", "max mint per wallet")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const price = ethers.utils.parseEther(taskArguments.price);
    const campaignIndex = parseInt(taskArguments.campaign);
    const campaign = getDeployment(network.name, "campaigns")[campaignIndex];

    console.log("classes: ", campaign.characterClasses);
    console.log("scene: ", campaign.sceneClass);
    console.log("price: ", price.toString());
    console.log("claim start time: ", taskArguments.claimstarttime);
    console.log("claim end time: ", taskArguments.claimendtime);
    console.log("start time: ", taskArguments.starttime);
    console.log("Max per wallet: ", taskArguments.maxperwallet);

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner = signers[0];
    const campaignMinterFactory: CampaignMinter__factory = <CampaignMinter__factory>(
      await ethers.getContractFactory("CampaignMinter")
    );
    const campaignMinter: CampaignMinter = <CampaignMinter>(
      await campaignMinterFactory.connect(owner).attach(getDeployment(network.name, "CampaignMinter"))
    );

    const tx = await campaignMinter.createCampaign(
      campaign.characterClasses,
      campaign.sceneClass,
      price.toString(),
      taskArguments.claimstarttime,
      taskArguments.claimendtime,
      taskArguments.starttime,
      taskArguments.maxperwallet,
    );
    const receipt = await tx.wait();
    console.log("receipt = ", receipt);
    console.log("Campaign %d created", campaignIndex + 1);
  });

task("StoryVoting:createProposal")
  .addParam("proposal", "proposal index")
  .addParam("starttime", "start time")
  .addParam("endtime", "end time")
  .addParam("choices", "choices")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const proposalIndex = parseInt(taskArguments.proposal);
    const proposal = getDeployment(network.name, "proposals")[proposalIndex];
    console.log("classes: ", proposal.classes);
    console.log("new classes: ", proposal.newClasses);
    console.log("start time: ", taskArguments.starttime);
    console.log("end time: ", taskArguments.endtime);

    const signers: SignerWithAddress[] = await ethers.getSigners();
    const owner = signers[0];
    const storyVotingFactory: StoryVoting__factory = <StoryVoting__factory>(
      await ethers.getContractFactory("StoryVoting")
    );
    const storyVoting: StoryVoting = <StoryVoting>(
      await storyVotingFactory.connect(owner).attach(getDeployment(network.name, "StoryVoting"))
    );

    const tx = await storyVoting.createProposal(
      proposal.classes,
      proposal.newClasses,
      taskArguments.starttime,
      taskArguments.endtime,
      taskArguments.choices,
    );
    const receipt = await tx.wait();
    console.log("receipt = ", receipt);
    console.log("Voting proposal %d created", proposalIndex + 1);
  });

task("deploy:testMint").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "Character"))
  );
  // await nervape.setMinter(signers[0].address)

  for (let i = 0; i < 5; i++) {
    await nervape.mint(9, "0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B");
    await nervape.mint(10, "0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B");
    await nervape.mint(11, "0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B");
    await nervape.mint(12, "0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B");
  }

  // const receipt = await tx.wait()
  // console.log(receipt)

  // const totalSupply = await nervape.totalSupply()
  // const tx = await nervape.mint(1, { value: ethers.utils.parseEther('100') })
  // const receipt = await tx.wait()
  // console.log("tx =  ", tx);
  // console.log("response =  ", receipt.events && receipt.events[0].topics);
  // console.log("totalSupply =  ", totalSupply.toNumber());
});
task("call").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const nervape: Nervape = <Nervape>(
    await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "Scene"))
  );
  // await nervape.setMinter(signers[0].address)
  const tokens = await nervape.tokensOfOwnerByClass("0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B", 3);
  const balance = await nervape.balanceOf("0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B");
  const totalSupply = await nervape.totalSupplyOfClass(3);

  console.log("tokens=", tokens, balance, totalSupply);

  // const totalSupply = await nervape.totalSupply()
  // const tx = await nervape.mint(1, { value: ethers.utils.parseEther('100') })
  // const receipt = await tx.wait()
  // console.log("tx =  ", tx);
  // console.log("response =  ", receipt.events && receipt.events[0].topics);
  // console.log("totalSupply =  ", totalSupply.toNumber());
});
