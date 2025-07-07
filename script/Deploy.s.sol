// script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/BhaisaaabNFT.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the NFT contract
        new BhaisaaabNFT();

        vm.stopBroadcast();
    }
}
