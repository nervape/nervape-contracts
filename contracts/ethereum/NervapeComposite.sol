// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract NervapeComposite is ERC721AQueryable, Ownable {
    string private baseURI;
    address private signer;

    uint256 public constant MAX_PUBLIC_SUPPLY = 7000;
    uint256 public teamReserves = 777;
    uint256 public blMintMax = 2;
    uint256 public blStartTime;
    uint256 public startTime;
    uint256 public endTime;

    mapping(address => uint256) public minted;
    mapping(bytes32 => bool) public hashed;
    event Minted(address sender, uint256 oid, uint256 tokenId);

    constructor() ERC721A("Nervape Composite", "NACP") {}

    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }

    function setTimes(
        uint256 blStartTime_,
        uint256 startTime_,
        uint256 endTime_
    ) external onlyOwner {
        blStartTime = blStartTime_;
        startTime = startTime_;
        endTime = endTime_;
    }

    function setSigner(address signer_) external onlyOwner {
        signer = signer_;
    }

    function setMintMax(uint256 max) external onlyOwner {
        require(max < 256, "Must less than 256");
        blMintMax = max;
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 oid, bytes calldata signature) external {
        require(block.timestamp >= startTime, "Not start");
        require(block.timestamp < endTime, "Ended");
        require(totalSupply() < MAX_PUBLIC_SUPPLY, "Exceeded max supply");
        require((minted[msg.sender] >> 8) == 0, "Minted");

        bytes32 hash = ECDSA.toEthSignedMessageHash(abi.encode(msg.sender, oid));
        require(!hashed[hash], "Existed hash");

        address recovered = ECDSA.recover(hash, signature);
        require(recovered == signer, "Invalid signature");
        hashed[hash] = true;

        uint256 startId = _nextTokenId();
        _mint(msg.sender, 1);

        minted[msg.sender] += (1 << 8);

        emit Minted(msg.sender, oid, startId);
    }

    function bonelistMint(uint256[] calldata oids, bytes[] calldata signatures) external {
        require(oids.length <= blMintMax, "Invalid count");
        require(block.timestamp >= blStartTime, "Not start");
        require(block.timestamp < startTime, "Ended");
        require(totalSupply() + oids.length <= MAX_PUBLIC_SUPPLY, "Exceeded max supply");
        require((minted[msg.sender] & 0xff) + oids.length <= blMintMax, "Minted");

        for (uint256 i = 0; i < oids.length; i++) {
            bytes32 hash = ECDSA.toEthSignedMessageHash(abi.encode(msg.sender, oids[i]));
            require(!hashed[hash], "Existed hash");
            address recovered = ECDSA.recover(hash, signatures[i]);
            require(recovered == signer, "Invalid signature");
            hashed[hash] = true;
        }

        uint256 startId = _nextTokenId();
        _mint(msg.sender, oids.length);

        minted[msg.sender] += oids.length;

        for (uint256 i = 0; i < oids.length; i++) {
            emit Minted(msg.sender, oids[i], startId);
            startId += 1;
        }
    }

    function teamMint(address to, uint256 count) external onlyOwner {
        require(count > 0, "Invalid mint count");
        require(count <= teamReserves, "Exceeded team reserves");
        _mint(to, count);
        teamReserves -= count;
    }
}
