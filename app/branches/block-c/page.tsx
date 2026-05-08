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
        <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white h-[450px] max-w-3xl mx-auto relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5186184846934!2d72.64287929999999!3d23.078103499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8136e92fa8a9%3A0x9c2652eb533922fb!2sMahatma%20Gandhi%20Highschool!5e0!3m2!1sen!2sin!4v1778168895289!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </BlockPageLayout>
  );
}
