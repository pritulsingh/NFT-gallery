// src/pages/MyNFT.jsx
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contract from "../contractInstance";
import "../styles/MyNFT.css";

function MyNFT() {
  const [account, setAccount] = useState("");
  const [nfts, setNfts] = useState([]);
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("❌ Please install MetaMask");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      setStatus("✅ Wallet connected");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to connect wallet");
    }
  };

  const fetchNFTs = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const balance = await contract.methods.balanceOf(account).call();
      const nftList = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call();
        const tokenURI = await contract.methods.tokenURI(tokenId).call();

        const response = await fetch(tokenURI);
        const metadata = await response.json();

        nftList.push({ tokenId, ...metadata });
      }

      setNfts(nftList);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setStatus("❌ Failed to load NFTs");
    }
  };

  useEffect(() => {
    if (account) {
      fetchNFTs();
    }
  }, [account]);

  return (
    <div className="my-nft-container">
      <div className="section-header">
        <h2>Explore Your Bhaisaaab NFTs</h2>
        <hr className="section-underline" />
      </div>


      {!account ? (
        <>
          <button onClick={connectWallet} className="connect-wallet-btn">🔌 Connect Wallet</button>
          <p className="status-msg">{status}</p>
        </>
      ) : nfts.length === 0 ? (
        <p>You don't own any NFTs yet.</p>
      ) : (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <div key={nft.tokenId} className="nft-card">
              <img
                src={nft.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}
                alt={nft.name}
              />
              <h3>{nft.name}</h3>
              <p>{nft.description}</p>
              <ul>
                {nft.attributes?.map((attr, i) => (
                  <li key={i}>
                    <strong>{attr.trait_type}:</strong> {attr.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {status && account && <p className="status-msg">{status}</p>}
    </div>
  );
}

export default MyNFT;
