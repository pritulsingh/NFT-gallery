// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BhaisaaabNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(address => bool) public approvedMinters;

    constructor() ERC721("Bhaisaaab Collection", "BHSSB") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    modifier onlyMinter() {
        require(approvedMinters[msg.sender], "Not an approved minter");
        _;
    }

    function setMinter(address minter, bool isApproved) public onlyOwner {
        approvedMinters[minter] = isApproved;
    }

    function mintTo(address recipient, string memory uri) public onlyMinter {
        uint256 tokenId = tokenCounter;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, uri);
        tokenCounter++;
    }

    // ✅ Soulbound logic
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Transfers not allowed");
        }
        return super._update(to, tokenId, auth);
    }

    // ✅ ERC721URIStorage override
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage, ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // ✅ Required for OpenZeppelin v5
    function _increaseBalance(address account, uint128 amount)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, amount);
    }

    // Note: _burn function removed as it's not virtual in this OpenZeppelin version
    // The base ERC721 and ERC721URIStorage _burn functions will work as intended

    // ✅ Final correct override list
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}