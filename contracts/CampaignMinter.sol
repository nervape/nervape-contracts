// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INervape.sol";

contract CampaignMinter is Ownable {
    struct Campaign {
        uint16[] characterClassIds;
        uint16 sceneClassId;
        uint256 price;
        uint256 claimStartTime;
        uint256 claimEndTime;
        uint256 startTime;
        uint256 maxPerWallet;
    }

    address public character;
    address public scene;
    address payable public recipient;
    uint256 public totalCampaign = 0;

    mapping(uint256 => Campaign) public campaigns;

    // character class id => tokenId => true/false
    mapping(uint16 => mapping(uint256 => bool)) public participated;

    // campaignId => user => count
    mapping(uint256 => mapping(address => uint256)) public minted;

    constructor(
        address character_,
        address scene_,
        address payable recipient_
    ) {
        recipient = recipient_;
        character = character_;
        scene = scene_;
    }

    function createCampaign(
        uint16[] calldata characterClassIds,
        uint16 sceneClassId,
        uint256 price,
        uint256 claimStartTime,
        uint256 claimEndTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner {
        require(characterClassIds.length > 0, "Invalid related characters");
        require(sceneClassId > 0, "Invalid scene");
        require(claimStartTime < claimEndTime, "Invalid claim end time");

        totalCampaign += 1;
        Campaign storage campaign = campaigns[totalCampaign];
        campaign.characterClassIds = characterClassIds;
        campaign.sceneClassId = sceneClassId;
        campaign.price = price;
        campaign.claimStartTime = claimStartTime;
        campaign.claimEndTime = claimEndTime;
        campaign.startTime = startTime;
        campaign.maxPerWallet = maxPerWallet;
    }

    function updateCampaign(
        uint256 campaignId,
        uint16[] calldata characterClassIds,
        uint16 sceneClassId,
        uint256 price,
        uint256 claimStartTime,
        uint256 claimEndTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner {
        require(campaignId <= totalCampaign, "Invalid campaign id");
        require(claimStartTime < claimEndTime, "Invalid claim end time");
        require(block.timestamp < campaigns[campaignId].claimStartTime, "Cannot update after started");

        Campaign storage campaign = campaigns[totalCampaign];
        campaign.characterClassIds = characterClassIds;
        campaign.sceneClassId = sceneClassId;
        campaign.price = price;
        campaign.claimStartTime = claimStartTime;
        campaign.claimEndTime = claimEndTime;
        campaign.startTime = startTime;
        campaign.maxPerWallet = maxPerWallet;
    }

    function setRecipient(address payable recipient_) external onlyOwner {
        require(recipient_ != address(0), "Invalid address");
        recipient = recipient_;
    }

    function claim(uint256 campaignId, uint256[] calldata tokenIds) public {
        require(msg.sender == tx.origin, "Only EOA");
        Campaign memory campaign = campaigns[campaignId];
        require(tokenIds.length == campaign.characterClassIds.length, "Invalid tokens length");
        require(campaign.claimStartTime < block.timestamp, "Campaign has not started");
        require(campaign.claimEndTime > block.timestamp, "Campaign has ended");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint16 classId = campaign.characterClassIds[i];
            require(participated[classId][tokenIds[i]], "Already participated");
            require(INervape(character).ownerOf(tokenIds[i]) == msg.sender, "Not owner");
            require(INervape(character).classOf(tokenIds[i]) == classId, "Invalid character");
            participated[classId][tokenIds[i]] = true;
        }
        INervape(scene).mint(campaign.sceneClassId, msg.sender);
    }

    function claimMany(uint256 campaignId, uint256[][] calldata groupedTokenIds) external {
        for (uint256 i = 0; i < groupedTokenIds.length; i++) {
            claim(campaignId, groupedTokenIds[i]);
        }
    }

    function mint(uint256 campaignId, uint256 count) external payable {
        require(msg.sender == tx.origin, "Only EOA");
        Campaign memory campaign = campaigns[campaignId];
        require(block.timestamp >= campaign.startTime, "Minting has not started");

        require(campaignId > 0 && campaignId <= totalCampaign, "Invalid campaign id");
        require(count > 0 && count <= 2, "Wrong mint amount");
        require(minted[campaignId][msg.sender] + count <= campaign.maxPerWallet, "Exceeded max mint amount");
        require(msg.value == count * campaign.price, "Wrong payment value");

        minted[campaignId][msg.sender] += count;
        recipient.transfer(count * campaign.price);

        for (uint256 i = 0; i < count; i++) {
            INervape(character).mint(campaign.sceneClassId, msg.sender);
        }
    }
}
