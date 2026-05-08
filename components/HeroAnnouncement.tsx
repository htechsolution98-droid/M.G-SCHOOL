"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";

export default function HeroAnnouncement() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const prevTextRef = useRef<string>("");

  const fetchData = useCallback(() => {
    axiosInstance.get("/api/announcement")
      .then((res) => {
        if (res.data.success) {
          const incoming = res.data.announcement;
          if (incoming?.text && incoming.text !== prevTextRef.current) {
            setDismissed(false);
            prevTextRef.current = incoming.text;
          }
          setAnnouncement(incoming);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useSocketSync(fetchData);

  if (!announcement?.isActive || !announcement?.text || dismissed) return null;

  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <div
        className="relative flex items-center gap-4 px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md overflow-hidden"
        style={{ backgroundColor: announcement.bgColor || "#0EA5E9" }}
      >
        {/* Animated glow behind */}
        <div
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{ background: `radial-gradient(ellipse at center, ${announcement.bgColor || "#0EA5E9"} 0%, transparent 70%)` }}
        />

        {/* Icon */}
        <div
          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center relative z-10"
          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
        >
          <Megaphone size={15} style={{ color: announcement.textColor || "#FFFFFF" }} />
        </div>

        {/* Scrolling text area */}
        <div className="flex-1 overflow-hidden relative z-10">
          <div
            className="whitespace-nowrap animate-marquee inline-block text-sm font-bold tracking-wide"
            style={{ color: announcement.textColor || "#FFFFFF" }}
          >
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mr-20">
                {announcement.text}
                {announcement.link && (
                  <Link
                    href={announcement.link}
                    className="ml-2 font-black underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity"
                    style={{ color: announcement.textColor }}
                  >
                    {announcement.linkLabel || "Learn More"} →
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 relative z-10 hover:opacity-60 transition-opacity cursor-pointer"
          aria-label="Dismiss"
          style={{ color: announcement.textColor || "#FFFFFF" }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
