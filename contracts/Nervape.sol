// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Nervape is ERC721Enumerable, Ownable {
    uint256 public price = 100 ether;
    string private uri;

    constructor() ERC721("Nervape", "NAPE") {}

    function setBaseURI(string memory _uri) external onlyOwner {
        uri = _uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return uri;
    }

    function mint(uint256 count) external payable {
        require(msg.value == count * price, "Wrong value");
        for (uint256 i = 0; i < count; i++) {
            _safeMint(msg.sender, totalSupply());
        }
    }
}
