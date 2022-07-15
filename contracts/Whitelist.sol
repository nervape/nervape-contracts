// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {
    mapping(uint256 => address[]) public whiteAddresses;
    mapping(uint256 => mapping(address => uint256)) public whiteAddressIndexes;

    function add(uint256 groupId, address[] calldata addrs) external onlyOwner {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (!isWhitelisted(groupId, addrs[i])) {
                whiteAddresses[groupId].push(addrs[i]);
                whiteAddressIndexes[groupId][addrs[i]] = whiteAddresses[groupId].length;
            }
        }
    }

    function remove(uint256 groupId, address[] calldata addrs) external onlyOwner {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (isWhitelisted(groupId, addrs[i])) {
                uint256 index = whiteAddressIndexes[groupId][addrs[i]];
                address lastAddr = whiteAddresses[groupId][whiteAddresses[groupId].length - 1];
                whiteAddresses[groupId][index] = lastAddr;
                whiteAddresses[groupId].pop();
                whiteAddressIndexes[groupId][lastAddr] = index;
                delete whiteAddressIndexes[groupId][addrs[i]];
            }
        }
    }

    function isWhitelisted(uint256 groupId, address addr) public view returns (bool) {
        return whiteAddressIndexes[groupId][addr] > 0;
    }
}