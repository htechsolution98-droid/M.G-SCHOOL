"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-30" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="flex items-center gap-4 group">
              <img src="/images/Logo_of_M_G_Schools_Solo.jpg-removebg-preview.png" alt="M.G. School Logo" className="h-16 w-auto object-contain group-hover:rotate-3 transition-transform duration-500" />
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-black tracking-tighter">M.G. SCHOOL</span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-secondary">Est. 1995</span>
              </div>
            </Link>
            <p className="text-white/50 text-xl font-light leading-relaxed italic">
              "Dedicated to crafting the global leaders of tomorrow through a fusion of traditional ethics and modern innovation."
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook />, label: "Facebook", href: "#" },
                { icon: <Twitter />, label: "Twitter", href: "#" },
                { icon: <Instagram />, label: "Instagram", href: "https://www.instagram.com/mahatma_gandhi_primary_school?igsh=aW01eGo5amJ1MmY4" },
                { icon: <Youtube />, label: "Youtube", href: "#" }
              ].map((social, i) => (
                <Link key={i} href={social.href} target={social.href !== "#" ? "_blank" : "_self"} rel={social.href !== "#" ? "noopener noreferrer" : ""} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-500 border border-white/10 group">
                   <span className="w-5 h-5 group-hover:scale-110 transition-transform">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-10 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Institutional
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Academics", href: "/academics" },
                  { name: "Faculty Portfolio", href: "/faculty" },
                  { name: "Campus Branches", href: "/branches" },
                  { name: "Admissions", href: "/enroll" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-10 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Programs
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Primary Block", href: "/branches/block-a" },
                  { name: "Secondary Elite", href: "/branches/block-b" },
                  { name: "Higher Secondary", href: "/branches/block-c" },
                  { name: "Bilingual Academy", href: "/academics" },
                  { name: "Global Sports", href: "/life-at-mg" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-10 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Reach Us
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-secondary shrink-0" size={20} />
                  <p className="text-sm font-medium text-white/60 leading-relaxed italic">
                    Education Square, Central Hub, <br/>Sector 15, MG School Road.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-secondary shrink-0" size={20} />
                  <p className="text-sm font-black">+91 98765 43210</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                   <div className="flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-widest mb-2">
                      <ShieldCheck size={12} /> Institutional Trust
                   </div>
                   <p className="text-[10px] text-white/40 leading-relaxed">Accredited by the Global Academic Board, ensuring excellence in every lesson.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] order-2 md:order-1">
            © {new Date().getFullYear()} M.G. School – Where Dreams Take Flight.
          </p>
          <div className="flex gap-12 order-1 md:order-2">
             <Link href="#" className="text-white/30 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-white/30 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
