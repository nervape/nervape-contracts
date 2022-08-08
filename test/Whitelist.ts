import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Whitelist, Whitelist__factory } from "../src/types";
import { Signers } from "./types";

describe("Whitelist", function () {
  before(async function () {
    this.signers = {} as Signers;
    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.minter = signers[1];
    this.signers.owner = signers[2];
    this.signers.user = signers[3];
  });

  beforeEach(async function () {
    const whitelistFactory: Whitelist__factory = <Whitelist__factory>await ethers.getContractFactory("Whitelist");
    this.whitelist = <Whitelist>await whitelistFactory.deploy();
    await this.whitelist.deployed();
  });

  describe("add", function () {
    it("should add addresses to grouped whitelist", async function () {
      const groupId = 1;
      await this.whitelist.add(groupId, [this.signers.user.address, this.signers.minter.address]);
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.user.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.minter.address)).to.be.true;
    });
    it("should be ok if add duplicated addresses", async function () {
      const groupId = 1;
      await this.whitelist.add(groupId, [this.signers.user.address, this.signers.minter.address]);
      await this.whitelist.add(groupId, [this.signers.user.address, this.signers.owner.address]);
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.user.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.minter.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.owner.address)).to.be.true;
    });
    it("should only be added by owner", async function () {
      await expect(
        this.whitelist.connect(this.signers.user).add(1, [this.signers.user.address, this.signers.minter.address]),
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("same address add to different groups", async function () {
      const groupIdOne = 1;
      const groupIdTwo = 2;
      await this.whitelist.add(groupIdOne, [this.signers.user.address, this.signers.minter.address]);
      await this.whitelist.add(groupIdTwo, [this.signers.user.address, this.signers.owner.address]);
      expect(await this.whitelist.isWhitelisted(groupIdOne, this.signers.user.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupIdOne, this.signers.minter.address)).to.be.true;

      expect(await this.whitelist.isWhitelisted(groupIdTwo, this.signers.user.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupIdTwo, this.signers.owner.address)).to.be.true;
    });
  });

  describe("remove", function () {
    it("should remove addresses from grouped whitelist", async function () {
      const groupId = 1;
      await this.whitelist.add(groupId, [this.signers.user.address, this.signers.minter.address]);
      await this.whitelist.connect(this.signers.admin).remove(groupId, [this.signers.user.address]);
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.minter.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.user.address)).to.be.false;
    });

    it("should be no effect if removing addresses is not in whitelist", async function () {
      const groupId = 1;
      await this.whitelist.add(groupId, [this.signers.user.address, this.signers.minter.address]);

      await expect(this.whitelist.remove(groupId, [this.signers.user.address, this.signers.owner.address])).to.not
        .reverted;
    });
  });

  describe("isWhitelisted", function () {
    it("should return true if in whitelist, or returns false", async function () {
      const groupId = 1;
      await this.whitelist.add(groupId, [this.signers.user.address, this.signers.minter.address]);
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.user.address)).to.be.true;
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.owner.address)).to.be.false;

      await this.whitelist.remove(groupId, [this.signers.user.address]);
      expect(await this.whitelist.isWhitelisted(groupId, this.signers.user.address)).to.be.false;
    });
  });
});
