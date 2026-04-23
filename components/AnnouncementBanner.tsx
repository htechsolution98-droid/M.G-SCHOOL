"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Megaphone } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const prevTextRef = React.useRef<string>("");

  const fetchData = useCallback(() => {
    axiosInstance.get("/api/announcement")
      .then((res) => {
        if (res.data.success) {
          const incoming = res.data.announcement;
          // Only re-show the banner if the text actually changed
          if (incoming?.text && incoming.text !== prevTextRef.current) {
            setDismissed(false);
            prevTextRef.current = incoming.text;
          }
          setAnnouncement(incoming);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useSocketSync(fetchData);

  if (!announcement?.isActive || !announcement?.text || dismissed) return null;

  return (
    <div
      className="relative z-[999] w-full flex items-center overflow-hidden shadow-sm"
      style={{ backgroundColor: announcement.bgColor || "#F59E0B" }}
    >
      {/* Icon */}
      <div
        className="hidden sm:flex items-center justify-center px-4 py-2.5 shrink-0"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <Megaphone size={16} style={{ color: announcement.textColor || "#1E3A8A" }} />
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden py-2.5 px-4">
        <div
          className="whitespace-nowrap animate-marquee inline-block font-bold text-sm tracking-wide"
          style={{ color: announcement.textColor || "#1E3A8A" }}
        >
          {/* Repeat text 4x so the marquee loops seamlessly */}
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mr-24">
              {announcement.text}
              {announcement.link && (
                <Link
                  href={announcement.link}
                  className="ml-3 underline underline-offset-2 font-black opacity-80 hover:opacity-100 transition-opacity"
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
        className="shrink-0 px-3 py-2.5 hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Dismiss announcement"
        style={{ color: announcement.textColor || "#1E3A8A" }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
