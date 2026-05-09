"use client";

import React, { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import CampusHubCard from "@/components/CampusHubCard";
import { BookOpen, Users, Award, Trophy, ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import LoadingScreen from "@/components/LoadingScreen";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Award: <Award size={20} />,
  Trophy: <Trophy size={20} />,
  BookOpen: <BookOpen size={20} />,
  Heart: <Heart size={20} />,
};

import { useSocketSync } from "@/hooks/useSocketSync";

const featureIconMap: Record<string, React.ReactNode> = {
  "Intellectual Rigor": <BookOpen className="text-secondary" />,
  "Ethical Leadership": <ShieldCheck className="text-secondary" />,
  "Physical Wellness": <Trophy className="text-secondary" />,
  "Creative Expression": <Heart className="text-secondary" />,
};

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    axiosInstance.get("/api/home-content")
      .then((res) => {
        if (res.data.success) setContent(res.data.content);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  // Fallback data while loading
  const stats = content?.stats || [];

  const philosophy = content?.philosophy || {
    badge: "",
    heading: "",
    headingHighlight: "",
    description: "",
    image: "",
    floatingText: "",
    features: [],
    ctaText: "",
    ctaLink: "",
  };

  const campusHubs = content?.campusHubs || [];

  const background = content?.background || {
    badge: "",
    title: "",
    titleHighlight: "",
    description: "",
    history: [],
    approvedCentreTitle: "",
    approvedCentreDesc: "",
    englishMediumTitle: "",
    englishSchools: []
  };

  const heroSlides = content?.heroSlides || null;

  if (loading) return <LoadingScreen />;

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
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
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
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full w-max mb-8">{philosophy.badge}</div>
              <h2 className="text-3xl md:text-5xl font-playfair font-black leading-[1.1] mb-10 text-primary">
                {philosophy.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-600">{philosophy.headingHighlight}</span>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches Highlights - Asymmetrical Grid */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <header className="max-w-3xl mb-24">
            <h2 className="text-3xl md:text-6xl font-playfair font-black mb-8 leading-tight">{content?.campusHubsHeading || ""}</h2>
            <p className="text-xl text-gray-400 font-medium">{content?.campusHubsSubheading || ""}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {campusHubs.map((item: any, idx: number) => (
              <CampusHubCard key={item.id} item={item} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>


      {/* Background of the School - Legacy & Structure */}
      {/* 
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full w-max mb-8">
                {background.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-10 leading-tight">
                {background.title} <br />
                <span className="italic text-secondary">{background.titleHighlight}</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed">
                {(background.history || []).length > 0 ? (
                  background.history.map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>{background.description}</p>
                )}
              </div>

              <div className="mt-12 p-8 bg-slate-50 rounded-[3rem] border border-gray-100 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-xl">
                  <Award size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-playfair font-black text-primary">
                    {background.approvedCentreTitle}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {background.approvedCentreDesc}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 grid grid-cols-1 gap-8"
            >

              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Users size={24} />
                  </div>
                  <h3 className="text-2xl font-playfair font-black text-primary">
                    {background.englishMediumTitle}
                  </h3>
                </div>
                <ul className="space-y-6 text-primary">
                  {(background.englishSchools || []).map((school: any, i: number) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-secondary font-black">{i + 1}.</span>
                      <div>
                        <p className="font-bold text-lg">{school.name}</p>
                        <p className="text-gray-400 text-sm">{school.details}</p>
                        <p className="text-gray-400 text-xs mt-1">{school.subDetails}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
