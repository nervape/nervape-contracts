// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface INervape is IERC721Enumerable {
    function mint(uint16 classId, address to) external;

    function totalSupplyOfClass(uint16 classId) external view returns (uint16);

    function maxSupplyOfClass(uint16 classId) external view returns (uint16);

    function classOf(uint256 tokenId) external view returns (uint16);
}
