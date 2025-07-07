import React from "react";
import "../styles/about.css";
import {
  FaKey,          // Soulbound NFTs
  FaWallet,       // Wallet Connect
  FaListOl,       // Tiered System
  FaShieldAlt,    // On‑chain Verification
  FaHandHoldingHeart, // Trust‑based Roles
  FaBolt,         // Fast Minting
  FaLock,         // Non‑transferable
  FaUsers         // Community Focus
} from 'react-icons/fa';

function About() {
  return (
    <section className="about-page">
      <div className="about-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="about-hero">
          <h1>Own Your Digital Identity <br /> With Bhaisaaab NFT</h1>
          <p className="tagline">Where Contribution Becomes Identity.</p>
        </div>

        <div className="about-description">
          <p> <strong>BHSSB</strong> is a tiered NFT gallery DApp using soulbound NFTs to define identity and contribution.</p>
          <p>It aims to build trust-based systems with visual, on-chain roles.</p>
        </div>
        <section className="about-bhaisaaab">
          <h2>What is Bhaisaaab?</h2>
          <p>
            <strong>Bhaisaaab</strong> is more than just a name — it is a <strong>Web3 community</strong>. 
            A space for passionate individuals who celebrate growth, collaboration, 
            and culture. Whether you're a developer, designer, builder, or dreamer, 
            Bhaisaaab welcomes you into a circle that values ideas, learning, and support.
          </p>
          <p>
            Our NFT collection represents different tiers of contribution and belonging 
            within the Bhaisaaab community — from newcomers to core members. Every token 
            is a badge of identity and shared spirit.
          </p>
          <p>
            We're rooted in cultural pride, driven by curiosity, and built on blockchain. 
            Together, we're building the future — one block at a time.
          </p>
        </section>

        <div className="about-boxed-section">
          <h2>Why We Built It</h2>
          <p>
            Web3 needs trust signals that go beyond wallets. <strong>BHAISAAAB</strong> helps communities grow through provable identity, contribution, and accountability.
          </p>
          <p>
            We're passionate about empowering users with real ownership and adding meaning to roles. Soulbound NFTs are the next step for evolving access and reputation.
          </p>
          <p>
            We believe in open, community-driven progress where everyone knows who stands behind each contribution.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FaKey className="feature-icon" />
            <h3>Soulbound NFTs</h3>
          </div>
          <div className="feature-card">
            <FaWallet className="feature-icon" />
            <h3>Wallet Connect</h3>
          </div>
          <div className="feature-card">
            <FaListOl className="feature-icon" />
            <h3>Tiered System</h3>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>On-chain Verification</h3>
          </div>
          <div className="feature-card">
            <FaHandHoldingHeart className="feature-icon" />
            <h3>Trust-based Roles</h3>
          </div>
          <div className="feature-card">
            <FaBolt className="feature-icon" />
            <h3>Fast Minting</h3>
          </div>
          <div className="feature-card">
            <FaLock className="feature-icon" />
            <h3>Non-transferable</h3>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Community Focus</h3>
          </div>
        </div>

        <div className="tech-stack-table">
          <h2>Tech Stack</h2>
          <div className="stack-row">
            <span>Solidity</span>
            <span>EVM</span>
          </div>
          <div className="stack-row">
            <span>React.js</span>
            <span>Frontend</span>
          </div>
          <div className="stack-row">
            <span>Web3.js</span>
            <span>Connections</span>
          </div>
          <div className="stack-row">
            <span>IPFS</span>
            <span>Off Chain Decentralized Storage</span>
          </div>
          <div className="stack-row">
            <span>Firebase</span>
            <span>Auth and Database</span>
          </div>
        </div>

        <div className="founder-note">
          <p><strong>Note:</strong> This DApp reflects a future where trust, access, and contribution are all verifiable.</p>
          <p>— Team BHAISAAAB</p>
        </div>

        <div className="about-footer">
          <h3>Contribution = Identity</h3>
        </div>
      </div>
    </section>

  );
}

export default About;