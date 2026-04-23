"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GraduationCap, MapPin, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useSocketSync } from "@/hooks/useSocketSync";

export default function BlockPageLayout({ blockKey, children }: { blockKey: "blockA" | "blockB" | "blockC", children?: React.ReactNode }) {
  const [block, setBlock] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    axiosInstance.get("/api/branches-content")
      .then((res) => {
        if (res.data.success && res.data.content && res.data.content[blockKey]) {
          setBlock(res.data.content[blockKey]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [blockKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-32 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!block || !block.name) {
    return (
      <div className="min-h-screen pt-32 pb-32 flex items-center justify-center flex-col">
        <h2 className="text-3xl font-playfair font-black text-primary mb-4">Content Not Found</h2>
        <Link href="/branches" className="text-secondary font-bold hover:underline">Return to Campuses</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 min-h-screen">
      <div className="container-custom mb-12">
        <Link href="/branches" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
          <ArrowLeft size={20} /> Back to Campuses
        </Link>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container-custom"
      >
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Slider Side */}
          <div className="lg:w-1/2 relative w-full">
            
            {block.images && block.images.length > 0 ? (
              <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden rounded-[3rem] lg:rounded-[4.5rem] shadow-2xl">
                <Swiper
                  modules={[Autoplay, EffectFade, Navigation, Pagination]}
                  effect="fade"
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={true}
                  className="w-full h-full block-slider"
                >
                  {block.images.map((img: string, idx: number) => (
                    <SwiperSlide key={idx}>
                      <Image
                        src={img}
                        alt={`${block.name} slide ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-12 left-12 z-20 pointer-events-none">
                  <div className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4">
                    Campus Detail
                  </div>
                  <div className="text-3xl md:text-4xl text-white font-playfair font-black drop-shadow-lg">
                    {block.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden rounded-[3rem] lg:rounded-[4.5rem] shadow-2xl bg-primary flex items-center justify-center">
                <div className="text-center p-12">
                  <GraduationCap size={100} className="text-white/20 mx-auto mb-8" />
                  <div className="text-3xl md:text-4xl text-white font-playfair font-black">{block.name}</div>
                </div>
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 w-full">
            <div className="text-secondary font-black text-xl italic font-playfair mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-secondary" />
              {block.subtitle}
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black mb-8 text-primary leading-none uppercase tracking-tighter break-words">
              {block.name}
            </h2>
            <div className="flex flex-wrap gap-4 mb-10">
              {block.grades && (
                <span className="bg-primary/5 text-primary text-xs font-black px-6 py-2.5 rounded-full border border-primary/10 tracking-widest uppercase">
                  {block.grades}
                </span>
              )}
              {block.medium && (
                <span className="bg-secondary/10 text-primary text-xs font-black px-6 py-2.5 rounded-full border border-secondary/20 tracking-widest uppercase">
                  {block.medium}
                </span>
              )}
            </div>
            
            {block.description && (
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 italic">
                &ldquo;{block.description}&rdquo;
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              {block.location && (
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border border-gray-100">
                  <MapPin className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                      Campus Address
                    </div>
                    <p className="text-gray-500 font-medium">
                      {block.location}
                    </p>
                  </div>
                </div>
              )}
              {block.principal && (
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border border-gray-100">
                  <User className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                      Head of Campus
                    </div>
                    <p className="text-gray-500 font-medium">
                      {block.principal}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {block.specialties && block.specialties.length > 0 && (
              <div>
                <h4 className="text-lg font-playfair font-black text-primary mb-6">Campus Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {block.specialties.map((spec: string, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-primary/20 hover:shadow-md transition-all"
                    >
                      <div className="w-2 h-2 bg-secondary rounded-full shrink-0" />
                      <span className="text-xs font-black uppercase text-gray-700 tracking-wider">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Faculty Section */}
        {block.faculty && block.faculty.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-16">
              <div className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-4">Dedicated Educators</div>
              <h2 className="text-4xl md:text-5xl font-playfair font-black text-primary">Our Faculty</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {block.faculty.map((member: any, idx: number) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-gray-50 group-hover:border-secondary/20 transition-colors">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-6 text-gray-400 bg-gray-100" />
                    )}
                  </div>
                  <h5 className="text-xl font-bold text-primary mb-2">{member.name}</h5>
                  <p className="text-secondary text-xs font-black uppercase tracking-widest mb-4">{member.role}</p>
                  <div className="w-full pt-4 border-t border-gray-100 space-y-2">
                    {member.education && (
                      <p className="text-xs text-gray-500 flex justify-between text-left"><span className="font-bold text-gray-400">Education</span> <span className="font-medium text-gray-700 truncate ml-2">{member.education}</span></p>
                    )}
                    {member.subject && (
                      <p className="text-xs text-gray-500 flex justify-between text-left"><span className="font-bold text-gray-400">Subject</span> <span className="font-medium text-gray-700 truncate ml-2">{member.subject}</span></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {children && (
        <section className="container-custom mt-20">
          {children}
        </section>
      )}
    </div>
  );
}
