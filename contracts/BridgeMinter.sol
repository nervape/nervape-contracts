// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INervape.sol";

contract BridgeMinter is Ownable {
    address public character;
    address public scene;
    address public item;
    address public special;

    address public operator;

    constructor(
        address character_,
        address scene_,
        address item_,
        address special_
    ) {
        character = character_;
        scene = scene_;
        item = item_;
        special = special_;
    }

    function setOperator(address operator_) external onlyOwner {
        operator = operator_;
    }

    function setCharacter(address character_) external onlyOwner {
        character = character_;
    }

    function setScene(address scene_) external onlyOwner {
        scene = scene_;
    }

    function setItem(address item_) external onlyOwner {
        item = item_;
    }

    function setSepcial(address special_) external onlyOwner {
        special = special_;
    }

    function mintMany(
        address to,
        uint256[] calldata characterIds,
        uint256[] calldata sceneIds,
        uint256[] calldata itemIds,
        uint256[] calldata specialIds
    ) external {
        require(operator == msg.sender, "Not operator");
        require(
            characterIds.length > 0 || sceneIds.length > 0 || itemIds.length > 0 || specialIds.length > 0,
            "No bridging token"
        );

        for (uint256 i = 0; i < characterIds.length; i++) {
            INervape(character).bridgeMint(to, characterIds[i]);
        }
        for (uint256 i = 0; i < sceneIds.length; i++) {
            INervape(scene).bridgeMint(to, sceneIds[i]);
        }
        for (uint256 i = 0; i < itemIds.length; i++) {
            INervape(item).bridgeMint(to, itemIds[i]);
        }
        for (uint256 i = 0; i < specialIds.length; i++) {
            INervape(special).bridgeMint(to, specialIds[i]);
        }
    }
}
