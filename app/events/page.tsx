"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import { Calendar, MapPin, Clock, ArrowRight, Zap, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/api/events")
      .then((res) => {
        if (res.data.success) {
          setEvents(res.data.events);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
              className="lg:w-1/3 relative"
            >
               <div className="p-12 bg-white/50 backdrop-blur-xl border border-white rounded-[4rem] shadow-3xl text-center relative z-10">
                  <div className="text-4xl font-playfair font-black text-primary mb-2">12+</div>
                  <div className="text-xs uppercase tracking-widest font-black text-secondary mb-8">Annual Events</div>
                  <button className="bg-primary text-white w-full py-5 rounded-2xl font-bold hover:bg-secondary hover:text-primary transition-all shadow-xl active:scale-95">Download Calendar</button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
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
                      "{event.description}"
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

      {/* Modern Newsletter/Interaction Section */}
      <section className="section-padding overflow-hidden">
         <div className="container-custom">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-primary p-20 md:p-32 rounded-[6rem] text-center text-white relative overflow-hidden shadow-3xl"
            >
               <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl pointer-events-none" />
               <Sparkles size={60} className="text-secondary opacity-30 mx-auto mb-10" />
               <h2 className="text-4xl md:text-6xl font-playfair font-black mb-12 leading-none uppercase tracking-tighter shadow-2xl">Watch the <br/><span className="italic text-secondary underline decoration-secondary decoration-4 underline-offset-8">highlights.</span></h2>
               <p className="text-2xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed italic">"Relive every grand moment from our past events through our curated video archive."</p>
               <button className="bg-secondary text-primary px-16 py-6 rounded-[2.5rem] font-black text-xl hover:bg-white transition-all shadow-2xl active:scale-95">Open Video Portal</button>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default EventsPage;
