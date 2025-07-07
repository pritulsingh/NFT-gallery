// src/components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import "../styles/AuthModal.css";

export default function AuthModal({ isOpen, onClose, mode, setUser }) {
  const [authMode, setAuthMode] = useState(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      onClose();
    } catch (err) {
      console.error("Google Auth Error:", err.message);
    }
  };

  const handleEmailAuth = async () => {
    try {
      let res;

      if (authMode === "signup") {
        res = await createUserWithEmailAndPassword(auth, email, password);

        // Set display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Send verification email
        await sendEmailVerification(auth.currentUser);

        alert("Signup successful! Please check your email to verify your account.");
        onClose();
      } else {
        res = await signInWithEmailAndPassword(auth, email, password);

        if (!res.user.emailVerified) {
          alert("Please verify your email before logging in.");
          return;
        }

        setUser(res.user);
        onClose();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{authMode === "login" ? "Log In" : "Sign Up"}</h2>

        <div className="tab-switch">
          <button
            onClick={() => setAuthMode("login")}
            className={authMode === "login" ? "active" : ""}
          >
            Log In
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className={authMode === "signup" ? "active" : ""}
          >
            Sign Up
          </button>
        </div>

        <button className="google-btn" onClick={handleGoogleAuth}>
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google"
          />
          Continue with Google
        </button>

        <div className="or-divider">OR</div>

        {authMode === "signup" && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="submit-btn" onClick={handleEmailAuth}>
          {authMode === "login" ? "Login with Email" : "Sign Up with Email"}
        </button>

        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
