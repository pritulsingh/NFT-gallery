"use client"

import { useState, useEffect } from "react"
import "../styles/Footer.css"

function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowBackToTop(scrollTop > 300) // Show after scrolling 300px
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (email.trim() && !isSubscribing) {
      setIsSubscribing(true)
      try {
        console.log("Subscribing email:", email)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 5000)
      } catch (error) {
        console.error("Subscription error:", error)
        alert("Subscription failed. Please try again.")
      } finally {
        setIsSubscribing(false)
      }
    }
  }

  const scrollToSection = (sectionId) => {
    console.log(`Footer: Scrolling to section: ${sectionId}`)

    const element = document.getElementById(sectionId)
    if (element) {
      console.log(`Footer: Found element:`, element)
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    } else {
      console.error(`Footer: Element with id "${sectionId}" not found`)
    }
  }

  const scrollToTop = () => {
    console.log("🚀 Back to top clicked!")
    console.log("📍 Current scroll position:", window.scrollY)
    console.log("📍 Document scroll position:", document.documentElement.scrollTop)
    console.log("📍 Body scroll position:", document.body.scrollTop)

    setIsScrolling(true)

    // Method 1: Multiple scroll targets
    const scrollToTopMethod1 = () => {
      try {
        // Try all possible scroll containers
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" })

        // Also try setting scroll properties directly
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        window.scrollTo(0, 0)

        console.log("✅ Method 1: Multiple scroll attempts made")
        return true
      } catch (error) {
        console.log("❌ Method 1 failed:", error)
        return false
      }
    }

    // Method 2: Force scroll with animation
    const scrollToTopMethod2 = () => {
      console.log("🔄 Method 2: Force scroll animation")
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      )

      const currentScroll = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

      console.log("📏 Total scroll height:", scrollHeight)
      console.log("📏 Current scroll:", currentScroll)

      if (currentScroll > 0) {
        const scrollStep = Math.max(currentScroll / 20, 50) // Minimum 50px steps
        const scrollInterval = setInterval(() => {
          const newScroll = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

          if (newScroll <= 0) {
            clearInterval(scrollInterval)
            setIsScrolling(false)
            console.log("✅ Method 2: Animation completed")
          } else {
            const nextPosition = Math.max(0, newScroll - scrollStep)
            window.scrollTo(0, nextPosition)
            document.documentElement.scrollTop = nextPosition
            document.body.scrollTop = nextPosition
          }
        }, 16) // ~60fps

        // Safety timeout
        setTimeout(() => {
          clearInterval(scrollInterval)
          setIsScrolling(false)
          console.log("⏰ Method 2: Timeout reached")
        }, 3000)
      } else {
        setIsScrolling(false)
        console.log("✅ Method 2: Already at top")
      }
    }

    // Method 3: Find and scroll the actual scrollable container
    const scrollToTopMethod3 = () => {
      console.log("🔄 Method 3: Finding scrollable container")

      // Find all potentially scrollable elements
      const scrollableElements = [
        window,
        document.documentElement,
        document.body,
        ...document.querySelectorAll('[style*="overflow"]'),
        ...document.querySelectorAll(".app-container"),
        ...document.querySelectorAll("main"),
        ...document.querySelectorAll("#root"),
        ...document.querySelectorAll("[data-scroll]"),
      ]

      scrollableElements.forEach((element, index) => {
        try {
          if (element === window) {
            element.scrollTo({ top: 0, behavior: "smooth" })
          } else if (element.scrollTo) {
            element.scrollTo({ top: 0, behavior: "smooth" })
          } else {
            element.scrollTop = 0
          }
          console.log(`📦 Method 3: Scrolled element ${index}:`, element)
        } catch (error) {
          console.log(`❌ Method 3: Failed on element ${index}:`, error)
        }
      })

      setIsScrolling(false)
      console.log("✅ Method 3: All elements attempted")
    }

    // Try methods in sequence
    scrollToTopMethod1()

    // Check if it worked after 500ms
    setTimeout(() => {
      const newScroll = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

      if (newScroll > 100) {
        console.log("🔄 Method 1 didn't work, trying Method 2")
        scrollToTopMethod2()
      } else {
        setIsScrolling(false)
        console.log("✅ Method 1: Success confirmed")
      }
    }, 500)

    // Ultimate fallback after 2 seconds
    setTimeout(() => {
      const finalScroll = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

      if (finalScroll > 50) {
        console.log("🔄 All methods failed, trying Method 3")
        scrollToTopMethod3()
      }
    }, 2000)
  }

  return (
    <footer className="footer enhanced-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand animate-fade-in">
            <div className="brand-logo">
              <span className="brand-code">BHSSB</span>
              <span className="brand-tagline">-- by BHAISAAAB</span>
            </div>
            <p className="brand-description">
              Building the future of Web3 identity through soulbound NFTs. Where contribution becomes identity and
              community drives innovation.
            </p>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">NFT Tiers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Possibilities</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Community</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links animate-fade-in-delay">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="link-list">
              <li>
                <button onClick={() => scrollToSection("about")} className="footer-link">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("gallery")} className="footer-link">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("mynft")} className="footer-link">
                  My NFTs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("admin")} className="footer-link">
                  Admin Panel
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("faq")} className="footer-link">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="footer-community animate-fade-in-delay-2">
            <h3 className="footer-title">Community</h3>
            <ul className="link-list">  
              <li>
                <a href="https://x.com/Bhaisaaab_" className="footer-link">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter animate-fade-in-delay-3">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest updates on new NFT drops, community events, and platform developments.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" disabled={isSubscribing}>
                  {isSubscribing ? "..." : subscribed ? "✓" : "Subscribe"}
                </button>
              </div>
              {subscribed && <p className="success-message">Thanks for subscribing! 🎉</p>}
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social animate-slide-up">
          <div className="social-container">
            <a href="https://x.com/PRITUL__SINGH" className="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="https://web.telegram.org/a/" className="social-link" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a href="https://github.com/pritulsingh" className="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/pritul-singh/" className="social-link" aria-label="linkedin">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom animate-slide-up-delay">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <p className="copyright">© 2024 BHAISAAAB. All rights reserved.</p>
              <div className="legal-links">
                <a href="#" className="legal-link">
                  Privacy Policy
                </a>
                <span className="separator">•</span>
                <a href="#" className="legal-link">
                  Terms of Service
                </a>
                <span className="separator">•</span>
                <a href="#" className="legal-link">
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="footer-actions">
              <button
                onClick={scrollToTop}
                className={`back-to-top ${showBackToTop ? "visible" : ""} ${isScrolling ? "scrolling" : ""}`}
                disabled={isScrolling}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={isScrolling ? "spinning" : ""}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>{isScrolling ? "Scrolling..." : "Back to Top"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="footer-decoration">
          <div className="decoration-orb decoration-orb-1"></div>
          <div className="decoration-orb decoration-orb-2"></div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`floating-back-to-top ${showBackToTop ? "visible" : ""} ${isScrolling ? "scrolling" : ""}`}
        disabled={isScrolling}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={isScrolling ? "spinning" : ""}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer
