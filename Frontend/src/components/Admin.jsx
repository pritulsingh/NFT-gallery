import React, { useState } from "react";
import Web3 from "web3";
import contractInstance from "../contractInstance";
import "../styles/Admin.css";

function Admin() {
  const [account, setAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isApprovedMinter, setIsApprovedMinter] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [selectedURI, setSelectedURI] = useState("");
  const [minterAddress, setMinterAddress] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [status, setStatus] = useState("");

  const metadataURIs = [
    {
      label: "Bhaisaaab Basics",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreih252m6s5kxbflv7lmmt7sf2nhgvly7yygjfgl22hzlkjpg74j4lm",
    },
    {
      label: "Bhaisaaab Developer",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreiay24uiseksd6ogqsnvs4gdsemoesnuumyqi4pgc2p35cum6pjxh4",
    },
    {
      label: "Bhaisaaab Inner Circle",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreib7n6znwtfqrf24h4sxb5qsagerovl5wx4fd46g6zngfawmuhg6ni",
    },
    {
      label: "Bhaisaaab Officials",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreicrzx3eurqp7ggh6gihkqpbiecu5prm522ruh2skg3ctiuq2w7v5q",
    },
  ];

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const connected = accounts[0];
        setAccount(connected);

        const owner = await contractInstance.methods.owner().call();
        setIsOwner(owner.toLowerCase() === connected.toLowerCase());

        const approved = await contractInstance.methods.approvedMinters(connected).call();
        setIsApprovedMinter(approved);

        setStatus("✅ Wallet connected");
      } else {
        setStatus("❌ Please install MetaMask");
      }
    } catch (err) {
      console.error("Wallet Connection Error:", err);
      setStatus("❌ Wallet connection failed");
    }
  };

  const mintNFT = async () => {
    if (!recipient || !selectedURI) {
      setStatus("⚠️ Fill all fields before minting.");
      return;
    }

    try {
      await contractInstance.methods.mintTo(recipient, selectedURI).send({ from: account });
      setStatus("✅ NFT Minted Successfully");
    } catch (error) {
      console.error(error);
      setStatus("❌ Minting Failed");
    }
  };

  const setMinter = async () => {
    if (!minterAddress) {
      setStatus("⚠️ Please provide a valid address");
      return;
    }

    try {
      await contractInstance.methods.setMinter(minterAddress, isApproved).send({ from: account });
      setStatus("✅ Minter status updated");
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to update minter");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {account ? (
        <p>Connected as: <strong>{account}</strong></p>
      ) : (
        <button onClick={connectWallet}>🔌 Connect Wallet</button>
      )}

      {(isOwner || isApprovedMinter) && account && (
        <>
          <div className="admin-section">
            <h3>Mint NFT</h3>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <select value={selectedURI} onChange={(e) => setSelectedURI(e.target.value)}>
              <option value="">Select NFT Tier</option>
              {metadataURIs.map((item, i) => (
                <option key={i} value={item.uri}>{item.label}</option>
              ))}
            </select>
            <button className="admin-button" onClick={mintNFT}>Mint</button>
          </div>

          {isOwner && (
            <div className="admin-section">
              <h3>Set Minter</h3>
              <input
                type="text"
                placeholder="Address to Approve/Revoke"
                value={minterAddress}
                onChange={(e) => setMinterAddress(e.target.value)}
              />

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isApproved}
                  onChange={(e) => setIsApproved(e.target.checked)}
                />
                <span>Approve this address?</span>
              </label>

              <button onClick={setMinter}>Set Minter</button>
            </div>
          )}
        </>
      )}

      {!isOwner && !isApprovedMinter && account && (
        <p className="not-owner">🚫 Only owner or approved minters can access this panel.</p>
      )}

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}

export default Admin;
