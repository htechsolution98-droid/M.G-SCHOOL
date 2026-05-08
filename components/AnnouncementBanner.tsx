"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, Megaphone, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useSocketSync } from "@/hooks/useSocketSync";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const prevTextRef = useRef<string>("");

  const fetchData = useCallback(() => {
    axiosInstance.get("/api/announcement")
      .then((res) => {
        if (res.data.success) {
          const incoming = res.data.announcement;
          // Re-show popup only if the text actually changed
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

  const hasContent = announcement?.isActive && (announcement?.text || announcement?.heading);

  if (!hasContent || dismissed) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="announcement-popup"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-[9999] w-[340px] max-w-[calc(100vw-2rem)] shadow-2xl rounded-3xl overflow-hidden"
          style={{ backgroundColor: announcement.bgColor || "#0EA5E9" }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top left, ${announcement.bgColor || "#0EA5E9"} 0%, transparent 70%)`,
            }}
          />

          {/* Optional Image */}
          {announcement.image && (
            <div className="relative w-full h-36 overflow-hidden">
              <img
                src={announcement.image}
                alt="Announcement"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 40%, ${announcement.bgColor || "#0EA5E9"} 100%)`,
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-5">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                >
                  <Megaphone size={14} style={{ color: announcement.textColor || "#FFFFFF" }} />
                </div>
                {announcement.heading && (
                  <h4
                    className="text-sm font-black leading-tight"
                    style={{ color: announcement.textColor || "#FFFFFF" }}
                  >
                    {announcement.heading}
                  </h4>
                )}
              </div>
              {/* Dismiss button */}
              <button
                onClick={() => setDismissed(true)}
                className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
                style={{ backgroundColor: "rgba(0,0,0,0.15)", color: announcement.textColor || "#FFFFFF" }}
                aria-label="Close announcement"
              >
                <X size={12} />
              </button>
            </div>

            {/* Description */}
            {announcement.description && (
              <div className="mb-3">
                <div
                  className="text-xs leading-relaxed font-medium opacity-80 space-y-1"
                  style={{ color: announcement.textColor || "#FFFFFF" }}
                >
                  {(isExpanded || announcement.description.length <= 150 
                    ? announcement.description 
                    : announcement.description.substring(0, 150) + "..."
                  ).split('\n').map((line: string, i: number) => (
                    <div key={i} className={line.trim() === '' ? 'h-1.5' : ''}>
                      {line}
                    </div>
                  ))}
                </div>
                {announcement.description.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[10px] font-black mt-1 opacity-90 hover:opacity-100 cursor-pointer"
                    style={{ color: announcement.textColor || "#FFFFFF" }}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            )}

            {/* Marquee text (main announcement text) */}
            {announcement.text && (
              <div className="overflow-hidden mb-3">
                <div
                  className="whitespace-nowrap animate-marquee inline-block text-xs font-bold tracking-wide"
                  style={{ color: announcement.textColor || "#FFFFFF" }}
                >
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="mr-16">{announcement.text}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Link */}
            {announcement.link && (
              <Link
                href={announcement.link}
                className="inline-flex items-center gap-1.5 text-xs font-black underline underline-offset-2 hover:opacity-70 transition-opacity"
                style={{ color: announcement.textColor || "#FFFFFF" }}
              >
                {announcement.linkLabel || "Learn More"}
                <ExternalLink size={11} />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
