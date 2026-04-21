"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  School,
  Bell,
  ChevronRight,
  Plus,
  Building2,
  Home,
  Save,
  Trash2,
  Edit3,
} from "lucide-react";

// ─── Sidebar Items ───
const sidebarItems = [
  { id: "overview", name: "Overview", icon: LayoutDashboard },
  { id: "homepage", name: "Homepage", icon: Home },
  { id: "about", name: "About Us", icon: BookOpen },
  { id: "academics", name: "Academics", icon: GraduationCap },
  { id: "students", name: "Students", icon: Users },
  { id: "branches", name: "Branches", icon: Building2 },
  { id: "faculty", name: "Faculty", icon: BookOpen },
  { id: "gallery", name: "Gallery", icon: ImageIcon },
  { id: "events", name: "Events", icon: Calendar },
  { id: "messages", name: "Messages", icon: MessageSquare },
  { id: "settings", name: "Settings", icon: Settings },
];

// ─── Stats cards ───
const statsCards = [
  { label: "Total Students", value: "2,450", change: "+12%", icon: Users, color: "bg-blue-500" },
  { label: "Faculty Members", value: "128", change: "+3%", icon: BookOpen, color: "bg-emerald-500" },
  { label: "Active Branches", value: "3", change: "Stable", icon: School, color: "bg-secondary" },
  { label: "Applications", value: "340", change: "+28%", icon: TrendingUp, color: "bg-purple-500" },
];

const recentActivities = [
  { text: "New admission application received", time: "2 min ago", type: "info" },
  { text: "Block A - Parent-teacher meeting scheduled", time: "1 hour ago", type: "event" },
  { text: "Gallery updated with sports day photos", time: "3 hours ago", type: "update" },
  { text: "Faculty member Dr. Shah updated profile", time: "5 hours ago", type: "info" },
  { text: "Block C - Science fair results published", time: "1 day ago", type: "event" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("mg_admin_auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      if (parsed.isLoggedIn) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin");
      }
    } else {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("mg_admin_auth");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ─── Sidebar Desktop ─── */}
      <aside className="hidden lg:flex flex-col w-72 bg-primary min-h-screen fixed left-0 top-0 z-40">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2.5 rounded-2xl">
              <GraduationCap className="text-secondary w-7 h-7" />
            </div>
            <div>
              <div className="text-lg font-playfair font-black text-white tracking-tight">M.G. SCHOOL</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === item.id ? "bg-secondary text-primary shadow-lg" : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ─── Mobile Sidebar ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
            <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="fixed left-0 top-0 w-72 bg-primary min-h-screen z-50 lg:hidden flex flex-col">
              <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-xl"><GraduationCap className="text-secondary w-6 h-6" /></div>
                  <span className="text-lg font-playfair font-black text-white">M.G. SCHOOL</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white/50 cursor-pointer"><X size={24} /></button>
              </div>
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeTab === item.id ? "bg-secondary text-primary" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                      <Icon size={20} /> {item.name}
                    </button>
                  );
                })}
              </nav>
              <div className="p-6 border-t border-white/10">
                <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
                  <LogOut size={20} /> Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2.5 rounded-xl bg-primary text-white cursor-pointer" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
              <div>
                <h2 className="text-xl font-playfair font-black text-primary capitalize">{activeTab}</h2>
                <p className="text-xs text-gray-400 font-medium">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                <Bell size={20} className="text-gray-500" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-secondary font-black text-sm">A</div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "homepage" && <HomepageTab />}
          {activeTab === "about" && <AboutTab />}
          {activeTab === "academics" && <AcademicsTab />}
          {activeTab === "students" && <PlaceholderTab title="Students" description="Manage student records, admissions, and academic data." />}
          {activeTab === "branches" && <PlaceholderTab title="Branches" description="Manage Block A, Block B, and Block C campus details." />}
          {activeTab === "faculty" && <PlaceholderTab title="Faculty" description="Manage faculty profiles, assignments, and schedules." />}
          {activeTab === "gallery" && <PlaceholderTab title="Gallery" description="Upload and manage school photos and media." />}
          {activeTab === "events" && <PlaceholderTab title="Events" description="Create and manage school events and announcements." />}
          {activeTab === "messages" && <PlaceholderTab title="Messages" description="View contact form submissions and inquiries." />}
          {activeTab === "settings" && <PlaceholderTab title="Settings" description="Configure admin panel and website settings." />}
        </div>
      </main>
    </div>
  );
}

// ════════════════════════════════════════
// OVERVIEW TAB
// ════════════════════════════════════════
function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-5">
                <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}><Icon className="text-white" size={22} /></div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{stat.change}</span>
              </div>
              <div className="text-3xl font-playfair font-black text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-playfair font-black text-primary">Recent Activity</h3>
          </div>
          <div className="space-y-5">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-5 border-b border-gray-50 last:border-0 last:pb-0">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${activity.type === "event" ? "bg-secondary" : activity.type === "update" ? "bg-emerald-500" : "bg-blue-500"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-playfair font-black text-primary mb-8">Quick Actions</h3>
          <div className="space-y-4">
            {[
              { label: "Add Student", icon: Plus, color: "bg-blue-500" },
              { label: "New Event", icon: Calendar, color: "bg-secondary" },
              { label: "Upload Photos", icon: ImageIcon, color: "bg-emerald-500" },
              { label: "View Messages", icon: MessageSquare, color: "bg-purple-500" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group cursor-pointer">
                  <div className={`${action.color} w-10 h-10 rounded-xl flex items-center justify-center`}><Icon className="text-white" size={18} /></div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{action.label}</span>
                  <ChevronRight size={16} className="text-gray-300 ml-auto" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// HOMEPAGE TAB - Edit Hero, Stats, Philosophy
// ════════════════════════════════════════
const defaultContent = {
  heroSlides: [
    { tagline: "Premier Education", title: "Where Dreams Take Flight", description: "Developing global leaders through a perfect blend of tradition and innovation since 1995.", cta: "Discover Our Vision", link: "/about", image: "/images/kids-school (1).jpg" },
    { tagline: "Academic Rigor", title: "A Tradition of Excellence", description: "Empowering every student with the tools to excel in an ever-evolving world.", cta: "Explore Academics", link: "/academics", image: "/images/proud-teacher-with-her-elementary-students (1).jpg" },
    { tagline: "Holistic Growth", title: "Nurturing Every Talent", description: "Beyond textbooks: cultivating creativity, sportsmanship, and moral integrity.", cta: "Life @ M.G. School", link: "/events", image: "/images/school3 (1).jpg" },
  ],
  stats: [
    { label: "Students", value: "2,500+", icon: "Users" },
    { label: "Faculty", value: "150+", icon: "ShieldCheck" },
    { label: "Exp", value: "28 Yrs", icon: "Award" },
  ],
  philosophy: {
    badge: "Established 1995",
    heading: "Cultivating",
    headingHighlight: "Wisdom",
    description: "Our curriculum is designed to ignite curiosity. We don't just teach subjects; we inspire a lifelong passion for discovery in an environment that honors both tradition and technological progress.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071",
    floatingText: "Child-Centric Learning Approach",
    features: ["Intellectual Rigor", "Ethical Leadership", "Physical Wellness", "Creative Expression"],
    ctaText: "Explore Our Legacy",
    ctaLink: "/about",
  },
  campusHubs: [
    {
      id: "block-a",
      name: "Block A",
      hub: "Foundation Hub",
      title: "Primary Foundation",
      desc: "Activity-based learning for Std 1–8 in our vibrant Gujarati Medium campus.",
      img: "/images/kids-school (1).jpg"
    },
    {
      id: "block-b",
      name: "Block B",
      hub: "Excellence Hub",
      title: "Secondary Mastery",
      desc: "Rigorous preparation for Std 9–12 Board Exams with expert academic guidance.",
      img: "/images/proud-teacher-with-her-elementary-students (1).jpg"
    },
    {
      id: "block-c",
      name: "Block C",
      hub: "International Hub",
      title: "Bilingual Academy",
      desc: "Our premium dual-medium campus with global technology & sports infrastructure.",
      img: "/images/school3 (1).jpg"
    }
  ],
};

function HomepageTab() {
  const [content, setContent] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("heroSlides");
  const [dbConnected, setDbConnected] = useState(true);

  useEffect(() => {
    axiosInstance.get("/api/home-content")
      .then((res) => {
        const data = res.data;
        if (data.success && data.content) {
          setContent(data.content);
          setDbConnected(true);
        } else {
          setDbConnected(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setDbConnected(false);
        setLoading(false);
      });
  }, []);

  const saveSection = async (section: string, data: any) => {
    setSaving(section);
    setMessage("");
    try {
      const res = await axiosInstance.put("/api/home-content", { section, ...data });
      const result = res.data;
      if (result.success) {
        setContent(result.content);
        setMessage("Saved successfully!");
        setDbConnected(true);
      } else {
        setMessage("Error: " + result.error);
      }
    } catch {
      setMessage("Failed to save. Check MongoDB connection.");
    }
    setSaving("");
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const sections = [
    { id: "heroSlides", name: "Hero Slider", icon: ImageIcon },
    { id: "stats", name: "Stats Bar", icon: TrendingUp },
    { id: "philosophy", name: "Philosophy Section", icon: BookOpen },
    { id: "campusHubs", name: "Campus Hubs", icon: Building2 },
  ];

  return (
    <div className="space-y-8">
      {/* DB Connection Warning */}
      {!dbConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-sm font-medium text-amber-700">
          ⚠️ <strong>MongoDB not connected.</strong> Showing default data. To save changes, whitelist your IP in MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere.
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
              }`}
            >
              <Icon size={18} /> {s.name}
            </button>
          );
        })}
      </div>

      {/* Success/Error message */}
      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </motion.div>
      )}

      {/* Hero Slides Editor */}
      {activeSection === "heroSlides" && content && (
        <HeroSlidesEditor
          slides={content.heroSlides || []}
          onSave={(slides: any[]) => saveSection("heroSlides", { heroSlides: slides })}
          saving={saving === "heroSlides"}
        />
      )}

      {/* Stats Editor */}
      {activeSection === "stats" && content && (
        <StatsEditor
          stats={content.stats || []}
          onSave={(stats: any[]) => saveSection("stats", { stats })}
          saving={saving === "stats"}
        />
      )}

      {/* Philosophy Editor */}
      {activeSection === "philosophy" && content && (
        <PhilosophyEditor
          philosophy={content.philosophy || {}}
          onSave={(philosophy: any) => saveSection("philosophy", { philosophy })}
          saving={saving === "philosophy"}
        />
      )}

      {/* Campus Hubs Editor */}
      {activeSection === "campusHubs" && content && (
        <CampusHubsEditor
          hubs={content.campusHubs?.length > 0 ? content.campusHubs : defaultContent.campusHubs}
          onSave={(campusHubs: any[]) => saveSection("campusHubs", { campusHubs })}
          saving={saving === "campusHubs"}
        />
      )}
    </div>
  );
}

// ─── Hero Slides Editor ───
function HeroSlidesEditor({ slides, onSave, saving }: { slides: any[]; onSave: (s: any[]) => void; saving: boolean }) {
  const [localSlides, setLocalSlides] = useState(slides);

  const updateSlide = (idx: number, field: string, value: string) => {
    const updated = [...localSlides];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalSlides(updated);
  };

  const addSlide = () => {
    setLocalSlides([...localSlides, { tagline: "", title: "", description: "", cta: "Learn More", link: "/", image: "" }]);
  };

  const removeSlide = (idx: number) => {
    setLocalSlides(localSlides.filter((_: any, i: number) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {localSlides.map((slide: any, idx: number) => (
        <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-playfair font-black text-primary">Slide {idx + 1}</h4>
            <button onClick={() => removeSlide(idx)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-all cursor-pointer"><Trash2 size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Tagline" value={slide.tagline} onChange={(v: string) => updateSlide(idx, "tagline", v)} />
            <InputField label="Title" value={slide.title} onChange={(v: string) => updateSlide(idx, "title", v)} />
            <InputField label="CTA Button Text" value={slide.cta} onChange={(v: string) => updateSlide(idx, "cta", v)} />
            <InputField label="CTA Link" value={slide.link} onChange={(v: string) => updateSlide(idx, "link", v)} />
            <div className="md:col-span-2">
              <ImageUpload label="Slide Image" value={slide.image} onChange={(v: string) => updateSlide(idx, "image", v)} />
            </div>
            <div className="md:col-span-2">
              <TextareaField label="Description" value={slide.description} onChange={(v: string) => updateSlide(idx, "description", v)} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addSlide} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Slide
        </button>
        <button onClick={() => onSave(localSlides)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Slides"}
        </button>
      </div>
    </div>
  );
}

// ─── Stats Editor ───
function StatsEditor({ stats, onSave, saving }: { stats: any[]; onSave: (s: any[]) => void; saving: boolean }) {
  const [localStats, setLocalStats] = useState(stats);

  const updateStat = (idx: number, field: string, value: string) => {
    const updated = [...localStats];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalStats(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Stats Bar</h4>
        <div className="space-y-6">
          {localStats.map((stat: any, idx: number) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-gray-50 last:border-0">
              <InputField label="Label" value={stat.label} onChange={(v: string) => updateStat(idx, "label", v)} />
              <InputField label="Value" value={stat.value} onChange={(v: string) => updateStat(idx, "value", v)} />
              <InputField label="Icon (Users, Award, ShieldCheck, etc.)" value={stat.icon} onChange={(v: string) => updateStat(idx, "icon", v)} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onSave(localStats)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Stats"}
      </button>
    </div>
  );
}

// ─── Philosophy Editor ───
function PhilosophyEditor({ philosophy, onSave, saving }: { philosophy: any; onSave: (p: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(philosophy);

  const update = (field: string, value: any) => {
    setLocal({ ...local, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Philosophy Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Badge Text" value={local.badge} onChange={(v: string) => update("badge", v)} />
          <InputField label="Heading" value={local.heading} onChange={(v: string) => update("heading", v)} />
          <InputField label="Heading Highlight Word" value={local.headingHighlight} onChange={(v: string) => update("headingHighlight", v)} />
          <InputField label="Floating Card Text" value={local.floatingText} onChange={(v: string) => update("floatingText", v)} />
          <div className="md:col-span-2">
            <ImageUpload label="Philosophy Image" value={local.image} onChange={(v: string) => update("image", v)} />
          </div>
          <InputField label="CTA Text" value={local.ctaText} onChange={(v: string) => update("ctaText", v)} />
          <InputField label="CTA Link" value={local.ctaLink} onChange={(v: string) => update("ctaLink", v)} />
          <div className="md:col-span-2">
            <TextareaField label="Description" value={local.description} onChange={(v: string) => update("description", v)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Features (comma separated)</label>
            <input
              value={(local.features || []).join(", ")}
              onChange={(e) => update("features", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>
      <button onClick={() => onSave(local)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Philosophy"}
      </button>
    </div>
  );
}

// ─── Reusable Input Fields ───
function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
      />
    </div>
  );
}

// ─── Placeholder Tab ───
function PlaceholderTab({ title, description }: { title: string; description: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-16 border border-gray-100 shadow-sm text-center">
      <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
        <Settings className="text-primary" size={36} />
      </div>
      <h3 className="text-2xl font-playfair font-black text-primary mb-4">{title}</h3>
      <p className="text-gray-400 font-medium max-w-md mx-auto mb-8">{description}</p>
      <p className="text-xs text-gray-300 uppercase tracking-widest font-bold">This section will be available soon</p>
    </motion.div>
  );
}

// ─── Campus Hubs Editor ───
function CampusHubsEditor({ hubs, onSave, saving }: { hubs: any[]; onSave: (h: any[]) => void; saving: boolean }) {
  const [localHubs, setLocalHubs] = useState(hubs);

  const updateHub = (idx: number, field: string, value: string) => {
    const updated = [...localHubs];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalHubs(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Campus Hubs (Branch Highlights)</h4>
        {localHubs.map((hub: any, idx: number) => (
          <div key={idx} className="mb-10 last:mb-0 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
            <h5 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-widest">{hub.name || `Block ${idx + 1}`}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Name (e.g. Block A)" value={hub.name} onChange={(v: string) => updateHub(idx, "name", v)} />
              <InputField label="Hub Type (e.g. Foundation Hub)" value={hub.hub} onChange={(v: string) => updateHub(idx, "hub", v)} />
              <InputField label="Title" value={hub.title} onChange={(v: string) => updateHub(idx, "title", v)} />
              <InputField label="Page Link ID (e.g. block-a)" value={hub.id} onChange={(v: string) => updateHub(idx, "id", v)} />
              <div className="md:col-span-2">
                <ImageUpload label="Campus Image" value={hub.img} onChange={(v: string) => updateHub(idx, "img", v)} />
              </div>
              <div className="md:col-span-2">
                <TextareaField label="Description" value={hub.desc} onChange={(v: string) => updateHub(idx, "desc", v)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => onSave(localHubs)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Campus Hubs"}
      </button>
    </div>
  );
}

// ════════════════════════════════════════
// ABOUT US TAB - Edit Hero, Legacy
// ════════════════════════════════════════
const defaultAboutContent = {
  hero: {
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
    heading: "Our Journey of ",
    headingHighlight: "Success.",
    description: "Three decades of academic excellence, carving a legacy that inspires generations.",
  },
  legacy: {
    headingPrefix: "Founded on ",
    headingHighlight: "Vision.",
    paragraphs: [
      "Established in 1995, M.G. School emerged from a simple yet profound dream: to provide world-class education that respects local roots while embracing global growth.",
      "What began in a modest building with 50 students has now evolved into a multi-campus educational beacon, nurturing thousands of bright minds every year.",
    ],
    stat1Value: "28+",
    stat1Label: "Years Legacy",
    stat2Value: "15k",
    stat2Label: "Alumni Globally",
    archiveYear: "Archive 1995",
    archiveTitle: "The First Foundation.",
    imageMain: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80",
    imageSmall1: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    imageSmall2: "https://images.unsplash.com/photo-1577891772447-b31528753a9c",
  },
};

function AboutTab() {
  const [content, setContent] = useState<any>(defaultAboutContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    axiosInstance.get("/api/about-content")
      .then((res) => {
        const data = res.data;
        if (data.success && data.content) {
          setContent(data.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveSection = async (section: string, data: any) => {
    setSaving(section);
    setMessage("");
    try {
      const res = await axiosInstance.put("/api/about-content", { section, ...data });
      const result = res.data;
      if (result.success) {
        setContent(result.content);
        setMessage("Saved successfully!");
      } else {
        setMessage("Error: " + result.error);
      }
    } catch {
      setMessage("Failed to save. Check MongoDB connection.");
    }
    setSaving("");
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const sections = [
    { id: "hero", name: "Hero Section", icon: ImageIcon },
    { id: "legacy", name: "Legacy Section", icon: Building2 },
  ];

  return (
    <div className="space-y-8">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-3">
        {sections.map((s) => {
          const Icon = s.icon as any;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
              }`}
            >
              <Icon size={18} /> {s.name}
            </button>
          );
        })}
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </motion.div>
      )}

      {activeSection === "hero" && content && (
        <AboutHeroEditor
          hero={content.hero || defaultAboutContent.hero}
          onSave={(hero: any) => saveSection("hero", { hero })}
          saving={saving === "hero"}
        />
      )}

      {activeSection === "legacy" && content && (
        <AboutLegacyEditor
          legacy={content.legacy || defaultAboutContent.legacy}
          onSave={(legacy: any) => saveSection("legacy", { legacy })}
          saving={saving === "legacy"}
        />
      )}
    </div>
  );
}

// ─── About Hero Editor ───
function AboutHeroEditor({ hero, onSave, saving }: { hero: any; onSave: (h: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(hero);
  const update = (field: string, value: string) => setLocal({ ...local, [field]: value });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">About Us: Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading Prefix" value={local.heading} onChange={(v) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v) => update("headingHighlight", v)} />
          <div className="md:col-span-2">
            <ImageUpload label="Hero Background Image" value={local.image} onChange={(v) => update("image", v)} />
          </div>
          <div className="md:col-span-2">
            <TextareaField label="Description" value={local.description} onChange={(v) => update("description", v)} />
          </div>
        </div>
      </div>
      <button onClick={() => onSave(local)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Hero"}
      </button>
    </div>
  );
}

// ─── About Legacy Editor ───
function AboutLegacyEditor({ legacy, onSave, saving }: { legacy: any; onSave: (l: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(legacy);
  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Legacy Section (Founded on Vision)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading Prefix" value={local.headingPrefix} onChange={(v) => update("headingPrefix", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v) => update("headingHighlight", v)} />
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Paragraphs (Separate with | character)</label>
            <textarea
              value={(local.paragraphs || []).join(" | ")}
              onChange={(e) => update("paragraphs", e.target.value.split("|").map(s => s.trim()).filter(Boolean))}
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
            />
          </div>
          <InputField label="Stat 1 Value (e.g. 28+)" value={local.stat1Value} onChange={(v) => update("stat1Value", v)} />
          <InputField label="Stat 1 Label" value={local.stat1Label} onChange={(v) => update("stat1Label", v)} />
          <InputField label="Stat 2 Value (e.g. 15k)" value={local.stat2Value} onChange={(v) => update("stat2Value", v)} />
          <InputField label="Stat 2 Label" value={local.stat2Label} onChange={(v) => update("stat2Label", v)} />
          
          <div className="md:col-span-2 mt-6 mb-2">
            <h5 className="font-bold text-gray-700 uppercase text-xs tracking-widest border-b border-gray-100 pb-2">Archive / Small Images</h5>
          </div>
          
          <InputField label="Archive Mini-Title" value={local.archiveYear} onChange={(v) => update("archiveYear", v)} />
          <InputField label="Archive Main Title" value={local.archiveTitle} onChange={(v) => update("archiveTitle", v)} />
          
          <div className="md:col-span-2">
            <ImageUpload label="Main Archive Image (Large)" value={local.imageMain} onChange={(v) => update("imageMain", v)} />
          </div>
          <div className="md:col-span-2">
            <ImageUpload label="Small Image 1 (Top right)" value={local.imageSmall1} onChange={(v) => update("imageSmall1", v)} />
          </div>
          <div className="md:col-span-2">
            <ImageUpload label="Small Image 2 (Bottom right)" value={local.imageSmall2} onChange={(v) => update("imageSmall2", v)} />
          </div>
        </div>
      </div>
      <button onClick={() => onSave(local)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Legacy Section"}
      </button>
    </div>
  );
}

// ════════════════════════════════════════
// ACADEMICS TAB - Edit Hero, Programs
// ════════════════════════════════════════
const defaultAcademicsContent = {
  hero: {
    heading: "Elite",
    headingHighlight: "Curriculum.",
    description: '"Academic rigour meets creative freedom. We cultivate minds that think differently and lead effectively."',
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
  },
  programs: [
    {
      title: "Primary Foundation",
      level: "Std 1 to 5",
      tagline: "Building Bright Beginnings",
      description: "Our primary program focuses on sensory and play-based learning, ensuring every child develops a love for discovery while mastering core literacy and numeracy.",
      features: ["Experimental Science", "Vedic Mathematics", "Creative Storytelling", "Environmental Awareness"],
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070",
      color: "from-blue-500/10 to-transparent"
    },
    {
      title: "Secondary Excellence",
      level: "Std 6 to 10",
      tagline: "Critical Thinking & Character",
      description: "Students transition into abstract reasoning and critical analysis. We combine rigorous board curriculum with real-world application to prepare them for global stages.",
      features: ["Robotics & Coding", "Advanced Social Sciences", "Foreign Language Lab", "Competitive Sports"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2023",
      color: "from-amber-500/10 to-transparent"
    },
    {
      title: "Higher Secondary",
      level: "Std 11 & 12",
      tagline: "Career & Leadership Portals",
      description: "Dedicated streams for Science, Commerce, and Arts with personalized mentoring. We focus on entrance exam mastery and professional portfolio development.",
      features: ["University Guidance", "Research Workshops", "Enterprise Training", "Creative Portfolio"],
      image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
      color: "from-primary/10 to-transparent"
    }
  ],
};

function AcademicsTab() {
  const [content, setContent] = useState<any>(defaultAcademicsContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    axiosInstance.get("/api/academics-content")
      .then((res) => {
        const data = res.data;
        if (data.success && data.content) {
          setContent(data.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveSection = async (section: string, data: any) => {
    setSaving(section);
    setMessage("");
    try {
      const res = await axiosInstance.put("/api/academics-content", { section, ...data });
      const result = res.data;
      if (result.success) {
        setContent(result.content);
        setMessage("Saved successfully!");
      } else {
        setMessage("Error: " + result.error);
      }
    } catch {
      setMessage("Failed to save. Check MongoDB connection.");
    }
    setSaving("");
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const sections = [
    { id: "hero", name: "Hero Section", icon: ImageIcon },
    { id: "programs", name: "Programs Section", icon: BookOpen },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {sections.map((s) => {
          const Icon = s.icon as any;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
              }`}
            >
              <Icon size={18} /> {s.name}
            </button>
          );
        })}
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </motion.div>
      )}

      {activeSection === "hero" && content && (
        <AcademicsHeroEditor
          hero={content.hero || defaultAcademicsContent.hero}
          onSave={(hero: any) => saveSection("hero", { hero })}
          saving={saving === "hero"}
        />
      )}

      {activeSection === "programs" && content && (
        <AcademicsProgramsEditor
          programs={content.programs || defaultAcademicsContent.programs}
          onSave={(programs: any[]) => saveSection("programs", { programs })}
          saving={saving === "programs"}
        />
      )}
    </div>
  );
}

function AcademicsHeroEditor({ hero, onSave, saving }: { hero: any; onSave: (h: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(hero);
  const update = (field: string, value: string) => setLocal({ ...local, [field]: value });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Academics: Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading" value={local.heading} onChange={(v) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v) => update("headingHighlight", v)} />
          <div className="md:col-span-2">
            <ImageUpload label="Hero Side Image" value={local.image} onChange={(v) => update("image", v)} />
          </div>
          <div className="md:col-span-2">
            <TextareaField label="Description" value={local.description} onChange={(v) => update("description", v)} />
          </div>
        </div>
      </div>
      <button onClick={() => onSave(local)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Hero"}
      </button>
    </div>
  );
}

function AcademicsProgramsEditor({ programs, onSave, saving }: { programs: any[]; onSave: (p: any[]) => void; saving: boolean }) {
  const [localPrograms, setLocalPrograms] = useState(programs);

  const updateProgram = (idx: number, field: string, value: any) => {
    const updated = [...localPrograms];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalPrograms(updated);
  };

  return (
    <div className="space-y-6">
      {localPrograms.slice(0, 3).map((program, idx) => (
        <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h4 className="text-lg font-playfair font-black text-primary mb-6">Program {idx + 1}: {program.title || "New Program"}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Title" value={program.title} onChange={(v) => updateProgram(idx, "title", v)} />
            <InputField label="Level (e.g. Std 1 to 5)" value={program.level} onChange={(v) => updateProgram(idx, "level", v)} />
            <InputField label="Tagline" value={program.tagline} onChange={(v) => updateProgram(idx, "tagline", v)} />
            <InputField label="Card Color (CSS Gradient)" value={program.color} onChange={(v) => updateProgram(idx, "color", v)} />
            <div className="md:col-span-2">
              <ImageUpload label="Program Image" value={program.image} onChange={(v) => updateProgram(idx, "image", v)} />
            </div>
            <div className="md:col-span-2">
              <TextareaField label="Description" value={program.description} onChange={(v) => updateProgram(idx, "description", v)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Features (comma separated)</label>
              <textarea
                value={(program.features || []).join(", ")}
                onChange={(e) => updateProgram(idx, "features", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => onSave(localPrograms)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Programs"}
      </button>
    </div>
  );
}
