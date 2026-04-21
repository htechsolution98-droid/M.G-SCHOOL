"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import TestimonialCard from "@/components/TestimonialCard";
import { motion } from "framer-motion";
import { Quote, Sparkles, MessageSquare, Heart } from "lucide-react";
import Image from "next/image";

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Suresh Mehta",
      role: "Businessman",
      relation: "Parent",
      rating: 5,
      content: "MG School has provided my son with an incredible environment for growth. The teachers are dedicated and the focus on both studies and character building is outstanding.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80"
    },
    {
      name: "Anjali Vyas",
      role: "Architect",
      relation: "Parent",
      rating: 5,
      content: "The facilities at Block C are truly international standard. My daughter loves the robotics lab and the swimming sessions. Best decision for her education.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80"
    },
    {
      name: "Rahul Sharma",
      role: "Engineering Student",
      relation: "Alumni",
      rating: 5,
      content: "The foundations in Math and Science I received at Block B helped me clear my JEE exams with ease. I am grateful for the mentors who guided me through those crucial years.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80"
    },
    {
      name: "Dr. Kavita Shah",
      role: "Pediatrician",
      relation: "Parent",
      rating: 4,
      content: "Excellent focus on primary education. The play-way method at Block A makes learning fun for kids. Highly recommended for young learners.",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80"
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Editorial Testimonial Header */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 border-b border-gray-100 -z-10" />
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:w-2/3"
            >
              <div className="p-4 bg-secondary text-primary rounded-2xl w-max mb-8 shadow-xl">
                 <Heart className="fill-primary" size={32} />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter">Community <br/><span className="text-secondary italic">Voices.</span></h1>
              <p className="text-2xl text-gray-400 font-light max-w-xl leading-relaxed italic border-l-4 border-secondary pl-8">
                "Real stories from our students, parents, and alumni who lived the M.G. School legacy."
              </p>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="lg:w-1/3 relative"
            >
               <div className="p-12 bg-white/50 backdrop-blur-xl border border-white rounded-[4rem] shadow-3xl text-center relative z-10">
                  <div className="flex justify-center -space-x-4 mb-8">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg relative">
                           <Image src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Avatar" fill className="object-cover" />
                        </div>
                     ))}
                     <div className="w-16 h-16 rounded-full border-4 border-white bg-secondary flex items-center justify-center text-primary font-black text-xs z-10 shadow-lg">500+</div>
                  </div>
                  <div className="text-xl font-bold text-primary mb-2">Join the Conversation</div>
                  <div className="text-xs uppercase tracking-widest font-black text-secondary">Community Trusted</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Storytelling Grid */}
      <section className="section-padding bg-white relative">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20">
          {testimonials.slice(0, 2).map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-16 md:p-24 rounded-[4rem] border border-gray-100 relative group overflow-hidden"
            >
              <Quote size={120} className="absolute -top-10 -right-10 text-primary opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-24 h-24 relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image src={test.image} alt={test.name} fill className="object-cover" />
                   </div>
                   <div>
                      <h3 className="text-3xl font-playfair font-black text-primary mb-1">{test.name}</h3>
                      <p className="text-xs uppercase tracking-[0.4em] font-black text-secondary">{test.role} & {test.relation}</p>
                   </div>
                </div>
                <p className="text-3xl md:text-4xl font-playfair font-bold text-primary italic leading-tight mb-12">
                   "{test.content}"
                </p>
                <div className="w-20 h-1 bg-secondary rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern Card Stream */}
      <section className="section-padding overflow-hidden bg-slate-50 border-y border-gray-100">
         <div className="container-custom">
            <header className="text-center mb-24">
               <div className="flex justify-center gap-1 mb-8">
                  {[1,2,3,4,5].map(i => <Sparkles key={i} className="text-secondary fill-secondary" size={20} />)}
               </div>
               <h2 className="text-5xl md:text-7xl font-playfair font-black text-primary uppercase tracking-tighter shadow-sm">Verified <br/><span className="text-secondary italic">Experiences.</span></h2>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {testimonials.map((test, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-12 rounded-[3rem] shadow-xl hover:shadow-3xl transition-all border border-transparent hover:border-secondary/20 h-full flex flex-col justify-between"
                  >
                     <p className="text-gray-500 font-medium leading-relaxed mb-10 italic">"{test.content.slice(0, 100)}..."</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-xl overflow-hidden shadow-lg">
                           <Image src={test.image} alt={test.name} fill className="object-cover" />
                        </div>
                        <div>
                           <div className="text-sm font-black text-primary leading-none mb-1">{test.name}</div>
                           <div className="text-[10px] uppercase tracking-widest font-black text-secondary">{test.relation}</div>
                        </div>
                     </div>
                  </motion.div>
               ))}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="bg-primary p-12 rounded-[3rem] shadow-xl text-center flex flex-col items-center justify-center text-white"
               >
                  <MessageSquare size={48} className="text-secondary mb-6" />
                  <h4 className="text-2xl font-playfair font-bold mb-6">Write Your Own Story</h4>
                  <button className="bg-secondary text-primary w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">Get Started</button>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Narrative CTA Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[5rem] p-16 md:p-32 text-center border-4 border-slate-50 relative overflow-hidden shadow-3xl"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-5xl md:text-[8rem] font-playfair font-black text-primary leading-none mb-10 tracking-tighter uppercase underline decoration-secondary decoration-8 underline-offset-8">Be part of the <br/><span className="italic text-secondary">Family.</span></h2>
              <p className="text-2xl text-gray-400 font-light italic max-w-2xl mx-auto mb-16">"Experience why M.G. School is the top-rated academic institution in the region."</p>
              <button className="bg-primary text-white px-20 py-6 rounded-[2.5rem] font-black text-xl hover:bg-secondary hover:text-primary transition-all shadow-2xl active:scale-95">Enroll Now</button>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
