// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "./INervape.sol";

contract Nervape is INervape, ERC721EnumerableUpgradeable, OwnableUpgradeable {
    string public baseURI;
    address public bridge;
    uint16 public typeId;
    uint16 public lastClassId;

    mapping(uint16 => uint16) _maxSupplies;
    mapping(uint16 => uint16) _totalSupplies;
    mapping(uint16 => uint16) _reserves;
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
        uint16 typeId_
    ) public initializer {
        __Ownable_init();
        __ERC721_init(name_, symbol_);
        typeId = typeId_;
    }

    function _checkClass(uint16 classId) internal view {
        require(classId > 0 && classId <= lastClassId, "Invalid class Id");
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

    function addNewClass(uint16 maxSupply, uint16 reserved) external onlyOwner {
        require(maxSupply <= 10000, "Max supply exceeds 10000");
        lastClassId += 1;
        _maxSupplies[lastClassId] = maxSupply;
        _reserves[lastClassId] = reserved;
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

    function classOf(uint256 tokenId) public view returns (uint16) {
        require(tokenId > uint256(typeId) * 10000000, "Invalid type ID");
        uint16 classId = uint16((tokenId - uint256(typeId) * 10000000) / 10000);
        uint16 tokenNumber = uint16((tokenId - uint256(typeId) * 10000000) % 10000);
        require(tokenNumber > 0, "Invalid token ID");
        _checkClass(classId);
        return classId;
    }

    function nextTokenId(uint16 classId) public view returns (uint256) {
        return uint256(typeId) * 10000000 + uint256(classId) * 10000 + totalSupplyOfClass(classId) + 1;
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

    function mintable(uint16 classId) public view returns (uint16) {
        _checkClass(classId);
        require(maxSupplyOfClass(classId) >= _reserves[classId], "Max supply less than team reserved amount");
        return maxSupplyOfClass(classId) - totalSupplyOfClass(classId) - _reserves[classId];
    }

    function ownerMint(uint16 classId, address to) external onlyOwner {
        _checkClass(classId);
        require(_reserves[classId] > 0, "No team reserves");
        for (uint16 i = 0; i < _reserves[classId]; i++) {
            uint256 tokenId = nextTokenId(classId);
            _totalSupplies[classId] += 1;
            _mint(to, tokenId);
        }
    }

    function bridgeMint(address to, uint256 tokenId) external onlyBridge {
        uint16 classId = classOf(tokenId);
        require(mintable(classId) > 0, "Exceeded max supply");
        _totalSupplies[classId] += 1;
        _mint(to, tokenId);
    }

    function mint(uint16 classId, address to) external onlyMinter returns (uint256) {
        _checkClass(classId);
        require(mintable(classId) > 0, "Exceeded max supply");
        uint256 tokenId = nextTokenId(classId);
        _totalSupplies[classId] += 1;
        _mint(to, tokenId);
        return tokenId;
    }
}
