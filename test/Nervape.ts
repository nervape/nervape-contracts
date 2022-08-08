import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Nervape, Nervape__factory } from "../src/types";
import { Signers } from "./types";

describe("Nervape", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.minter = signers[1];
    this.signers.owner = signers[2];
    this.signers.user = signers[3];
    this.bridge = signers[4];
  });

  beforeEach(async function () {
    const apeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
    this.nervape = <Nervape>await apeFactory.deploy("Nervape Character", "NAPE", "uri");
    await this.nervape.deployed();
    await this.nervape.setMinter(this.signers.minter.address);
    await this.nervape.addNewClass(3);
  });

  describe("addNewClass", function () {
    it("should add new class by owner with max supply", async function () {
      expect(await this.nervape.maxSupplyOfClass(1)).to.eq(3);
    });
    it("max supply should be less than 10000", async function () {
      await expect(this.nervape.addNewClass(10001)).to.be.revertedWith("Max supply exceeds 10000");
    });
  });

  describe("totalSupplyOfClass", function () {
    it("returns total supply of class", async function () {
      expect(await this.nervape.totalSupplyOfClass(1)).to.eq(0);
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      expect(await this.nervape.totalSupplyOfClass(1)).to.eq(1);
    });
  });

  describe("maxSupplyOfClass", function () {
    it("returns max supply of class", async function () {
      expect(await this.nervape.maxSupplyOfClass(1)).to.eq(3);
      this.nervape.addNewClass(256);
      expect(await this.nervape.maxSupplyOfClass(2)).to.eq(256);
    });
  });

  describe("mint", function () {
    it("should mint to destination address ", async function () {
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      expect(await this.nervape.totalSupply()).to.eq(1);
      expect(await this.nervape.totalSupplyOfClass(1)).to.eq(1);
      expect(await this.nervape.balanceOf(this.signers.user.address)).to.eq(1);
    });
    it("should be reverted if exceeds max supply", async function () {
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      await expect(this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address)).to.be.revertedWith(
        "Exceeded max supply",
      );
    });
    it("should only be minted by minter", async function () {
      await expect(this.nervape.connect(this.signers.admin).mint(1, this.signers.user.address)).to.be.revertedWith(
        "Not minter",
      );
    });
  });

  describe("bridgeMint", function () {
    it("should only be minted by bridge", async function () {
      await expect(this.nervape.connect(this.bridge).bridgeMint(this.signers.user.address, 10000)).to.be.revertedWith(
        "Not bridge",
      );
      await this.nervape.setBridge(this.bridge.address);
      await expect(this.nervape.connect(this.bridge).bridgeMint(this.signers.user.address, 10000)).to.not.reverted;
    });
  });

  describe("tokensOfOwnerByClass", function () {
    it("should returns tokens of owner by class", async function () {
      await this.nervape.addNewClass(10); // class id = 2
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(2, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(2, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(1, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(2, this.signers.user.address);
      await this.nervape.connect(this.signers.minter).mint(2, this.signers.user.address);

      const tokensOfClass1 = await this.nervape.tokensOfOwnerByClass(this.signers.user.address, 1);
      const tokensOfClass2 = await this.nervape.tokensOfOwnerByClass(this.signers.user.address, 2);

      expect(tokensOfClass1.length).to.eq(3);
      expect(tokensOfClass2.length).to.eq(4);
    });
  });
});
