"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBranchesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Branches", href: "/branches", hasDropdown: true },
    { name: "Faculty", href: "/faculty" },
    { name: "Life @ MG", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  const branchSubLinks = [
    { name: "Block A", subtitle: "Foundation Campus", href: "/branches/block-a" },
    { name: "Block B", subtitle: "Academic Center", href: "/branches/block-b" },
    { name: "Block C", subtitle: "International Hub", href: "/branches/block-c" },
  ];

  return (
    <div className="fixed top-0 w-full z-[100] px-4 py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 pointer-events-auto",
          scrolled 
            ? "glass shadow-2xl py-3 px-6" 
            : "bg-white/50 backdrop-blur-sm py-5 px-8"
        )}
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/images/Logo_of_M_G_Schools_Solo.jpg-removebg-preview.png" alt="M.G. School Logo" className="h-12 w-auto object-contain group-hover:rotate-3 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="text-2xl font-playfair font-black tracking-tighter text-primary">
                M.G. SCHOOL
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">
                Legacy of Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setBranchesOpen(!branchesOpen)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-primary/5 flex items-center gap-1.5 cursor-pointer",
                      pathname.startsWith("/branches") ? "text-primary bg-primary/10" : "text-gray-600 hover:text-primary"
                    )}
                  >
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", branchesOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {branchesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        {/* All Branches link */}
                        <Link
                          href="/branches"
                          prefetch={true}
                          onClick={() => setBranchesOpen(false)}
                          className="block px-6 py-4 text-sm font-black text-primary hover:bg-primary/5 transition-all border-b border-gray-100"
                        >
                          All Branches
                        </Link>

                        {/* Sub-links */}
                        {branchSubLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            prefetch={true}
                            onClick={() => setBranchesOpen(false)}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-all group/item"
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 group-hover/item:scale-125 transition-transform" />
                            <div>
                              <div className="text-sm font-bold text-primary">{sub.name}</div>
                              <div className="text-[11px] text-gray-400 font-medium">{sub.subtitle}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-primary/5",
                    pathname === link.href ? "text-primary bg-primary/10" : "text-gray-600 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="w-px h-6 bg-gray-200 mx-4" />
            <Link 
              href="/enroll" 
              className="bg-primary text-white pl-6 pr-4 py-3 rounded-2xl font-bold text-sm hover:bg-secondary hover:text-primary transition-all flex items-center gap-2 group shadow-xl"
            >
              Enroll Now
              <div className="bg-white/20 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-3 rounded-2xl bg-primary text-white shadow-lg active:scale-90 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 top-24 bg-primary rounded-[3rem] p-12 z-50 pointer-events-auto shadow-3xl lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-4">
              <div className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-10 text-center">Main Navigation</div>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileBranchesOpen(!mobileBranchesOpen)}
                        className={cn(
                          "text-4xl font-playfair font-bold py-2 flex items-center gap-3 w-full text-left cursor-pointer",
                          pathname.startsWith("/branches") ? "text-secondary" : "text-white/60 hover:text-white"
                        )}
                      >
                        {link.name}
                        <ChevronDown size={24} className={cn("transition-transform duration-300", mobileBranchesOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {mobileBranchesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-6 space-y-2"
                          >
                            {branchSubLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                prefetch={true}
                                onClick={() => { setIsOpen(false); setMobileBranchesOpen(false); }}
                                className="flex items-center gap-3 py-2"
                              >
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                                <div>
                                  <div className="text-xl font-playfair font-bold text-white/80 hover:text-white">{sub.name}</div>
                                  <div className="text-xs text-white/40">{sub.subtitle}</div>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      prefetch={true}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-4xl font-playfair font-bold block py-2",
                        pathname === link.href ? "text-secondary" : "text-white/60 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            
            <Link 
              href="/enroll"
              onClick={() => setIsOpen(false)}
              className="bg-secondary text-primary w-full py-6 rounded-[2rem] font-black text-xl text-center shadow-2xl active:scale-95 transition-transform"
            >
              Start Your Journey
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
