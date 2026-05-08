"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import { Calendar, MapPin, Clock, ArrowRight, Zap, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";
import ReadMore from "@/components/ReadMore";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [lifeAtMg, setLifeAtMg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    Promise.all([
      axiosInstance.get(`/api/events?t=${Date.now()}`),
      axiosInstance.get(`/api/life-at-mg?t=${Date.now()}`)
    ])
      .then(([eventsRes, lifeRes]) => {
        if (eventsRes.data.success) setEvents(eventsRes.data.events);
        if (lifeRes.data.success) setLifeAtMg(lifeRes.data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="pt-24 min-h-screen">
      {/* High-Impact Events Header */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:w-2/3"
            >
              <div className="flex items-center gap-4 mb-8">
                 <Zap className="text-secondary fill-secondary" size={32} />
                 <span className="text-xs uppercase tracking-[0.5em] font-black text-primary/40">Campus Pulse</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter">Life at <br/><span className="text-secondary italic">MG School.</span></h1>
              <p className="text-2xl text-gray-400 font-light max-w-xl leading-relaxed italic border-l-4 border-secondary pl-8">
                "Where every celebration is a step towards greatness. Join our vibrant community life."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative h-[500px]"
            >
              {lifeAtMg?.slider && lifeAtMg.slider.length > 0 ? (
                <div className="w-full h-full rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white bg-slate-100">
                  <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full h-full"
                  >
                    {lifeAtMg.slider.map((slide: any, idx: number) => (
                      <SwiperSlide key={idx} className="relative w-full h-full">
                        {slide.type === "video" ? (
                          <video
                            src={slide.url}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <Image
                            src={slide.url}
                            fill
                            className="object-cover"
                            alt={slide.title || `Slide ${idx + 1}`}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 z-10" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="w-full h-full rounded-[4rem] bg-slate-100 border-8 border-white shadow-3xl flex items-center justify-center">
                  <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">Add slider from admin</span>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      {/* Editorial Event List */}
      <section className="section-padding bg-slate-50 border-y border-gray-100">
        <div className="container-custom space-y-24 md:space-y-40">
          {events.map((event, idx) => {
            const d = new Date(event.date);
            const dateStr = d.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' });
            const yearStr = d.getFullYear();

            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-stretch h-full overflow-hidden`}
              >
                {/* Event Image & Date */}
                <div className="lg:w-1/2 relative min-h-[500px] overflow-hidden rounded-[4rem] shadow-3xl group">
                  <Image 
                     src={event.image || "https://images.unsplash.com/photo-1540575861501-7c00117fc24b?q=80"} 
                     alt={event.title} 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-10 left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl text-center min-w-[120px]">
                     <div className="text-secondary text-sm font-black tracking-widest uppercase mb-1">{yearStr}</div>
                     <div className="text-4xl font-playfair font-black text-primary">{dateStr}</div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                     <span className="bg-secondary/20 backdrop-blur-md text-secondary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary/30">{event.category}</span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                   <header className="mb-10">
                      <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-8 leading-tight tracking-tight">{event.title}</h2>
                      <div className="flex flex-wrap gap-8">
                         <div className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                            <Clock size={16} className="text-secondary" /> {event.time || "Time TBD"}
                         </div>
                         <div className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                            <MapPin size={16} className="text-secondary" /> {event.location}
                         </div>
                      </div>
                   </header>

                   <p className="text-2xl text-gray-500 font-light leading-relaxed mb-12 italic">
                       "<ReadMore text={event.description} limit={160} />"
                   </p>

                   <button className="group flex items-center gap-6 w-max">
                      <span className="text-primary font-black text-xl tracking-widest uppercase">Event Details</span>
                      <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-active:scale-90 transition-all">
                         <ArrowRight size={24} className="group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                   </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


    </div>
  );
};

export default EventsPage;
