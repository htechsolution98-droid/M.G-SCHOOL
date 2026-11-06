"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";

interface AdmissionConfig {
  isVisible: boolean;
  text: string;
  link: string;
  openInNewTab: boolean;
  badgeText?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [buildingsOpen, setBuildingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileBuildingsOpen, setMobileBuildingsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  const [admissionConfig, setAdmissionConfig] = useState<AdmissionConfig>({
    isVisible: true,
    text: "Admission-open 2027-28",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScvDLrOCqRksq57FNC4asJ4uY3RX9hV4KVaJGfJSgHXTldrRw/viewform?usp=publish-editor",
    openInNewTab: true,
  });

  const fetchHeaderConfig = useCallback(() => {
    axiosInstance
      .get("/api/header-config")
      .then((res) => {
        if (res.data?.success && res.data.config?.admissionButton) {
          setAdmissionConfig(res.data.config.admissionButton);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch header config, using defaults:", err);
      });
  }, []);

  useEffect(() => {
    fetchHeaderConfig();
  }, [fetchHeaderConfig]);

  useSocketSync(fetchHeaderConfig);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBuildingsOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "/about", hasDropdown: true },
    { name: "Academics", href: "/academics" },
    { name: "Buildings", href: "/branches", hasDropdown: true },
    { name: "Faculty", href: "/faculty" },
    { name: "Life @ MG", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  const branchSubLinks = [
    { name: "BUILDING A", subtitle: "", href: "/branches/block-a" },
    { name: "BUILDING B", subtitle: "", href: "/branches/block-b" },
    { name: "HIGH SCHOOL", subtitle: "", href: "/branches/block-c" },
  ];

  const aboutSubLinks = [
    { name: "Principal's Message", subtitle: "Welcome Address", href: "/about/principal-message" },
    { name: "Trustees", subtitle: "Our Visionary Leaders", href: "/about/trustees" },
    { name: "Why Choose Us", subtitle: "Future-Ready Education", href: "/about/why-choose-us" },
  ];

  return (
    <div className="fixed top-0 w-full z-[100] px-3 sm:px-4 py-4 md:py-6 pointer-events-none">
      <motion.nav
        layout
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
        className={cn(
          "mx-auto rounded-[2rem] transition-all duration-500 pointer-events-auto",
          admissionConfig?.isVisible ? "max-w-7xl w-full" : "max-w-5xl w-full",
          scrolled
            ? "glass shadow-2xl py-3 px-5 lg:px-7"
            : "bg-white/70 backdrop-blur-md py-4 px-6 lg:px-8 border border-white/40 shadow-lg"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/images/Logo_of_M_G_Schools_Solo.jpg-removebg-preview.png"
              alt="M.G. School Logo"
              className="h-10 sm:h-12 w-auto object-contain group-hover:rotate-3 transition-transform duration-500"
            />
            <div className="flex flex-col">
              <span
                className="text-xl sm:text-2xl font-black text-primary leading-none"
                style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
              >
                M.G. SCHOOL
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-secondary">
                Legacy of Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={link.name === "Buildings" ? dropdownRef : aboutDropdownRef}>
                  <button
                    onClick={() => {
                      if (link.name === "Buildings") {
                        setBuildingsOpen(!buildingsOpen);
                        setAboutOpen(false);
                      } else {
                        setAboutOpen(!aboutOpen);
                        setBuildingsOpen(false);
                      }
                    }}
                    className={cn(
                      "px-3.5 xl:px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-primary/5 flex items-center gap-1.5 cursor-pointer",
                      pathname.startsWith(link.href) ? "text-primary bg-primary/10" : "text-gray-600 hover:text-primary"
                    )}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        (link.name === "Buildings" ? buildingsOpen : aboutOpen) && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {((link.name === "Buildings" && buildingsOpen) || (link.name === "About" && aboutOpen)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        {/* Sub-links */}
                        {(link.name === "About" ? aboutSubLinks : branchSubLinks).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            prefetch={true}
                            onClick={() => {
                              setBuildingsOpen(false);
                              setAboutOpen(false);
                            }}
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
                    "px-3.5 xl:px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-primary/5",
                    pathname === link.href ? "text-primary bg-primary/10" : "text-gray-600 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Right Section: Header Admission Button & Mobile Hamburger */}
          <div className={cn("flex items-center gap-3", !admissionConfig?.isVisible && "lg:hidden")}>
            {admissionConfig?.isVisible && (
              <a
                href={admissionConfig.link || "#"}
                target={admissionConfig.openInNewTab ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold bg-secondary text-primary hover:bg-secondary/90 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group border border-secondary/50 shrink-0"
                title={admissionConfig.text}
              >
                <GraduationCap size={16} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="truncate max-w-[200px] xl:max-w-none">{admissionConfig.text}</span>
                <ArrowRight size={14} className="text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            )}

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2.5 sm:p-3 rounded-2xl bg-primary text-white shadow-lg active:scale-90 transition-transform cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 top-24 bg-primary rounded-[3rem] p-8 sm:p-12 z-50 pointer-events-auto shadow-3xl lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-4">
              <div className="text-secondary text-xs sm:text-sm font-black uppercase tracking-[0.4em] mb-6 sm:mb-10 text-center">
                Main Navigation
              </div>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => {
                          if (link.name === "Buildings") {
                            setMobileBuildingsOpen(!mobileBuildingsOpen);
                            setMobileAboutOpen(false);
                          } else {
                            setMobileAboutOpen(!mobileAboutOpen);
                            setMobileBuildingsOpen(false);
                          }
                        }}
                        className={cn(
                          "text-3xl sm:text-4xl font-playfair font-bold py-2 flex items-center gap-3 w-full text-left cursor-pointer",
                          pathname.startsWith(link.href) ? "text-secondary" : "text-white/60 hover:text-white"
                        )}
                      >
                        {link.name}
                        <ChevronDown
                          size={22}
                          className={cn(
                            "transition-transform duration-300",
                            (link.name === "Buildings" ? mobileBuildingsOpen : mobileAboutOpen) && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {((link.name === "Buildings" && mobileBuildingsOpen) || (link.name === "About" && mobileAboutOpen)) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-6 space-y-2"
                          >
                            {(link.name === "About" ? aboutSubLinks : branchSubLinks).map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                prefetch={true}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileBuildingsOpen(false);
                                  setMobileAboutOpen(false);
                                }}
                                className="flex items-center gap-3 py-2"
                              >
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                                <div>
                                  <div className="text-lg sm:text-xl font-playfair font-bold text-white/80 hover:text-white">
                                    {sub.name}
                                  </div>
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
                        "text-3xl sm:text-4xl font-playfair font-bold block py-2",
                        pathname === link.href ? "text-secondary" : "text-white/60 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 mt-8 pt-6 border-t border-white/10">
              {admissionConfig?.isVisible && (
                <a
                  href={admissionConfig.link || "#"}
                  target={admissionConfig.openInNewTab ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="bg-secondary text-primary w-full py-4 px-6 rounded-2xl font-black text-lg text-center shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-3"
                >
                  <GraduationCap size={22} />
                  <span>{admissionConfig.text}</span>
                  <ExternalLink size={18} />
                </a>
              )}

              <Link
                href="/enroll"
                onClick={() => setIsOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white w-full py-4 rounded-2xl font-bold text-base text-center shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Start Your Journey
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
