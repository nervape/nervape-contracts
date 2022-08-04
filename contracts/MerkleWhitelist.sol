// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// Merkle whitelist for gas saving
contract MerkleWhitelist is Ownable {
    bytes32 public merkleRoot;

    function setMerkleRoot(bytes32 root) external onlyOwner {
        merkleRoot = root;
    }

    function isWhitelisted(address account, bytes32[] calldata proof) public view returns (bool) {
        bytes32 leaf = bytes32(uint256(uint160(account)));
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
}
