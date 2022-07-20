import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Ape, Ape__factory, Factory, Factory__factory } from "../src/types";
import { Signers } from "./types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.minter = signers[1];
    this.signers.owner = signers[2];
  });

  describe("Factory", function () {
    beforeEach(async function () {
      const factory: Factory__factory = <Factory__factory>await ethers.getContractFactory("Factory");
      this.factory = <Factory>await factory.connect(this.signers.admin).deploy();
      await this.factory.deployed();
    });

    describe("createApe", function () {
      it("should create ape contract", async function () {
        const tx = await this.factory.createApe(
          "Nervape",
          "NERVAPE",
          "https://example.com/nervape/",
          this.signers.minter.address,
          this.signers.owner.address,
          10,
        );
        const receipt = await tx.wait();
        const event = receipt?.events?.find(e => e.event === "ApeCreated");
        const apeAddress = event?.args?.ape;

        const apeFactory: Ape__factory = <Ape__factory>await ethers.getContractFactory("Ape");
        const ape: Ape = <Ape>await apeFactory.attach(apeAddress);

        expect(await ape.minter()).to.eq(this.signers.minter.address);
        expect(await ape.owner()).to.eq(this.signers.owner.address);
      });

      it("should be reverted if create ape with same name and sybmol", async function () {
        await this.factory.createApe(
          "Nervape",
          "NERVAPE",
          "https://example.com/nervape/",
          this.signers.minter.address,
          this.signers.owner.address,
          10,
        );
        await expect(
          this.factory.createApe(
            "Nervape",
            "NERVAPE",
            "https://example.com/nervape/",
            this.signers.minter.address,
            this.signers.owner.address,
            10,
          ),
        ).to.be.revertedWith("Ape exists");
      });
    });

    describe("allApesLength", function () {
      it("returns count of created apes", async function () {
        await this.factory.createApe(
          "Nervape1",
          "NERVAPE1",
          "https://example.com/nervape/",
          this.signers.minter.address,
          this.signers.owner.address,
          10,
        );
        await this.factory.createApe(
          "Nervape2",
          "NERVAPE2",
          "https://example.com/nervape/",
          this.signers.minter.address,
          this.signers.owner.address,
          10,
        );
        const length = await this.factory.allApesLength();
        expect(length).to.eq(2);
      });
    });
  });
});
