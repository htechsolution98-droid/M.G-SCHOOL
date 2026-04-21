"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";

const blockData = {
  id: "block-b",
  name: "Block B",
  subtitle: "The Academic Center",
  grades: "Std 9–12",
  medium: "Gujarati Medium",
  description:
    "A high-performance environment dedicated to board examination excellence and career roadmap development for secondary students.",
  image: "/images/proud-teacher-with-her-elementary-students (1).jpg",
  location: "West Campus, Scholars Lane",
  principal: "Mrs. Meena Patel",
  specialties: [
    "Science Labs",
    "Career Counseling",
    "Board Exam Prep",
    "Digital Library",
  ],
};

const BlockB = () => {
  return (
    <motion.section
      id={blockData.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="container-custom"
    >
      {/* Reversed layout for visual variety */}
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        {/* Image Side */}
        <div className="lg:w-1/2 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary translate-x-12 -translate-y-12 rounded-[2rem] z-10 hidden xl:flex items-center justify-center text-primary">
            <GraduationCap size={40} />
          </div>
          <div className="relative h-[650px] overflow-hidden rounded-[4.5rem] shadow-3xl">
            <Image
              src={blockData.image}
              alt={blockData.name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-12 left-12">
              <div className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4">
                Established
              </div>
              <div className="text-4xl text-white font-playfair font-black">
                Since 1995
              </div>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2">
          <div className="text-secondary font-black text-xl italic font-playfair mb-4 flex items-center gap-4">
            <span className="h-px w-10 bg-secondary" />
            {blockData.subtitle}
          </div>
          <h2 className="text-6xl md:text-8xl font-playfair font-black mb-8 text-primary leading-none uppercase tracking-tighter">
            {blockData.name}
          </h2>
          <div className="flex flex-wrap gap-4 mb-10">
            <span className="bg-primary/5 text-primary text-xs font-black px-6 py-2.5 rounded-full border border-primary/10 tracking-widest uppercase">
              {blockData.grades}
            </span>
            <span className="bg-secondary/10 text-primary text-xs font-black px-6 py-2.5 rounded-full border border-secondary/20 tracking-widest uppercase">
              {blockData.medium}
            </span>
          </div>
          <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 italic">
            &ldquo;{blockData.description}&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="flex items-start gap-4 p-8 bg-slate-50 rounded-[3rem] border border-gray-100">
              <MapPin className="text-secondary shrink-0" size={24} />
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                  Campus Address
                </div>
                <p className="text-gray-500 font-medium">
                  {blockData.location}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-8 bg-slate-50 rounded-[3rem] border border-gray-100">
              <User className="text-secondary shrink-0" size={24} />
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                  Head of Campus
                </div>
                <p className="text-gray-500 font-medium">
                  {blockData.principal}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {blockData.specialties.map((spec, sIdx) => (
              <div
                key={sIdx}
                className="flex items-center gap-3 p-4 bg-white border border-gray-50 rounded-2xl shadow-sm"
              >
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-xs font-black uppercase text-gray-600 tracking-wider">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BlockB;
