import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

// import type { Factory, Greeter } from "../src/types";

declare module "mocha" {
  export interface Context {
    // greeter: Greeter;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  minter: SignerWithAddress;
  owner: SignerWithAddress;
  user: SignerWithAddress;
  user2: SignerWithAddress;
  user3: SignerWithAddress;
}
