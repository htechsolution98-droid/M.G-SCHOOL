"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Film, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  compact?: boolean;
}

export default function VideoUpload({ value, onChange, label = "Video", compact = false }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError("");
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setError("Please upload a valid video file.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/api/upload", formData);

      const data = res.data;

      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed. Please try again.");
    }

    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.15em] font-black text-gray-400 mb-2">
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative mb-3 rounded-2xl overflow-hidden border border-gray-100 bg-slate-50">
          <div className={`relative ${compact ? "h-32" : "h-48"} w-full flex items-center justify-center`}>
            <video
              src={value}
              className="max-w-full max-h-full w-full h-full object-cover"
              controls
            />
          </div>
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer z-10"
          >
            <X size={14} />
          </button>
          <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex items-center justify-between gap-4 overflow-hidden">
            <p className="text-[9px] text-gray-400 font-medium truncate flex-1 min-w-0">
              {value}
            </p>
          </div>
        </div>
      )}


      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl ${compact ? "p-4" : "p-6"} text-center cursor-pointer transition-all ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/30 hover:bg-gray-50"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className={`text-primary animate-spin ${compact ? "w-6 h-6" : "w-8 h-8"}`} />
            <span className="text-[10px] font-bold text-gray-400">Uploading Video...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`${compact ? "w-8 h-8" : "w-12 h-12"} rounded-xl bg-primary/5 flex items-center justify-center`}>
              <Film className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-primary`} />
            </div>
            {!compact && (
              <>
                <p className="text-xs font-bold text-gray-500">
                  Click to upload video
                </p>
                <p className="text-[10px] text-gray-300 font-medium">
                  MP4, WebM preferred
                </p>
              </>
            )}
            {compact && (
              <p className="text-[10px] font-bold text-gray-400">
                Upload Video
              </p>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Manual URL input */}
      <div className="mt-3 relative">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste video URL..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none transition-all text-gray-500 focus:border-primary/30 focus:bg-white"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-2">{error}</p>
      )}
    </div>
  );
}
