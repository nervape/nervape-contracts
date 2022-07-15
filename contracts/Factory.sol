// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Ape.sol";

contract Factory is Ownable {
    mapping(bytes32 => address) public apes;
    address[] public allApes;

    event ApeCreated(address ape);

    function createApe(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        address minter_,
        address owner_,
        uint256 maxSupply_
    ) external onlyOwner {
        bytes32 salt = keccak256(abi.encodePacked(name_, symbol_));
        require(apes[salt] == address(0), "Ape exists");
        Ape ape = new Ape{ salt: salt }(name_, symbol_, uri_, minter_, maxSupply_);
        ape.transferOwnership(owner_);
        apes[salt] = address(ape);
        allApes.push(address(ape));
        emit ApeCreated(address(ape));
    }

    function allApesLength() external view returns (uint256) {
        return allApes.length;
    }
}
