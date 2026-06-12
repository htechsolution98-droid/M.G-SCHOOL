"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle = ({ title, subtitle, centered = true }: SectionTitleProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`max-w-4xl ${centered ? "text-center mx-auto" : "text-left"} mb-12`}
    >
      <div className={`flex items-center gap-4 mb-8 ${centered ? "justify-center" : ""}`}>
        <div className="h-0.5 w-12 bg-secondary rounded-full" />
        <span className="text-xs uppercase tracking-[0.5em] font-black text-primary/40">Excellence in Education</span>
        <div className="h-0.5 w-12 bg-secondary rounded-full" />
      </div>
      <h2 className="text-3xl md:text-6xl font-playfair font-black text-primary mb-10 leading-[0.9] tracking-tighter uppercase underline decoration-secondary/20 underline-offset-[16px]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic">
          "{subtitle}"
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
