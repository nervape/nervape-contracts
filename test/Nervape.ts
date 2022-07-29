import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Nervape, Nervape__factory } from "../src/types";
import { Signers } from "./types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.minter = signers[1];
    this.signers.owner = signers[2];
    this.signers.user = signers[3];
  });

  describe("Ape", function () {
    beforeEach(async function () {
      const apeFactory: Ape__factory = <Ape__factory>await ethers.getContractFactory("Ape");
      this.ape = <Ape>(
        await apeFactory.connect(this.signers.admin).deploy("Nervape", "NERVAPE", "uri", this.signers.minter.address, 3)
      );
      await this.ape.deployed();
    });

    describe("mint", function () {
      it("should mint to destination address ", async function () {
        await this.ape.connect(this.signers.minter).mint(this.signers.user.address);
        expect(await this.ape.totalSupply()).to.eq(1);
        expect(await this.ape.balanceOf(this.signers.user.address)).to.eq(1);
      });
      it("should be reverted if exceeds max supply", async function () {
        await this.ape.connect(this.signers.minter).mint(this.signers.user.address);
        await this.ape.connect(this.signers.minter).mint(this.signers.user.address);
        await this.ape.connect(this.signers.minter).mint(this.signers.user.address);
        await expect(this.ape.connect(this.signers.minter).mint(this.signers.user.address)).to.be.revertedWith(
          "Exceeded max supply",
        );
      });
      it("should only be minted by minter", async function () {
        await this.ape.connect(this.signers.minter).mint(this.signers.user.address);
        await expect(this.ape.connect(this.signers.admin).mint(this.signers.user.address)).to.be.revertedWith(
          "Not minter",
        );
      });
    });
  });
});
