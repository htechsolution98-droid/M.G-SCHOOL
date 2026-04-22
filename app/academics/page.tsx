"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import { BookMarked, Microscope, Laptop, Music, Dumbbell, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";

const Academics = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get("/api/academics-content")
      .then((res) => {
        if (res.data.success) setContent(res.data.content);
      })
      .catch(() => { });
  }, []);

  const hero = content?.hero || {
    heading: "Elite",
    headingHighlight: "Curriculum.",
    description: '"Academic rigour meets creative freedom. We cultivate minds that think differently and lead effectively."',
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
  };

  const sections = content?.programs || [
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

  const activities = (content?.activities && content.activities.length > 0) ? content.activities : [
    {
      title: "Extracurricular Programs",
      description: "Our comprehensive extracurricular programs run throughout the academic year, fostering teamwork, leadership, and physical excellence across multiple disciplines.",
      images: [
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2023",
        "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070"
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen mb-32">
      {/* Dynamic Header - Split UI */}
      <section className="bg-slate-50 py-20 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            {/* Left Content */}
            <div className="lg:w-1/2 text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="p-4 bg-primary text-secondary rounded-2xl mb-10 shadow-2xl inline-block"
              >
                <Sparkles size={40} />
              </motion.div>
              <motion.h1 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter"
              >
                {hero.heading} <br/><span className="text-secondary italic">{hero.headingHighlight}</span>
              </motion.h1>
              <motion.p 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-400 font-light max-w-xl leading-relaxed"
              >
                {hero.description}
              </motion.p>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 glass p-4 rounded-[4rem] shadow-2xl"
              >
                <Image
                  src={hero.image}
                  alt="Academics"
                  width={800}
                  height={600}
                  className="rounded-[3.5rem] object-cover h-[400px] md:h-[500px] w-full"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-secondary p-6 rounded-[2rem] shadow-3xl hidden md:block">
                  <div className="text-primary font-black text-xs uppercase tracking-widest">Enrollment Open</div>
                  <div className="text-2xl font-playfair font-black text-primary">Session 2024-25</div>
                </div>
              </motion.div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Program Blocks - Innovative Layout */}
      <section className="mt-20">
        <div className="container-custom space-y-32 md:space-y-48">
          {sections.map((section: any, idx: number) => (
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
                  {(section.features || []).map((feature: string, fIdx: number) => (
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
                <div className={cn("absolute inset-x-0 -bottom-10 h-4/5 -z-10 rounded-[5rem] blur-3xl", section.color || "from-primary/10 to-transparent")} />
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

      {/* Dynamic Activities Section */}
      <section className="section-padding bg-slate-50 mt-32 rounded-[5rem] border border-gray-100">
        <div className="container-custom">
          <SectionTitle 
            title="Beyond the Classroom" 
            subtitle="Engaging activities that foster creativity, leadership, and holistic development."
          />
          
          <div className="mt-20 px-4 md:px-12 relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={40}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="pb-16"
            >
              {activities.map((activity: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-xl border border-gray-100 mx-2 mb-10">
                    <div className="text-center mb-12">
                      <h3 className="text-4xl md:text-5xl font-playfair font-black text-primary mb-6">{activity.title}</h3>
                      <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">{activity.description}</p>
                    </div>
                    
                    {activity.images && activity.images.length > 0 && (
                      <div className="rounded-[3rem] overflow-hidden shadow-lg">
                        <Swiper
                          modules={[Autoplay, EffectFade]}
                          effect="fade"
                          speed={1000}
                          autoplay={{ delay: 3000, disableOnInteraction: false }}
                          loop
                          className="w-full h-[400px] md:h-[500px]"
                        >
                          {activity.images.map((img: string, imgIdx: number) => {
                            if (!img) return null;
                            return (
                              <SwiperSlide key={imgIdx}>
                                <div className="relative w-full h-full">
                                  <Image 
                                    src={img}
                                    alt={`${activity.title} image ${imgIdx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
