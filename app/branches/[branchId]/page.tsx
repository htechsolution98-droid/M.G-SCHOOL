"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GraduationCap, MapPin, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BranchDetailPage({ params }: { params: { branchId: string } }) {
  const [branch, setBranch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/api/branches-content")
      .then((res) => {
        if (res.data.success && res.data.content) {
          const content = res.data.content;
          const { branchId } = params;
          
          // Map URL ID (block-a) to Model Key (blockA)
          const blockKey = branchId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          const blockData = content[blockKey];
          
          // Also find the basic info from branchesList for things like subtitle
          const basicInfo = (content.branchesList || []).find((b: any) => b.id === branchId);

          if (blockData) {
            // Merge basic info and detailed block data
            setBranch({
              ...basicInfo,
              ...blockData,
              // Ensure the first image from images array is used if basic image is missing
              image: basicInfo?.image || (blockData.images && blockData.images[0]) || ""
            });
          } else {
            setBranch(null);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.branchId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-32 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!branch) {
    return notFound();
  }

  return (
    <div className="pt-32 pb-32 min-h-screen">
      <div className="container-custom mb-12">
        <Link href="/branches" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
          <ArrowLeft size={20} /> Back to Campuses
        </Link>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container-custom"
      >
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Image Side */}
          <div className="lg:w-1/2 relative w-full">
            <div className="absolute top-0 left-0 w-24 h-24 bg-secondary -translate-x-4 lg:-translate-x-12 -translate-y-4 lg:-translate-y-12 rounded-[2rem] z-10 flex items-center justify-center text-primary shadow-xl">
              <GraduationCap size={40} />
            </div>
            {branch.image ? (
              <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden rounded-[3rem] lg:rounded-[4.5rem] shadow-2xl">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <div className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4">
                    Campus Detail
                  </div>
                  <div className="text-3xl md:text-4xl text-white font-playfair font-black">
                    {branch.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden rounded-[3rem] lg:rounded-[4.5rem] shadow-2xl bg-primary flex items-center justify-center">
                <div className="text-center p-12">
                  <GraduationCap size={100} className="text-white/20 mx-auto mb-8" />
                  <div className="text-3xl md:text-4xl text-white font-playfair font-black">{branch.name}</div>
                </div>
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 w-full">
            <div className="text-secondary font-black text-xl italic font-playfair mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-secondary" />
              {branch.subtitle}
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black mb-8 text-primary leading-none uppercase tracking-tighter break-words">
              {branch.name}
            </h2>
            <div className="flex flex-wrap gap-4 mb-10">
              {branch.grades && (
                <span className="bg-primary/5 text-primary text-xs font-black px-6 py-2.5 rounded-full border border-primary/10 tracking-widest uppercase">
                  {branch.grades}
                </span>
              )}
              {branch.medium && (
                <span className="bg-secondary/10 text-primary text-xs font-black px-6 py-2.5 rounded-full border border-secondary/20 tracking-widest uppercase">
                  {branch.medium}
                </span>
              )}
            </div>
            
            {branch.description && (
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 italic">
                &ldquo;{branch.description}&rdquo;
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              {branch.location && (
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border border-gray-100">
                  <MapPin className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                      Campus Address
                    </div>
                    <p className="text-gray-500 font-medium">
                      {branch.location}
                    </p>
                  </div>
                </div>
              )}
              {branch.principal && (
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border border-gray-100">
                  <User className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                      Head of Campus
                    </div>
                    <p className="text-gray-500 font-medium">
                      {branch.principal}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {branch.specialties && branch.specialties.length > 0 && (
              <div>
                <h4 className="text-lg font-playfair font-black text-primary mb-6">Campus Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {branch.specialties.map((spec: string, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-primary/20 hover:shadow-md transition-all"
                    >
                      <div className="w-2 h-2 bg-secondary rounded-full shrink-0" />
                      <span className="text-xs font-black uppercase text-gray-700 tracking-wider">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
