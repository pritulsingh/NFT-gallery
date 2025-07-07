"use client"

import { useState } from "react"
import "../styles/header.css"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import AuthModal from "./AuthModal"

function Header() {
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [authMode, setAuthMode] = useState("login")

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const scrollToSection = (sectionId) => {
    console.log(`Scrolling to section: ${sectionId}`)

    const element = document.getElementById(sectionId)
    if (element) {
      console.log(`Found element:`, element)

      // Method 1: Using scrollIntoView (most reliable)
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })

      // Alternative Method 2: Manual calculation with offset for fixed header
      // const headerHeight = 80 // Adjust based on your header height
      // const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      // const offsetPosition = elementPosition - headerHeight

      // window.scrollTo({
      //   top: offsetPosition,
      //   behavior: 'smooth'
      // })
    } else {
      console.error(`Element with id "${sectionId}" not found`)
    }
  }

  return (
    <>
      <header className="header enhanced-header">
        <div className="brand-tag animate-fade-in">
          <span className="brand-code animate-pulse">BHSSB</span>
          <span className="brand-origin">-- by BHAISAAAB</span>
        </div>

        <nav className="nav animate-fade-in-delay">
          <button onClick={() => scrollToSection("about")} className="nav-btn">
            About
          </button>
          <button onClick={() => scrollToSection("gallery")} className="nav-btn">
            Gallery
          </button>
          <button onClick={() => scrollToSection("mynft")} className="nav-btn">
            MyNFT
          </button>
          <button onClick={() => scrollToSection("admin")} className="nav-btn">
            Admin Panel
          </button>
          <button onClick={() => scrollToSection("faq")} className="nav-btn">
            FAQ
          </button>
        </nav>

        <div className="actions animate-fade-in-delay-2">
          {!user ? (
            <>
              <button
                className="btn-outline"
                onClick={() => {
                  setAuthMode("login")
                  setShowModal(true)
                }}
              >
                Log In
              </button>
              <button
                className="btn-solid"
                onClick={() => {
                  setAuthMode("signup")
                  setShowModal(true)
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="welcome-msg">Welcome, {user?.displayName || "User"}</span>
              <button className="btn-solid" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} mode={authMode} setUser={setUser} />
    </>
  )
}

export default Header
