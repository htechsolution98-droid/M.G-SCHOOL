"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import LoadingScreen from "@/components/LoadingScreen";

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

const LifeAtMGPage = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const fetchData = React.useCallback(() => {
    axiosInstance.get("/api/life-at-mg")
      .then((res) => {
        if (res.data.success) {
          setContent(res.data.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  if (loading) return <LoadingScreen />;

  const slider = content?.slider || [];

  const fallbackSlide = {
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
    type: "image",
    title: "Life at M.G. School",
  };

  const slides = slider.length > 0 ? slider : [fallbackSlide];

  const handleSlideChange = (swiper: any) => {
    const activeSlide = slides[swiper.realIndex];
    if (activeSlide && activeSlide.type !== "video") {
      if (swiper.autoplay) {
        swiper.autoplay.start();
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Full-Screen Hero Slider ── */}
      <section className="relative h-screen w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".lifemg-prev",
            nextEl: ".lifemg-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={slides.length > 1}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {slides.map((slide: any, idx: number) => (
            <SwiperSlide key={idx} className="relative w-full h-full">
              {({ isActive }) => (
                <>
                  {slide.type === "video" ? (
                    <VideoSlide
                      src={slide.url}
                      isActive={isActive}
                      swiper={swiperInstance}
                      slidesCount={slides.length}
                    />
                  ) : (
                    <Image
                      src={slide.url}
                      fill
                      className="object-cover object-top"
                      alt={slide.title || `Slide ${idx + 1}`}
                      priority={idx === 0}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/70 z-10" />

                  {/* Text */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                    {slide.type === "video" && (
                      <div className="mb-6 flex items-center gap-2 text-secondary">
                        <PlayCircle size={28} />
                        <span className="text-xs font-black uppercase tracking-widest">Video</span>
                      </div>
                    )}
                    {slide.title && (
                      <motion.h1
                        key={`title-${idx}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-playfair font-black text-white leading-tight tracking-tighter drop-shadow-2xl max-w-4xl"
                      >
                        {slide.title}
                      </motion.h1>
                    )}
                  </div>
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Nav Buttons */}
        <button className="lifemg-prev absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer hidden md:flex">
          <ChevronLeft size={24} />
        </button>
        <button className="lifemg-next absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer hidden md:flex">
          <ChevronRight size={24} />
        </button>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>
    </div>
  );
};

export default LifeAtMGPage;
