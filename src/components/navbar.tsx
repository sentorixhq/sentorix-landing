"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
    { label: "Live Demo", href: "#live-demo" },
    { label: "For Developers", href: "#for-developers" },
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
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Image
            src="/sentorix-icon.png"
            alt="Sentorix"
            width={40}
            height={40}
            className="h-9 w-auto"
            priority
          />
          <span className="text-white font-bold text-lg tracking-tight">Sentorix</span>
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
