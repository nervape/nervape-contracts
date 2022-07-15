// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Ape is ERC721Enumerable, Ownable {
    string private _uri;
    address public minter;
    uint256 public maxSupply;

    modifier onlyMinter() {
        require(msg.sender == minter, "Not minter");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        address minter_,
        uint256 maxSupply_
    ) ERC721(name_, symbol_) {
        _uri = uri_;
        minter = minter_;
        maxSupply = maxSupply_;
    }

    function setBaseURI(string memory uri_) external onlyOwner {
        _uri = uri_;
    }

    function setMinter(address minter_) external onlyOwner {
        minter = minter_;
    }

    function _baseURI() internal view override returns (string memory) {
        return _uri;
    }

    function mint(address to) external onlyMinter {
        require(totalSupply() < maxSupply, "Exceeded max supply");
        _safeMint(to, totalSupply());
    }
}
