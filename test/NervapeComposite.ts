import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { NervapeComposite, NervapeComposite__factory } from "../src/types";
import { DEAD_ADDRESS, getNow, withIncreaseTime } from "./helpers";
import { Signers } from "./types";

describe("NervapeComposite", function () {
  before(async function () {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.admin = signers[0];
    this.signer = signers[1];
    this.user = signers[2];
  });

  beforeEach(async function () {
    const factory: NervapeComposite__factory = <NervapeComposite__factory>(
      await ethers.getContractFactory("NervapeComposite")
    );
    this.contract = <NervapeComposite>await factory.deploy();
    await this.contract.deployed();
    await this.contract.setSigner(this.signer.address);

    const now = await getNow();
    const wlStartTime = now - 10;
    const startTime = wlStartTime + 3 * 24 * 3600;
    const endTime = startTime + 7 * 24 * 3600;
    await this.contract.setTimes(wlStartTime, startTime, endTime);
    await this.contract.setMintMax(2);
  });

  describe("mint", function () {
    it("should mint successfully", async function () {
      // const msg = ethers.utils.solidityPack(["address", "uint256"], [ this.user.address, 1 ]);
      // console.log("msg == ", msg, ethers.utils.arrayify(msg))
      const msg = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      await withIncreaseTime(3 * 24 * 3600 + 11, async () => {
        await this.contract.connect(this.user).mint(1, signature);
        expect(await this.contract.balanceOf(this.user.address)).to.eq(1);
      });
    });

    it("should be reverted if already minted", async function () {
      const msg = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      await withIncreaseTime(3 * 24 * 3600 + 11, async () => {
        await this.contract.connect(this.user).mint(1, signature);
        await expect(this.contract.connect(this.user).mint(1, signature)).to.be.revertedWith("Minted");
      });
    });

    it("should be reverted if given invalid outer id", async function () {
      const msg = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));
      await withIncreaseTime(3 * 24 * 3600 + 11, async () => {
        await expect(this.contract.connect(this.user).mint(2, signature)).to.be.revertedWith("Invalid signature");
      });
    });

    it("should be reverted if mint ended", async function () {
      const msg = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));

      await withIncreaseTime(3 * 24 * 3600 + 7 * 24 * 3600 + 11, async () => {
        await expect(this.contract.connect(this.user).mint(1, signature)).to.be.revertedWith("Ended");
      });
    });

    it("should be reverted if mint not start", async function () {
      const msg = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const signature = await this.signer.signMessage(ethers.utils.arrayify(msg));

      await withIncreaseTime(3 * 24 * 3600 - 20, async () => {
        await expect(this.contract.connect(this.user).mint(1, signature)).to.be.revertedWith("Not start");
      });
    });
  });

  describe("bonelistMint", function () {
    it("should be reverted if not start", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const msg2 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 2]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      const signature2 = await this.signer.signMessage(ethers.utils.arrayify(msg2));

      await withIncreaseTime(-100, async () => {
        await expect(
          this.contract.connect(this.user).bonelistMint([1, 2], [signature1, signature2]),
        ).to.be.revertedWith("Not start");
      });
    });

    it("should be reverted if ended", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const msg2 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 2]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      const signature2 = await this.signer.signMessage(ethers.utils.arrayify(msg2));

      await withIncreaseTime(3 * 24 * 3600 + 11, async () => {
        await expect(
          this.contract.connect(this.user).bonelistMint([1, 2], [signature1, signature2]),
        ).to.be.revertedWith("Ended");
      });
    });

    it("should mint all 2 items successfully", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const msg2 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 2]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      const signature2 = await this.signer.signMessage(ethers.utils.arrayify(msg2));

      await withIncreaseTime(20, async () => {
        await this.contract.connect(this.user).bonelistMint([1, 2], [signature1, signature2]);
        await expect(await this.contract.balanceOf(this.user.address)).to.eq(2);
      });
    });

    it("should mint 1 by 1 successfully", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const msg2 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 2]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      const signature2 = await this.signer.signMessage(ethers.utils.arrayify(msg2));

      await withIncreaseTime(20, async () => {
        await this.contract.connect(this.user).bonelistMint([1], [signature1]);
        await expect(await this.contract.balanceOf(this.user.address)).to.eq(1);
        await this.contract.connect(this.user).bonelistMint([2], [signature2]);
        await expect(await this.contract.balanceOf(this.user.address)).to.eq(2);
      });
    });

    it("should be reverted if already minted all", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const msg2 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 2]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      const signature2 = await this.signer.signMessage(ethers.utils.arrayify(msg2));

      await withIncreaseTime(20, async () => {
        await this.contract.connect(this.user).bonelistMint([1, 2], [signature1, signature2]);
        expect(await this.contract.balanceOf(this.user.address)).to.eq(2);
        await expect(
          this.contract.connect(this.user).bonelistMint([1, 2], [signature1, signature2]),
        ).to.be.revertedWith("Minted");
      });
    });

    it("should be reverted if given invalid outer ids", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const msg2 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 2]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      const signature2 = await this.signer.signMessage(ethers.utils.arrayify(msg2));

      await withIncreaseTime(20, async () => {
        await expect(
          this.contract.connect(this.user).bonelistMint([1, 3], [signature1, signature2]),
        ).to.be.revertedWith("Invalid signature");
      });
    });

    it("should be reverted if mint twice with same params", async function () {
      const msg1 = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [this.user.address, 1]);
      const signature1 = await this.signer.signMessage(ethers.utils.arrayify(msg1));
      await withIncreaseTime(20, async () => {
        await this.contract.connect(this.user).bonelistMint([1], [signature1]);
        await expect(this.contract.connect(this.user).bonelistMint([1], [signature1])).to.be.revertedWith(
          "Existed hash",
        );
      });
    });
  });
});
