import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { Nervape, Nervape__factory } from "../../src/types";
import { getDeployment } from "../helpers";

task("deploy:addSceneClass").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const scene = getDeployment(network.name, "SceneProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(scene);
  // const tx = await nervape.addNewClass(77, 0); // Xmas NFT
  // const receipt = await tx.wait()
  // console.log("addSceneClass = ", receipt.status)

  // const tx = await nervape.setMinter(signers[0].address)
  // const receipt = await tx.wait()
  // console.log("setMinter = ", receipt.status)
});

task("deploy:mintScene").setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const nervapeFactory = <Nervape__factory>await ethers.getContractFactory("Nervape");
  const scene = getDeployment(network.name, "SceneProxy");
  const nervape = <Nervape>await nervapeFactory.connect(signers[0]).attach(scene);

  const addrs = [
    // "0x437AD8a22CeeD33cBC4e661f8ef33D57a390d287",
    // "0x048ac0fC448a8A4342155a0c02b6EB3088613033",
    // "0xf52848Bf768ed2964C81171ef48dbf687c248cE8",
    // "0x4E59d266048217485b1622a87debee4B676E1d90",
    // "0x7ca85830a18A7F0eBc9323AEb00F81C57Fa6695B",
    // "0x18F078Fb01965b73e717fBbCDA71De4Cc89cA89d",
    // "0x212666590F54f6965E21b14e3687F64A50f13912",
    // "0x07AA2Dd2D517754b28a3D7e5e3Fa45FC33022165",
    // "0x1F07b0f01944fA620C5E260d4D64aB8A32Cb25f5",
    // "0x083Ff6A059858F4288DeFad35c3AB6533B30Ccc3",
    // "0x3c3f4bE5bAb9d49358Acc8920087E48259DEc1Fd",
    // "0x0a6161E0877702273806FA464517b5EC13AcE343",
    // "0x2464E8F7809c05FCd77C54292c69187Cb66FE294",
    // "0x07AA2Dd2D517754b28a3D7e5e3Fa45FC33022165",
    // "0x327b0c7EdB1efFD6d1325DA8d9f2ce92d633C840",
    // "0x7846e738f5509A23de53820FEa3031EBe4deF351",
    // "0x53909bcC8eEE8E648d7B3ee6Bf412612AC042245",
    // "0x314923f06C408B1eb0F22ccf0cCeC628A6f40333",
    // "0x7a4C2c5EC24a6165e07800e7E500e93c8D6cE1BE",
    // "0xc415797A2de593170ea92615DD430121e594C4a7",
    // "0x681EF7e7864c37f8882B0F1E73Cd42dAC3285305",
    // "0xb69Fc0cb48E6aD3797098C3aCAd993e4dD215B49",
    // "0x4A451E82704e015Fa93b4403c0e4ace4ecc04F2c",
    // "0x0deE55444Cb7d831ADb0dEE488cD3AFf29CD157b",
    // "0xe568C0DDfad18FD631E1Ee155373e2D02DB6723f",
    // "0x1434A94f2d9d9BBDFDfa1f5d526458fEde0c4FE5",
    // "0x06Ca02F49597Dfd2BEd74C5627C9765DbDED1d47",

    // "0x0D0Ee8453A0dD6BEd0208E0651D290F51fD1eA4c",
    // "0x4A6269005EF0B99d7EE7E29C5c1F5b4b00b09811",
    // "0x9c8E9b74E1C02d115fe4479F82D849a24D113bb4",
    // "0xDCDBC5eF852964945bA5D4772B26dAcFFcD9F59d",
    // "0x6a313C7f358f84C61833115c40Cb8191877dc120",
    // "0xc3d0BffE14B6F0c38E4E245CEaCB4D6F01D9D5d9",
    // "0x9af949b055AED3429B93D1b81cCaB5Ea731675Cb",

    // "0xDb1e5634fca44EcD4d1c459E1eEf9E162Bfa11B0",
    // "0xE286ddaDf97Eeede91A5dDBAF096D3F4110247ff",
    // "0xD5c5C60cD8dd104bEFbef4BE97010fc0386e89c7",
    // "0x9c8E9b74E1C02d115fe4479F82D849a24D113bb4",
    // "0x0Ebf21b38b85763436e3F76534d626A1743b6061",

    // "0x91e0b2dF90601D969415413bCB3B5d7540e34210",
    // "0x62Bb3aA883A0cdb278da3C5D646F19574E883970",
    // "0xe7619cFcA7C239471675102440c1FAc1e9F5170B",
    // "0xb9BBd31B5711Bd5FD5Da8b286A3364C510b9368A",
    // "0xC106D3DF35d3eef7f6B0e532678d173153F0Bc76",
    // "0x68DbEBEAa527009430779257b77A06aEED576a29",
    // "0x30b25eaac7f8b28784af6c970447552d5c14fd1e",
    // "0x171d30E63b3d0d6e3202433B0dE62Edc9091FEd3",
    // "0x9A683846F3e92bc0FcE5fCC6b1c4f1390563642f",
    // "0xb92c714dD463A1aC38EE287731397E260586b809",
    // "0x03Ffd3254870440c4a087d20179362FccD5b19AC",
    // "0xfEA4E16162885db20A254ae39B6EF0b6Da402Fa6",
    // "0x976aBe97C93Aa5856d4E033e48E95EBaFed591eB",
    // "0x30B06CcE891ea8361aE33E0a49B8728c8d5ffa36",
    // "0xa9CA00294e8D418923Ab9c3b83786A0B7CEeF3D0",
    // "0x92567E14d3B9d7132Ec98483cffe9A2d252f7ac0",
    // "0xD337960B75B6D366BA470081c5471f74A45d0B07",
    // "0x03c0aCBE2A0209fb4fCE181AA3F0b6A5B9E33c30",
    // "0xF41C3AE5aAd07fD21fc57BcB1FEa01377f67988f",
    // "0xF3190E3d2B770F3b1881DF83e7aa4f41C5c0F529",
    // "0x2e12Fd37E367270B10d6f8F363e4b9c9B5973B61",
    // "0xdc2d0283b6d09fa1c78ca1a6ffda7546d345b70b",
    // "0x7C3Fb017A47451bb6C5F58b63D60Ca57dfc867e0",
    // "0xC75E787e7f2656597ed8dDc8f0c6E74b3f624551",
    // "0x6B97B598BFF021f1d191700FFE6f2F84032b67D3",
    // "0x7846e738f5509A23de53820FEa3031EBe4deF351",
    // "0x0deE55444Cb7d831ADb0dEE488cD3AFf29CD157b",
    // "0x32b0cb6280994dee658b966c99e5348ea0202c36",

    "0xA3012d34c6275E7fEBF227Db4E9e8D9940d3cd59",
    "0x285e5E3ffa9A99f666182Ac99ee586bd46Fa023d",
    "0x4DDCaF30b541Ea18CD5b4829170664266180aa39",
    "0x1d973285E9097dc56110b95a77Ae8c340aE1DB94",
  ];

  for (let addr of addrs) {
    const tx = await nervape.mint(3, addr);
    const receipt = await tx.wait();
    console.log("minted = ", addr, tx.hash, receipt.status);
  }
});
