"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";
import axiosInstance from "@/lib/axios";
import ReadMore from "@/components/ReadMore";
import LoadingScreen from "@/components/LoadingScreen";

export default function PrincipalMessagePage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axiosInstance.get(`/api/about-content?t=${Date.now()}`);
        if (response.data.success) {
          setContent(response.data.content);
        }
      } catch (error) {
        // Error handling suppressed
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) return <LoadingScreen />;

  const principalMessages = content?.principalMessages || [];

  if (principalMessages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-outfit font-black text-primary mb-4">Messages Not Found</h2>
          <p className="text-gray-500">Please update the Principal's Message in the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-32"
        >
          {principalMessages.map((msg: any, idx: number) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-start`}>
              {/* Image & Signature */}
              <div className="lg:w-1/3 lg:sticky lg:top-32 mb-12 lg:mb-0">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] aspect-[4/5] bg-white group-hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02]">
                    <Image
                      src={msg.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976"}
                      alt={msg.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="text-2xl font-outfit font-black">{msg.name}</div>
                      <div className="text-sm text-secondary font-bold tracking-widest uppercase">{msg.designation}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl">
                   <div className="text-primary font-outfit font-black text-xl mb-2">{msg.name}</div>
                   <div className="text-gray-400 text-sm font-medium mb-6">{msg.qualifications}</div>
                   <div className="h-px w-full bg-gray-100 mb-6" />
                   <div className="flex items-center gap-3 text-secondary">
                      <MessageSquare size={20} />
                      <span className="text-xs uppercase tracking-widest font-black">{msg.designation || "Principal's Office"}</span>
                   </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:w-2/3">
                <div className="bg-primary/5 p-4 rounded-2xl w-max mb-8">
                  <Quote className={`text-primary w-8 h-8 ${idx % 2 === 1 ? '' : 'rotate-180'}`} />
                </div>
                <h2 className="text-3xl md:text-5xl font-outfit font-black text-primary mb-12 leading-tight">
                  {msg.heading}
                </h2>
                
                <div className="text-xl text-gray-600 font-light leading-relaxed relative whitespace-pre-wrap">
                  <ReadMore text={msg.message} limit={400} />
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-16 pt-12 border-t border-gray-200"
                >
                  <div className="text-2xl font-outfit italic text-primary">
                    "Education is the most powerful weapon which you can use to change the world."
                  </div>
                  <div className="text-gray-400 mt-4">— Nelson Mandela</div>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
