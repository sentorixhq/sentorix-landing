"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function ShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2L4 6.5V13C4 18.55 8.33 23.74 14 25C19.67 23.74 24 18.55 24 13V6.5L14 2Z"
        fill="url(#shield-gradient)"
      />
      <path
        d="M11 14l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="shield-gradient"
          x1="4"
          y1="2"
          x2="24"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "For developers", href: "#for-developers" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top =
        el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-950/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          <ShieldIcon />
          <span className="tracking-tight">Sentorix</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.sentorix.io"
            className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
          >
            Sign in
          </a>
          <button
            onClick={() => scrollTo("#demo")}
            className="text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-brand-500/25 cursor-pointer"
          >
            Request a demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-950/98 backdrop-blur-md border-b border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left text-gray-300 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://app.sentorix.io"
              className="text-center text-sm text-gray-300 hover:text-white px-4 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              Sign in
            </a>
            <button
              onClick={() => scrollTo("#demo")}
              className="text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Request a demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
