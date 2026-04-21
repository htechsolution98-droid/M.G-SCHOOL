"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { Target, Eye, ShieldCheck, History, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
export default function About() {
  const values = [
    {
      icon: <Target className="w-12 h-12 text-secondary" />,
      title: "Our Mission",
      description: "To provide a nurturing environment where students are inspired to achieve academic excellence and develop into compassionate leaders.",
    },
    {
      icon: <Eye className="w-12 h-12 text-secondary" />,
      title: "Our Vision",
      description: "To be a global leader in education, fostering innovation, integrity, and a lifelong passion for learning in every student.",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-secondary" />,
      title: "Core Values",
      description: "Integrity, Respect, Excellence, and Inclusivity are the pillars that guide every interaction and decision at M.G. School.",
    },

  ];

  const [content, setContent] = useState<any>(null);

  React.useEffect(() => {
    axiosInstance.get("/api/about-content")
      .then((res) => {
        if (res.data.success) setContent(res.data.content);
      })
      .catch(() => { });
  }, []);

  const hero = content?.hero || {
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
    heading: "Our Journey of ",
    headingHighlight: "Success.",
    description: "Three decades of academic excellence, carving a legacy that inspires generations.",
  };

  const legacy = content?.legacy || {
    headingPrefix: "Founded on ",
    headingHighlight: "Vision.",
    paragraphs: [
      "Established in 1995, M.G. School emerged from a simple yet profound dream: to provide world-class education that respects local roots while embracing global growth.",
      "What began in a modest building with 50 students has now evolved into a multi-campus educational beacon, nurturing thousands of bright minds every year.",
    ],
    stat1Value: "28+",
    stat1Label: "Years Legacy",
    stat2Value: "15k",
    stat2Label: "Alumni Globally",
    archiveYear: "Archive 1995",
    archiveTitle: "The First Foundation.",
    imageMain: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80",
    imageSmall1: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    imageSmall2: "https://images.unsplash.com/photo-1577891772447-b31528753a9c",
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Immersive Header */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src={hero.image}
            alt="School Exterior"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="container-custom relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <div className="bg-secondary p-4 rounded-2xl w-max mb-8 shadow-2xl">
              <History className="text-primary w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-white mb-8 leading-tight drop-shadow-2xl">
              {hero.heading} <span className="italic text-secondary underline decoration-secondary decoration-4 underline-offset-8 font-black">{hero.headingHighlight}</span>
            </h1>
            <p className="text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
              {hero.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20"
        >
          <ArrowDown className="text-white" />
        </motion.div>
      </section>

      {/* Legacy Section - Sophisticated Split */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 sticky top-32"
            >
              <h2 className="text-5xl md:text-8xl font-playfair font-black mb-12 text-primary leading-tight">{legacy.headingPrefix} <br /><span className="text-secondary">{legacy.headingHighlight}</span></h2>
              <div className="h-2 w-32 bg-primary mb-12 rounded-full" />
              <div className="space-y-6 text-xl text-gray-500 font-light leading-relaxed">
                {legacy.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="pt-10 grid grid-cols-2 gap-10">
                  <div className="p-8 bg-slate-50 rounded-[3rem] border border-gray-100">
                    <div className="text-5xl font-playfair font-black text-primary mb-2">{legacy.stat1Value}</div>
                    <div className="text-xs uppercase tracking-widest font-black text-secondary">{legacy.stat1Label}</div>
                  </div>
                  <div className="p-8 bg-primary rounded-[3rem] text-white">
                    <div className="text-5xl font-playfair font-black text-secondary mb-2">{legacy.stat2Value}</div>
                    <div className="text-xs uppercase tracking-widest font-black text-white/60">{legacy.stat2Label}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-16"
            >
              <div className="group relative overflow-hidden rounded-[4rem] shadow-3xl">
                <Image src={legacy.imageMain} alt="Legacy" width={800} height={1000} className="object-cover h-[800px] w-full group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-12 left-12">
                  <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4 block">{legacy.archiveYear}</span>
                  <h3 className="text-4xl text-white font-playfair font-black">{legacy.archiveTitle}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] relative">
                  <Image src={legacy.imageSmall1} alt="History" fill className="object-cover" />
                </div>
                <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] mt-12 relative">
                  <Image src={legacy.imageSmall2} alt="History" fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section - Floating Cards */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle title="Our Strategic Pillars" subtitle="The core philosophy that drives every lesson and interaction." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-16 rounded-[4rem] shadow-3xl group border-b-[6px] border-secondary hover:-translate-y-4 transition-all duration-500"
              >
                <div className="mb-10 w-24 h-24 rounded-[2rem] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  {val.icon}
                </div>
                <h3 className="text-3xl font-playfair font-black mb-6">{val.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed font-light">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Scroll - Organic feel */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-playfair font-black text-primary mb-10 leading-tight">Every Child, <br /><span className="text-secondary italic underline">Every Future.</span></h2>
            <p className="text-2xl text-gray-400 font-light italic">"Our commitment is to the unique potential within every student."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Immersive Digital Classrooms",
              "Holistic Character Building",
              "Global Athletic Exposure",
              "Creative & Performing Arts",
              "Ethics-Driven Education",
              "Sustainable Campus Living",
              "Peer-to-Peer Mentorship",
              "International Exchange"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary p-10 rounded-[3rem] text-white flex flex-col justify-between h-[300px] group hover:bg-secondary transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary font-black text-3xl group-hover:bg-primary/20">{i + 1}</div>
                <h4 className="text-2xl font-playfair font-bold text-white group-hover:text-primary leading-tight">{item}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
