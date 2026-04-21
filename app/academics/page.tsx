"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { BookMarked, Microscope, Laptop, Music, Dumbbell, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Academics = () => {
  const sections = [
    {
      title: "Primary Foundation",
      level: "Std 1 to 5",
      tagline: "Building Bright Beginnings",
      description: "Our primary program focuses on sensory and play-based learning, ensuring every child develops a love for discovery while mastering core literacy and numeracy.",
      features: ["Experimental Science", "Vedic Mathematics", "Creative Storytelling", "Environmental Awareness"],
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070",
      color: "from-blue-500/10 to-transparent"
    },
    {
      title: "Secondary Excellence",
      level: "Std 6 to 10",
      tagline: "Critical Thinking & Character",
      description: "Students transition into abstract reasoning and critical analysis. We combine rigorous board curriculum with real-world application to prepare them for global stages.",
      features: ["Robotics & Coding", "Advanced Social Sciences", "Foreign Language Lab", "Competitive Sports"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2023",
      color: "from-amber-500/10 to-transparent"
    },
    {
      title: "Higher Secondary",
      level: "Std 11 & 12",
      tagline: "Career & Leadership Portals",
      description: "Dedicated streams for Science, Commerce, and Arts with personalized mentoring. We focus on entrance exam mastery and professional portfolio development.",
      features: ["University Guidance", "Research Workshops", "Enterprise Training", "Creative Portfolio"],
      image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
      color: "from-primary/10 to-transparent"
    }
  ];

  const facilities = [
    { icon: <Microscope className="w-10 h-10" />, name: "Advanced Science Labs" },
    { icon: <Laptop className="w-10 h-10" />, name: "High-Tech IT Lab" },
    { icon: <BookMarked className="w-10 h-10" />, name: "Digital Knowledge Hub" },
    { icon: <Dumbbell className="w-10 h-10" />, name: "Indoor Sports Complex" },
    { icon: <Music className="w-10 h-10" />, name: "Creative Arts Studio" },
    { icon: <Globe className="w-10 h-10" />, name: "Global Language Lab" },
  ];

  return (
    <div className="pt-24 min-h-screen mb-32">
      {/* Dynamic Header */}
      <section className="bg-slate-50 py-32 md:py-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-4 bg-primary text-secondary rounded-2xl mb-10 shadow-2xl"
          >
            <Sparkles size={40} />
          </motion.div>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter"
          >
            Elite <br/><span className="text-secondary italic">Curriculum.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-400 font-light max-w-3xl leading-relaxed"
          >
            "Academic rigour meets creative freedom. We cultivate minds that think differently and lead effectively."
          </motion.p>
        </div>
      </section>

      {/* Program Blocks - Innovative Layout */}
      <section className="mt-20">
        <div className="container-custom space-y-32 md:space-y-48">
          {sections.map((section, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-center`}>
              <motion.div 
                initial={{ x: idx % 2 === 1 ? 50 : -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-secondary font-black text-xl font-playfair italic">0{idx + 1}.</span>
                  <div className="h-px w-20 bg-gray-200" />
                  <span className="text-xs uppercase tracking-[0.4em] font-black text-primary/40">{section.level}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-playfair font-black mb-8 leading-tight">{section.title}</h2>
                <div className="text-secondary text-lg font-bold uppercase tracking-widest mb-10">{section.tagline}</div>
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                  {section.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.features.map((feature, fIdx) => (
                    <motion.div 
                      key={fIdx} 
                      whileHover={{ x: 10, backgroundColor: "#1E3A8A", color: "white" }}
                      className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2rem] transition-all cursor-default border border-gray-100 group"
                    >
                      <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-150 transition-transform" />
                      <span className="font-bold text-sm uppercase tracking-wider">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="lg:w-1/2 relative group"
              >
                <div className={cn("absolute inset-x-0 -bottom-10 h-4/5 -z-10 rounded-[5rem] blur-3xl", section.color)} />
                <div className="relative overflow-hidden rounded-[5rem] shadow-3xl">
                  <Image 
                    src={section.image} 
                    alt={section.title} 
                    width={800} 
                    height={1000} 
                    className="object-cover h-[700px] w-full group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Facilities Grid */}
      <section className="section-padding bg-slate-50 mt-32 rounded-[5rem] border border-gray-100">
        <div className="container-custom">
          <SectionTitle 
            title="World-Class Infrastructure" 
            subtitle="The right environment is half the education. We invest in the tools of tomorrow."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 mt-24">
            {facilities.map((fac, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-16 rounded-[4rem] shadow-xl hover:shadow-3xl transition-all group flex flex-col items-center text-center border border-transparent hover:border-secondary/20"
              >
                <div className="text-primary bg-primary/5 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  {fac.icon}
                </div>
                <h4 className="text-xl font-playfair font-black text-primary group-hover:text-secondary transition-colors uppercase tracking-widest">{fac.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Call to Action */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-20 md:p-32 rounded-[6rem] text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h2 className="text-5xl md:text-8xl font-playfair font-black mb-12 relative z-10">Unlocking <span className="text-secondary italic">Potential.</span></h2>
            <p className="text-2xl text-white/50 mb-16 max-w-2xl mx-auto font-light relative z-10">Admissions for the upcoming session are strictly by evaluation. Reserve your slot now.</p>
            <div className="flex flex-wrap justify-center gap-8 relative z-10">
              <button className="bg-white text-primary px-16 py-6 rounded-[2.5rem] font-black hover:bg-secondary transition-all shadow-2xl active:scale-95">Download Prospectus</button>
              <button className="border border-white/20 text-white px-16 py-6 rounded-[2.5rem] font-black hover:bg-white hover:text-primary transition-all active:scale-95">Admission Portal</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
