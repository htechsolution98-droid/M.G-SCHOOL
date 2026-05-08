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
import { useSocketSync } from "@/hooks/useSocketSync";
import ReadMore from "@/components/ReadMore";
import LoadingScreen from "@/components/LoadingScreen";


const Academics = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    axiosInstance.get("/api/academics-content")
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

  const hero = content?.hero || {
    heading: "",
    headingHighlight: "",
    description: "",
    image: "",
    images: []
  };

  const sections = content?.programs || [];

  const facilities = [
    { icon: <Microscope className="w-10 h-10" />, name: "Advanced Science Labs" },
    { icon: <Laptop className="w-10 h-10" />, name: "High-Tech IT Lab" },
    { icon: <BookMarked className="w-10 h-10" />, name: "Digital Knowledge Hub" },
    { icon: <Dumbbell className="w-10 h-10" />, name: "Indoor Sports Complex" },
    { icon: <Music className="w-10 h-10" />, name: "Creative Arts Studio" },
    { icon: <Globe className="w-10 h-10" />, name: "Global Language Lab" },
  ];

  const journeyData = content?.journey;
  const journey = {
    title: journeyData?.title || "A Journey of Excellence in Education",
    subtitle: journeyData?.subtitle || "M. G. School Journey so far… milestones in last 7 decades:",
    paragraphs: (journeyData?.paragraphs && journeyData.paragraphs.length > 0)
      ? journeyData.paragraphs
      : [
        "M. G. School stands as a premier institution with over 78 years of excellence in education. From its humble beginning in 1948 with just 36 students, the school has grown into one of the largest institutions in the Sindhi community in India, proudly serving over 1500 students while earning the trust and confidence of society.",
        "We believe in personalized learning, where every child matters. With limited class sizes, teachers provide individual attention, and dedicated mentoring ensures that each student, including slow learners, receives the guidance they need to succeed.",
        "Our approach promotes balanced and stress-free education through interactive learning methods, including reading programs, spoken English, educational software, projects, and experiential activities such as visits and excursions. This ensures the overall development of every student.",
      ],
    milestones: (journeyData?.milestones && journeyData.milestones.length > 0)
      ? journeyData.milestones
      : [
        { year: "1948", achievement: "Starting M. G. School" },
        { year: "1976", achievement: "10+2 Pattern: starting Science & General streams" },
        { year: "1995", achievement: "Introduced Computer Education" },
        { year: "2000", achievement: "Starting English Medium" },
        { year: "2009", achievement: "Infrastructure Accelerated" },
        { year: "2010", achievement: "XI, XII Science stream converted to English medium (Granted)" }
      ]
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="pt-24 min-h-screen mb-32 overflow-x-hidden">
      {/* Dynamic Header - Full Background Slider UI */}
      <section className="relative h-[60vh] md:h-[80vh] min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden mt-[-6rem]">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={1500}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
          >
            {(() => {
              const slides = [...(hero.images || []), hero.image].filter(img => typeof img === 'string' && img.trim() !== "");
              if (slides.length === 0) return (
                <SwiperSlide>
                  <div className="relative w-full h-full bg-primary" />
                </SwiperSlide>
              );
              return slides.map((img: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`Academics Hero ${idx + 1}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                </SwiperSlide>
              ));
            })()}
          </Swiper>
        </div>

        <div className="container-custom relative z-10 text-center text-white">

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black leading-tight mb-8 tracking-tighter drop-shadow-xl"
          >
            {hero.heading} <br /><span className="text-secondary italic">{hero.headingHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md"
          >
            {hero.description}
          </motion.p>

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
                <h2 className="text-3xl md:text-5xl font-playfair font-black mb-8 leading-tight">{section.title}</h2>
                <div className="text-secondary text-lg font-bold uppercase tracking-widest mb-10">{section.tagline}</div>
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                  <ReadMore text={section.description} limit={180} />
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
                className="w-full lg:w-1/2 relative group"
              >
                <div className={cn("absolute inset-x-0 -bottom-10 h-4/5 -z-10 rounded-[5rem] blur-3xl", section.color || "from-primary/10 to-transparent")} />
                
                {(() => {
                  const allImages = [...(section.images || []), section.image].filter(img => typeof img === 'string' && img.trim() !== "");
                  if (allImages.length === 0) return (
                    <div className="relative h-[350px] md:h-[500px] lg:h-[700px] w-full overflow-hidden rounded-[3rem] lg:rounded-[5rem] shadow-3xl bg-gray-100 flex items-center justify-center">
                       <BookMarked size={48} className="text-gray-300" />
                    </div>
                  );
                  
                  return (
                    <div className="relative h-[350px] md:h-[500px] lg:h-[700px] w-full overflow-hidden rounded-[3rem] lg:rounded-[5rem] shadow-3xl">
                      {allImages.length > 1 ? (
                        <Swiper
                          modules={[Autoplay, EffectFade, Pagination]}
                          effect="fade"
                          pagination={{ clickable: true }}
                          autoplay={{ delay: 3500, disableOnInteraction: false }}
                          loop={true}
                          className="w-full h-full rounded-[4rem] lg:rounded-[5rem]"
                        >
                          {allImages.map((img: string, iIdx: number) => (
                            <SwiperSlide key={iIdx}>
                              <Image
                                src={img}
                                alt={`${section.title} slide ${iIdx + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <Image
                          src={allImages[0]}
                          alt={section.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none z-10" />
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Journey & Milestones */}
      <section className="section-padding bg-slate-50 mt-20 rounded-[5rem] border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: Journey Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-3/5"
            >
              <h2 className="text-sm font-black text-secondary uppercase tracking-[0.4em] mb-6">Our Legacy</h2>
              <h3 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-12 leading-tight">
                {journey.title}
              </h3>
              <div className="space-y-8 text-xl text-gray-500 font-light leading-relaxed">
                {(journey.paragraphs || []).map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Right: Milestones Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/5 bg-white rounded-[4rem] p-12 shadow-2xl border border-gray-100"
            >
              <h4 className="text-xl font-playfair font-black text-primary mb-12 border-b border-gray-100 pb-6">
                {journey.subtitle}
              </h4>
              <div className="space-y-10 relative">
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gray-100" />
                {(journey.milestones || []).map((ms: any, i: number) => (
                  <div key={i} className="flex gap-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-secondary font-black shrink-0 shadow-lg border-4 border-white">
                      {ms.year.slice(-2)}
                    </div>
                    <div>
                      <div className="text-primary font-black text-lg mb-1">{ms.year}</div>
                      <div className="text-gray-500 font-medium leading-relaxed">{ms.achievement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teacher Duty Distribution Plan */}
      {content?.teacherDuties && content.teacherDuties.length > 0 && (
        <section className="pb-24 md:pb-32 pt-10 container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-black text-secondary uppercase tracking-[0.4em] mb-4">Notice / Updates</h2>
            <h3 className="text-4xl md:text-5xl font-playfair font-black text-primary">Teacher Duty Plan 2026–27</h3>
          </div>
          <div className="space-y-12">
            {Object.entries(
              content.teacherDuties.reduce((acc: any, duty: any) => {
                const cat = duty.category || "General Duties";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(duty);
                return acc;
              }, {})
            ).map(([category, duties]: any, catIdx) => (
              <div key={catIdx} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
                <h4 className="text-2xl font-playfair font-black text-primary mb-8 border-b border-gray-100 pb-4">{category}</h4>
                <div className="overflow-x-auto custom-scrollbar-dark">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="text-xs uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                        <th className="pb-4 px-4 font-black w-16 text-center">Sr.</th>
                        <th className="pb-4 px-4 font-black">Duty</th>
                        <th className="pb-4 px-4 font-black">Teachers</th>
                        <th className="pb-4 px-4 font-black">Responsibility Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {duties.map((duty: any, idx: number) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                          <td className="py-6 px-4 text-center font-bold text-gray-400">{idx + 1}</td>
                          <td className="py-6 px-4 font-bold text-primary whitespace-nowrap">{duty.duty}</td>
                          <td className="py-6 px-4 text-gray-600 font-medium whitespace-nowrap">
                            <div className="flex flex-col items-center gap-2">
                              {duty.image && (
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm mb-1 bg-gray-50">
                                  <Image src={duty.image} alt={duty.teachers} width={48} height={48} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <span>{duty.teachers}</span>
                            </div>
                          </td>
                          <td className="py-6 px-4 text-gray-500 italic">{duty.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


    </div>
  );
};

export default Academics;

const CHAR_LIMIT = 150;

function ActivityDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description && description.length > CHAR_LIMIT;

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
        {isLong && !expanded
          ? description.slice(0, CHAR_LIMIT) + "…"
          : description}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary uppercase tracking-widest hover:text-secondary transition-colors cursor-pointer"
        >
          {expanded ? "Read Less ▲" : "Read More ▼"}
        </button>
      )}
    </div>
  );
}
