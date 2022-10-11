import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Creatape, Creatape__factory } from "../src/types";
import { Signers } from "./types";

describe("Creatape", function () {
  before(async function () {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.admin = signers[0];
    this.signer = signers[1];
    this.user = signers[2];
  });

  beforeEach(async function () {
    const factory: Creatape__factory = <Creatape__factory>await ethers.getContractFactory("Creatape");
    this.creatape = <Creatape>await factory.deploy();
    await this.creatape.deployed();
    await this.creatape.setSigner(this.signer.address);
  });

  describe("mint", function () {
    it("should mint successfully", async function () {
      const deadline = parseInt((Date.now() / 1000 + 5 * 60 * 60).toString());
      const msg = ethers.utils.solidityPack(["address", "uint256", "uint256"], [this.user.address, 0, deadline]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      const { v, r, s } = ethers.utils.splitSignature(signature);
      await this.creatape.connect(this.user).mint(deadline, v, r, s);
      expect(await this.creatape.balanceOf(this.user.address)).to.eq(1);
    });
    it("should be reverted if given invalid nonce", async function () {
      const deadline = parseInt((Date.now() / 1000 + 5 * 60 * 60).toString());
      const msg = ethers.utils.solidityPack(["address", "uint256", "uint256"], [this.user.address, 1, deadline]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      const { v, r, s } = ethers.utils.splitSignature(signature);
      await expect(this.creatape.connect(this.user).mint(deadline, v, r, s)).to.be.revertedWith("Invalid signature");
    });
    it("should be reverted if expired", async function () {
      const now = parseInt((Date.now() / 1000).toString());
      const deadline = now - 5 * 60 * 60;
      const msg = ethers.utils.solidityPack(["address", "uint256", "uint256"], [this.user.address, 1, deadline]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      const { v, r, s } = ethers.utils.splitSignature(signature);
      await expect(this.creatape.connect(this.user).mint(deadline, v, r, s)).to.be.revertedWith("Expired deadline");
    });
    it("should be reverted if exceeded mint limit", async function () {
      for (let i = 0; i < 3; i++) {
        const deadline = parseInt((Date.now() / 1000 + 5 * 60 * 60).toString());
        const msg = ethers.utils.solidityPack(["address", "uint256", "uint256"], [this.user.address, i, deadline]);
        const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
        const { v, r, s } = ethers.utils.splitSignature(signature);
        await this.creatape.connect(this.user).mint(deadline, v, r, s);
      }
      expect(await this.creatape.balanceOf(this.user.address)).to.eq(3);

      const deadline = parseInt((Date.now() / 1000 + 5 * 60 * 60).toString());
      const msg = ethers.utils.solidityPack(["address", "uint256", "uint256"], [this.user.address, 3, deadline]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      const { v, r, s } = ethers.utils.splitSignature(signature);
      await expect(this.creatape.connect(this.user).mint(deadline, v, r, s)).to.be.revertedWith(
        "Exceeded max mint amount",
      );
    });
  });
});
