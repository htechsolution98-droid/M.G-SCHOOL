"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { Target, Eye, ShieldCheck, History, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSocketSync } from "@/hooks/useSocketSync";
import ReadMore from "@/components/ReadMore";


export default function About() {


  const [content, setContent] = useState<any>(null);

  const fetchData = React.useCallback(() => {
    axiosInstance.get("/api/about-content")
      .then((res) => {
        if (res.data.success) setContent(res.data.content);
      })
      .catch(() => { });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  const sectionRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && content?.valuesScroll?.features?.length > 0) {
      let ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".value-card");

        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [content]);

  const hero = content?.hero || {
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
    subheading: "About M.G. School",
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

  const excellence = content?.excellence || [];

  const whyChooseUs = content?.whyChooseUs || {
    heading: "Why Choose Our School",
    headingHighlight: "A Destination for Bright Futures",
    reasons: [
      {
        title: "A Destination for Bright Futures",
        description: "Dedicated to shaping successful and meaningful careers through quality education."
      },
      {
        title: "Legacy of Excellence",
        description: "Backed by decades of rich educational experience and strong academic traditions."
      },
      {
        title: "Innovative Learning Environment",
        description: "Offers modern, forward-thinking programs aligned with current educational trends."
      },
      {
        title: "Peaceful & Student-Friendly Campus",
        description: "A calm, distraction-free environment that enhances focus and learning."
      },
      {
        title: "Holistic Development Approach",
        description: "Focus on intellectual, creative, emotional, and physical growth of every student."
      },
      {
        title: "Advanced Infrastructure & Technology",
        description: "Equipped with modern facilities, high-speed internet, and digital learning resources."
      }
    ]
  };


  const valuesScroll = content?.valuesScroll || {
    heading: "Every Child, ",
    headingHighlight: "Every Future.",
    description: "\"Our commitment is to the unique potential within every student.\"",
    features: [
      { title: "Immersive Digital Classrooms", image: "" },
      { title: "Holistic Character Building", image: "" },
      { title: "Global Athletic Exposure", image: "" },
      { title: "Creative & Performing Arts", image: "" },
      { title: "Ethics-Driven Education", image: "" },
      { title: "Sustainable Campus Living", image: "" },
      { title: "Peer-to-Peer Mentorship", image: "" },
      { title: "International Exchange", image: "" }
    ]
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Immersive Header */}
      <section id="principal" className="relative h-[70vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black text-white mb-8 leading-tight drop-shadow-2xl">
              {hero.heading} <span className="italic text-secondary underline decoration-secondary decoration-4 underline-offset-8 font-black">{hero.headingHighlight}</span>
            </h1>
            <p className="text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
              <ReadMore text={hero.description} limit={120} />
            </p>
          </motion.div>
        </div>




      </section>

      {/* Legacy Section - Sophisticated Split */}
      <section id="legacy" className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 sticky top-32"
            >
              <h2 className="text-3xl md:text-6xl font-playfair font-black mb-12 text-primary leading-tight">{legacy.headingPrefix} <br /><span className="text-secondary">{legacy.headingHighlight}</span></h2>
              <div className="h-2 w-32 bg-primary mb-12 rounded-full" />
              <div className="space-y-6 text-xl text-gray-500 font-light leading-relaxed">
                {legacy.paragraphs.map((p: string, i: number) => (
                  <p key={i}><ReadMore text={p} limit={160} /></p>
                ))}
                <div className="pt-10 grid grid-cols-2 gap-10">
                  <div className="p-8 bg-slate-50 rounded-[3rem] border border-gray-100">
                    <div className="text-3xl font-playfair font-black text-primary mb-2">{legacy.stat1Value}</div>
                    <div className="text-xs uppercase tracking-widest font-black text-secondary">{legacy.stat1Label}</div>
                  </div>
                  <div className="p-8 bg-primary rounded-[3rem] text-white">
                    <div className="text-3xl font-playfair font-black text-secondary mb-2">{legacy.stat2Value}</div>
                    <div className="text-xs uppercase tracking-widest font-black text-white/60">{legacy.stat2Label}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <LegacyImageSlider legacy={legacy} />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Excellence Section */}
      {excellence && excellence.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <SectionTitle title="Excellence in Education" subtitle="Fostering growth through specialized programs and facilities." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
              {excellence.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500 border-b-[6px] border-transparent hover:border-secondary"
                >
                  <div className="h-64 relative overflow-hidden">
                    {item.image && <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />}
                  </div>
                  <div className="p-10">
                    <h3 className="text-3xl font-playfair font-black mb-4 text-primary">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-light"><ReadMore text={item.description} limit={140} /></p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pillars Section - Floating Cards */}
      {/* <section className="section-padding bg-white">
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
      </section> */}

      {/* Values Section */}
      <section id="values" ref={sectionRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-playfair font-black text-gray-900 mb-6 leading-tight">{valuesScroll.heading}</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light italic">{valuesScroll.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(valuesScroll.features || []).map((item: any, i: number) => (
              <ValueFeatureCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Legacy Image Slider ───
function LegacyImageSlider({ legacy }: { legacy: any }) {
  const allImages: string[] =
    legacy.images && legacy.images.length > 0
      ? legacy.images
      : [legacy.imageMain, legacy.imageSmall1, legacy.imageSmall2].filter(Boolean);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % allImages.length), 3500);
    return () => clearInterval(t);
  }, [allImages.length]);

  if (allImages.length === 0) return null;

  return (
    <div className="relative space-y-6">
      {/* Main slide */}
      <div className="relative overflow-hidden rounded-[4rem] shadow-3xl h-[550px]">
        {allImages.map((src, i) => (
          <motion.div
            key={src + i}
            className="absolute inset-0"
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.0 }}
            style={{ zIndex: i === idx ? 1 : 0 }}
          >
            <Image src={src} alt={`Legacy image ${i + 1}`} fill className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 z-10" />
        <div className="absolute bottom-12 left-12 z-20">
          <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4 block">
            {legacy.archiveYear}
          </span>
          <h3 className="text-4xl text-white font-playfair font-black">{legacy.archiveTitle}</h3>
        </div>
      </div>

      {/* Dot controls */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 justify-center">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === idx ? "bg-primary w-8" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail row */}
      {allImages.length > 1 && (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(allImages.length, 4)}, 1fr)` }}>
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                i === idx ? "border-primary shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Value Feature Card (with cycling images) ───
function ValueFeatureCard({ item, index }: { item: any; index: number }) {
  const allImages: string[] =
    item.images && item.images.length > 0
      ? item.images
      : item.image
      ? [item.image]
      : [];

  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const t = setInterval(() => setImgIdx((p) => (p + 1) % allImages.length), 3000 + index * 400);
    return () => clearInterval(t);
  }, [allImages.length, index]);

  return (
    <div className="value-card h-[350px] p-10 rounded-[3rem] border border-gray-100 shadow-xl flex flex-col justify-end group transition-all relative overflow-hidden bg-white hover:shadow-2xl hover:-translate-y-2 cursor-default">
      {allImages.map((src, i) => (
        <motion.div
          key={src + i}
          className="absolute inset-0 z-0"
          animate={{ opacity: i === imgIdx ? 0.12 : 0 }}
          transition={{ duration: 1.0 }}
        >
          <Image src={src} alt={item.title} fill className="object-cover group-hover:opacity-30 transition-opacity duration-500" />
        </motion.div>
      ))}
      {allImages.length > 0 && (
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent z-0" />
      )}
      <h4 className="relative z-10 text-2xl md:text-3xl font-playfair font-bold text-gray-900 leading-tight group-hover:text-black">
        {item.title}
      </h4>
    </div>
  );
}
