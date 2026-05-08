"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Quote } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";
import ReadMore from "@/components/ReadMore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LoadingScreen from "@/components/LoadingScreen";


const FacultyPage = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    axiosInstance.get("/api/faculty-content")
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

  if (loading) return <LoadingScreen />;

  const hero = {
    heading: content?.hero?.heading || "Inspiring ",
    headingHighlight: content?.hero?.headingHighlight || "Mentors.",
    description: content?.hero?.description || "Meet the dedicated educators who are shaping the future of our students with passion and expertise.",
    slides: content?.hero?.slides || [],
  };

  const facultyMembers = content?.facultyMembers || [];

  return (
    <div className="pt-24 min-h-screen">
      {/* Sophisticated Faculty Banner - Dynamic Slider */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />
        
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {(hero.slides && hero.slides.length > 0 ? hero.slides : [{ 
            image: "https://images.unsplash.com/photo-1524178232363-1fb280d91f3d?q=80&w=2070",
            name: "Our Faculty",
            role: "Dedicated Educators",
            description: hero.description
          }]).map((slide: any, idx: number) => (
            <SwiperSlide key={idx}>
              <div className="container-custom py-20 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24 min-h-[600px]">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/2 space-y-8"
                >
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-black text-primary leading-tight tracking-tighter">
                      {hero.heading} <br />
                      <span className="text-secondary italic">{hero.headingHighlight}</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-secondary rounded-full" />
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl md:text-4xl font-playfair font-black text-primary">
                        {slide.name}
                      </h2>
                      <p className="text-sm font-black text-secondary uppercase tracking-[0.3em]">
                        {slide.role}
                      </p>
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed italic border-l-4 border-gray-100 pl-6">
                      "<ReadMore text={slide.description || ""} limit={120} />"
                    </p>
                  </div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/2 relative"
                >
                  <div className="organic-radius bg-secondary w-full aspect-square absolute top-4 left-4 -z-10 opacity-20 animate-pulse" />
                  <div className="organic-radius border-8 border-white shadow-3xl overflow-hidden aspect-square relative z-10">
                    <Image 
                      src={slide.image} 
                      alt={slide.name} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-1000" 
                    />
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Faculty Profiles - Portfolio Layout */}
      <section className="section-padding bg-slate-50 relative border-y border-gray-100">
        <div className="container-custom">
          <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-playfair font-black text-primary mb-6">Expertise & <span className="text-secondary italic">Leadership</span></h2>
              <p className="text-lg text-gray-500 font-medium tracking-wide font-outfit uppercase">Our leadership remains dedicated to fostering an environment of innovation and ethics.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-8 h-1 bg-secondary rounded-full" />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {facultyMembers.map((faculty: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-[550px] overflow-hidden rounded-[4rem] shadow-2xl mb-10 transition-transform duration-700 group-hover:-translate-y-4">
                  {faculty.image && <Image src={faculty.image} alt={faculty.name} fill className="object-cover" />}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/20 text-white group-hover:bg-secondary group-hover:text-primary transition-all">
                    <GraduationCap size={24} />
                  </div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <div className="text-secondary tracking-[0.3em] font-black uppercase text-[10px] mb-2">{faculty.experience || "Expert"} Experience</div>
                    <h3 className="text-3xl font-playfair font-black mb-1">{faculty.name}</h3>
                    <p className="text-white/60 font-medium text-sm">{faculty.designation} ({faculty.block})</p>
                  </div>
                </div>
                <div className="px-6">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="text-secondary" size={18} />
                    <span className="text-sm font-black text-primary uppercase tracking-widest">{faculty.education}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium italic">"<ReadMore text={`Specializing in ${faculty.expertise}, fostering a dynamic classroom environment through modern pedagogical research.`} limit={120} />"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FacultyPage;
