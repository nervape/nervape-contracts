import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers, network } from "hardhat";

import type { GroupMinter, GroupMinter__factory, Nervape, Nervape__factory } from "../src/types";
import { Signers } from "./types";

describe("GroupMinter", function () {
  before(async function () {
    this.signers = {} as Signers;
    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.minter = signers[1];
    this.signers.owner = signers[2];
    this.signers.user = signers[3];
  });

  const withIncreaseTime = async (seconds: number, callback: () => Promise<any>) => {
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
    await callback();
    await network.provider.send("evm_increaseTime", [-seconds]);
    await network.provider.send("evm_mine");
  };

  async function createGroupFixture(nervape: Nervape, minter: GroupMinter, signers: Signers) {
    await nervape.addNewClass(5, 0); // 1
    await nervape.addNewClass(3, 0); // 2
    await nervape.addNewClass(7, 0); // 3

    await nervape.setMinter(minter.address);

    const classIds = [1, 2, 3];

    const block = await ethers.provider.getBlock("latest");

    const currentGroup = await minter.totalGroup();
    const wlPrice = ethers.utils.parseEther("1");
    const price = ethers.utils.parseEther("1.5");
    const now = block.timestamp + 1;
    const wlStartTime = now + 5;
    const startTime = wlStartTime + 5 * 60;
    const maxPerWallet = 5;

    await minter.createGroup(classIds, wlPrice, price, wlStartTime, startTime, maxPerWallet);
    const groupId = currentGroup.add(1).toNumber();

    return { groupId, classIds, wlPrice, price, wlStartTime, startTime, maxPerWallet };
  }

  beforeEach(async function () {
    const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
    this.nervape = <Nervape>await nervapeFactory.deploy("Nervape collections", "NERVAPE", "uri");
    await this.nervape.deployed();

    const minterFactory: GroupMinter__factory = <GroupMinter__factory>await ethers.getContractFactory("GroupMinter");
    this.minter = <GroupMinter>(
      await minterFactory.connect(this.signers.admin).deploy(this.nervape.address, this.signers.owner.address)
    );
    await this.minter.deployed();
  });

  it("should deploy successfully", async function () {
    expect(await this.minter.recipient()).to.eq(this.signers.owner.address);
  });

  describe("createGroup", function () {
    it("should create a new group", async function () {
      const currentGroup = await this.minter.totalGroup();
      await createGroupFixture(this.nervape, this.minter, this.signers);
      const createdGroup = await this.minter.totalGroup();
      expect(createdGroup).to.eq(currentGroup.toNumber() + 1);
    });
  });

  describe("updateGroup", function () {
    it("should update fields of group before start", async function () {
      const { groupId, wlStartTime } = await createGroupFixture(this.nervape, this.minter, this.signers);
      const wlPrice = ethers.utils.parseEther("2");
      const price = ethers.utils.parseEther("2.5");
      const block = await ethers.provider.getBlock("latest");
      const now = block.timestamp + 1;
      const newWlStartTime = now + 10;
      const startTime = newWlStartTime + 5 * 60;
      const maxPerWallet = 3;
      const newClassIds = [1, 2, 3, 4];
      await this.minter.updateGroup(groupId, newClassIds, wlPrice, price, newWlStartTime, startTime, maxPerWallet);

      const group = await this.minter.getGroup(groupId);
      expect(group.wlPrice).to.eq(wlPrice);
      expect(group.price).to.eq(price);
      expect(group.classIds).to.have.members(newClassIds);
      expect(group.startTime).to.eq(startTime);
      expect(group.wlStartTime).to.eq(newWlStartTime);
      expect(group.maxPerWallet).to.eq(maxPerWallet);
    });

    it("should be reverted after whitelist mint started", async function () {
      const { classIds, groupId, wlStartTime, wlPrice, price, maxPerWallet, startTime } = await createGroupFixture(
        this.nervape,
        this.minter,
        this.signers,
      );
      await withIncreaseTime(200, async () => {
        await expect(
          this.minter.updateGroup(groupId, classIds, wlPrice, price, wlStartTime, startTime, maxPerWallet),
        ).to.be.revertedWith("Cannot update after started");
      });
    });
  });

  describe("setRecipient", function () {
    it("should update recipient", async function () {
      await createGroupFixture(this.nervape, this.minter, this.signers);
      await this.minter.setRecipient(this.signers.user.address);
      const newRecipient = await this.minter.recipient();
      expect(newRecipient).to.eq(this.signers.user.address);
    });
    it("should be reverted if set to invalid address", async function () {
      await createGroupFixture(this.nervape, this.minter, this.signers);
      await expect(this.minter.setRecipient("0x0000000000000000000000000000000000000000")).to.be.reverted;
    });
  });

  describe("whitelistMint", function () {
    beforeEach(async function () {
      await this.minter.add(1, [this.signers.user.address]);
    });
    it("should be reverted before whitelist start time", async function () {
      const { wlPrice, wlStartTime, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(-100, async () => {
        await expect(
          this.minter.connect(this.signers.user).whitelistMint(groupId, { value: wlPrice }),
        ).to.be.revertedWith("Not start");
      });
    });
    it("should be reverted after public mint started", async function () {
      const { wlPrice, wlStartTime, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(310, async () => {
        await expect(
          this.minter.connect(this.signers.user).whitelistMint(groupId, { value: wlPrice }),
        ).to.be.revertedWith("Has ended");
      });
    });
    it("should succeed and send payment value to recipient", async function () {
      const { classIds, wlPrice, wlStartTime, groupId } = await createGroupFixture(
        this.nervape,
        this.minter,
        this.signers,
      );
      const beforeBalance = await ethers.provider.getBalance(this.signers.owner.address);
      await withIncreaseTime(10, async () => {
        await this.minter.connect(this.signers.user).whitelistMint(groupId, { value: wlPrice });
        const minted = await this.minter.whitelistMinted(groupId, this.signers.user.address);
        expect(minted).to.be.true;
      });
      const afterBalance = await ethers.provider.getBalance(this.signers.owner.address);
      expect(afterBalance.sub(beforeBalance)).to.eq(wlPrice);
      expect(await this.nervape.balanceOf(this.signers.user.address)).to.eq(1);
    });

    it("should be reverted if minted", async function () {
      const { classIds, wlPrice, wlStartTime, groupId } = await createGroupFixture(
        this.nervape,
        this.minter,
        this.signers,
      );
      await withIncreaseTime(10, async () => {
        await this.minter.connect(this.signers.user).whitelistMint(groupId, { value: wlPrice });
        await expect(
          this.minter.connect(this.signers.user).whitelistMint(groupId, { value: wlPrice }),
        ).to.be.revertedWith("Whitelist minted");
      });
    });

    it("should be reverted if sender is not in whitelist", async function () {
      const { wlPrice, price, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(100, async () => {
        await expect(
          this.minter.connect(this.signers.owner).whitelistMint(groupId, { value: wlPrice }),
        ).to.be.revertedWith("Not whitelisted");
      });
    });
    it("should be reverted if send wrong value", async function () {
      const { wlPrice, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(100, async () => {
        await expect(
          this.minter.connect(this.signers.user).whitelistMint(groupId, { value: wlPrice.mul(2) }),
        ).to.be.revertedWith("Wrong payment value");
      });
    });
  });

  describe("mint", function () {
    it("should be reverted before start time", async function () {
      const { price, groupId, wlStartTime, startTime } = await createGroupFixture(
        this.nervape,
        this.minter,
        this.signers,
      );
      await withIncreaseTime(3 * 60, async () => {
        // const block = await ethers.provider.getBlock("latest")
        // console.log(block.timestamp, wlStartTime, startTime)
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 5, { value: price.mul(5) }),
        ).to.be.revertedWith("Not start");
      });
    });
    it("should be reverted if send wrong value", async function () {
      const { price, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(6 * 60, async () => {
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 5, { value: price.mul(2) }),
        ).to.be.revertedWith("Wrong payment value");
      });
    });
    it("should be reverted if exceeded max mint amount", async function () {
      const { price, groupId, maxPerWallet } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(6 * 60, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, maxPerWallet, { value: price.mul(5) });
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 1, { value: price.mul(1) }),
        ).to.be.revertedWith("Exceeded max mint amount");
      });
    });
    it("should be reverted if sold out", async function () {
      const { price, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      await withIncreaseTime(6 * 60, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, 5, { value: price.mul(5) });
        await this.minter.connect(this.signers.owner).mint(groupId, 5, { value: price.mul(5) });
        await this.minter.connect(this.signers.admin).mint(groupId, 5, { value: price.mul(5) });
        const mintable = await this.minter.mintableClasses(groupId);
        expect(mintable.maxMintable).to.eq(0);
        await expect(
          this.minter.connect(this.signers.minter).mint(groupId, 1, { value: price.mul(1) }),
        ).to.be.revertedWith("No character class left");
      });
    });
    it("should succeed and send payment value to recipient", async function () {
      const { classIds, price, groupId } = await createGroupFixture(this.nervape, this.minter, this.signers);
      const beforeBalance = await ethers.provider.getBalance(this.signers.owner.address);
      await withIncreaseTime(6 * 60, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, 3, { value: price.mul(3) });
        const minted = await this.minter.minted(groupId, this.signers.user.address);
        expect(minted).to.eq(3);
      });
      const afterBalance = await ethers.provider.getBalance(this.signers.owner.address);
      expect(afterBalance.sub(beforeBalance)).to.eq(price.mul(3));

      for (let i = 0; i < classIds.length; i++) {
        const tokens = await this.nervape.tokensOfOwnerByClass(this.signers.user.address, classIds[i]);
        console.log(tokens);
      }

      expect(await this.nervape.balanceOf(this.signers.user.address)).to.eq(3);
    });
  });
});
