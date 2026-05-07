"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, CheckCircle } from "lucide-react";
import { useSocketSync } from "@/hooks/useSocketSync";

export default function EnrollPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchConfig = React.useCallback(() => {
    axiosInstance.get("/api/enrollment-config").then(res => {
      if (res.data.success) {
        setConfig(res.data.config);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useSocketSync(fetchConfig);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await axiosInstance.post("/api/enrollment-submit", formData);
      if (res.data.success) {
        setSuccess(true);
      } else {
        setError(res.data.error || "Failed to submit application.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-32 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!config) {
    return <div className="min-h-screen pt-32 text-center text-red-500">Form configuration not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-gray-100">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-lg">
              <GraduationCap size={36} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-playfair font-black text-primary mb-4">{config.title}</h1>
            <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">{config.description}</p>
          </div>

          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
              <h2 className="text-3xl font-playfair font-black text-primary mb-4">Application Submitted!</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Thank you for applying to M.G. School. Our admissions team will review your application and contact you shortly.</p>
              <button onClick={() => { setSuccess(false); setFormData({}); }} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-secondary hover:text-primary transition-all">Submit Another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-bold text-center border border-red-100">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.fields.map((field: any) => (
                  <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-500 mb-2 ml-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-3xl px-6 py-4 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none h-32"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-5 rounded-full font-bold text-lg hover:bg-secondary hover:text-primary transition-all disabled:opacity-50 flex items-center justify-center gap-3 group shadow-xl cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                  {!submitting && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
