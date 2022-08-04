// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {
    mapping(uint256 => mapping(address => bool)) public isWhitelisted;

    function add(uint256 groupId, address[] calldata addrs) external onlyOwner {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (!isWhitelisted[groupId][addrs[i]]) {
                isWhitelisted[groupId][addrs[i]] = true;
            }
        }
    }

    function remove(uint256 groupId, address[] calldata addrs) external onlyOwner {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (isWhitelisted[groupId][addrs[i]]) {
                isWhitelisted[groupId][addrs[i]] = false;
            }
        }
    }
}
