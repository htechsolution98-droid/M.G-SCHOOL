"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";
import { Sparkles, Heart, Star, Camera } from "lucide-react";

const LifeAtMGPage = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    axiosInstance.get("/api/life-at-mg")
      .then((res) => {
        if (res.data.success) {
          setContent(res.data.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const hero = content?.hero || {
    heading: "Life at M.G. School",
    description: "A vibrant community where students learn, grow, and create memories that last a lifetime.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
  };

  const slider = content?.slider || [];

  return (
    <div className="pt-24 min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/40 z-10" />
        <Image src={hero.image} fill className="object-cover" alt="Life at MG" priority />
        <div className="container-custom relative z-20 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-playfair font-black mb-8 leading-tight tracking-tighter">
              {hero.heading}
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic opacity-90">
              "{hero.description}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Slider Showcase */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-secondary rounded-full" />
                <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">The MG Experience</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary leading-tight tracking-tighter">
                Moments of <br/><span className="text-secondary italic">Excellence.</span>
              </h2>
            </div>
            <div className="flex gap-4">
               <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-sm"><Heart size={24} /></div>
               <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary shadow-sm"><Star size={24} /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slider.map((img: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative group rounded-[3rem] overflow-hidden shadow-2xl h-[500px] ${idx % 2 !== 0 ? 'md:translate-y-12' : ''}`}
              >
                <Image src={img} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" alt="Activity" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                   <div className="text-white">
                      <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center mb-4"><Camera size={20} /></div>
                      <p className="text-sm font-bold uppercase tracking-widest">MG Chronicle #{idx + 1}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Features Section */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-pattern" />
        <div className="container-custom text-center relative z-10">
           <Sparkles size={48} className="text-secondary mx-auto mb-10" />
           <h2 className="text-4xl md:text-5xl font-playfair font-black mb-12 italic underline decoration-secondary/30 underline-offset-[16px]">
             "Education is the most powerful weapon which you can use to change the world."
           </h2>
           <div className="w-32 h-1 bg-secondary mx-auto mb-10 rounded-full" />
           <p className="text-sm font-black uppercase tracking-[0.5em] text-secondary">Nelson Mandela</p>
        </div>
      </section>
    </div>
  );
};

export default LifeAtMGPage;
