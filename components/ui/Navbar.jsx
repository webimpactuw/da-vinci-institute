"use client";

import { useState, useEffect, useRef } from "react";

const navItems = [
  { id: "about", label: "about", href: "/about" },
  { id: "people", label: "people", href: "/people" },
  { id: "courses", label: "courses", href: "/courses" },
  { id: "classwork", label: "classwork", href: "/classwork" },
  { id: "registration", label: "registration", href: "/registration" },
  { id: "volunteer", label: "volunteer", href: "/volunteer" },
  { id: "experience", label: "experience", href: "/experience" },
  { id: "scholarships", label: "scholarships", href: "/scholarships" },
  { id: "resources", label: "resources", href: "/resources" },
  { id: "organization", label: "organization", href: "/organization" },
  { id: "projects", label: "projects", href: "/projects" },
  { id: "forums", label: "forums", href: "/forums" },
  { id: "information", label: "information", href: "/information" },
  { id: "store", label: "store", href: "/store" },
  { id: "assistance", label: "assistance", href: "/assistance" },
  { id: "donations", label: "donations", href: "/donations" },
  { id: "connect", label: "connect", href: "/connect" },
  { id: "partnerships", label: "partnerships", href: "/partnerships" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');

        .navbar {
          background-color: #1a4a4a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 56px;
          gap: 16px;
          position: relative;
          z-index: 100;
        }
        .nav-left { display: flex; align-items: center; gap: 12px; }

        /* ── EXPLORE BUTTON + DROPDOWN ── */
        .explore-wrap { position: relative; }
        .explore-btn {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; color: #fff;
          font-family: 'Lato', sans-serif; font-size: 14px;
          cursor: pointer; letter-spacing: 0.04em;
          padding: 6px 4px;
        }
        .explore-btn .chevron {
          transition: transform 0.2s ease;
          opacity: 0.85;
        }
        .explore-btn .chevron.open {
          transform: rotate(180deg);
        }

        .dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 8px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          width: 360px;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
          z-index: 200;
        }
        .dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .dropdown-item {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          color: #1a4a4a;
          text-decoration: none;
          letter-spacing: 0.03em;
          text-transform: capitalize;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .dropdown-item:hover {
          background: #1a4a4a;
          color: #fff;
        }

        /* ── SEARCH ── */
        .search-bar {
          background: #fff; border: none; border-radius: 20px;
          padding: 7px 16px; font-size: 13px; width: 200px;
          font-family: 'Lato', sans-serif; color: #333; outline: none;
        }

        /* ── LOGO ── */
        .nav-logo {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 10px;
          font-family: 'Cinzel', serif; color: #fff;
          font-size: 18px; font-weight: 600; letter-spacing: 0.06em;
          text-decoration: none; white-space: nowrap;
        }
        .nav-logo svg { width: 32px; height: 32px; opacity: 0.9; }

        /* ── RIGHT ── */
        .nav-right { display: flex; align-items: center; gap: 12px; margin-left: auto; }
        .nav-login-btn {
          background: none; border: none; color: #fff;
          font-family: 'Lato', sans-serif; font-size: 14px;
          cursor: pointer; letter-spacing: 0.03em;
          text-decoration: none;
        }
        .nav-signup-btn {
          background: #fff; color: #1a4a4a; border: none;
          border-radius: 20px; padding: 8px 20px;
          font-family: 'Lato', sans-serif; font-size: 14px;
          font-weight: 700; cursor: pointer; letter-spacing: 0.03em;
          transition: background 0.2s;
          text-decoration: none;
        }
        .nav-signup-btn:hover { background: #f0f0f0; }
      `}</style>

      <nav className="navbar">
        <div className="nav-left">

          {/* Explore + Dropdown */}
          <div className="explore-wrap" ref={dropdownRef}>
            <button
              className="explore-btn"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              Explore
              <svg
                className={`chevron${isOpen ? " open" : ""}`}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
              >
                <path d="M2 4l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={`dropdown${isOpen ? " open" : ""}`} role="menu">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <input className="search-bar" type="text" placeholder="Search" />
        </div>

        {/* Logo */}
        <a href="/" className="nav-logo">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <circle cx="20" cy="9" r="2.5" fill="#fff" opacity="0.9" />
            <line x1="20" y1="11.5" x2="20" y2="24" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="15" x2="28" y2="15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="24" x2="14" y2="33" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="24" x2="26" y2="33" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Da Vinci &nbsp; Institute
        </a>

        {/* Right */}
        <div className="nav-right">
          <a href="/login" className="nav-login-btn">Log In</a>
          <a href="/signup" className="nav-signup-btn">Sign Up</a>
        </div>
      </nav>
    </>
  );
}