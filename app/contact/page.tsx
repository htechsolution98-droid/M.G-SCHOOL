"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const branches = [
    {
      name: "Main Campus (Block C)",
      address: "Education Square, Central Hub, Sector 15",
      phone: "+91 98765 43210",
      email: "main.campus@mgschool.edu.in",
    },
    {
      name: "Primary Branch (Block A)",
      address: "MG Road, East Campus, Sector 4",
      phone: "+91 98765 43211",
      email: "primary@mgschool.edu.in",
    },
    {
      name: "Secondary Branch (Block B)",
      address: "Scholars Lane, West Campus, Sector 9",
      phone: "+91 98765 43212",
      email: "secondary@mgschool.edu.in",
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Editorial Contact Header */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end gap-20">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:w-2/3"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter">Inquiry <br/><span className="text-secondary italic">Gateway.</span></h1>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:w-1/3 border-l-4 border-secondary pl-8"
            >
               <p className="text-2xl text-gray-400 font-light leading-relaxed italic">
                 "Our dedicated admissions concierge is available to guide you through every step of your journey."
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 border-y border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-24">
            {/* High-End Inquiry Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-3/5 bg-white p-12 md:p-24 rounded-[5rem] shadow-3xl border border-gray-100"
            >
              <header className="mb-16">
                 <div className="text-xs uppercase tracking-[0.4em] font-black text-secondary mb-4 underline decoration-secondary decoration-4 underline-offset-8">Direct Access</div>
                 <h2 className="text-4xl md:text-5xl font-playfair font-black text-primary">Request a <br/><span className="italic">personalized</span> tour.</h2>
              </header>

              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] items-center gap-2 flex uppercase tracking-widest font-black text-gray-400"><div className="w-1 h-1 bg-secondary rounded-full" /> Guardian's Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border-none px-8 py-6 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:bg-white transition-all font-bold text-primary placeholder-gray-300" placeholder="e.g. Dr. Robert Smith" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] items-center gap-2 flex uppercase tracking-widest font-black text-gray-400"><div className="w-1 h-1 bg-secondary rounded-full" /> Student's Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border-none px-8 py-6 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:bg-white transition-all font-bold text-primary placeholder-gray-300" placeholder="Student's Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] items-center gap-2 flex uppercase tracking-widest font-black text-gray-400"><div className="w-1 h-1 bg-secondary rounded-full" /> Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border-none px-8 py-6 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:bg-white transition-all font-bold text-primary placeholder-gray-300" placeholder="example@institutional.edu" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] items-center gap-2 flex uppercase tracking-widest font-black text-gray-400"><div className="w-1 h-1 bg-secondary rounded-full" /> Phone Number</label>
                    <input type="tel" className="w-full bg-slate-50 border-none px-8 py-6 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:bg-white transition-all font-bold text-primary placeholder-gray-300" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] items-center gap-2 flex uppercase tracking-widest font-black text-gray-400"><div className="w-1 h-1 bg-secondary rounded-full" /> Preferred Campus Hub</label>
                  <select className="w-full bg-slate-50 border-none px-8 py-6 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:bg-white transition-all font-bold text-primary appearance-none cursor-pointer">
                    <option>Block C (International Hub)</option>
                    <option>Block A (Primary Foundation)</option>
                    <option>Block B (Secondary Excellence)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] items-center gap-2 flex uppercase tracking-widest font-black text-gray-400"><div className="w-1 h-1 bg-secondary rounded-full" /> Specific Inquiries</label>
                  <textarea rows={6} className="w-full bg-slate-50 border-none px-8 py-6 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:bg-white transition-all font-bold text-primary resize-none placeholder-gray-300" placeholder="Describe how our concierge can assist you today."></textarea>
                </div>

                <button className="w-full bg-primary text-white py-8 rounded-[2.5rem] font-black text-xl hover:bg-secondary hover:text-primary transition-all shadow-3xl uppercase tracking-widest active:scale-95 group flex items-center justify-center gap-4">
                   Send Inquiry <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* Premium Info Blocks */}
            <div className="lg:w-2/3 space-y-12">
               <h2 className="text-2xl font-black text-primary mb-12 uppercase tracking-tighter">Direct Support Hubs</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {branches.map((branch, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 group hover:bg-primary transition-all duration-700"
                    >
                      <h3 className="text-3xl font-playfair font-black text-primary group-hover:text-white mb-8 border-l-2 border-secondary pl-6">{branch.name}</h3>
                      <div className="space-y-6 text-gray-500 group-hover:text-white/70">
                        <div className="flex gap-4">
                          <MapPin className="text-secondary shrink-0" size={20} />
                          <p className="text-sm font-medium leading-relaxed italic">{branch.address}</p>
                        </div>
                        <div className="flex gap-4">
                          <Phone className="text-secondary shrink-0" size={20} />
                          <p className="text-sm font-black group-hover:text-white">{branch.phone}</p>
                        </div>
                        <div className="flex gap-4">
                          <Mail className="text-secondary shrink-0" size={20} />
                          <p className="text-sm font-bold lowercase">{branch.email}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Operational Detail Card */}
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="bg-secondary p-12 rounded-[4rem] shadow-2xl text-primary"
                  >
                     <Clock size={48} className="mb-8" />
                     <h3 className="text-3xl font-playfair font-black mb-6">Visiting Hours</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between border-b border-primary/10 pb-2">
                           <span className="font-bold uppercase tracking-widest text-[10px]">Mon - Fri</span>
                           <span className="font-black">9 AM - 4 PM</span>
                        </div>
                        <div className="flex justify-between border-b border-primary/10 pb-2">
                           <span className="font-bold uppercase tracking-widest text-[10px]">Saturday</span>
                           <span className="font-black">9 AM - 12 PM</span>
                        </div>
                        <div className="flex justify-between text-primary/50">
                           <span className="font-bold uppercase tracking-widest text-[10px]">Sunday</span>
                           <span className="font-black italic underline">Closed</span>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Virtual Help Banner */}
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="bg-white p-12 rounded-[5rem] shadow-3xl border border-gray-100 flex items-center justify-between group overflow-hidden relative cursor-pointer"
               >
                  <div className="absolute top-0 right-0 w-32 h-full bg-secondary/5 -translate-x-12 skew-x-12" />
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-secondary shadow-xl active:scale-90 transition-transform">
                       <MessageCircle size={32} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-playfair font-black text-primary mb-1">Live Concierge</h4>
                      <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Instant Academic Support</p>
                    </div>
                  </div>
                  <div className="relative z-10 hidden md:block">
                     <span className="text-primary font-black text-sm uppercase tracking-widest border-b-2 border-secondary pb-1">Start Chat</span>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Articulated Campus Map Frame */}
      <section className="section-padding container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[6rem] overflow-hidden shadow-3xl border-[20px] border-white h-[600px] relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.3913045617!2d72.43962804533038!3d23.020158226993134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd1170affdf2!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1713264000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1) brightness(0.9)' }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
           <div className="absolute top-12 left-12 glass p-8 rounded-[3rem] shadow-2xl flex items-center gap-6 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-lg">
                 <Globe size={24} />
              </div>
              <div>
                 <div className="text-primary font-black text-xl uppercase tracking-widest">Central Hub</div>
                 <div className="text-gray-500 font-medium">Global Access Control</div>
              </div>
           </div>
        </motion.div>
      </section>
    </div>
  );
}
