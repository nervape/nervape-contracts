// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface INervape is IERC721Enumerable {
    function mint(address to) external;

    function maxSupply() external view returns (uint256);
}
