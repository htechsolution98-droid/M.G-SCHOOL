"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const defaultSlides = [
  {
    image: "/images/kids-school (1).jpg",
    images: [],
    tagline: "Premier Education",
    title: "Where Dreams Take Flight",
    description: "Developing global leaders through a perfect blend of tradition and innovation since 1995.",
    cta: "Discover Our Vision",
    link: "/about"
  },
  {
    image: "/images/proud-teacher-with-her-elementary-students (1).jpg",
    images: [],
    tagline: "Academic Rigor",
    title: "A Tradition of Excellence",
    description: "Empowering every student with the tools to excel in an ever-evolving world.",
    cta: "Explore Academics",
    link: "/academics"
  },
  {
    image: "/images/school3 (1).jpg",
    images: [],
    tagline: "Holistic Growth",
    title: "Nurturing Every Talent",
    description: "Beyond textbooks: cultivating creativity, sportsmanship, and moral integrity.",
    cta: "Life @ M.G. School",
    link: "/events"
  }
];

interface HeroSliderProps {
  slides?: any[] | null;
}

/** Inner component that cycles through multiple background images for a single slide */
function SlideBackground({ slide }: { slide: any }) {
  const allImages: string[] = (slide.images && slide.images.length > 0)
    ? slide.images
    : (slide.image ? [slide.image] : []);

  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [allImages.length]);

  if (allImages.length === 0) return null;

  return (
    <>
      {allImages.map((src, i) => (
        <motion.div
          key={src + i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === imgIdx ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ zIndex: i === imgIdx ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={slide.title}
            fill
            className="object-cover brightness-[0.4]"
            priority={i === 0}
            sizes="100vw"
          />
        </motion.div>
      ))}
      {/* Image counter dots */}
      {allImages.length > 1 && (
        <div className="absolute top-6 right-6 z-10 flex gap-1.5">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === imgIdx ? "bg-secondary w-5" : "bg-white/40 w-2"}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

const HeroSlider = ({ slides: propSlides }: HeroSliderProps) => {
  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          }
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full flex items-center">
              {/* Multi-image cycling background */}
              <SlideBackground slide={slide} />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10" />

              <div className="container-custom relative z-20">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <Sparkles className="text-secondary w-5 h-5" />
                    </div>
                    <span className="text-secondary font-black tracking-[0.4em] uppercase text-sm">
                      {slide.tagline}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-4xl font-playfair font-black text-white mb-6 leading-tight drop-shadow-2xl"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed font-light"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap gap-6"
                  >
                    <Link
                      href={slide.link}
                      className="group bg-white text-primary px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-secondary hover:text-primary transition-all flex items-center gap-4 shadow-2xl active:scale-95"
                    >
                      {slide.cta}
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="absolute bottom-20 right-20 z-50 flex gap-4">
          <button className="swiper-button-prev-custom w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all backdrop-blur-md cursor-pointer">
            <ArrowRight className="rotate-180" />
          </button>
          <button className="swiper-button-next-custom w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all backdrop-blur-md cursor-pointer">
            <ArrowRight />
          </button>
        </div>
      </Swiper>

      {/* Announcement Overlay */}


      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/50">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>

      <style jsx global>{`
        .custom-bullet {
          width: 40px !important;
          height: 4px !important;
          border-radius: 2px !important;
          background: white !important;
          opacity: 0.2 !important;
          transition: all 0.5s ease-in-out !important;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #F59E0B !important;
          width: 80px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
