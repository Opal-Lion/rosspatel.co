"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/layout/ThemeToggle";

const navLinks = [
  { label: "Work", href: "#what-i-do" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["top", "what-i-do", "projects", "events", "press", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, boolean>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleSections.set(id, entry.isIntersecting);
          for (const sId of sectionIds) {
            if (visibleSections.get(sId)) {
              setActiveSection(sId);
              return;
            }
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ transform: "translateZ(0)" }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
        {/* Logo / Name */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-white hover:text-[#00c4b4] transition-colors"
        >
          Ross Patel
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = link.href.replace("#", "") === activeSection;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`text-sm font-body tracking-wide transition-colors ${
                    active
                      ? "text-[#00c4b4]"
                      : "text-white/70 hover:text-[#00c4b4]"
                  }`}
                >
                  {link.label}
                </a>
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#00c4b4]"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-px bg-current mb-1.5 transition-all" />
            <span className="block w-4 h-px bg-current mb-1.5 transition-all" />
            <span className="block w-6 h-px bg-current transition-all" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 px-6 pb-6 overflow-hidden"
          >
            <ul className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-base transition-colors ${
                      link.href.replace("#", "") === activeSection
                        ? "text-[#00c4b4]"
                        : "text-white/80 hover:text-[#00c4b4]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
