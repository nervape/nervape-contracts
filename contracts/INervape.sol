// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";

interface INervape is IERC721EnumerableUpgradeable {
    function bridgeMint(address to, uint256 tokenId) external;

    function mint(uint256 classId, address to) external returns (uint256);

    function totalSupplyOfClass(uint256 classId) external view returns (uint256);

    function maxSupplyOfClass(uint256 classId) external view returns (uint256);

    function classOf(uint256 tokenId) external view returns (uint256);

    function mintable(uint256 classId) external view returns (uint256);
}
