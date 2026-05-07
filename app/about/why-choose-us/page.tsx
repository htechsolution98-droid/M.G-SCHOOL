"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

export default function WhyChooseUsPage() {
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
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const whyChooseUs = content?.whyChooseUs || {
    heading: "Why to study in M. G. School?",
    headingHighlight: "Why we are best?",
    reasons: []
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <header className="max-w-4xl mb-16 text-center mx-auto">
            <div className="bg-primary/5 p-4 rounded-2xl w-max mb-8 mx-auto">
              <HelpCircle className="text-primary w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-black text-primary mb-6 leading-tight">
              {whyChooseUs.heading}
            </h1>
            <div className="text-2xl text-secondary font-playfair italic mb-8">
              {whyChooseUs.headingHighlight}
            </div>
            <div className="h-2 w-32 bg-secondary mx-auto rounded-full" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {(whyChooseUs.reasons || []).map((reason: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-black text-primary mb-4 group-hover:text-secondary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-lg text-gray-500 leading-relaxed font-light">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 bg-primary rounded-[4rem] text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-3xl md:text-5xl font-playfair font-black mb-8 relative z-10">
              Join Our Global Community
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
              Experience an environment where your child's unique potential is recognized, nurtured, and celebrated every single day.
            </p>
            <button className="px-12 py-5 bg-secondary text-primary font-black rounded-2xl hover:bg-white transition-all shadow-2xl relative z-10">
              Apply for Admission
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
