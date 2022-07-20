import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers, network } from "hardhat";

import type { Ape, Ape__factory, Minter, Minter__factory } from "../src/types";
import { Signers } from "./types";

describe("Minter", function () {
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

  async function createGroupFixture(minter: Minter, signers: Signers) {
    const apeFactory: Ape__factory = <Ape__factory>await ethers.getContractFactory("Ape");
    const ape1 = <Ape>await apeFactory.connect(signers.admin).deploy("Nervape1", "NERVAPE1", "uri1", minter.address, 5);
    await ape1.deployed();

    const ape2 = <Ape>await apeFactory.connect(signers.admin).deploy("Nervape2", "NERVAPE2", "uri2", minter.address, 3);
    await ape2.deployed();

    const ape3 = <Ape>await apeFactory.connect(signers.admin).deploy("Nervape3", "NERVAPE3", "uri3", minter.address, 7);
    await ape3.deployed();

    const apeAddresses = [ape1.address, ape2.address, ape3.address];

    const block = await ethers.provider.getBlock("latest");

    const currentGroup = await minter.totalGroup();
    const wlPrice = ethers.utils.parseEther("1");
    const price = ethers.utils.parseEther("1.5");
    const now = block.timestamp + 1;
    const wlStartTime = now + 5;
    const startTime = wlStartTime + 5 * 60;
    const maxPerWallet = 5;

    await minter.createGroup(apeAddresses, wlPrice, price, wlStartTime, startTime, maxPerWallet);
    const groupId = currentGroup.add(1).toNumber();

    return { groupId, apeAddresses, wlPrice, price, wlStartTime, startTime, maxPerWallet, ape1, ape2, ape3 };
  }

  beforeEach(async function () {
    const minterFactory: Minter__factory = <Minter__factory>await ethers.getContractFactory("Minter");
    this.minter = <Minter>await minterFactory.connect(this.signers.admin).deploy(this.signers.owner.address);
    await this.minter.deployed();
  });

  it("should deploy successfully", async function () {
    expect(await this.minter.recipient()).to.eq(this.signers.owner.address);
  });

  describe("createGroup", function () {
    it("should create a new group", async function () {
      const currentGroup = await this.minter.totalGroup();
      await createGroupFixture(this.minter, this.signers);
      const createdGroup = await this.minter.totalGroup();
      expect(createdGroup).to.eq(currentGroup.toNumber() + 1);
    });
  });

  describe("setConfig", function () {
    it("should update whitelist price", async function () {
      const { groupId } = await createGroupFixture(this.minter, this.signers);
      await this.minter.setConfig(groupId, 0, ethers.utils.parseEther("3"));
      const wlPrice = await this.minter.groupConfigs(groupId, 0);
      expect(wlPrice).to.eq(ethers.utils.parseEther("3"));
    });

    it("should update normal price", async function () {
      const { groupId } = await createGroupFixture(this.minter, this.signers);
      await this.minter.setConfig(groupId, 1, ethers.utils.parseEther("5"));
      const price = await this.minter.groupConfigs(groupId, 1);
      expect(price).to.eq(ethers.utils.parseEther("5"));
    });

    it("should update whitelist start time and normal start time", async function () {
      const { groupId } = await createGroupFixture(this.minter, this.signers);

      const wlStartTime = parseInt((Date.now() / 1000 + 100).toString());
      const startTime = wlStartTime + 2 * 24 * 3600;

      await this.minter.setConfig(groupId, 2, wlStartTime);
      await this.minter.setConfig(groupId, 3, startTime);

      expect(await this.minter.groupConfigs(groupId, 2)).to.eq(wlStartTime);
      expect(await this.minter.groupConfigs(groupId, 3)).to.eq(startTime);
    });

    it("should update max mint per wallet", async function () {
      const { groupId } = await createGroupFixture(this.minter, this.signers);
      await this.minter.setConfig(groupId, 4, 6);
      expect(await this.minter.groupConfigs(groupId, 4)).to.eq(6);
    });
  });

  describe("setRecipient", function () {
    it("should update recipient", async function () {
      await createGroupFixture(this.minter, this.signers);
      await this.minter.setRecipient(this.signers.user.address);
      const newRecipient = await this.minter.recipient();
      expect(newRecipient).to.eq(this.signers.user.address);
    });
    it("should be reverted if set to invalid address", async function () {
      await createGroupFixture(this.minter, this.signers);
      await expect(this.minter.setRecipient("0x0000000000000000000000000000000000000000")).to.be.reverted;
    });
  });

  describe("whitelist mint", function () {
    beforeEach(async function () {
      await this.minter.add(1, [this.signers.user.address]);
    });
    it("should be reverted before whitelist start time", async function () {
      const { wlPrice, wlStartTime, groupId } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(-100, async () => {
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 5, { value: wlPrice.mul(5) }),
        ).to.be.revertedWith("Not start");
      });
    });
    it("should succeed and send payment value to recipient", async function () {
      const { ape1, ape2, ape3, wlPrice, wlStartTime, groupId } = await createGroupFixture(this.minter, this.signers);
      const beforeBalance = await ethers.provider.getBalance(this.signers.owner.address);
      await withIncreaseTime(10, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, 5, { value: wlPrice.mul(5) });
        const minted = await this.minter.minted(groupId, this.signers.user.address);
        expect(minted).to.eq(5);
      });
      const afterBalance = await ethers.provider.getBalance(this.signers.owner.address);
      expect(afterBalance.sub(beforeBalance)).to.eq(wlPrice.mul(5));
      const balanceOfApe1 = await ape1.balanceOf(this.signers.user.address);
      const balanceOfApe2 = await ape2.balanceOf(this.signers.user.address);
      const balanceOfApe3 = await ape3.balanceOf(this.signers.user.address);
      expect(balanceOfApe1.add(balanceOfApe2).add(balanceOfApe3)).to.eq(5);
    });
    it("should be reverted if sender is not in whitelist before start", async function () {
      const { wlPrice, price, groupId } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(100, async () => {
        await expect(
          this.minter.connect(this.signers.owner).mint(groupId, 5, { value: wlPrice.mul(5) }),
        ).to.be.revertedWith("Not start");
      });
    });
    it("should be reverted if send wrong value", async function () {
      const { wlPrice, groupId } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(100, async () => {
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 5, { value: wlPrice.mul(3) }),
        ).to.be.revertedWith("Wrong payment value");
      });
    });
  });

  describe("mint", function () {
    it("should be reverted before start time", async function () {
      const { price, groupId, wlStartTime, startTime } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(3 * 60, async () => {
        // const block = await ethers.provider.getBlock("latest")
        // console.log(block.timestamp, wlStartTime, startTime)
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 5, { value: price.mul(5) }),
        ).to.be.revertedWith("Not start");
      });
    });
    it("should be reverted if send wrong value", async function () {
      const { price, groupId } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(6 * 60, async () => {
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 5, { value: price.mul(2) }),
        ).to.be.revertedWith("Wrong payment value");
      });
    });
    it("should be reverted if exceeded max mint amount", async function () {
      const { price, groupId, maxPerWallet } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(6 * 60, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, maxPerWallet, { value: price.mul(5) });
        await expect(
          this.minter.connect(this.signers.user).mint(groupId, 1, { value: price.mul(1) }),
        ).to.be.revertedWith("Exceeded max mint amount");
      });
    });
    it("should be reverted if no apes left", async function () {
      const { price, groupId } = await createGroupFixture(this.minter, this.signers);
      await withIncreaseTime(6 * 60, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, 5, { value: price.mul(5) });
        await this.minter.connect(this.signers.owner).mint(groupId, 5, { value: price.mul(5) });
        await this.minter.connect(this.signers.admin).mint(groupId, 5, { value: price.mul(5) });
        const mintable = await this.minter.mintableApes(groupId);
        expect(mintable.maxMintable).to.eq(0);
        await expect(
          this.minter.connect(this.signers.minter).mint(groupId, 1, { value: price.mul(1) }),
        ).to.be.revertedWith("No apes left");
      });
    });
    it("should succeed and send payment value to recipient", async function () {
      const { ape1, ape2, ape3, price, groupId } = await createGroupFixture(this.minter, this.signers);
      const beforeBalance = await ethers.provider.getBalance(this.signers.owner.address);
      await withIncreaseTime(6 * 60, async () => {
        await this.minter.connect(this.signers.user).mint(groupId, 3, { value: price.mul(3) });
        const minted = await this.minter.minted(groupId, this.signers.user.address);
        expect(minted).to.eq(3);
      });
      const afterBalance = await ethers.provider.getBalance(this.signers.owner.address);
      expect(afterBalance.sub(beforeBalance)).to.eq(price.mul(3));
      const balanceOfApe1 = await ape1.balanceOf(this.signers.user.address);
      const balanceOfApe2 = await ape2.balanceOf(this.signers.user.address);
      const balanceOfApe3 = await ape3.balanceOf(this.signers.user.address);
      expect(balanceOfApe1.add(balanceOfApe2).add(balanceOfApe3)).to.eq(3);
    });
  });
});
