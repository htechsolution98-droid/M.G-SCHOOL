"use client";

import React, { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import { BookOpen, Users, Award, Trophy, ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Award: <Award size={20} />,
  Trophy: <Trophy size={20} />,
  BookOpen: <BookOpen size={20} />,
  Heart: <Heart size={20} />,
};

const featureIconMap: Record<string, React.ReactNode> = {
  "Intellectual Rigor": <BookOpen className="text-secondary" />,
  "Ethical Leadership": <ShieldCheck className="text-secondary" />,
  "Physical Wellness": <Trophy className="text-secondary" />,
  "Creative Expression": <Heart className="text-secondary" />,
};

export default function Home() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get("/api/home-content")
      .then((res) => {
        if (res.data.success) setContent(res.data.content);
      })
      .catch(() => {});
  }, []);

  // Fallback data while loading
  const stats = content?.stats || [
    { label: "Students", value: "2,500+", icon: "Users" },
    { label: "Faculty", value: "150+", icon: "ShieldCheck" },
    { label: "Exp", value: "28 Yrs", icon: "Award" },
  ];

  const philosophy = content?.philosophy || {
    badge: "Established 1995",
    heading: "Cultivating",
    headingHighlight: "Wisdom",
    description: "Our curriculum is designed to ignite curiosity. We don't just teach subjects; we inspire a lifelong passion for discovery in an environment that honors both tradition and technological progress.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071",
    floatingText: "Child-Centric Learning Approach",
    features: ["Intellectual Rigor", "Ethical Leadership", "Physical Wellness", "Creative Expression"],
    ctaText: "Explore Our Legacy",
    ctaLink: "/about",
  };

  const campusHubs = content?.campusHubs || [
    {
      id: "block-a",
      name: "Block A",
      hub: "Foundation Hub",
      title: "Primary Foundation",
      desc: "Activity-based learning for Std 1–8 in our vibrant Gujarati Medium campus.",
      img: "/images/kids-school (1).jpg"
    },
    {
      id: "block-b",
      name: "Block B",
      hub: "Excellence Hub",
      title: "Secondary Mastery",
      desc: "Rigorous preparation for Std 9–12 Board Exams with expert academic guidance.",
      img: "/images/proud-teacher-with-her-elementary-students (1).jpg"
    },
    {
      id: "block-c",
      name: "Block C",
      hub: "International Hub",
      title: "Bilingual Academy",
      desc: "Our premium dual-medium campus with global technology & sports infrastructure.",
      img: "/images/school3 (1).jpg"
    }
  ];

  const heroSlides = content?.heroSlides || null;

  return (
    <div className="flex flex-col w-full">
      <HeroSlider slides={heroSlides} />

      {/* Floating Stats Section */}
      <section className="relative z-20 -mt-20">
        <div className="container-custom">
          <div className="bg-white rounded-[3rem] p-10 shadow-3xl flex flex-wrap justify-around items-center gap-8 border border-gray-100">
            {stats.map((stat: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  {iconMap[stat.icon] || <Users size={20} />}
                </div>
                <div>
                  <div className="text-3xl font-playfair font-black text-primary">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest font-black text-secondary">{stat.label}</div>
                </div>
              </motion.div>
            ))}
            <div className="h-10 w-px bg-gray-100 hidden lg:block" />
            <Link href="/contact" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-secondary hover:text-primary transition-all shadow-xl">
              Take Virtual Tour <Zap size={18} className="fill-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
              <div className="relative z-10 glass p-4 rounded-[4rem] shadow-2xl">
                <Image
                  src={philosophy.image}
                  alt="Students"
                  width={600}
                  height={800}
                  className="rounded-[3.5rem] object-cover h-[600px] w-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute -bottom-10 -right-10 bg-secondary p-10 rounded-[3rem] shadow-3xl text-primary max-w-[250px]"
                >
                  <Heart className="w-10 h-10 mb-4 fill-primary" />
                  <div className="text-2xl font-playfair font-black leading-tight">{philosophy.floatingText}</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full w-max mb-8">{philosophy.badge}</div>
              <h2 className="text-5xl md:text-7xl font-playfair font-black leading-[1.1] mb-10 text-primary">
                {philosophy.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-600">{philosophy.headingHighlight}</span> &amp; Character.
              </h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                {philosophy.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {(philosophy.features || []).map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-white hover:shadow-xl rounded-2xl transition-all border border-transparent hover:border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      {featureIconMap[feature] || <BookOpen className="text-secondary" />}
                    </div>
                    <span className="font-bold text-primary">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={philosophy.ctaLink} className="group text-primary font-black text-xl flex items-center gap-4">
                {philosophy.ctaText}
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches Highlights - Asymmetrical Grid */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <header className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-8xl font-playfair font-black mb-8 leading-tight">Expertly Designed <br /><span className="italic text-secondary">Campus Hubs.</span></h2>
            <p className="text-xl text-gray-400 font-medium">Three specialized campuses tailored for different stages of development.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {campusHubs.map((item: any, idx: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl cursor-pointer"
              >
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end h-1/2">
                  <div className="glass p-8 rounded-[3rem] border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-3">{item.hub}</div>
                    <h3 className="text-3xl font-playfair font-black text-primary mb-4">{item.name}: <span className="italic">{item.title}</span></h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      {item.desc}
                    </p>
                    <Link href={`/branches/${item.id}`} className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:text-secondary transition-colors">
                      Enter Campus <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[5rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-5xl md:text-[7rem] font-playfair text-secondary leading-none mb-10">Start Your <span className="text-secondary italic">Future</span> Today.</h2>
          <p className="text-2xl text-white/60 mb-16 max-w-2xl mx-auto font-light leading-relaxed">Join a community of thousands already crafting their success stories at M.G. School.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link href="/contact" className="bg-secondary text-primary px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-white transition-all shadow-2xl active:scale-95">Enroll Now</Link>
            <Link href="/academics" className="border border-white/30 text-white px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-white hover:text-primary transition-all shadow-2xl active:scale-95">View Academy</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
