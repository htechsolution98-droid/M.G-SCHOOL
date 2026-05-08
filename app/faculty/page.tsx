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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const hero = content?.hero || {
    heading: "Inspiring ",
    headingHighlight: "Mentors.",
    description: "Meet the dedicated educators who are shaping the future of our students with passion and expertise.",
    images: ["https://images.unsplash.com/photo-1524178232363-1fb280d91f3d?q=80&w=2070"],
  };

  const heroImages = (hero.images && hero.images.length > 0)
    ? hero.images
    : (hero.image ? [hero.image] : ["https://images.unsplash.com/photo-1524178232363-1fb280d91f3d?q=80&w=2070"]);

  const facultyMembers = content?.facultyMembers || [];

  return (
    <div className="pt-24 min-h-screen">
      {/* Sophisticated Faculty Banner */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter">
              {hero.heading} <br />
              <span className="text-secondary italic">{hero.headingHighlight}</span>
            </h1>
            <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
              "{hero.description}"
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:w-1/2 relative"
          >
            <div className="organic-radius bg-secondary w-full aspect-square absolute top-4 left-4 -z-10 opacity-30 animate-pulse" />
            <div className="organic-radius border-8 border-white shadow-3xl overflow-hidden aspect-square relative">
              <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
              >
                {heroImages.map((img: string, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Image src={img} alt={`Mentors ${idx + 1}`} fill className="object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>

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

      {/* Featured Philosophy Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary p-20 md:p-32 rounded-[6rem] text-center text-white relative overflow-hidden shadow-3xl"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-pattern" />
            <Quote className="text-secondary w-20 h-20 mx-auto mb-12 opacity-50" />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-12 leading-tight max-w-4xl mx-auto italic underline decoration-secondary/30 underline-offset-[16px]">
              "Education is not the learning of facts, but the training of the mind to think."
            </h2>
            <div className="w-32 h-1 bg-secondary mx-auto mb-10 rounded-full" />
            <div className="text-secondary font-black tracking-[0.4em] uppercase text-sm">Einstein on Education</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;
