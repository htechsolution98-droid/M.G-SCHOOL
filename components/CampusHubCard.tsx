"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CampusHubCardProps {
  item: {
    id: string;
    name: string;
    hub: string;
    title: string;
    desc: string;
    img: string;
    images?: string[];
  };
  delay?: number;
}

export default function CampusHubCard({ item, delay = 0 }: CampusHubCardProps) {
  const allImages: string[] =
    item.images && item.images.length > 0
      ? item.images
      : item.img
      ? [item.img]
      : [];

  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % allImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl cursor-pointer"
    >
      {/* Cycling background images */}
      {allImages.map((src, i) => (
        <motion.div
          key={src + i}
          className="absolute inset-0"
          animate={{ opacity: i === imgIdx ? 1 : 0 }}
          transition={{ duration: 1.0 }}
          style={{ zIndex: i === imgIdx ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        </motion.div>
      ))}

      {/* Image indicator dots */}
      {allImages.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === imgIdx ? "bg-secondary w-5" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10" />

      <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end h-1/2 z-20">
        <div className="glass p-8 rounded-[3rem] border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-3">{item.hub}</div>
          <h3 className="text-3xl font-playfair font-black text-primary mb-4">
            {item.name}: <span className="italic">{item.title}</span>
          </h3>
          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
            {item.desc}
          </p>
          <Link
            href={`/branches/${item.id}`}
            className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:text-secondary transition-colors"
          >
            Enter Campus <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
