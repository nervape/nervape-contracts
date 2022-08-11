import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Nervape, Nervape__factory, StoryVoting, StoryVoting__factory } from "../src/types";
import { getNow, withIncreaseTime } from "./helpers";
import { Signers } from "./types";

describe("StoryVoting", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.minter = signers[1];
    this.signers.owner = signers[2];
    this.signers.user = signers[3];
    this.signers.user2 = signers[4];
  });

  beforeEach(async function () {
    const apeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
    this.character = <Nervape>await apeFactory.deploy("Nervape Character", "NAPE", "uri");
    await this.character.deployed();

    for (let i = 0; i < 7; i++) {
      await this.character.addNewClass(256, 5);
    }

    const storyVotingFactory: StoryVoting__factory = <StoryVoting__factory>(
      await ethers.getContractFactory("StoryVoting")
    );
    this.storyVoting = <StoryVoting>await storyVotingFactory.deploy(this.character.address);

    await this.character.setMinter(this.signers.minter.address);
    await this.character.setMinter(this.storyVoting.address);
  });

  async function createFixture(character: Nervape, storyVoting: StoryVoting, signers: Signers) {
    await character.addNewClass(256, 0); // 1
    await character.addNewClass(256, 0); // 2
    await character.addNewClass(256, 0); // 3
    await character.addNewClass(256, 0); // 4
    await character.addNewClass(256, 0); // 5
    await character.addNewClass(256, 0); // 6

    await character.addNewClass(256, 0); // 7
    await character.addNewClass(256, 0); // 8
    await character.addNewClass(256, 0); // 9
    await character.addNewClass(256, 0); // 10
    await character.addNewClass(256, 0); // 11
    await character.addNewClass(256, 0); // 12

    const classIds = [1, 2, 3, 4, 5, 6];
    const newClassIds = [7, 8, 9, 10, 11, 12];

    for (let i = 0; i < classIds.length; i++) {
      await character.connect(signers.minter).mint(classIds[i], signers.user.address);
      await character.connect(signers.minter).mint(classIds[i], signers.user2.address);
    }

    character.connect(signers.user).setApprovalForAll(storyVoting.address, true);
    character.connect(signers.user2).setApprovalForAll(storyVoting.address, true);

    const block = await ethers.provider.getBlock("latest");

    const currentProposal = await storyVoting.totalProposal();

    const now = await getNow();
    const startTime = now + 5;
    const endTime = now + 3600;
    const choices = 3;
    await storyVoting.createProposal(classIds, newClassIds, startTime, endTime, choices);
    const proposalId = currentProposal.add(1).toNumber();

    return { proposalId, classIds, newClassIds, startTime, endTime, choices };
  }

  describe("createProposal", function () {
    it("should create new proposal", async function () {
      const { proposalId } = await createFixture(this.character, this.storyVoting, this.signers);
      expect(proposalId).to.eq(1);
    });
  });

  describe("vote", function () {
    it("transfers nft and vote", async function () {
      const { proposalId, classIds, newClassIds } = await createFixture(this.character, this.storyVoting, this.signers);

      const tokenId1 = await this.character.tokenOfOwnerByIndex(this.signers.user.address, 0);
      const tokenId2 = await this.character.tokenOfOwnerByIndex(this.signers.user.address, 1);
      const support = 1;
      await withIncreaseTime(100, async () => {
        await this.storyVoting.connect(this.signers.user).vote(proposalId, [tokenId1, tokenId2], support);
        const vote1 = await this.storyVoting.userVotes(proposalId, this.signers.user.address, 0);
        const vote2 = await this.storyVoting.userVotes(proposalId, this.signers.user.address, 1);
        expect(await this.character.balanceOf(this.storyVoting.address)).to.eq(2);
        expect(vote1.tokenId).to.eq(tokenId1);
        expect(vote2.tokenId).to.eq(tokenId2);
      });
    });
  });

  describe("getVotes", function () {
    it("should return proposal votes of choice", async function () {
      const { proposalId, classIds, newClassIds } = await createFixture(this.character, this.storyVoting, this.signers);
      const userTokens = [10000, 20000, 30000, 40000, 50000, 60000];
      const user2Tokens = [10001, 20001, 30001, 40001, 60001];

      const supportChoice = 1;
      await withIncreaseTime(100, async () => {
        await this.storyVoting.connect(this.signers.user).vote(proposalId, userTokens, supportChoice);
        await this.storyVoting.connect(this.signers.user2).vote(proposalId, user2Tokens, supportChoice);
        const votes = await this.storyVoting.getVotes(proposalId, supportChoice);
        const groupVotes = votes.shr(128);
        const remainingVotes = votes.and(ethers.BigNumber.from("0xffffffffffffffffffffffffffffffff"));
        expect(groupVotes).to.eq(1);
        expect(remainingVotes).to.eq(5);
      });
    });
  });

  describe("redeem", function () {
    it("should claim new character if support won choice ", async function () {
      const { proposalId, classIds, newClassIds } = await createFixture(this.character, this.storyVoting, this.signers);
      const userTokens = [10000, 20000, 30000, 40000, 50000, 60000];
      const user2Tokens = [10001, 20001, 30001, 40001, 50001];

      const supportChoice1 = 1;
      const supportChoice2 = 2;
      await withIncreaseTime(100, async () => {
        await this.storyVoting.connect(this.signers.user).vote(proposalId, userTokens, supportChoice1);
        await this.storyVoting.connect(this.signers.user2).vote(proposalId, user2Tokens, supportChoice1);
        await this.storyVoting.connect(this.signers.user2).vote(proposalId, [60001], supportChoice2);
      });

      await withIncreaseTime(3650, async () => {
        await this.storyVoting.connect(this.signers.user).redeem(proposalId);

        for (let i = 0; i < newClassIds.length; i++) {
          const newTokens = await this.character.tokensOfOwnerByClass(this.signers.user.address, newClassIds[i]);
          expect(newTokens.length).to.eq(1);
        }

        expect(await this.character.ownerOf(60001)).to.not.eq(this.signers.user2.address);

        await this.storyVoting.connect(this.signers.user2).redeem(proposalId);

        expect(await this.character.ownerOf(60001)).to.eq(this.signers.user2.address);

        const state = await this.storyVoting.stateOf(proposalId);

        expect(state).to.eq(3);
      });
    });
  });
});
