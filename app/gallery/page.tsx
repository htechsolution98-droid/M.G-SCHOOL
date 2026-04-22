"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Camera, Sparkles } from "lucide-react";
import axiosInstance from "@/lib/axios";

const GalleryPage = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Chronicles");

  useEffect(() => {
    axiosInstance.get("/api/gallery")
      .then((res) => {
        if (res.data.success) {
          setContent(res.data.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const categories = ["All Chronicles", ...(content?.categories || [])];
  const images = content?.images || [];

  const filteredImages = activeTab === "All Chronicles" 
    ? images 
    : images.filter((img: any) => img.category === activeTab);

  return (
    <div className="pt-24 min-h-screen">
      {/* Cinematic Gallery Header */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 border-b border-gray-100 -z-10" />
        <div className="container-custom flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary text-secondary rounded-[2rem] flex items-center justify-center mb-10 shadow-3xl"
          >
            <Camera size={40} />
          </motion.div>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black text-primary leading-tight mb-8 tracking-tighter"
          >
            Visual <br/><span className="text-secondary italic">Chronicles.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-400 font-light max-w-2xl leading-relaxed italic"
          >
            "Capturing the vibrant energy and timeless memories of M.G. School – one frame at a time."
          </motion.p>
        </div>
      </section>

      {/* Modern Filter Navigation */}
      <section className="container-custom mt-20">
        <div className="flex flex-wrap justify-center gap-6 mb-24">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all border-2",
                activeTab === cat 
                  ? "bg-primary border-primary text-secondary shadow-2xl scale-110" 
                  : "bg-white border-slate-100 text-slate-400 hover:border-secondary hover:text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div 
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-[4rem] overflow-hidden shadow-2xl h-[450px] cursor-pointer"
              >
                <Image 
                  src={img.src} 
                  alt={img.title} 
                  fill 
                  className="object-cover group-hover:scale-125 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                       <span className="text-secondary text-[10px] font-black uppercase mb-3 tracking-[0.4em] block">Archived In {img.category}</span>
                       <h3 className="text-3xl font-playfair font-bold leading-tight drop-shadow-lg">{img.title}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-secondary text-primary flex items-center justify-center shadow-xl mb-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                       <ArrowUpRight size={28} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Decorative Showcase CTA */}
      <section className="section-padding bg-slate-50 border-t border-gray-100">
        <div className="container-custom">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                 <div className="p-4 bg-secondary text-primary rounded-2xl w-max mb-8 shadow-xl">
                    <Sparkles size={32} />
                 </div>
                 <h2 className="text-3xl md:text-6xl font-playfair font-black text-primary leading-tight mb-8 tracking-tighter uppercase">Request High-Res <br/><span className="italic text-secondary">Archives.</span></h2>
                 <p className="text-xl text-gray-500 font-light leading-relaxed mb-10">Historical moments and event photography are available for parents and alumni via our portal.</p>
                 <button className="bg-primary text-white px-12 py-5 rounded-[2rem] font-bold shadow-2xl hover:bg-secondary hover:text-primary transition-all active:scale-95">Access Alumni Portal</button>
              </motion.div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-8 h-[500px]">
                 <div className="rounded-[3rem] bg-gray-200 overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1540575861501-7c00117fc24b?q=80" alt="Culture" fill className="object-cover" />
                 </div>
                 <div className="rounded-[3rem] bg-gray-200 overflow-hidden shadow-2xl mt-16 scale-110 border-4 border-white relative z-10">
                    <Image src="https://images.unsplash.com/photo-1577891772447-b31528753a9c?q=80" alt="Science" fill className="object-cover" />
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
