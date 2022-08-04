// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INervape.sol";

contract CampaignMinter is Ownable {
    struct Campaign {
        address[] relatedApes;
        address scene;
        uint256 price;
        uint256 claimStartTime;
        uint256 claimEndTime;
        uint256 startTime;
        uint256 maxPerWallet;
    }

    address payable public recipient;
    uint256 public totalCampaign = 0;

    mapping(uint256 => Campaign) public campaigns;

    // Ape => tokenId => true/false
    mapping(address => mapping(uint256 => bool)) public participated;

    // campaignId => user => count
    mapping(uint256 => mapping(address => uint256)) public minted;

    constructor(address payable recipient_) {
        recipient = recipient_;
    }

    function createCampaign(
        address scene,
        address[] calldata relatedApes,
        uint256 price,
        uint256 claimStartTime,
        uint256 claimEndTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner {
        require(scene != address(0), "Invalid scene address");
        require(relatedApes.length > 0, "Invalid related apes");
        require(claimStartTime < claimEndTime, "Invalid claim end time");

        totalCampaign += 1;
        Campaign storage campaign = campaigns[totalCampaign];
        campaign.scene = scene;
        campaign.relatedApes = relatedApes;
        campaign.price = price;
        campaign.claimStartTime = claimStartTime;
        campaign.claimEndTime = claimEndTime;
        campaign.startTime = startTime;
        campaign.maxPerWallet = maxPerWallet;
    }

    function updateCampaign(
        uint256 campaignId,
        address scene,
        address[] calldata relatedApes,
        uint256 price,
        uint256 claimStartTime,
        uint256 claimEndTime,
        uint256 startTime,
        uint256 maxPerWallet
    ) external onlyOwner {
        require(campaignId <= totalCampaign, "Invalid campaign id");
        require(scene != address(0), "Invalid scene address");
        require(relatedApes.length > 0, "Invalid related apes");
        require(claimStartTime < claimEndTime, "Invalid claim end time");
        require(block.timestamp > campaigns[campaignId].claimStartTime, "Cannot update after started");

        Campaign storage campaign = campaigns[campaignId];
        campaign.scene = scene;
        campaign.relatedApes = relatedApes;
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

    function claim(uint256 campaignId, uint256[] calldata tokenIds) external {
        require(msg.sender == tx.origin, "Only EOA");
        Campaign memory campaign = campaigns[campaignId];
        require(tokenIds.length == campaign.relatedApes.length, "Invalid tokenIds");
        require(campaign.claimStartTime < block.timestamp, "Campaign has not started");
        require(campaign.claimEndTime > block.timestamp, "Campaign has ended");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            address ape = campaign.relatedApes[i];
            require(participated[ape][tokenIds[i]], "Already participated");
            require(INervape(ape).ownerOf(tokenIds[i]) == msg.sender, "Not owner");
            participated[ape][tokenIds[i]] = true;
        }
        INervape(campaign.scene).mint(msg.sender);
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
            INervape(campaign.scene).mint(msg.sender);
        }
    }
}
