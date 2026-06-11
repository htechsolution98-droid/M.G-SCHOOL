"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import { Calendar, MapPin, Clock, ArrowRight, Zap, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";
import ReadMore from "@/components/ReadMore";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VideoSlide = ({
  src,
  isActive,
  swiper,
  slidesCount,
}: {
  src: string;
  isActive: boolean;
  swiper: any;
  slidesCount: number;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      if (swiper?.autoplay) {
        swiper.autoplay.stop();
      }
      video.currentTime = 0;
      video.play().catch((err) => {
        console.error("Error playing video:", err);
        if (swiper?.autoplay) {
          swiper.autoplay.start();
        }
      });
    } else {
      video.pause();
    }
  }, [isActive, swiper]);

  const handleEnded = () => {
    if (swiper && slidesCount > 1) {
      swiper.slideNext();
      if (swiper.autoplay) {
        swiper.autoplay.start();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      className="absolute inset-0 w-full h-full object-cover"
      muted
      playsInline
      onEnded={handleEnded}
    />
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [lifeAtMg, setLifeAtMg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [modalSwiperInstance, setModalSwiperInstance] = useState<any>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent]);

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
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) => {
                      const activeSlide = lifeAtMg.slider[swiper.realIndex];
                      if (activeSlide && activeSlide.type !== "video") {
                        if (swiper.autoplay) {
                          swiper.autoplay.start();
                        }
                      }
                    }}
                    className="w-full h-full"
                  >
                    {lifeAtMg.slider.map((slide: any, idx: number) => (
                      <SwiperSlide key={idx} className="relative w-full h-full">
                        {({ isActive }) => (
                          <>
                            {slide.type === "video" ? (
                              <VideoSlide
                                src={slide.url}
                                isActive={isActive}
                                swiper={swiperInstance}
                                slidesCount={lifeAtMg.slider.length}
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
                          </>
                        )}
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

      {/* Events Grid Section */}
      <section className="section-padding bg-slate-50 border-y border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-6">Upcoming & Recent <span className="text-secondary italic">Events.</span></h2>
              <p className="text-lg text-gray-400 font-medium leading-relaxed">
                Stay updated with the latest happenings, academic milestones, and cultural celebrations at M.G. School.
              </p>
            </div>
            <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
              <span className="text-primary font-bold text-sm uppercase tracking-widest">{events.length} Total Events</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {events.map((event, idx) => {
              let d = new Date(event.date);
              if (isNaN(d.getTime()) && event.date && event.date.includes('/')) {
                const [day, month, year] = event.date.split('/');
                d = new Date(`${year}-${month}-${day}`);
              }

              const dateStr = !isNaN(d.getTime()) 
                ? d.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })
                : "TBA";
              const yearStr = !isNaN(d.getTime()) ? d.getFullYear() : "";

              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 flex flex-col group h-full border border-gray-100"
                >
                  {/* Card Image Slider */}
                  <div className="relative h-72 w-full overflow-hidden">
                    {event.images && event.images.length > 1 ? (
                      <Swiper
                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        effect="fade"
                        className="w-full h-full"
                      >
                        {event.images.map((img: string, i: number) => (
                          <SwiperSlide key={i} className="relative w-full h-full">
                            <Image
                              src={img}
                              alt={`${event.title} - ${i + 1}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : event.video ? (
                      <video
                        src={event.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <Image
                        src={event.image || (event.images && event.images[0]) || "https://images.unsplash.com/photo-1540575861501-7c00117fc24b?q=80"}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    )}
                    
                    {/* Floating Date Badge */}
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl text-center z-20">
                       <div className="text-secondary text-[9px] font-black tracking-widest uppercase mb-0.5">{yearStr}</div>
                       <div className="text-lg font-playfair font-black text-primary leading-none">{dateStr}</div>
                    </div>

                    {/* Category Overlay */}
                    <div className="absolute bottom-5 left-5 z-20">
                       <span className="bg-primary/20 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">{event.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-4 mb-5">
                       <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest">
                          <Clock size={14} className="text-secondary" /> {event.time || "TBD"}
                       </div>
                       <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest">
                          <MapPin size={14} className="text-secondary" /> {event.location}
                       </div>
                    </div>

                    <h3 className="text-2xl font-playfair font-black text-primary mb-5 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="text-gray-500 font-light leading-relaxed mb-8 text-sm italic flex-1">
                       <ReadMore text={event.description} limit={120} />
                    </div>

                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center justify-between w-full p-2 pr-6 rounded-2xl bg-gray-50 hover:bg-primary hover:text-white group/btn transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white group-hover/btn:bg-white/20 flex items-center justify-center transition-colors shadow-sm">
                         <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">See the Event</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Event Detail Modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop with intense blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-2xl" 
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-4xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-primary hover:bg-white/40 transition-all"
              >
                <X size={24} />
              </button>              {/* Media Section */}
              <div className="lg:w-1/2 relative h-72 lg:h-auto bg-slate-100">
                {(() => {
                  const images = (selectedEvent.images && selectedEvent.images.length > 0
                    ? selectedEvent.images
                    : (selectedEvent.image ? [selectedEvent.image] : [])).filter(Boolean);
                  const hasVideo = !!selectedEvent.video;
                  const totalMediaCount = images.length + (hasVideo ? 1 : 0);

                  if (totalMediaCount > 1) {
                    return (
                      <Swiper
                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        onSwiper={setModalSwiperInstance}
                        onSlideChange={(swiper) => {
                          const isVideoActive = hasVideo && swiper.realIndex === 0;
                          if (!isVideoActive && swiper.autoplay) {
                            swiper.autoplay.start();
                          }
                        }}
                        className="w-full h-full"
                      >
                        {hasVideo && (
                          <SwiperSlide className="relative w-full h-full">
                            {({ isActive }) => (
                              <VideoSlide
                                src={selectedEvent.video}
                                isActive={isActive}
                                swiper={modalSwiperInstance}
                                slidesCount={totalMediaCount}
                              />
                            )}
                          </SwiperSlide>
                        )}
                        {images.map((img: string, i: number) => (
                          <SwiperSlide key={i} className="relative w-full h-full">
                            <Image
                              src={img}
                              alt={selectedEvent.title}
                              fill
                              className="object-cover"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    );
                  } else if (hasVideo) {
                    return (
                      <video
                        src={selectedEvent.video}
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                      />
                    );
                  } else {
                    return (
                      <Image
                        src={images[0] || "https://images.unsplash.com/photo-1540575861501-7c00117fc24b?q=80"}
                        alt={selectedEvent.title}
                        fill
                        className="object-cover"
                      />
                    );
                  }
                })()}

                {/* Floating Category */}
                <div className="absolute bottom-6 left-6 z-20">
                   <span className="bg-secondary text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                     {selectedEvent.category}
                   </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-6 text-secondary font-black uppercase text-[10px] tracking-[0.3em]">
                   <Sparkles size={16} />
                   <span>Event Highlights</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-8 leading-tight">
                  {selectedEvent.title}
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-10">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-400">
                         <Calendar size={14} className="text-secondary" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                      </div>
                      <p className="text-primary font-bold">{new Date(selectedEvent.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-400">
                         <Clock size={14} className="text-secondary" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Time</span>
                      </div>
                      <p className="text-primary font-bold">{selectedEvent.time || "TBA"}</p>
                   </div>
                   <div className="col-span-2 space-y-1">
                      <div className="flex items-center gap-2 text-gray-400">
                         <MapPin size={14} className="text-secondary" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Location</span>
                      </div>
                      <p className="text-primary font-bold">{selectedEvent.location}</p>
                   </div>
                </div>

                <div className="prose prose-slate max-w-none">
                   <p className="text-lg text-gray-500 font-light leading-relaxed whitespace-pre-wrap">
                      {selectedEvent.description}
                   </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative" title="Student participant">
                           <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-black">
                         +50
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Students Participating</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EventsPage;
