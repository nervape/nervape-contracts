// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Creatape is ERC721AQueryable, Ownable {
    string private baseURI;
    address private signer;
    uint256 public maxPerWallet = 3;
    mapping(address => uint256) public minted;

    constructor() ERC721A("Nervape Creatape", "CREATAPE") {}

    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }

    function setSigner(address signer_) external onlyOwner {
        signer = signer_;
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(block.timestamp < deadline, "Expired deadline");
        bytes32 hash = ECDSA.toEthSignedMessageHash(abi.encodePacked(msg.sender, minted[msg.sender], deadline));
        address recovered = ECDSA.recover(hash, v, r, s);
        require(recovered == signer, "Invalid signature");
        require(minted[msg.sender] + 1 <= maxPerWallet, "Exceeded max mint amount");
        minted[msg.sender] += 1;
        _mint(msg.sender, 1);
    }
}
