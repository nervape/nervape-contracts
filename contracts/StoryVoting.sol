// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INervape.sol";

contract StoryVoting is Ownable {
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Finalized
    }

    struct Proposal {
        uint16[] classIds;
        uint8 choices;
        uint8 finalizedChoice;
        bool canceled;
        bool finalized;
        uint256 startTime;
        uint256 endTime;
        mapping(uint16 => uint16) newClassIds;
        // choice => character classId => votes
        mapping(uint8 => mapping(uint16 => uint256)) supportedVotes;
    }

    struct Vote {
        uint256 tokenId;
        uint256 timestamp;
        uint8 support;
        bool redeemed;
    }

    uint256 public totalProposal = 0;
    address public character;
    address public scene;

    mapping(uint256 => Proposal) public proposals;

    // proposal id => ape => true
    // mapping (uint256 => mapping (address => bool)) public isVotable;

    // proposal id => user => Vote[]
    mapping(uint256 => mapping(address => Vote[])) public userVotes;

    // proposal id => support choice => count
    mapping(uint256 => mapping(uint8 => uint256)) public votes;

    // proposal id => support choice => address => votes
    // mapping(uint256 => mapping(uint8 => mapping(address => uint256)))

    constructor(address character_, address scene_) {
        character = character_;
        scene = scene_;
    }

    function createProposal(
        uint16[] calldata classIds,
        uint16[] calldata newClassIds,
        uint256 startTime,
        uint256 endTime,
        uint8 choices
    ) external onlyOwner {
        require(classIds.length > 0, "No character");
        require(classIds.length == newClassIds.length, "Invalid new characters length");
        require(choices >= 2, "Invalid choices");
        require(endTime > block.timestamp && startTime < endTime, "Invalid endTime");

        totalProposal += 1;
        Proposal storage proposal = proposals[totalProposal];
        proposal.classIds = classIds;
        proposal.startTime = startTime;
        proposal.endTime = endTime;
        proposal.choices = choices;
        for (uint256 i = 0; i < classIds.length; i++) {
            proposal.newClassIds[classIds[i]] = newClassIds[i];
        }
    }

    function vote(
        uint256 proposalId,
        uint256[] calldata tokenIds,
        uint8 support
    ) external {
        require(tokenIds.length > 0, "Invalid tokens");
        Proposal storage proposal = proposals[proposalId];

        require(stateOf(proposalId) == ProposalState.Active, "Voting is not active");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint16 classId = INervape(character).classOf(tokenIds[i]);
            require(proposal.newClassIds[classId] > 0, "Not votable character");

            INervape(character).transferFrom(msg.sender, address(this), tokenIds[i]);

            userVotes[proposalId][msg.sender].push(
                Vote({ tokenId: tokenIds[i], timestamp: block.timestamp, support: support, redeemed: false })
            );

            proposal.supportedVotes[support][classId] += 1;
        }
        votes[proposalId][support] += tokenIds.length;
    }

    function getVotes(uint256 proposalId, uint8 support) public view returns (uint256) {
        Proposal storage proposal = proposals[proposalId];
        uint256 groupVotes = proposal.supportedVotes[support][proposal.classIds[0]];
        for (uint256 i = 1; i < proposal.classIds.length; i++) {
            if (groupVotes > proposal.supportedVotes[support][proposal.classIds[i]]) {
                groupVotes = proposal.supportedVotes[support][proposal.classIds[i]];
            }
        }
        uint256 remainingVotes = votes[proposalId][support] - groupVotes * proposal.classIds.length;
        return (groupVotes << 128) + uint128(remainingVotes);
    }

    function _finalize(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.endTime < block.timestamp, "Voting is not over");

        if (proposal.canceled || proposal.finalized) {
            return;
        }

        uint256 mostVotes = getVotes(proposalId, 1);
        for (uint8 i = 2; i <= proposal.choices; i++) {
            if (getVotes(proposalId, i) > mostVotes) {
                mostVotes = getVotes(proposalId, i);
            }
        }

        if (mostVotes == 0) {
            proposal.canceled = true;
            return;
        }

        uint8[] memory mostVotedChoices = new uint8[](proposal.choices);
        uint256 len = 0;
        for (uint8 c = 1; c <= proposal.choices; c++) {
            if (mostVotes == getVotes(proposalId, c)) {
                mostVotedChoices[len] = c;
                len++;
            }
        }

        if (len > 1) {
            proposal.finalizedChoice = mostVotedChoices[random(mostVotes) % len];
        } else {
            proposal.finalizedChoice = mostVotedChoices[len - 1];
        }
        proposal.finalized = true;
    }

    function stateOf(uint256 proposalId) public view returns (ProposalState) {
        Proposal storage proposal = proposals[proposalId];
        require(proposalId > 0 && proposalId <= totalProposal, "Invalid proposal id");

        if (proposal.canceled) {
            return ProposalState.Canceled;
        }
        if (proposal.finalized) {
            return ProposalState.Finalized;
        }
        if (proposal.startTime > block.timestamp) {
            return ProposalState.Pending;
        }
        if (proposal.endTime < block.timestamp) {
            return ProposalState.Active;
        }

        return ProposalState.Finalized;
    }

    function redeem(uint256 proposalId) external {
        redeem(proposalId, 0, userVotes[proposalId][msg.sender].length);
    }

    // [start, end)
    function redeem(
        uint256 proposalId,
        uint256 start,
        uint256 end
    ) public {
        require(proposalId > 0, "Invalid proposal Id");
        require(start < end, "Invalid range");

        Proposal storage proposal = proposals[proposalId];

        _finalize(proposalId);

        Vote[] storage _votes = userVotes[proposalId][msg.sender];
        require(end <= _votes.length, "Invalid end index");

        for (uint256 i = start; i < end; i++) {
            if (_votes[i].redeemed) {
                continue;
            }
            if (proposal.finalized && _votes[i].support == proposal.finalizedChoice) {
                uint16 classId = INervape(character).classOf(_votes[i].tokenId);
                // burn ape and mint new Ape
                INervape(character).mint(proposal.newClassIds[classId], msg.sender);
                _votes[i].redeemed = true;
            } else {
                // withdraw back ape
                INervape(character).transferFrom(address(this), msg.sender, _votes[i].tokenId);
                _votes[i].redeemed = true;
            }
        }
    }

    function getUserVotesLength(uint256 proposalId, address user) public view returns (uint256) {
        return userVotes[proposalId][user].length;
    }

    function random(uint256 seed) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, seed)));
    }
}
