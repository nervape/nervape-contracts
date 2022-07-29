// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Nervape.sol";

contract NervapeFactory is Ownable {
    mapping(bytes32 => address) public collections;
    address[] public allCollections;

    event CollectionCreated(address ape);

    function createCollection(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        address minter_,
        address owner_,
        uint256 maxSupply_
    ) external onlyOwner {
        bytes32 salt = keccak256(abi.encodePacked(name_, symbol_));
        require(collections[salt] == address(0), "Nervape exists");
        Nervape nervape = new Nervape{ salt: salt }(name_, symbol_, uri_, minter_, maxSupply_);
        nervape.transferOwnership(owner_);
        collections[salt] = address(nervape);
        allCollections.push(address(nervape));
        emit CollectionCreated(address(nervape));
    }

    function allCollectionsLength() external view returns (uint256) {
        return allCollections.length;
    }
}
