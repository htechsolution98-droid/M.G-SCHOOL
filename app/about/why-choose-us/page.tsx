"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import ReadMore from "@/components/ReadMore";

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

          {whyChooseUs.reasons && whyChooseUs.reasons.length > 0 && (
            <div className="text-center mb-12 mt-16">
              <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-4">
                {whyChooseUs.reasonsTitle || "Reasons to Join Us"}
              </h2>
              <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <ReadMore text={reason.description} limit={150} />
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {whyChooseUs.vision && (whyChooseUs.vision.heading || whyChooseUs.vision.description) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-12 bg-white rounded-[4rem] shadow-2xl border border-gray-100 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              {whyChooseUs.vision.heading && (
                <h2 className="text-3xl md:text-4xl font-playfair font-black text-primary mb-6 relative z-10">
                  {whyChooseUs.vision.heading}
                </h2>
              )}
              {whyChooseUs.vision.description && (
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto relative z-10">
                  <ReadMore text={whyChooseUs.vision.description} limit={300} />
                </p>
              )}
            </motion.div>
          )}

          {whyChooseUs.features && whyChooseUs.features.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary mb-4">
                  {whyChooseUs.featuresTitle || "Core Features"}
                </h2>
                <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whyChooseUs.features.map((feature: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-50 p-8 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-playfair font-black text-primary mb-3">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-light">
                      <ReadMore text={feature.description} limit={100} />
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
