"use client";

import React from "react";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const branches = [
  {
    id: "block-a",
    name: "Block A",
    subtitle: "The Foundation Campus",
    grades: "Std 1–8",
    medium: "Gujarati Medium",
    location: "East Campus, MG Road",
  },
  {
    id: "block-b",
    name: "Block B",
    subtitle: "The Academic Center",
    grades: "Std 9–12",
    medium: "Gujarati Medium",
    location: "West Campus, Scholars Lane",
  },
  {
    id: "block-c",
    name: "Block C",
    subtitle: "The International Hub",
    grades: "Std 1–12",
    medium: "English & Gujarati Medium",
    location: "Central Hub, Education Square",
  },
];

const BranchesPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Editorial Header */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter shadow-sm">
                Distributed <br />
                <span className="text-secondary italic">Excellence.</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/3 mb-4"
            >
              <p className="text-2xl text-gray-400 font-light italic border-l-4 border-secondary pl-8">
                &ldquo;Three distinct campuses, one unified vision of nurturing
                tomorrow&apos;s leaders.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus Cards - Link to separate pages */}
      <section className="container-custom mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/branches/${branch.id}`}
                className="block bg-slate-50 p-10 rounded-[3rem] border border-gray-100 group hover:bg-primary transition-all duration-700"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:bg-secondary transition-all">
                    <Building2 size={32} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-widest font-black text-primary/40 group-hover:text-white/40">
                      Status
                    </div>
                    <div className="text-secondary font-bold group-hover:text-white">
                      Active
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-playfair font-black text-primary group-hover:text-white mb-2">
                  {branch.name}
                </h3>
                <p className="text-secondary font-bold text-sm italic mb-1 group-hover:text-secondary/80">
                  {branch.subtitle}
                </p>
                <p className="text-sm font-medium text-gray-500 group-hover:text-white/60 mb-4 uppercase tracking-widest">
                  {branch.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-primary/5 text-primary text-[10px] font-black px-4 py-1.5 rounded-full border border-primary/10 tracking-widest uppercase group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20">
                    {branch.grades}
                  </span>
                  <span className="bg-secondary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full border border-secondary/20 tracking-widest uppercase group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20">
                    {branch.medium}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-black group-hover:text-secondary transition-all">
                  Explore Campus{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BranchesPage;
