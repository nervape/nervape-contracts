// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "./INervape.sol";

contract Nervape is INervape, ERC721EnumerableUpgradeable, OwnableUpgradeable {
    string public baseURI;
    address public bridge;
    uint256 public typeId;
    uint256 public lastClassId;

    // map class id to max supply
    mapping(uint256 => uint256) _maxSupplies;
    // map class id to total supply
    mapping(uint256 => uint256) _totalSupplies;
    // map class id to team reserves
    mapping(uint256 => uint256) _reserves;
    // map address to boolean to present minter
    mapping(address => bool) public isMinter;

    modifier onlyMinter() {
        require(isMinter[msg.sender], "Not minter");
        _;
    }

    modifier onlyBridge() {
        require(msg.sender == bridge, "Not bridge");
        _;
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        uint256 typeId_
    ) public initializer {
        __Ownable_init();
        __ERC721_init(name_, symbol_);
        typeId = typeId_;
    }

    function _checkClass(uint256 classId) internal view {
        require(classId > 0 && classId <= lastClassId, "Invalid class ID");
    }

    function setBaseURI(string memory uri_) external onlyOwner {
        baseURI = uri_;
    }

    function setMinter(address minter_) external onlyOwner {
        isMinter[minter_] = true;
    }

    function removeMinter(address minter_) external onlyOwner {
        isMinter[minter_] = false;
    }

    function setBridge(address bridge_) external onlyOwner {
        bridge = bridge_;
    }

    // Add new class and set `maxSupply` and team `reserved`
    function addNewClass(uint256 maxSupply, uint256 reserved) external onlyOwner {
        require(maxSupply <= 10000, "Max supply exceeds 10000");
        lastClassId += 1;
        _maxSupplies[lastClassId] = maxSupply;
        _reserves[lastClassId] = reserved;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function totalSupplyOfClass(uint256 classId) public view returns (uint256) {
        return _totalSupplies[classId];
    }

    function maxSupplyOfClass(uint256 classId) public view returns (uint256) {
        return _maxSupplies[classId];
    }

    // returns class id acording `tokenId`
    function classOf(uint256 tokenId) public view returns (uint256) {
        require(tokenId > typeId * 10000000, "Invalid type ID");
        uint256 classId = (tokenId - typeId * 10000000) / 10000;
        uint256 tokenNumber = (tokenId - typeId * 10000000) % 10000;
        require(tokenNumber > 0, "Invalid token ID");
        _checkClass(classId);
        return classId;
    }

    // returns next tokenId of class `classId`
    function nextTokenId(uint256 classId) public view returns (uint256) {
        return typeId * 10000000 + classId * 10000 + totalSupplyOfClass(classId) + 1;
    }

    function tokensOfOwnerByClass(address owner, uint256 classId) public view returns (uint256[] memory) {
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

    // returns unminted count of class `classId`
    function mintable(uint256 classId) public view returns (uint256) {
        _checkClass(classId);
        require(maxSupplyOfClass(classId) >= _reserves[classId], "Max supply less than team reserved amount");
        return maxSupplyOfClass(classId) - totalSupplyOfClass(classId) - _reserves[classId];
    }

    // Mint team reserved tokens of class `classId`
    function ownerMint(uint256 classId, address to) external onlyOwner {
        _checkClass(classId);
        require(_reserves[classId] > 0, "No team reserves");
        for (uint256 i = 0; i < _reserves[classId]; i++) {
            uint256 tokenId = nextTokenId(classId);
            _totalSupplies[classId] += 1;
            _mint(to, tokenId);
        }
        _reserves[classId] = 0;
    }

    // Mints one token `tokenId` to address `to` for bridging.
    function bridgeMint(address to, uint256 tokenId) external onlyBridge {
        uint256 classId = classOf(tokenId);
        require(mintable(classId) > 0, "Exceeded max supply");
        _totalSupplies[classId] += 1;
        _mint(to, tokenId);
    }

    // Mints one token of class `classId` to address `to`
    function mint(uint256 classId, address to) external onlyMinter returns (uint256) {
        _checkClass(classId);
        require(mintable(classId) > 0, "Exceeded max supply");
        uint256 tokenId = nextTokenId(classId);
        _totalSupplies[classId] += 1;
        _mint(to, tokenId);
        return tokenId;
    }
}
