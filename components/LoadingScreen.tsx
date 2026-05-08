"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white z-[9999] fixed top-0 left-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Main Logo Container */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl relative z-10">
          <img 
            src="/images/logo nbm.png" 
            alt="Logo" 
            className="w-20 h-20 object-contain animate-pulse" 
          />
        </div>

        {/* Orbiting Spinner Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
          />
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-transparent border-t-secondary/40 rounded-full"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <h2 className="text-xl font-playfair font-black text-primary tracking-tight">NAV BHARAT</h2>
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary mt-1">VIDHYA MANDAL</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
