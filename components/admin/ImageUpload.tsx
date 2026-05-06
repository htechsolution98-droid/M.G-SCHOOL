"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Star } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  contain?: boolean;
  compact?: boolean;
}

export default function ImageUpload({ value, onChange, label = "Image", contain = false, compact = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError("");
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
          <div className={`relative ${compact ? "h-32" : "h-48"} w-full flex items-center justify-center p-2`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className={`max-w-full max-h-full ${contain ? "object-contain" : "object-cover w-full h-full"}`}
            />
          </div>
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
          <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex items-center justify-between gap-4 overflow-hidden">
            <p className="text-[9px] text-gray-400 font-medium truncate flex-1 min-w-0">
              {value.startsWith("data:") ? "Base64 Image Data (Too long to display)" : value}
            </p>
            <div className="shrink-0 text-[8px] font-bold text-primary/40 uppercase tracking-tighter">
              {value.length > 1000 ? `${(value.length / 1024).toFixed(1)} KB` : "External Link"}
            </div>
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
            <span className="text-[10px] font-bold text-gray-400">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`${compact ? "w-8 h-8" : "w-12 h-12"} rounded-xl bg-primary/5 flex items-center justify-center`}>
              <Upload className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-primary`} />
            </div>
            {!compact && (
              <>
                <p className="text-xs font-bold text-gray-500">
                  Click to upload
                </p>
                <p className="text-[10px] text-gray-300 font-medium">
                  Max 5MB
                </p>
              </>
            )}
            {compact && (
              <p className="text-[10px] font-bold text-gray-400">
                Upload
              </p>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Manual URL input */}
      <div className="mt-3 relative">
        <input
          value={value && value.startsWith("data:") ? "Base64 Data Attached" : (value || "")}
          onChange={(e) => {
            if (!value?.startsWith("data:")) {
              onChange(e.target.value);
            }
          }}
          readOnly={value && value.startsWith("data:") ? true : false}
          placeholder="Or paste image URL/path..."
          className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none transition-all ${
            value && value.startsWith("data:") 
              ? "text-emerald-500 border-emerald-100 bg-emerald-50/30 cursor-default" 
              : "text-gray-500 focus:border-primary/30 focus:bg-white"
          }`}
        />
        {value && value.startsWith("data:") && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Star size={12} className="text-emerald-400 fill-emerald-400" />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-2">{error}</p>
      )}
    </div>
  );
}
