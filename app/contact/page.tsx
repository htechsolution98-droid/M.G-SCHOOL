"use client";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";

export default function Contact() {
  const branches = [
    {
      name: "Main Campus (Block C)",
      address: "Mahatma Gandhi Highschool Old, 3JHV+65R, G-Ward, Kuber Nagar, Ahmedabad, Gujarat 382340",
      phone: "+91 90333 58749",
      email: "main.campus@mgschool.edu.in",
    }
  ];

  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_6zb5swb",
        "template_gow9c7g",
        formRef.current,
        "gXzoszg93x-OUeHWz" // Please replace with your actual EmailJS public key
      )
      .then(
        (result) => {
          setLoading(false);
          setSuccess(true);
          formRef.current?.reset();
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          setLoading(false);
          setError("Failed to send inquiry. Please try again.");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Editorial Contact Header */}
      <section className="pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-black text-primary leading-tight mb-10 tracking-tighter">Inquiry <br /><span className="text-secondary italic">Gateway.</span></h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3 border-l-4 border-secondary pl-8"
            >
              <p className="text-2xl text-gray-400 font-light leading-relaxed italic">
                "Our dedicated admissions concierge is available to guide you through every step of your journey."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-slate-50 border-y border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-24">
            {/* High-End Inquiry Form -> Sleek Modern Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-3/5 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
            >
              <header className="mb-10">
                <div className="text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Direct Access</div>
                <h2 className="text-3xl md:text-5xl font-playfair font-black text-primary">Get in touch <br /><span className="italic">with us.</span></h2>
              </header>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">Guardian's Full Name</label>
                    <input type="text" name="guardian_name" required className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-primary placeholder-gray-400 shadow-sm" placeholder="e.g. Dr. Robert Smith" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">Student's Full Name</label>
                    <input type="text" name="student_name" required className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-primary placeholder-gray-400 shadow-sm" placeholder="Student's Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-primary placeholder-gray-400 shadow-sm" placeholder="example@institutional.edu" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 block">Phone Number</label>
                    <input type="tel" name="phone" required className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-primary placeholder-gray-400 shadow-sm" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 block">Preferred Campus Hub</label>
                  <select name="campus" required className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-primary shadow-sm appearance-none cursor-pointer">
                    <option value="Block A (Primary Foundation)">Block A (Primary Foundation)</option>
                    <option value="Block B (Secondary Excellence)">Block B (Secondary Excellence)</option>
                    <option value="Block C (International Hub)">Block C (International Hub)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 block">Specific Inquiries</label>
                  <textarea name="message" required rows={5} className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-primary resize-none placeholder-gray-400 shadow-sm" placeholder="How can we assist you today?"></textarea>
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl font-medium text-sm flex items-center gap-2">
                    Thank you! Your inquiry has been sent successfully.
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium text-sm flex items-center gap-2">
                    {error}
                  </div>
                )}

                <button disabled={loading} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] group flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4">
                  {loading ? "Sending..." : "Send Inquiry"} {!loading && <Send size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </motion.div>

            {/* Premium Info Blocks */}
            <div className="lg:w-2/3 space-y-8">
              <h2 className="text-3xl font-playfair font-black text-primary mb-8 border-b-2 border-secondary inline-block pb-2">Direct Support Hubs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {branches.map((branch, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
                  >
                    <h3 className="text-xl font-playfair font-black text-primary mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <MapPin size={18} />
                      </div>
                      {branch.name}
                    </h3>
                    <div className="space-y-4 text-gray-600">
                      <div className="flex gap-4 items-start">
                        <p className="text-sm leading-relaxed">{branch.address}</p>
                      </div>
                      <div className="flex gap-3 items-center pt-2 border-t border-gray-50">
                        <Phone className="text-secondary" size={16} />
                        <p className="text-sm font-semibold text-primary">{branch.phone}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Mail className="text-secondary" size={16} />
                        <p className="text-sm font-medium">{branch.email}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Operational Detail Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <Clock size={32} className="mb-6 text-primary" />
                    <h3 className="text-2xl font-playfair font-black mb-6 text-primary">Visiting Hours</h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Mon - Fri</span>
                      <span className="font-bold text-primary">7:30 AM - 1:50 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2 pt-1">
                      <span className="font-medium">Saturday</span>
                      <span className="font-bold text-primary">7:30 AM - 10:30 AM</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-medium">Sunday</span>
                      <span className="font-bold text-secondary">Closed</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articulated Campus Map Frame */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-24 container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[6rem] overflow-hidden shadow-3xl border-[20px] border-white h-[600px] relative"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5186184846934!2d72.64287929999999!3d23.078103499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8136e92fa8a9%3A0x9c2652eb533922fb!2sMahatma%20Gandhi%20Highschool!5e0!3m2!1sen!2sin!4v1778168895289!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1) brightness(0.9)' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute top-12 left-12 glass p-8 rounded-[3rem] shadow-2xl flex items-center gap-6 border border-white/20">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-lg">
              <Globe size={24} />
            </div>
            <div>
              <div className="text-primary font-black text-xl uppercase tracking-widest">Central Hub</div>
              <div className="text-gray-500 font-medium">Global Access Control</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
