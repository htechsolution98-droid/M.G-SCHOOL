"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Plus, GripVertical } from "lucide-react";
import axiosInstance from "@/lib/axios";


interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
}

export default function MultiImageUpload({
  values = [],
  onChange,
  label = "Images",
  maxImages = 10,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList) => {
    setError("");
    setUploading(true);
    const uploaded: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axiosInstance.post("/api/upload", formData);
        const data = res.data;
        if (data.success) {
          uploaded.push(data.url);
        } else {
          setError(data.error || "Upload failed for: " + file.name);
        }
      } catch {
        setError("Upload failed for: " + file.name);
      }
    }

    if (uploaded.length > 0) {
      const newList = [...values, ...uploaded].slice(0, maxImages);
      onChange(newList);
    }
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) handleUpload(files);
    // reset so same files can be selected again
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const removeImage = (idx: number) => {
    const updated = values.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const addUrlImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    const newList = [...values, trimmed].slice(0, maxImages);
    onChange(newList);
    setUrlInput("");
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">
        {label} <span className="text-gray-300 font-normal normal-case tracking-normal">({values.length}/{maxImages})</span>
      </label>

      {/* Image Grid Preview */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
          {values.map((url, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video">
              {/* Use plain img — Next/Image blocks base64 data: URLs */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="text-white text-xs font-bold">#{idx + 1}</span>
              </div>
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer z-10"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}


      {/* Upload Area */}
      {values.length < maxImages && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/30 hover:bg-gray-50"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-7 h-7 text-primary animate-spin" />
              <span className="text-xs font-bold text-gray-400">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-bold text-gray-500">Click or drag to add images</p>
              <p className="text-[10px] text-gray-300 font-medium">
                JPG, PNG, WebP • Max 2MB each • Up to {maxImages} images
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* URL Input */}
      <div className="flex gap-2 mt-3">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUrlImage()}
          placeholder="Or paste image URL and press Enter / Add"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-500 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
        />
        <button
          onClick={addUrlImage}
          className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary/20 transition-all cursor-pointer"
        >
          Add
        </button>
      </div>

      {error && <p className="text-xs text-red-500 font-medium mt-2">{error}</p>}
    </div>
  );
}
