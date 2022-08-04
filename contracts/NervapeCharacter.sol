// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NervapeCharacter is ERC721Enumerable, Ownable {
    string public baseURI;
    address public minter;
    address public bridge;
    uint16 public currentClassId;
    mapping(uint16 => uint16) _maxSupplies;
    mapping(uint16 => uint16) _totalSupplies;

    modifier onlyMinter() {
        require(msg.sender == minter, "Not minter");
        _;
    }

    modifier onlyBridge() {
        require(msg.sender == bridge, "Not bridge");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        address minter_
    ) ERC721(name_, symbol_) {
        baseURI = uri_;
        minter = minter_;
    }

    function setBaseURI(string memory uri_) external onlyOwner {
        baseURI = uri_;
    }

    function setMinter(address minter_) external onlyOwner {
        minter = minter_;
    }

    function setBridge(address bridge_) external onlyOwner {
        bridge = bridge_;
    }

    function addNewClass(uint16 maxSupply) external onlyOwner {
        currentClassId += 1;
        require(maxSupply <= 10000, "Max supply exceeds 10000");
        _maxSupplies[currentClassId] = maxSupply;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function totalSupplyOfClass(uint16 classId) public view returns (uint16) {
        return _totalSupplies[classId];
    }

    function maxSupplyOfClass(uint16 classId) public view returns (uint16) {
        return _maxSupplies[classId];
    }

    function classOf(uint256 tokenId) public pure returns (uint16) {
        return uint16(tokenId / 10000);
    }

    function tokensOfOwnerByClass(address owner, uint16 classId) public view returns (uint256[] memory) {
        uint256 maxLength = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](maxLength);

        uint256 index = 0;
        for (uint256 i = 0; i < maxLength; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            if (classId == classOf(tokenId)) {
                tokenIds[index++] = tokenId;
            }
        }
        // Downsize the array to fit.
        assembly {
            mstore(tokenIds, index)
        }
        return tokenIds;
    }

    function mintByBridge(address to, uint256 tokenId) external onlyBridge {
        uint16 classId = classOf(tokenId);
        require(totalSupplyOfClass(classId) < maxSupplyOfClass(classId), "Exceeded max supply");
        _totalSupplies[classId] += 1;
        _safeMint(to, tokenId);
    }

    function mint(uint16 classId, address to) external onlyMinter {
        require(totalSupplyOfClass(classId) < maxSupplyOfClass(classId), "Exceeded max supply");
        uint16 lastId = totalSupplyOfClass(classId);
        uint256 tokenId = classId * 10000 + lastId;
        _totalSupplies[classId] += 1;
        _safeMint(to, tokenId);
    }
}
