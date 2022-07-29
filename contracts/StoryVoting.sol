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
        address[] apes;
        uint8 choices;
        uint8 finalizedChoice;
        bool canceled;
        bool finalized;
        uint256 startTime;
        uint256 endTime;
        mapping(address => address) newApes;
        mapping(address => bool) isVotable;
        // choice => ape address => votes
        mapping(uint8 => mapping(address => uint256)) supportedApeVotes;
    }

    struct Vote {
        address ape;
        address owner;
        uint256 tokenId;
        uint256 timestamp;
        uint8 support;
        bool redeemed;
    }

    uint256 public totalProposal = 0;

    mapping(uint256 => Proposal) public proposals;

    // proposal id => ape => true
    // mapping (uint256 => mapping (address => bool)) public isVotable;

    // proposal id => user => Vote[]
    mapping(uint256 => mapping(address => Vote[])) public userVotes;

    // proposal id => support choice => count
    mapping(uint256 => mapping(uint8 => uint256)) public votes;

    // proposal id => support choice => address => votes
    // mapping(uint256 => mapping(uint8 => mapping(address => uint256)))

    function createProposal(
        address[] calldata apes,
        address[] calldata newApes,
        uint256 startTime,
        uint256 endTime,
        uint8 choices
    ) external onlyOwner {
        require(apes.length > 0, "No apes");
        require(apes.length == newApes.length, "Invalid new apes length");
        require(choices >= 2, "Invalid choices");
        require(endTime > block.timestamp && startTime < endTime, "Invalid endTime");

        totalProposal += 1;
        Proposal storage proposal = proposals[totalProposal];
        proposal.apes = apes;
        proposal.startTime = startTime;
        proposal.endTime = endTime;
        proposal.choices = choices;
        for (uint256 i = 0; i < apes.length; i++) {
            proposal.newApes[apes[i]] = newApes[i];
            proposal.isVotable[apes[i]] = true;
        }
    }

    function vote(
        uint256 proposalId,
        address[] calldata apes,
        uint256[] calldata apeIds,
        uint8 support
    ) external {
        require(apes.length == apeIds.length, "Invalid params");
        Proposal storage proposal = proposals[proposalId];

        require(stateOf(proposalId) == ProposalState.Active, "Voting is not active");

        for (uint256 i = 0; i < apes.length; i++) {
            require(proposal.isVotable[apes[i]], "Not votable ape");
            INervape(apes[i]).transferFrom(msg.sender, address(this), apeIds[i]);

            userVotes[proposalId][msg.sender].push(
                Vote({
                    ape: apes[i],
                    tokenId: apeIds[i],
                    owner: msg.sender,
                    timestamp: block.timestamp,
                    support: support,
                    redeemed: false
                })
            );

            proposal.supportedApeVotes[support][apes[i]] += 1;
        }
        votes[proposalId][support] += apes.length;
    }

    function getVotes(uint256 proposalId, uint8 support) public view returns (uint256) {
        Proposal storage proposal = proposals[proposalId];
        uint256 apeVotes = proposal.supportedApeVotes[support][proposal.apes[0]];
        for (uint256 i = 1; i < proposal.apes.length; i++) {
            if (apeVotes > proposal.supportedApeVotes[support][proposal.apes[i]]) {
                apeVotes = proposal.supportedApeVotes[support][proposal.apes[i]];
            }
        }
        uint256 remainingVotes = votes[proposalId][support] - apeVotes * proposal.apes.length;
        return (apeVotes << 128) + uint128(remainingVotes);
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
        require(end <= _votes.length, "Invalid end");

        for (uint256 i = start; i < end; i++) {
            if (_votes[i].redeemed) {
                continue;
            }
            if (proposal.finalized && _votes[i].support == proposal.finalizedChoice) {
                // burn ape and mint new limited Ape
                INervape(proposal.newApes[_votes[i].ape]).mint(_votes[i].owner);
                _votes[i].redeemed = true;
            } else {
                // withdraw back ape
                INervape(_votes[i].ape).transferFrom(address(this), _votes[i].owner, _votes[i].tokenId);
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
