"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, GraduationCap, Microscope, BookOpen, Quote } from "lucide-react";

const FacultyPage = () => {
  const facultyList = [
    {
      name: "Dr. Rajesh Shah",
      role: "Branch Head (Block A)",
      subject: "Advanced Mathematics",
      education: "Ph.D. in Education, M.Sc. Maths",
      experience: "25+ Years",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80",
      icon: <Microscope size={24} />
    },
    {
      name: "Mrs. Meena Patel",
      role: "Principal (Block B)",
      subject: "Biological Sciences",
      education: "M.Ed., M.Sc. Biology",
      experience: "20+ Years",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80",
      icon: <Award size={24} />
    },
    {
      name: "Mr. Amit Khanna",
      role: "Senior Coordinator (Block C)",
      subject: "World Literature",
      education: "M.A. English, B.Ed.",
      experience: "18+ Years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80",
      icon: <BookOpen size={24} />
    },
    {
      name: "Ms. Anjali Sharma",
      role: "Department Head",
      subject: "Organic Chemistry",
      education: "M.Sc. Chemistry, NET Qualified",
      experience: "12+ Years",
      image: "https://images.unsplash.com/photo-1567532939847-893993796ecf?q=80",
      icon: <Microscope size={24} />
    },
    {
      name: "Mr. Vikram Mehta",
      role: "HOD Social Sciences",
      subject: "Modern History",
      education: "M.A. History, B.Ed.",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80",
      icon: <BookOpen size={24} />
    },
    {
      name: "Mrs. Priya Desai",
      role: "Primary Coordinator",
      subject: "Child Psychology",
      education: "B.Ed, NTT Certified",
      experience: "10+ Years",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80",
      icon: <GraduationCap size={24} />
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Sophisticated Faculty Banner */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter">Academic <br/><span className="text-secondary italic">Mentors.</span></h1>
            <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
              "The heartbeat of M.G. School – a faculty distinguished by profound knowledge and a passion for student success."
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:w-1/2 relative"
          >
            <div className="organic-radius bg-secondary w-full aspect-square absolute top-4 left-4 -z-10 opacity-30 animate-pulse" />
            <div className="organic-radius border-8 border-white shadow-3xl overflow-hidden aspect-square">
               <Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80" alt="Mentors" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Faculty Profiles - Portfolio Layout */}
      <section className="section-padding bg-slate-50 relative border-y border-gray-100">
        <div className="container-custom">
          <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-playfair font-black text-primary mb-6">Expertise & <span className="text-secondary italic">Leadership</span></h2>
              <p className="text-lg text-gray-500 font-medium tracking-wide font-outfit uppercase">Our leadership remains dedicated to fostering an environment of innovation and ethics.</p>
            </div>
            <div className="flex gap-4">
               <div className="w-16 h-1 bg-primary rounded-full" />
               <div className="w-8 h-1 bg-secondary rounded-full" />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {facultyList.map((faculty, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-[550px] overflow-hidden rounded-[4rem] shadow-2xl mb-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <Image src={faculty.image} alt={faculty.name} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/20 text-white group-hover:bg-secondary group-hover:text-primary transition-all">
                    {faculty.icon}
                  </div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <div className="text-secondary tracking-[0.3em] font-black uppercase text-[10px] mb-2">{faculty.experience} Experience</div>
                    <h3 className="text-3xl font-playfair font-black mb-1">{faculty.name}</h3>
                    <p className="text-white/60 font-medium text-sm">{faculty.role}</p>
                  </div>
                </div>
                <div className="px-6">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="text-secondary" size={18} />
                    <span className="text-sm font-black text-primary uppercase tracking-widest">{faculty.education}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium italic">"Specializing in {faculty.subject}, fostering a dynamic classroom environment through modern pedagogical research."</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Philosophy Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary p-20 md:p-32 rounded-[6rem] text-center text-white relative overflow-hidden shadow-3xl"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-pattern" />
            <Quote className="text-secondary w-20 h-20 mx-auto mb-12 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-12 leading-tight max-w-4xl mx-auto italic underline decoration-secondary/30 underline-offset-[16px]">
              "Education is not the learning of facts, but the training of the mind to think."
            </h2>
            <div className="w-32 h-1 bg-secondary mx-auto mb-10 rounded-full" />
            <div className="text-secondary font-black tracking-[0.4em] uppercase text-sm">Einstein on Education</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;
