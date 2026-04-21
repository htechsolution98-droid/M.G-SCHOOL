"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
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

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

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
      <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative mb-3 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
          <div className="relative h-40 w-full">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
          <div className="px-4 py-2 bg-white border-t border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium truncate">{value}</p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/30 hover:bg-gray-50"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="text-xs font-bold text-gray-400">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-bold text-gray-500">
              Click to upload or drag & drop
            </p>
            <p className="text-[10px] text-gray-300 font-medium">
              JPG, PNG, WebP, GIF • Max 5MB
            </p>
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
      <div className="mt-3">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL/path..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-500 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-2">{error}</p>
      )}
    </div>
  );
}
