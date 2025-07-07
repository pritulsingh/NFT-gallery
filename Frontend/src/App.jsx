import React, { useEffect, useRef } from 'react'
import Header from './components/header'
import About from './components/About';
import Gallery from './components/Gallery';
import Admin from './components/Admin';
import MyNFT from './components/MyNFT';
import "./App.css"
import Footer from './components/Footer';
import FAQ from './components/FAQ';
const App = () => {
  const mouseFollowerRef = useRef(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // Update mouse position immediately
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Smooth animation loop
    const animateFollower = () => {
      // Smooth interpolation for natural movement
      const speed = 0.15 // Adjust this value: higher = faster, lower = smoother

      followerX += (mouseX - followerX) * speed
      followerY += (mouseY - followerY) * speed

      if (mouseFollowerRef.current) {
        mouseFollowerRef.current.style.transform = `translate(${followerX - 200}px, ${followerY - 200}px)`
      }

      requestAnimationFrame(animateFollower)
    }

    // Start the animation loop
    document.addEventListener("mousemove", handleMouseMove)
    animateFollower()

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])
  return (
    <div className="app-container">
      {/* Animated Background Elements */}
      <div className="background-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-pattern"></div>
        <div className="mouse-follower" ref={mouseFollowerRef}></div>
      </div>
      <Header />
      <section id='about' className='section'>
        <About />
      </section>
      <section id='gallery' className='section'>
        <Gallery />
      </section>
      <section id='mynft' className='section'>
        <MyNFT />
      </section>
      <section id='admin' className='section'>
        <Admin />
      </section>
      <section id='faq' className='section'>
        <FAQ />
      </section>
      <Footer />
    </div>   
  );
}

export default App
