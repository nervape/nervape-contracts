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

    constructor(address character_, address payable recipient_) {
        character = character_;
        recipient = recipient_;
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
    ) external onlyOwner {
        require(groupId <= totalGroup, "Invalid group id");
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

    function mintable(uint16 classId) public view returns (uint256) {
        uint16 unminted = INervape(character).maxSupplyOfClass(classId) -
            INervape(character).totalSupplyOfClass(classId);
        return uint256(unminted);
    }

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
            uint256 mintableCount = mintable(groups[groupId].classIds[i]);
            if (mintableCount > 0) {
                maxMintable += mintableCount;
                classIds[mintableLength] = groups[groupId].classIds[i];
                mintableLength++;
            }
            i++;
        }
    }

    function mint(uint256 groupId, uint256 count) external payable {
        require(msg.sender == tx.origin, "Only EOA");
        require(groupId > 0 && groupId <= totalGroup, "Invalid group id");
        require(count > 0, "Wrong mint amount");
        Group storage group = groups[groupId];
        require(minted[groupId][msg.sender] + count <= group.maxPerWallet, "Exceeded max mint amount");

        uint256 paymentValue;
        uint256 startTime;
        if (isWhitelisted[groupId][msg.sender]) {
            paymentValue = count * group.wlPrice;
            startTime = group.wlStartTime;
        } else {
            paymentValue = count * group.price;
            startTime = group.startTime;
        }
        require(block.timestamp >= startTime, "Not start");
        require(msg.value == paymentValue, "Wrong payment value");

        minted[groupId][msg.sender] += count;
        recipient.transfer(paymentValue);

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
