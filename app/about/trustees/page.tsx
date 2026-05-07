"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import SectionTitle from "@/components/SectionTitle";
import { useSocketSync } from "@/hooks/useSocketSync";

export default function TrusteesPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(() => {
    axiosInstance.get("/api/trustees-content")
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  const hero = content?.hero || {
    heading: "Our Trustees",
    description: "Meet the visionary leaders behind our institution.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80",
  };

  const trustees = content?.trustees || [];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {hero.image && (
          <Image
            src={hero.image}
            alt="Trustees Hero"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-playfair font-black text-white mb-6 drop-shadow-xl"
          >
            {hero.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 font-medium"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      {/* Trustees List */}
      <section className="section-padding">
        <div className="container-custom">
          {trustees.length > 0 ? (
            <div className="space-y-16 lg:space-y-24">
              {trustees.map((trustee: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col lg:flex-row gap-10 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="w-full lg:w-1/3 shrink-0">
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                      {trustee.image ? (
                        <Image 
                          src={trustee.image} 
                          alt={trustee.name} 
                          fill 
                          className="object-cover hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-2/3 space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-playfair font-black text-primary mb-2">
                        {trustee.name}
                      </h2>
                      <p className="text-lg font-bold text-secondary tracking-widest uppercase">
                        {trustee.designation}
                      </p>
                    </div>
                    
                    <div className="text-gray-600 leading-relaxed space-y-4">
                      {trustee.description.split('\n').map((para: string, idx: number) => (
                        <p key={idx} className={para.trim() === '' ? 'h-4' : ''}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 font-medium text-xl">
              No trustees have been added yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
