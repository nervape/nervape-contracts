// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";
import "./INervape.sol";

contract GroupMinter is Ownable, Whitelist {
    struct Group {
        address[] apes;
        uint256 wlPrice;
        uint256 price;
        uint256 wlStartTime;
        uint256 startTime;
        uint256 maxPerWallet;
    }

    address payable public recipient;
    uint256 private nonce = 0;
    uint256 public totalGroup = 0;

    mapping(uint256 => Group) public groups;

    // groupId => user => count
    mapping(uint256 => mapping(address => uint256)) public minted;

    constructor(address payable recipient_) {
        recipient = recipient_;
    }

    function createGroup(
        address[] calldata apes,
        uint256 wlPrice,
        uint256 price,
        uint256 wlStartTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner {
        require(apes.length > 0, "No apes");
        require(wlStartTime > block.timestamp && startTime > wlStartTime, "Invalid start time");

        totalGroup += 1;

        Group storage group = groups[totalGroup];
        group.apes = apes;
        group.wlPrice = wlPrice;
        group.price = price;
        group.wlStartTime = wlStartTime;
        group.startTime = startTime;
        group.maxPerWallet = maxPerWallet;
    }

    function setRecipient(address payable recipient_) external onlyOwner {
        require(recipient_ != address(0), "Invalid address");
        recipient = recipient_;
    }

    // index mapping:
    // 1 => wlPrice
    // 2 => price
    // 3 => wlStartTime
    // 4 => startTime
    // 5 => maxPerWallet
    function updateGroup(
        uint256 groupId,
        uint256 index,
        uint256 val
    ) external onlyOwner {
        require(index > 0 && index < 6, "Invalid index");

        if (index == 1) {
            groups[groupId].wlPrice = val;
        }
        if (index == 2) {
            groups[groupId].price = val;
        }
        if (index == 3) {
            groups[groupId].wlStartTime = val;
        }
        if (index == 4) {
            groups[groupId].startTime = val;
        }
        if (index == 5) {
            groups[groupId].maxPerWallet = val;
        }
    }

    function mintable(address ape) public view returns (uint256) {
        return INervape(ape).maxSupply() - INervape(ape).totalSupply();
    }

    function mintableApes(uint256 groupId)
        public
        view
        returns (
            address[] memory apes,
            uint256 mintableLength,
            uint256 maxMintable
        )
    {
        apes = new address[](groups[groupId].apes.length);
        uint256 i = 0;
        while (i < groups[groupId].apes.length) {
            uint256 mintableCount = mintable(groups[groupId].apes[i]);
            if (mintableCount > 0) {
                maxMintable += mintableCount;
                apes[mintableLength] = groups[groupId].apes[i];
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
        if (isWhitelisted(groupId, msg.sender)) {
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
            (address[] memory apes, uint256 mintableLength, uint256 maxMintable) = mintableApes(groupId);
            require(maxMintable >= count - i, "No apes left");
            uint256 base = (rand >> (256 - (i + 1) * 8)) & (2**(8 * (i + 1)) - 1);
            uint256 index = base % mintableLength;
            INervape(apes[index]).mint(msg.sender);
            i++;
        }
    }

    function random(uint256 seed) internal returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, nonce++, seed)));
    }
}
