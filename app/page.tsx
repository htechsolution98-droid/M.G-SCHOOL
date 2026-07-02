"use client";

import React, { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import CampusHubCard from "@/components/CampusHubCard";
import { BookOpen, Users, Award, Trophy, ArrowRight, ShieldCheck, Zap, Heart, X, Sparkles, Calendar, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ReadMore from "@/components/ReadMore";
import { Clock, MapPin } from "lucide-react";

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

const featureIconMap: Record<string, React.ReactNode> = {
  "Intellectual Rigor": <BookOpen className="text-secondary" />,
  "Ethical Leadership": <ShieldCheck className="text-secondary" />,
  "Physical Wellness": <Trophy className="text-secondary" />,
  "Creative Expression": <Heart className="text-secondary" />,
};

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [featuredReviews, setFeaturedReviews] = useState<any[]>([]);

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
    axiosInstance.get("/api/rating")
      .then((res) => {
        if (res.data.success && res.data.data) {
          const featured = res.data.data.filter((item: any) => item.showOnHome);
          setFeaturedReviews(featured);
        }
      })
      .catch((err) => console.error("Error fetching ratings:", err));
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
      <section className="pt-12 md:pt-12 pb-2 md:pb-2 overflow-hidden">
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

            {(philosophy.badge || philosophy.heading || philosophy.headingHighlight || philosophy.description || (philosophy.features && philosophy.features.length > 0)) && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                {philosophy.badge && (
                  <div className="bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full w-max mb-8">
                    {philosophy.badge}
                  </div>
                )}
                {(philosophy.heading || philosophy.headingHighlight) && (
                  <h2 className="text-3xl md:text-5xl font-playfair font-black leading-[1.1] mb-10 text-primary">
                    {philosophy.heading}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-600">
                      {philosophy.headingHighlight}
                    </span>
                  </h2>
                )}
                {philosophy.description && (
                  <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                    {philosophy.description}
                  </p>
                )}

                {philosophy.features && philosophy.features.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {philosophy.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 hover:bg-white hover:shadow-xl rounded-2xl transition-all border border-transparent hover:border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                          {featureIconMap[feature] || <BookOpen className="text-secondary" />}
                        </div>
                        <span className="font-bold text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Events Highlights Section */}
      <section className="pt-2 md:pt-3 pb-2 md:pb-3 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
            <div className="max-w-2xl">
              <div className="bg-secondary/10 text-secondary text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full w-max mb-6">Latest Updates</div>
              <h2 className="text-3xl md:text-6xl font-playfair font-black text-primary leading-tight">School <span className="text-secondary italic">Events.</span></h2>
            </div>
            <Link href="/events" className="group flex items-center gap-6 w-max">
              <span className="text-primary font-black text-sm tracking-[0.3em] uppercase">See All Events</span>
              <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-active:scale-90 transition-all shadow-lg group-hover:shadow-primary/20">
                <ArrowRight size={20} className="group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>

          <EventsPreview />
        </div>
      </section>

      {/* Branches Highlights - Asymmetrical Grid */}
      <section className="pt-2 md:pt-3 pb-6 md:pb-8 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom relative z-10">
          {(content?.campusHubsHeading || content?.campusHubsSubheading) && (
            <header className="max-w-3xl mb-12">
              {content?.campusHubsHeading && (
                <h2 className="text-3xl md:text-6xl font-playfair font-black mb-8 leading-tight">
                  {content.campusHubsHeading}
                </h2>
              )}
              {content?.campusHubsSubheading && (
                <p className="text-xl text-gray-400 font-medium">
                  {content.campusHubsSubheading}
                </p>
              )}
            </header>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {campusHubs.map((item: any, idx: number) => (
              <CampusHubCard key={item.id} item={item} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews Slider Section */}
      {featuredReviews.length > 0 && (
        <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-b border-gray-100">
          <div className="container-custom relative z-10">
            <header className="text-center mb-16 max-w-2xl mx-auto">
              <div className="bg-secondary/10 text-secondary text-xs font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full w-max mb-6 mx-auto">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary leading-tight">
                What Our <span className="text-secondary italic">Community Says.</span>
              </h2>
            </header>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              className="testimonials-swiper !pb-14"
            >
              {featuredReviews.map((item, idx) => (
                <SwiperSlide key={item._id || idx} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl border border-gray-100/50 hover:border-secondary/20 transition-all duration-300 h-full flex flex-col justify-between relative group"
                  >
                    <div className="absolute top-6 right-8 text-primary/5 group-hover:text-secondary/10 transition-colors pointer-events-none">
                      <Quote size={80} className="fill-current" />
                    </div>

                    <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={
                                star <= item.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200"
                              }
                            />
                          ))}
                        </div>

                        {/* Feedback Content */}
                        <p className="text-gray-500 font-light leading-relaxed italic text-sm md:text-base line-clamp-5">
                          "{item.feedback}"
                        </p>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-50">
                        <div className="w-12 h-12 bg-secondary/10 text-primary font-black rounded-2xl flex items-center justify-center text-sm shadow-sm relative overflow-hidden shrink-0">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-sm leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-[10px] uppercase font-black tracking-widest text-secondary mt-0.5 block">
                            {item.role} • {item.experienceType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* User Experience / Feedback Section */}
      <section className="py-6 md:py-8 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* Left: Info + Illustration */}
              <div className="lg:w-[45%] p-6 md:p-10 flex flex-col justify-between gap-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-secondary mb-3">
                      We Value Your Feedback
                    </p>
                    <h2 className="text-4xl md:text-5xl font-playfair font-black text-primary leading-tight mb-4">
                      Your Experience <span className="italic text-secondary font-medium">Matters</span>
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed text-base">
                      Your feedback helps us improve and provide a better experience for everyone. Please share your thoughts with us.
                    </p>
                  </div>

                  {/* Bullet points - compact */}
                  <div className="flex flex-col gap-2">
                    {[
                      { icon: <Sparkles size={15} />, text: "Help us improve our services" },
                      { icon: <Award size={15} />, text: "Your feedback drives positive change" },
                      { icon: <Heart size={15} />, text: "We appreciate your time" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:scale-[1.01] transition-transform duration-200">
                        <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-xs font-semibold text-primary">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image — fills remaining space */}
                <div className="hidden lg:flex items-center justify-center flex-1 min-h-0 pt-2">
                  <Image
                    src="/images/feedback-illustration.png"
                    alt="Feedback Illustration"
                    width={500}
                    height={500}
                    className="object-contain w-full h-auto max-h-[260px] drop-shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:w-[55%] p-10 md:p-14">
                <FeedbackForm />
              </div>

            </div>
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

function EventsPreview() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
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

  useEffect(() => {
    axiosInstance.get("/api/events")
      .then(res => {
        if (res.data.success) {
          // Show only latest 3 events on homepage
          setEvents(res.data.events.slice(0, 3));
        }
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
      {events.map((event, idx) => {
        let d = new Date(event.date);
        if (isNaN(d.getTime()) && event.date && event.date.includes('/')) {
          const [day, month, year] = event.date.split('/');
          d = new Date(`${year}-${month}-${day}`);
        }
        const dateStr = !isNaN(d.getTime()) ? d.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' }) : "TBA";
        const yearStr = !isNaN(d.getTime()) ? d.getFullYear() : "";

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 flex flex-col group h-full border border-gray-100"
          >
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
                      <Image src={img} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
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
                <Image src={event.image || (event.images && event.images[0]) || "https://images.unsplash.com/photo-1540575861501-7c00117fc24b?q=80"} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              )}
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl text-center z-20">
                <div className="text-secondary text-[9px] font-black tracking-widest uppercase mb-0.5">{yearStr}</div>
                <div className="text-lg font-playfair font-black text-primary leading-none">{dateStr}</div>
              </div>
              <div className="absolute bottom-5 left-5 z-20">
                <span className="bg-primary/20 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">{event.category}</span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest">
                  <Clock size={14} className="text-secondary" /> {event.time || "TBD"}
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest">
                  <MapPin size={14} className="text-secondary" /> {event.location}
                </div>
              </div>
              <h3 className="text-2xl font-playfair font-black text-primary mb-5 leading-tight group-hover:text-secondary transition-colors line-clamp-2">{event.title}</h3>
              <div className="text-gray-500 font-light leading-relaxed mb-8 text-sm italic flex-1">
                <ReadMore text={event.description} limit={100} />
              </div>
              <button
                onClick={() => setSelectedEvent(event)}
                className="flex items-center justify-between w-full p-2 pr-6 rounded-2xl bg-gray-50 hover:bg-primary hover:text-white group/btn transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover/btn:bg-white/20 flex items-center justify-center transition-colors shadow-sm">
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Event Details</span>
              </button>
            </div>
          </motion.div>
        );
      })}
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
              </button>
              {/* Media Section */}
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
                    {[1, 2, 3].map(i => (
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
}
function FeedbackForm() {
  const [form, setForm] = useState({
    name: "", email: "", role: "", phone: "",
    experienceType: "", rating: 0, feedback: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.role || !form.experienceType || !form.rating || !form.feedback) return;
    setSubmitting(true);
    try {
      await axiosInstance.post("/api/rating", form);
      setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center h-full py-20 gap-6">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <ShieldCheck size={40} className="text-green-500" />
      </div>
      <h2 className="text-3xl font-playfair font-black text-primary">Thank You!</h2>
      <p className="text-gray-500 text-center max-w-sm">Your feedback has been submitted successfully.</p>
      <button
        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", role: "", phone: "", experienceType: "", rating: 0, feedback: "" }); }}
        className="mt-4 px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
      >
        Submit Another
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Name <span className="text-red-400">*</span></label>
        <div className="relative">
          <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name"
            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm text-primary placeholder-gray-300 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address <span className="text-red-400">*</span></label>
        <div className="relative">
          <Zap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email"
            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm text-primary placeholder-gray-300 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
        </div>
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Role <span className="text-red-400">*</span></label>
        <select name="role" value={form.role} onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-primary bg-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all appearance-none">
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
          <option value="staff">Staff</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Phone Number</label>
        <div className="relative">
          <BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" type="tel"
            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm text-primary placeholder-gray-300 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
        </div>
      </div>

      {/* Experience Type */}
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Experience Type <span className="text-red-400">*</span></label>
        <select name="experienceType" value={form.experienceType} onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-primary bg-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all appearance-none">
          <option value="">Select experience type</option>
          <option value="academics">Academics</option>
          <option value="facilities">Facilities</option>
          <option value="events">Events</option>
          <option value="staff">Staff Behaviour</option>
          <option value="online">Online Experience</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Star Rating */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Experience <span className="text-red-400">*</span></label>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button"
              onClick={() => setForm({ ...form, rating: star })}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110">
              <Award size={28} className={`transition-colors ${star <= (hoverRating || form.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-100"}`} />
            </button>
          ))}
          <span className="text-xs text-gray-400 font-medium ml-2">
            {form.rating ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating] : "Click to rate your experience"}
          </span>
        </div>
      </div>

      {/* Feedback Textarea */}
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Feedback <span className="text-red-400">*</span></label>
        <textarea name="feedback" value={form.feedback} onChange={handleChange}
          placeholder="Write your feedback here..." maxLength={500} rows={5}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-primary placeholder-gray-300 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
        <div className="text-right text-xs text-gray-300 font-medium">{form.feedback.length} / 500</div>
      </div>

      {/* Submit */}
      <div className="md:col-span-2 flex flex-col items-center gap-3 mt-2">
        <button onClick={handleSubmit} disabled={submitting}
          className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 disabled:opacity-60">
          <ArrowRight size={18} />
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
        <div className="flex items-center gap-2 text-gray-300 text-xs">
          <ShieldCheck size={14} />
          <span>Your feedback is secure and confidential.</span>
        </div>
      </div>

    </div>
  );
}