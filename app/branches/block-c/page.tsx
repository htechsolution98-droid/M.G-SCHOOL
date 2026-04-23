"use client";

import React from "react";
import BlockPageLayout from "@/components/branches/BlockPageLayout";
import { MapPin } from "lucide-react";

export default function BlockCPage() {
  return (
    <BlockPageLayout blockKey="blockC">
      <div className="mt-16 text-center">
        <div className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-4">Location</div>
        <h3 className="text-3xl md:text-4xl font-playfair font-black text-primary mb-10">Visit Branch C</h3>
        <a 
          href="https://maps.app.goo.gl/5YuSNYK16zQaUtcd9?g_st=aw" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary hover:text-primary transition-colors shadow-2xl active:scale-95"
        >
          <MapPin size={20} /> Open in Google Maps
        </a>
      </div>
    </BlockPageLayout>
  );
}
