// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";
import "./INervape.sol";

contract GroupMinter is Ownable, Whitelist {
    struct Group {
        uint16[] classIds;
        uint256 wlPrice;
        uint256 price;
        uint256 wlStartTime;
        uint256 startTime;
        uint256 maxPerWallet;
    }

    address public character;
    address payable public recipient;
    uint256 private nonce = 0;
    uint256 public totalGroup = 0;

    mapping(uint256 => Group) public groups;

    // groupId => user => count
    mapping(uint256 => mapping(address => uint256)) public minted;
    mapping(uint256 => mapping(address => bool)) public whitelistMinted;

    constructor(address character_, address payable recipient_) {
        character = character_;
        recipient = recipient_;
    }

    modifier checkGroup(uint256 groupId) {
        require(groupId > 0 && groupId <= totalGroup, "Invalid group id");
        _;
    }

    function setRecipient(address payable recipient_) external onlyOwner {
        require(recipient_ != address(0), "Invalid address");
        recipient = recipient_;
    }

    function createGroup(
        uint16[] calldata classIds,
        uint256 wlPrice,
        uint256 price,
        uint256 wlStartTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner {
        require(classIds.length > 0, "No class");
        require(wlStartTime > block.timestamp && startTime > wlStartTime, "Invalid start time");

        totalGroup += 1;

        Group storage group = groups[totalGroup];
        group.classIds = classIds;
        group.wlPrice = wlPrice;
        group.price = price;
        group.wlStartTime = wlStartTime;
        group.startTime = startTime;
        group.maxPerWallet = maxPerWallet;
    }

    function updateGroup(
        uint256 groupId,
        uint16[] calldata classIds,
        uint256 wlPrice,
        uint256 price,
        uint256 wlStartTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner checkGroup(groupId) {
        require(classIds.length > 0, "No class");
        require(block.timestamp < groups[groupId].wlStartTime, "Cannot update after started");
        require(wlStartTime > block.timestamp && startTime > wlStartTime, "Invalid start time");

        Group storage group = groups[groupId];
        group.classIds = classIds;
        group.wlPrice = wlPrice;
        group.price = price;
        group.wlStartTime = wlStartTime;
        group.startTime = startTime;
        group.maxPerWallet = maxPerWallet;
    }

    function getGroup(uint256 groupId)
        public
        view
        checkGroup(groupId)
        returns (
            uint16[] memory classIds,
            uint256 wlPrice,
            uint256 price,
            uint256 wlStartTime,
            uint256 startTime,
            uint256 maxPerWallet
        )
    {
        classIds = groups[groupId].classIds;
        wlPrice = groups[groupId].wlPrice;
        price = groups[groupId].price;
        wlStartTime = groups[groupId].wlStartTime;
        startTime = groups[groupId].startTime;
        maxPerWallet = groups[groupId].maxPerWallet;
    }

    // function mintable(uint16 classId) public view returns (uint256) {
    //     uint16 unminted = INervape(character).maxSupplyOfClass(classId) -
    //         INervape(character).totalSupplyOfClass(classId);
    //     return uint256(unminted);
    // }

    function mintableClasses(uint256 groupId)
        public
        view
        returns (
            uint16[] memory classIds,
            uint256 mintableLength,
            uint256 maxMintable
        )
    {
        classIds = new uint16[](groups[groupId].classIds.length);
        uint256 i = 0;
        while (i < groups[groupId].classIds.length) {
            uint256 mintableCount = INervape(character).mintable(groups[groupId].classIds[i]);
            if (mintableCount > 0) {
                maxMintable += mintableCount;
                classIds[mintableLength] = groups[groupId].classIds[i];
                mintableLength++;
            }
            i++;
        }
    }

    function whitelistMint(uint256 groupId) external payable checkGroup(groupId) {
        require(msg.sender == tx.origin, "Only EOA");
        require(isWhitelisted[groupId][msg.sender], "Not whitelisted");
        require(!whitelistMinted[groupId][msg.sender], "Whitelist minted");

        Group storage group = groups[groupId];
        require(block.timestamp >= group.wlStartTime, "Not start");
        require(msg.value == group.wlPrice, "Wrong payment value");
        recipient.transfer(group.wlPrice);

        whitelistMinted[groupId][msg.sender] = true;

        uint256 seed = uint256(keccak256(abi.encodePacked(groupId, tx.origin)));
        uint256 rand = random(seed);

        (uint16[] memory classIds, uint256 mintableLength, uint256 maxMintable) = mintableClasses(groupId);
        require(maxMintable >= 1, "No character class left");
        uint256 index = rand % mintableLength;
        INervape(character).mint(classIds[index], msg.sender);
    }

    function mint(uint256 groupId, uint256 count) external payable checkGroup(groupId) {
        require(msg.sender == tx.origin, "Only EOA");
        require(count > 0, "Wrong mint amount");
        Group storage group = groups[groupId];
        require(minted[groupId][msg.sender] + count <= group.maxPerWallet, "Exceeded max mint amount");

        require(block.timestamp >= group.startTime, "Not start");
        require(msg.value == count * group.price, "Wrong payment value");

        minted[groupId][msg.sender] += count;
        recipient.transfer(count * group.price);

        uint256 seed = uint256(keccak256(abi.encodePacked(groupId, count, tx.origin)));
        uint256 rand = random(seed);

        uint256 i = 0;
        while (i < count) {
            (uint16[] memory classIds, uint256 mintableLength, uint256 maxMintable) = mintableClasses(groupId);
            require(maxMintable >= count - i, "No character class left");
            uint256 base = (rand >> (256 - (i + 1) * 8)) & (2**(8 * (i + 1)) - 1);
            uint256 index = base % mintableLength;
            INervape(character).mint(classIds[index], msg.sender);
            i++;
        }
    }

    function random(uint256 seed) internal returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, nonce++, seed)));
    }
}
