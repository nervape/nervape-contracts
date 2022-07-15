// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

interface IApe {
    function mint(address to) external;

    function totalSupply() external view returns (uint256);

    function maxSupply() external view returns (uint256);
}

contract Minter is Ownable, Whitelist {
    address payable public recipient;
    uint256 public totalGroup = 0;
    mapping(uint256 => address[]) public groupApes;

    mapping(uint256 => uint256) public prices;
    // groupId => [ wlStartTime, startTime ]
    mapping(uint256 => uint256[2]) public startTimes;
    // groupId => user => count
    mapping(uint256 => mapping(address => uint256)) public minted;

    constructor(address payable recipient_) {
        recipient = recipient_;
    }

    function createGroup(
        address[] calldata apes,
        uint256 price,
        uint256 wlStartTime,
        uint256 startTime
    ) external onlyOwner {
        require(apes.length > 0, "No apes");
        require(wlStartTime < startTime, "Invalid whitelist start time");

        totalGroup += 1;
        groupApes[totalGroup] = apes;
        prices[totalGroup] = price;
        startTimes[totalGroup] = [wlStartTime, startTime];
    }

    function setRecipient(address payable recipient_) external onlyOwner {
        recipient = recipient_;
    }

    function mintable(address ape) public view returns (uint256) {
        return IApe(ape).maxSupply() - IApe(ape).totalSupply();
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
        apes = new address[](groupApes[groupId].length);
        uint256 i = 0;
        while (i < groupApes[groupId].length) {
            uint256 mintableCount = mintable(groupApes[groupId][i]);
            if (mintableCount > 0) {
                maxMintable += mintableCount;
                apes[mintableLength] = groupApes[groupId][i];
                mintableLength++;
            }
            i++;
        }
    }

    function mint(uint256 groupId, uint256 count) external payable {
        require(msg.sender == tx.origin, "Only EOA");
        require(groupId > 0 && groupId <= totalGroup, "Invalid group id");
        require(count > 0, "Wrong mint amount");
        require(minted[groupId][msg.sender] + count <= 5, "Exceeded max mint amount");

        if (isWhitelisted(groupId, msg.sender)) {
            require(block.timestamp >= startTimes[groupId][0], "WL not start");
        } else {
            require(block.timestamp >= startTimes[groupId][1], "Not start");
        }

        require(msg.value == count * prices[groupId], "Wrong payment value");
        minted[groupId][msg.sender] += count;
        recipient.transfer(count * prices[groupId]);

        uint256 seed = uint256(keccak256(abi.encodePacked(groupId, count, tx.origin)));
        uint256 rand = random(seed);

        uint256 i = 0;
        while (i < count) {
            (address[] memory apes, uint256 mintableLength, uint256 maxMintable) = mintableApes(groupId);
            require(maxMintable >= count - i, "No apes left");
            uint256 base = (rand >> (256 - (i + 1) * 8)) & (2**(8 * (i + 1)) - 1);
            uint256 index = base % mintableLength;
            IApe(apes[index]).mint(msg.sender);
            i++;
        }
    }

    function random(uint256 seed) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, seed)));
    }
}
