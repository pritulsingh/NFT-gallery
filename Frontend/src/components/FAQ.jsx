"use client"

import { useState } from "react"
import "../styles/FAQ.css"

const faqData = [
  {
    id: 1,
    category: "General",
    question: "What are Soulbound NFTs?",
    answer:
      "Soulbound NFTs are non-transferable tokens that represent your identity and contribution within the Bhaisaaab community. Unlike regular NFTs, they cannot be sold or transferred, making them a permanent part of your digital identity. They're bound to your wallet address forever, representing your authentic participation and achievements.",
  },
  {
    id: 2,
    category: "Getting Started",
    question: "How do I get a Bhaisaaab NFT?",
    answer:
      "Bhaisaaab NFTs are awarded based on your contribution and participation in the community. You can earn them through various activities like contributing to projects, participating in community discussions, helping other members, or demonstrating expertise in Web3 development. Different tiers are available from Basics to Officials, each representing different levels of involvement.",
  },
  {
    id: 3,
    category: "NFT Tiers",
    question: "What are the different NFT tiers?",
    answer:
      "We have four main tiers: 1) Bhaisaaab Basics (entry-level membership for newcomers), 2) Bhaisaaab Developer (for technical contributors and builders), 3) Bhaisaaab Inner Circle (core community members with significant contributions), and 4) Bhaisaaab Officials (leadership roles and community moderators). Each tier comes with unique privileges and recognition.",
  },
  {
    id: 4,
    category: "General",
    question: "Can I sell my Bhaisaaab NFT?",
    answer:
      "No, Bhaisaaab NFTs are soulbound, meaning they are permanently tied to your wallet and cannot be transferred, sold, or traded. This ensures they truly represent your personal contribution and identity within the community. The non-transferable nature maintains the integrity and authenticity of the reputation system.",
  },
  {
    id: 5,
    category: "Technical",
    question: "What blockchain is used?",
    answer:
      "Bhaisaaab NFTs are built on Ethereum, ensuring security, decentralization, and compatibility with the broader Web3 ecosystem. We chose Ethereum for its robust smart contract capabilities, widespread adoption, and strong developer community. This ensures your NFTs are secure and will remain accessible long-term.",
  },
  {
    id: 6,
    category: "Getting Started",
    question: "How do I connect my wallet?",
    answer:
      "You can connect your wallet using MetaMask, WalletConnect, or other Web3 wallets. Simply click the 'Connect Wallet' button in the header and follow the prompts to link your wallet to the platform. Make sure you have a compatible wallet installed and some ETH for gas fees when minting or interacting with NFTs.",
  },
  {
    id: 7,
    category: "Community",
    question: "What benefits do I get with each tier?",
    answer:
      "Each tier comes with unique benefits: Basics members get access to community channels and events. Developers get early access to new features and technical discussions. Inner Circle members can participate in governance decisions and exclusive events. Officials get moderation privileges and direct input on platform development.",
  },
  {
    id: 8,
    category: "Technical",
    question: "Are there any fees involved?",
    answer:
      "The NFTs themselves are awarded based on contribution, but you'll need to pay Ethereum gas fees for minting and any blockchain transactions. We try to optimize gas usage and may batch transactions to reduce costs. There are no platform fees for earning or holding your soulbound NFTs.",
  },
  {
    id: 9,
    category: "Community",
    question: "How can I contribute to the community?",
    answer:
      "There are many ways to contribute: participate in Discord discussions, help newcomers, contribute to open-source projects, create educational content, organize community events, provide feedback on platform improvements, or share your expertise in Web3 development. All meaningful contributions are recognized and can lead to tier upgrades.",
  },
  {
    id: 10,
    category: "General",
    question: "What makes BHSSB different from other NFT projects?",
    answer:
      "BHSSB focuses on building genuine community and identity rather than speculation. Our soulbound NFTs represent real contribution and cannot be bought or sold, ensuring authentic participation. We're building trust-based systems where your reputation and role are earned through meaningful engagement, not financial investment.",
  },
]

const categories = ["All", "General", "Getting Started", "NFT Tiers", "Technical", "Community"]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="faq-section enhanced-faq">
      <div className="faq-container">
        {/* Header */}
        <div className="section-header animate-fade-in">
          <h2 className="section-heading gradient-text">Frequently Asked Questions</h2>
          <div className="section-underline"></div>
          <p className="section-description">Everything you need to know about Bhaisaaab NFTs and our community</p>
        </div>

        {/* Search and Filter */}
        <div className="faq-controls animate-fade-in-delay">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                //placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="clear-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              >
                {category}
                {category !== "All" && (
                  <span className="category-count">{faqData.filter((faq) => faq.category === category).length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        {(searchTerm || selectedCategory !== "All") && (
          <div className="results-info animate-fade-in-delay-2">
            <p>
              Showing {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="clear-filters"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* FAQ List */}
        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className={`faq-item enhanced-faq-item animate-slide-up ${openIndex === faq.id ? "active" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                  <div className="question-content">
                    <span className="category-tag">{faq.category}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <div className={`faq-icon ${openIndex === faq.id ? "rotated" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className={`faq-answer ${openIndex === faq.id ? "open" : ""}`}>
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results animate-fade-in">
              <div className="no-results-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3>No FAQs found</h3>
              <p>
                Try adjusting your search terms or category filter.
                <br />
                Can't find what you're looking for?
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="btn-primary"
              >
                Show All FAQs
              </button>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="faq-footer animate-fade-in-delay">
          <div className="contact-section">
            <h3>Still have questions?</h3>
            <p>Join our community or reach out to our team for more information and support.</p>
            <div className="contact-buttons">
              <a href="#" className="btn-primary">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
              <a href="#" className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="faq-stats animate-slide-up-delay">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{faqData.length}</div>
              <div className="stat-label">Total FAQs</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{categories.length - 1}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Community Support</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Learning Opportunities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
