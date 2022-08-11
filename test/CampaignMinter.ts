import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers, network } from "hardhat";

import type {
  CampaignMinter,
  CampaignMinter__factory,
  GroupMinter,
  GroupMinter__factory,
  Nervape,
  Nervape__factory,
} from "../src/types";
import { Signers } from "./types";

describe("CampaignMinter", function () {
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

  async function createFixture(character: Nervape, scene: Nervape, minter: CampaignMinter, signers: Signers) {
    await character.addNewClass(5, 0); // 1
    await character.addNewClass(3, 0); // 2
    await character.addNewClass(7, 0); // 3
    await character.addNewClass(7, 0); // 4
    await character.addNewClass(7, 0); // 5
    await character.addNewClass(7, 0); // 6

    scene.addNewClass(10, 0); // 1
    await scene.setMinter(minter.address);

    const characterClassIds = [1, 2, 3, 4, 5, 6];
    const sceneClassId = 1;

    const block = await ethers.provider.getBlock("latest");

    const currentCampaign = await minter.totalCampaign();
    const wlPrice = ethers.utils.parseEther("1");
    const price = ethers.utils.parseEther("1.5");
    const now = block.timestamp + 1;
    const claimStartTime = now + 5;
    const claimEndTime = now + 100;
    const startTime = claimEndTime + 5 * 60;
    const maxPerWallet = 5;

    await minter.createCampaign(
      characterClassIds,
      sceneClassId,
      price,
      claimStartTime,
      claimEndTime,
      startTime,
      maxPerWallet,
    );
    const campaignId = currentCampaign.add(1).toNumber();

    return {
      campaignId,
      characterClassIds,
      sceneClassId,
      price,
      claimStartTime,
      claimEndTime,
      startTime,
      maxPerWallet,
    };
  }

  beforeEach(async function () {
    const nervapeFactory: Nervape__factory = <Nervape__factory>await ethers.getContractFactory("Nervape");
    this.character = <Nervape>await nervapeFactory.deploy("Nervape character", "NAPE", "uri");
    await this.character.deployed();

    this.scene = <Nervape>await nervapeFactory.deploy("Nervape scene", "NSCENE", "uri");
    await this.scene.deployed();

    const minterFactory: CampaignMinter__factory = <CampaignMinter__factory>(
      await ethers.getContractFactory("CampaignMinter")
    );
    this.minter = <CampaignMinter>(
      await minterFactory
        .connect(this.signers.admin)
        .deploy(this.character.address, this.scene.address, this.signers.owner.address)
    );
    await this.minter.deployed();
  });

  it("should deploy successfully", async function () {
    expect(await this.minter.recipient()).to.eq(this.signers.owner.address);
  });

  describe("createCampaign", function () {
    it("should create a new campaign", async function () {
      const currentCampaign = await this.minter.totalCampaign();
      await createFixture(this.character, this.scene, this.minter, this.signers);
      const createdCampaign = await this.minter.totalCampaign();
      expect(createdCampaign).to.eq(currentCampaign.toNumber() + 1);
    });
  });

  describe("setRecipient", function () {
    it("should update recipient", async function () {
      await createFixture(this.character, this.scene, this.minter, this.signers);
      await this.minter.setRecipient(this.signers.user.address);
      const newRecipient = await this.minter.recipient();
      expect(newRecipient).to.eq(this.signers.user.address);
    });
    it("should be reverted if set to invalid address", async function () {
      await createFixture(this.character, this.scene, this.minter, this.signers);
      await expect(this.minter.setRecipient("0x0000000000000000000000000000000000000000")).to.be.reverted;
    });
  });

  describe("claim", function () {
    it("should be reverted before start or after end", async function () {
      const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
        this.character,
        this.scene,
        this.minter,
        this.signers,
      );
      await this.character.setMinter(this.signers.minter.address);
      for (let i = 0; i < characterClassIds.length; i++) {
        await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
      }

      const tokenIds = [10000, 20000, 30000, 40000, 50000, 60000];

      await withIncreaseTime(-60, async () => {
        await expect(this.minter.connect(this.signers.user).claim(campaignId, tokenIds)).to.be.revertedWith(
          "Campaign has not started",
        );
      });

      await withIncreaseTime(200, async () => {
        // const block = await ethers.provider.getBlock("latest")
        // console.log(block.timestamp, claimEndTime)
        await expect(this.minter.connect(this.signers.user).claim(campaignId, tokenIds)).to.be.revertedWith(
          "Campaign has ended",
        );
      });
    });

    it("should be reverted if wrong tokens length", async function () {
      const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
        this.character,
        this.scene,
        this.minter,
        this.signers,
      );
      await this.character.setMinter(this.signers.minter.address);
      for (let i = 0; i < characterClassIds.length; i++) {
        await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
      }

      const tokenIds = [10000, 20000, 30000, 40000, 50000];

      await withIncreaseTime(50, async () => {
        // const block = await ethers.provider.getBlock("latest")
        // console.log(block.timestamp, claimEndTime)
        await expect(this.minter.connect(this.signers.user).claim(campaignId, tokenIds)).to.be.revertedWith(
          "Invalid tokens length",
        );
      });
    });
    it("should be reverted if include wrong token", async function () {
      const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
        this.character,
        this.scene,
        this.minter,
        this.signers,
      );
      await this.character.setMinter(this.signers.minter.address);
      for (let i = 0; i < characterClassIds.length; i++) {
        await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
      }
      await this.character.connect(this.signers.minter).mint(1, this.signers.user.address);

      const tokenIds = [10000, 10001, 30000, 40000, 50000, 60000];

      await withIncreaseTime(50, async () => {
        // const block = await ethers.provider.getBlock("latest")
        // console.log(block.timestamp, claimEndTime)
        await expect(this.minter.connect(this.signers.user).claim(campaignId, tokenIds)).to.be.revertedWith(
          "Invalid character",
        );
      });
    });

    it("should claim scene nft", async function () {
      const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
        this.character,
        this.scene,
        this.minter,
        this.signers,
      );
      await this.character.setMinter(this.signers.minter.address);
      for (let i = 0; i < characterClassIds.length; i++) {
        await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
      }

      const tokenIds = [10000, 20000, 30000, 40000, 50000, 60000];

      await withIncreaseTime(50, async () => {
        await this.minter.connect(this.signers.user).claim(campaignId, tokenIds);
        expect(await this.scene.balanceOf(this.signers.user.address)).to.eq(1);
      });
    });

    it("should be revered if token has been participated", async function () {
      const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
        this.character,
        this.scene,
        this.minter,
        this.signers,
      );
      await this.character.setMinter(this.signers.minter.address);
      for (let i = 0; i < characterClassIds.length; i++) {
        await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
      }
      const tokenIds = [10000, 20000, 30000, 40000, 50000, 60000];

      await withIncreaseTime(50, async () => {
        await this.minter.connect(this.signers.user).claim(campaignId, tokenIds);
        await expect(this.minter.connect(this.signers.user).claim(campaignId, tokenIds)).to.be.revertedWith(
          "Already participated",
        );
      });
    });

    describe("claimMany", function () {
      it("should claim many scenes with many tokens", async function () {
        const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
          this.character,
          this.scene,
          this.minter,
          this.signers,
        );
        await this.character.setMinter(this.signers.minter.address);

        for (let i = 0; i < characterClassIds.length; i++) {
          await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
          await this.character.connect(this.signers.minter).mint(characterClassIds[i], this.signers.user.address);
        }

        const tokenIds = [
          [10000, 20000, 30000, 40000, 50000, 60000],
          [10001, 20001, 30001, 40001, 50001, 60001],
        ];

        await withIncreaseTime(50, async () => {
          await this.minter.connect(this.signers.user).claimMany(campaignId, tokenIds);
          expect(await this.scene.balanceOf(this.signers.user.address)).to.eq(2);
        });
      });
    });

    describe("mint", function () {
      it("should be reverted if not start", async function () {
        const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
          this.character,
          this.scene,
          this.minter,
          this.signers,
        );
        await withIncreaseTime(250, async () => {
          await expect(
            this.minter.connect(this.signers.user).mint(campaignId, 2, { value: price.mul(3) }),
          ).to.be.revertedWith("Minting has not started");
        });
      });

      it("should be reverted if give wrong value", async function () {
        const { characterClassIds, price, campaignId, claimStartTime, claimEndTime } = await createFixture(
          this.character,
          this.scene,
          this.minter,
          this.signers,
        );
        await withIncreaseTime(600, async () => {
          await expect(
            this.minter.connect(this.signers.user).mint(campaignId, 1, { value: price.mul(3) }),
          ).to.be.revertedWith("Wrong payment value");
        });
      });

      it("should mint scene successfully", async function () {
        const { characterClassIds, price, sceneClassId, campaignId, claimStartTime, claimEndTime } =
          await createFixture(this.character, this.scene, this.minter, this.signers);

        await withIncreaseTime(600, async () => {
          await this.minter.connect(this.signers.user).mint(campaignId, 2, { value: price.mul(2) });
          expect(await this.scene.totalSupplyOfClass(sceneClassId)).to.eq(2);
        });
      });

      it("should be reverted if exceed max amount per wallet", async function () {
        const { characterClassIds, price, sceneClassId, campaignId, claimStartTime, claimEndTime } =
          await createFixture(this.character, this.scene, this.minter, this.signers);

        await withIncreaseTime(600, async () => {
          await this.minter.connect(this.signers.user).mint(campaignId, 5, { value: price.mul(5) });
          await expect(
            this.minter.connect(this.signers.user).mint(campaignId, 1, { value: price.mul(1) }),
          ).to.be.revertedWith("Exceeded max mint amount");
        });
      });

      it("should send value to recipient after mint", async function () {
        const { characterClassIds, price, sceneClassId, campaignId, claimStartTime, claimEndTime } =
          await createFixture(this.character, this.scene, this.minter, this.signers);

        await withIncreaseTime(600, async () => {
          const balanceBefore = await ethers.provider.getBalance(this.signers.owner.address);
          await this.minter.connect(this.signers.user).mint(campaignId, 2, { value: price.mul(2) });
          const balanceAfter = await ethers.provider.getBalance(this.signers.owner.address);
          expect(balanceAfter.sub(balanceBefore)).to.eq(price.mul(2));
        });
      });
    });
  });
});
