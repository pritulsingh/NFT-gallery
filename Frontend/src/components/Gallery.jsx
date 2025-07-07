// src/components/Gallery.jsx
import React from "react";
import basics from "../metadata/Bhaisaaab-basics.json";
import devs from "../metadata/Bhaisaaab-developers.json";
import inner from "../metadata/Bhaisaaab-InnerCircle.json";
import officials from "../metadata/Bhaisaaab-Officials.json";
import "../styles/Gallery.css";

const nftData = [basics, devs, inner, officials];

// IPFS resolver function
const resolveIPFS = (url) => {
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return url;
};


function Gallery() {
  return (
    <section className="gallery-section">
      <h2 className="section-heading">Explore the Bhaisaaab NFT Collection</h2>

      {nftData.map((nft, index) => (
        <div className={`nft-row ${index % 2 === 1 ? "reverse" : ""}`} key={index}>
          <div className="nft-info">
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
            <ul>
              {nft.attributes.map((attr, i) => (
                <li key={i}>
                  <strong>{attr.trait_type}:</strong> {attr.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="nft-image">
            <img src={resolveIPFS(nft.image)} alt={nft.name} />
          </div>
        </div>
      ))}
    </section>
  );
}

export default Gallery;
