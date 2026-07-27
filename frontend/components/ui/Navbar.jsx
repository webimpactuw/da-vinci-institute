//Mahika Bagri 
//May 18 2026 

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const navItems = [
  { id: "about",    label: "About Da Vinci Institute", href: "/about" },
  { id: "apply",    label: "Apply",                   href: "/apply" },
  { id: "courses",  label: "Courses",                 href: "/courses" },
  { id: "projects", label: "Projects",                href: "/projects" },
  { id: "forums",   label: "Forums",                  href: "/forums" },
  { id: "store",    label: "Store",                   href: "/store" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    // Ask server if we're authenticated by calling /me (server reads HttpOnly cookie)
    (async () => {
      try {
        const res = await fetch(`${API_URL}/user/me`, { credentials: 'include' });
        setIsAuthenticated(res.ok);
      } catch (err) {
        setIsAuthenticated(false);
      }
    })();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#003d55] flex items-center justify-between px-6 h-14 relative z-50">

      {/* LEFT — Explore + Search */}
      <div className="flex items-center gap-3">

        {/* Explore dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((p) => !p)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            className="flex items-center gap-1.5 text-white text-sm tracking-wide cursor-pointer bg-transparent border-none outline-none"
          >
            Explore
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              className={`transition-transform duration-200 opacity-80 ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="M2 4l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown panel — single column */}
          <div
            className={`absolute top-[calc(100%+10px)] left-0 bg-white rounded-xl shadow-xl w-56 py-2 flex flex-col
              transition-all duration-200 origin-top
              ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
            role="menu"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 text-sm text-[#003d55] hover:bg-[#003d55] hover:text-white transition-colors duration-150 rounded-lg mx-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="bg-white rounded-full px-4 py-1.5 text-sm text-gray-700 w-44 outline-none"
        />
      </div>

      {/* CENTER — Logo */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/LogoDV2.png"
          alt="Da Vinci Institute"
          width={100}
          height={100}
          className="object-contain"
        />
      </Link>

      {/* RIGHT — Auth actions */}
      <div className="flex items-center gap-10 ml-auto">
        {isAuthenticated ? (
          <Link
            href="/courses"
            className="bg-white text-[#003d55] text-sm font-bold rounded-full px-5 py-2 hover:bg-gray-100 transition-colors"
          >
            Courses
          </Link>
        ) : (
          <>
            <Link
              href="/accountForm?isLogin=true"
              className="text-white text-sm tracking-wide hover:opacity-80 transition-opacity"
            >
              Log In
            </Link>
            <Link
              href="/accountForm?isLogin=false"
              className="bg-white text-[#003d55] text-sm font-bold rounded-full px-5 py-2 hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}