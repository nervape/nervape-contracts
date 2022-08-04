import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type {
  CampaignMinter,
  CampaignMinter__factory,
  GroupMinter,
  GroupMinter__factory,
  Nervape,
  NervapeFactory,
  NervapeFactory__factory,
  Nervape__factory,
  StoryVoting,
  StoryVoting__factory,
} from "../../src/types";

function getDeployment(network: string, name?: string) {
  const deployment = require(`../deployments/${network}`);
  return name ? deployment[name] : deployment;
}

// task("deploy:Nervape").setAction(async function (taskArguments: TaskArguments, { ethers }) {
//   const signers: SignerWithAddress[] = await ethers.getSigners();
//   const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
//   const nervape: Nervape = <Nervape>await nervapeFactory.connect(signers[0]).deploy();
//   await nervape.deployed();
//   console.log("Nervape deployed to: ", nervape.address);
// });

task("deploy:Factory").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory: NervapeFactory__factory = <NervapeFactory__factory>(
    await ethers.getContractFactory("NervapeFactory")
  );
  const factory: NervapeFactory = <NervapeFactory>await nervapeFactory.connect(signers[0]).deploy();
  await factory.deployed();
  console.log("NervapeFactory deployed to: ", factory.address);
});

task("deploy:GroupMinter")
  .addParam("recipient", "payment recipient")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
    const minter: GroupMinter = <GroupMinter>await minterFactory.connect(signers[0]).deploy(taskArguments.recipient);
    await minter.deployed();
    console.log("GroupMinter deployed to: ", minter.address);
  });

task("deploy:CampaignMinter")
  .addParam("recipient", "payment recipient")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const minterFactory: CampaignMinter__factory = <CampaignMinter__factory>(
      await ethers.getContractFactory("CampaignMinter")
    );
    const minter: CampaignMinter = <CampaignMinter>(
      await minterFactory.connect(signers[0]).deploy(taskArguments.recipient)
    );
    await minter.deployed();
    console.log("CampaignMinter deployed to: ", minter.address);
  });

task("deploy:StoryVoting").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const storyVotingFactory: StoryVoting__factory = <StoryVoting__factory>await ethers.getContractFactory("StoryVoting");
  const storyVoting: StoryVoting = <StoryVoting>await storyVotingFactory.connect(signers[0]).deploy();
  await storyVoting.deployed();
  console.log("StoryVoting deployed to: ", storyVoting.address);
});

task("factory:createCollection")
  .addParam("name", "Ape NFT name")
  .addParam("symbol", "Ape NFT symbol")
  .addParam("uri", "Ape NFT baseURI")
  .addParam("owner", "APE NFT owner")
  .addParam("maxsupply", "APE max supply")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    console.log(taskArguments);
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const nervapeFactory: NervapeFactory__factory = <NervapeFactory__factory>(
      await ethers.getContractFactory("NervapeFactory")
    );
    const factory: NervapeFactory = <NervapeFactory>(
      await nervapeFactory.connect(signers[0]).attach(getDeployment(network.name, "NervapeFactory"))
    );

    const tx = await factory.createCollection(
      taskArguments.name,
      taskArguments.symbol,
      taskArguments.uri,
      getDeployment(network.name, "GroupMinter"),
      taskArguments.owner,
      taskArguments.maxsupply,
    );
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      console.log("receipt = ", receipt.events);
      const event = receipt.events?.find(e => e.event === "CollectionCreated");
      console.log("NFT created to: ", event?.args?.collection);
    } else {
      console.log("transact failed");
    }
  });

task("groupMinter:createGroup")
  .addParam("group", "group index")
  .addParam("wlprice", "whitelist mint price")
  .addParam("price", "normal mint price each")
  .addParam("wlstarttime", "whitelisted mint start time")
  .addParam("starttime", "normal mint start time")
  .addParam("maxperwallet", "max mint per wallet")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const wlprice = ethers.utils.parseEther(taskArguments.wlprice);
    const price = ethers.utils.parseEther(taskArguments.price);
    const groupIndex = parseInt(taskArguments.group);
    const group = getDeployment(network.name, "groups")[groupIndex];
    const apeAddresses = group.apes.map((a: any) => a && a.address);

    console.log("apes: ", group.apes);
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
      apeAddresses,
      wlprice,
      price,
      taskArguments.wlstarttime,
      taskArguments.starttime,
      taskArguments.maxperwallet,
    );
    const receipt = await tx.wait();
    console.log("receipt = ", receipt);
    console.log("Minter Group %d created", groupIndex + 1);
  });

task("campaignMinter:createCampaign")
  .addParam("campaign", "campaign index")
  .addParam("price", "normal mint price each")
  .addParam("claimstarttime", "claim start time")
  .addParam("claimendtime", "claim end time")
  .addParam("starttime", "normal mint start time")
  .addParam("maxperwallet", "max mint per wallet")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const price = ethers.utils.parseEther(taskArguments.price);
    const campaignIndex = parseInt(taskArguments.group);
    const campaign = getDeployment(network.name, "campaigns")[campaignIndex];

    console.log("scene: ", campaign.scene);
    console.log("apes: ", campaign.relatedApes);
    console.log("price: ", taskArguments.price);
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
      campaign.scene,
      campaign.relatedApes,
      price,
      taskArguments.claimstarttime,
      taskArguments.claimendtime,
      taskArguments.starttime,
      taskArguments.maxperwallet,
    );
    const receipt = await tx.wait();
    console.log("receipt = ", receipt);
    console.log("Campaign %d created", campaignIndex + 1);
  });

task("storyVoting:createProposal")
  .addParam("apes", "votable apes")
  .addParam("newapes", "new apes")
  .addParam("starttime", "start time")
  .addParam("endtime", "end time")
  .addParam("choices", "choices")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    const campaign = getDeployment(network.name, "proposals")[campaignIndex];
    console.log("apes: ", taskArguments.apes);
    console.log("new apes: ", taskArguments.newapes);
    console.log("price: ", taskArguments.price);
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
      [],
      [],
      taskArguments.starttime,
      taskArguments.endtime,
      taskArguments.choices,
    );
    const receipt = await tx.wait();
    console.log("receipt = ", receipt);
    // console.log("Voting proposal %d created", campaignIndex + 1);
  });

// task("deploy:Minter:mintableApes")
//   .addParam("group", "group index")
//   .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
//     const groupIndex = parseInt(taskArguments.group);
//     const signers: SignerWithAddress[] = await ethers.getSigners();
//     const owner = signers[0];
//     const minterFactory: Minter__factory = <Minter__factory>await ethers.getContractFactory("Minter");
//     const minter: Minter = <Minter>await minterFactory.attach(getDeployment(network.name, "Minter"));
//     const result = await minter.mintableApes(groupIndex);
//     console.log("apes: ", result.apes);
//     console.log("mintableLength: ", result.mintableLength.toNumber());
//     console.log("maxMintable: ", result.maxMintable.toNumber());
//   });

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
