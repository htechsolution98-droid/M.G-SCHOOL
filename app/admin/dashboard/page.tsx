"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import VideoUpload from "@/components/admin/VideoUpload";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import LoadingScreen from "@/components/LoadingScreen";
import {
  GraduationCap,
  Users,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Calendar,
  LogOut,
  Menu,
  X,
  Bell,
  Plus,
  Building2,
  Home,
  TrendingUp,
  History,
  Save,
  Trash2,
  Trash,
  Edit3,
  Star,
  Megaphone,
  HelpCircle,
  LayoutDashboard,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// ─── Sidebar Items ───
const sidebarItems = [
  { id: "homepage", name: "Homepage", icon: Home },
  { id: "about", name: "About Us", icon: BookOpen },
  { id: "trustees", name: "Trustees", icon: Users },
  { id: "academics", name: "Academics", icon: GraduationCap },
  { id: "branches", name: "Buildings", icon: Building2 },
  { id: "faculty", name: "Faculty", icon: BookOpen },
  { id: "life-at-mg", name: "Life@MG", icon: ImageIcon },
  { id: "events", name: "Events", icon: Calendar },
  { id: "enrollment", name: "Enrollment", icon: BookOpen },
];



export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("homepage");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("mg_admin_auth");
    router.push("/admin");
  };

  if (loading || !isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* ─── Mobile Restriction Message ─── */}
      <div className="lg:hidden min-h-screen bg-primary flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white p-6 rounded-[2.5rem] mb-8 shadow-2xl animate-bounce">
          <img src="/images/Logo_of_M_G_Schools_Solo.jpg-removebg-preview.png" alt="Logo" className="w-20 h-20 object-contain" />
        </div>
        <h1 className="text-3xl font-playfair font-black text-white mb-4">Desktop Access Only</h1>
        <p className="text-secondary/80 font-medium max-w-xs leading-relaxed mb-10">
          The Management Console is optimized for professional desktop workflows. Please log in from a laptop or PC to manage your school's digital presence.
        </p>
        <button onClick={handleLogout} className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/10">
          <LogOut size={20} /> Sign Out
        </button>
      </div>

      {/* ─── Desktop Dashboard ─── */}
      <div className="hidden lg:flex min-h-screen bg-gray-50 flex">
      {/* ─── Sidebar Desktop ─── */}
      <aside className="hidden lg:flex flex-col w-72 bg-primary h-screen fixed left-0 top-0 z-40 overflow-y-auto custom-scrollbar">
        <div className="p-8 border-b border-white/10 bg-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-lg">
              <img src="/images/Logo_of_M_G_Schools_Solo.jpg-removebg-preview.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="text-lg font-playfair font-black text-white tracking-tight">M.G. SCHOOL</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 pb-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeTab === item.id ? "bg-secondary text-primary shadow-lg" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/10 mt-auto shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>



      {/* ─── Main Content ─── */}
      <main className="flex-1 lg:ml-72 min-h-screen w-full min-w-0 overflow-x-hidden flex flex-col">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between max-w-[1600px] mx-auto w-full">
            <div className="flex items-center gap-4">

              <div>
                <h2 className="text-xl font-playfair font-black text-primary capitalize">{activeTab}</h2>
                <p className="text-xs text-gray-400 font-medium">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {["homepage", "about", "trustees", "academics", "branches", "faculty", "life-at-mg", "events"].includes(activeTab) && (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("admin-global-save"))}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-secondary hover:text-primary transition-all active:scale-95 cursor-pointer"
                >
                  <Save size={18} /> <span className="hidden sm:inline">Save Changes</span>
                </button>
              )}
              <button className="relative p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                <Bell size={20} className="text-gray-500" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-secondary font-black text-sm">A</div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 flex-1 flex flex-col">
          <div className="max-w-[1600px] mx-auto w-full flex-1">
            {activeTab === "homepage" && <HomepageTab />}
            {activeTab === "about" && <AboutTab />}
            {activeTab === "trustees" && <TrusteesTab />}
            {activeTab === "academics" && <AcademicsTab />}
            {activeTab === "branches" && <BuildingsTab />}
            {activeTab === "faculty" && <FacultyTab />}
            {activeTab === "life-at-mg" && <LifeAtMGTab />}
            {activeTab === "events" && <EventsTab />}
            {activeTab === "enrollment" && <EnrollmentTab />}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}


// ════════════════════════════════════════
// HOMEPAGE TAB - Edit Hero, Stats, Philosophy
// ════════════════════════════════════════
const defaultContent = {
  heroSlides: [],
  stats: [],
  philosophy: {
    badge: "",
    heading: "",
    headingHighlight: "",
    description: "",
    image: "",
    floatingText: "",
    features: [],
    ctaText: "",
    ctaLink: "",
  },
  campusHubs: [],
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
    { id: "background", name: "School Background", icon: History },
  ];


  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full">
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
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

      {/* Background Editor */}
      {activeSection === "background" && content && (
        <HomeBackgroundEditor
          background={content.background}
          onSave={(data: any) => saveSection("background", { background: data })}
          saving={saving === "background"}
        />
      )}
    </div>

  );
}

// ─── Home Background Editor ───
function HomeBackgroundEditor({ background, onSave, saving }: { background: any; onSave: (b: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(background || {});

  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  const updateHistory = (idx: number, value: string) => {
    const newHistory = [...(local.history || [])];
    newHistory[idx] = value;
    update("history", newHistory);
  };

  const addHistory = () => update("history", [...(local.history || []), ""]);
  const removeHistory = (idx: number) => update("history", (local.history || []).filter((_: any, i: number) => i !== idx));

  const updateSchool = (type: "englishSchools", idx: number, field: string, value: string) => {
    const schools = [...(local[type] || [])];
    schools[idx] = { ...schools[idx], [field]: value };
    update(type, schools);
  };

  const addSchool = (type: "englishSchools") => update(type, [...(local[type] || []), { name: "", details: "", subDetails: "" }]);
  const removeSchool = (type: "englishSchools", idx: number) => update(type, (local[type] || []).filter((_: any, i: number) => i !== idx));

  useEffect(() => {
    const handleGlobalSave = () => onSave(local);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [local, onSave]);

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Background: Section Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField label="Section Badge" value={local.badge} onChange={(v) => update("badge", v)} />
          <InputField label="Heading Prefix" value={local.title} onChange={(v) => update("title", v)} />
          <InputField label="Heading Highlight" value={local.titleHighlight} onChange={(v) => update("titleHighlight", v)} />
          <div className="md:col-span-3">
            <TextareaField label="Main Description" value={local.description} onChange={(v) => update("description", v)} />
          </div>
        </div>
      </div>

      {/* History Paragraphs */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-playfair font-black text-primary">History Paragraphs</h4>
          <button onClick={addHistory} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-all cursor-pointer">
            <Plus size={14} /> Add Paragraph
          </button>
        </div>
        <div className="space-y-4">
          {(local.history || []).map((p: string, idx: number) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="flex-1">
                <TextareaField label={`Paragraph ${idx + 1}`} value={p} onChange={(v) => updateHistory(idx, v)} />
              </div>
              <button onClick={() => removeHistory(idx)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all cursor-pointer mt-8">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Centre Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Approved Centre Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Centre Heading" value={local.approvedCentreTitle} onChange={(v) => update("approvedCentreTitle", v)} />
          <InputField label="Centre Description" value={local.approvedCentreDesc} onChange={(v) => update("approvedCentreDesc", v)} />
        </div>
      </div>


      {/* English Medium Schools */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-playfair font-black text-primary">English Medium: School List</h4>
          <button onClick={() => addSchool("englishSchools")} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-all cursor-pointer">
            <Plus size={14} /> Add School
          </button>
        </div>
        <div className="mb-6">
          <InputField label="English Medium Title" value={local.englishMediumTitle} onChange={(v) => update("englishMediumTitle", v)} />
        </div>
        <div className="space-y-6">
          {(local.englishSchools || []).map((s: any, idx: number) => (
            <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-gray-100 relative">
              <button onClick={() => removeSchool("englishSchools", idx)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all cursor-pointer"><Trash2 size={16} /></button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="School Name" value={s.name} onChange={(v) => updateSchool("englishSchools", idx, "name", v)} />
                <InputField label="Details" value={s.details} onChange={(v) => updateSchool("englishSchools", idx, "details", v)} />
                <InputField label="Additional Details" value={s.subDetails} onChange={(v) => updateSchool("englishSchools", idx, "subDetails", v)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button onClick={() => onSave(local)} disabled={saving}
          className="flex items-center gap-2 px-12 py-4 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-xl">
          <Save size={18} /> {saving ? "Saving..." : "Save Background Content"}
        </button>
      </div>
    </div>
  );
}


// ─── Hero Slides Editor ───
function HeroSlidesEditor({ slides, onSave, saving }: { slides: any[]; onSave: (s: any[]) => void; saving: boolean }) {
  const [localSlides, setLocalSlides] = useState(slides);

  const updateSlide = (idx: number, field: string, value: string | string[]) => {
    const updated = [...localSlides];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalSlides(updated);
  };

  const addSlide = () => {
    setLocalSlides([...localSlides, { tagline: "", title: "", description: "", cta: "Learn More", link: "/", image: "", images: [], video: "" }]);
  };

  const removeSlide = (idx: number) => {
    setLocalSlides(localSlides.filter((_: any, i: number) => i !== idx));
  };

  useEffect(() => {
    const handleGlobalSave = () => onSave(localSlides);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [localSlides, onSave]);

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
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <MultiImageUpload
                label="Slide Images (multiple images will auto-cycle as background)"
                values={slide.images && slide.images.length > 0 ? slide.images : (slide.image ? [slide.image] : [])}
                onChange={(urls: string[]) => {
                  setLocalSlides(prev => {
                    const updated = [...prev];
                    updated[idx] = {
                      ...updated[idx],
                      images: urls,
                      image: urls.length > 0 ? urls[0] : ""
                    };
                    return updated;
                  });
                }}
                maxImages={8}
              />
              <VideoUpload
                label="Slide Video (if provided, this will play instead of images)"
                value={slide.video || ""}
                onChange={(v) => updateSlide(idx, "video", v)}
              />
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

  useEffect(() => {
    const handleGlobalSave = () => onSave(localStats);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [localStats, onSave]);

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
function InputField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">{label}</label>
      <input
        type={type}
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


// ─── Campus Hubs Editor ───
function CampusHubsEditor({ hubs, onSave, saving }: { hubs: any[]; onSave: (h: any[]) => void; saving: boolean }) {
  const [localHubs, setLocalHubs] = useState(hubs);

  const updateHub = (idx: number, field: string, value: string | string[]) => {
    setLocalHubs((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  useEffect(() => {
    const handleGlobalSave = () => onSave(localHubs);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [localHubs, onSave]);

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
                <MultiImageUpload
                  label="Campus Images (slides inside the hub card)"
                  values={hub.images && hub.images.length > 0 ? hub.images : (hub.img ? [hub.img] : [])}
                  onChange={(urls: string[]) => {
                    setLocalHubs(prev => {
                      const updated = [...prev];
                      updated[idx] = {
                        ...updated[idx],
                        images: urls,
                        img: urls.length > 0 ? urls[0] : ""
                      };
                      return updated;
                    });
                  }}
                  maxImages={6}
                />
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
  excellence: [],
  valuesScroll: {
    heading: "Every Child, ",
    headingHighlight: "Every Future.",
    description: "\"Our commitment is to the unique potential within every student.\"",
    features: [
      { title: "Immersive Digital Classrooms", image: "" },
      { title: "Holistic Character Building", image: "" },
      { title: "Global Athletic Exposure", image: "" },
      { title: "Creative & Performing Arts", image: "" },
      { title: "Ethics-Driven Education", image: "" },
      { title: "Sustainable Campus Living", image: "" },
      { title: "Peer-to-Peer Mentorship", image: "" },
      { title: "International Exchange", image: "" }
    ]
  },
  principalMessages: [
    {
      heading: "Principal Message",
      message: "",
      name: "",
      qualifications: "",
      designation: "",
      image: ""
    }
  ]
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
    { id: "principalMessage", name: "Principal's Message", icon: MessageSquare },
    { id: "whyChooseUs", name: "Why Choose Us", icon: HelpCircle },
    { id: "excellence", name: "Excellence in Education", icon: Star },
    { id: "valuesScroll", name: "Values & Features", icon: BookOpen },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-3">
        {sections.map((s) => {
          const Icon = s.icon as any;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
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

      {activeSection === "whyChooseUs" && content && (
        <AboutWhyChooseUsEditor
          whyChooseUs={content.whyChooseUs}
          onSave={(data: any) => saveSection("whyChooseUs", { whyChooseUs: data })}
          saving={saving === "whyChooseUs"}
        />
      )}

      {activeSection === "excellence" && content && (
        <AboutExcellenceEditor
          excellence={content.excellence || defaultAboutContent.excellence}
          onSave={(excellence: any) => saveSection("excellence", { excellence })}
          saving={saving === "excellence"}
        />
      )}

      {activeSection === "valuesScroll" && content && (
        <AboutValuesScrollEditor
          valuesScroll={content.valuesScroll || defaultAboutContent.valuesScroll}
          onSave={(valuesScroll: any) => saveSection("valuesScroll", { valuesScroll })}
          saving={saving === "valuesScroll"}
        />
      )}

      {activeSection === "principalMessage" && content && (
        <AboutPrincipalMessagesEditor
          principalMessages={content.principalMessages || (defaultAboutContent as any).principalMessages}
          onSave={(data: any) => saveSection("principalMessage", { principalMessages: data })}
          saving={saving === "principalMessage"}
        />
      )}
    </div>
  );
}

// ─── About Hero Editor ───
function AboutHeroEditor({ hero, onSave, saving }: { hero: any; onSave: (h: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(hero);
  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">About Us: Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Subheading (Badge Text)" value={local.subheading} onChange={(v: string) => update("subheading", v)} />
          <InputField label="Heading Prefix" value={local.heading} onChange={(v: string) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v: string) => update("headingHighlight", v)} />
          <div className="md:col-span-2">
            <ImageUpload label="Hero Background Image" value={local.image} onChange={(v: string) => update("image", v)} />
          </div>
          <div className="md:col-span-2">
            <TextareaField label="Description" value={local.description} onChange={(v: string) => update("description", v)} />
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
            <h5 className="font-bold text-gray-700 uppercase text-xs tracking-widest border-b border-gray-100 pb-2">Archive Images (Slideshow)</h5>
          </div>

          <InputField label="Archive Mini-Title" value={local.archiveYear} onChange={(v) => update("archiveYear", v)} />
          <InputField label="Archive Main Title" value={local.archiveTitle} onChange={(v) => update("archiveTitle", v)} />

          <div className="md:col-span-2">
            <MultiImageUpload
              label="Legacy Section Images (will slide in the right column)"
              values={local.images && local.images.length > 0 ? local.images : [local.imageMain, local.imageSmall1, local.imageSmall2].filter(Boolean)}
              onChange={(urls: string[]) => {
                update("images", urls);
              }}
              maxImages={8}
            />
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

// ─── About Why Choose Us Editor ───
function AboutWhyChooseUsEditor({ whyChooseUs, onSave, saving }: { whyChooseUs: any; onSave: (w: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(whyChooseUs || {
    heading: "Why Choose Our School",
    headingHighlight: "A Destination for Bright Futures",
    vision: { heading: "", description: "" },
    features: [],
    reasons: []
  });

  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });
  const updateVision = (subField: string, value: string) => {
    update("vision", { ...(local.vision || { heading: "", description: "" }), [subField]: value });
  };

  const addReason = () => update("reasons", [...(local.reasons || []), { title: "", description: "" }]);
  const removeReason = (idx: number) => update("reasons", (local.reasons || []).filter((_: any, i: number) => i !== idx));
  const updateReason = (idx: number, subField: string, val: string) => {
    const updated = [...(local.reasons || [])];
    updated[idx] = { ...updated[idx], [subField]: val };
    update("reasons", updated);
  };

  const addFeature = () => update("features", [...(local.features || []), { title: "", description: "", icon: "" }]);
  const removeFeature = (idx: number) => update("features", (local.features || []).filter((_: any, i: number) => i !== idx));
  const updateFeature = (idx: number, subField: string, val: string) => {
    const updated = [...(local.features || [])];
    updated[idx] = { ...updated[idx], [subField]: val };
    update("features", updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6 border-b border-gray-50 pb-4">Heading Content</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading" value={local.heading} onChange={(v: string) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v: string) => update("headingHighlight", v)} />
          <InputField label="Reasons Section Title" value={local.reasonsTitle || ""} onChange={(v: string) => update("reasonsTitle", v)} />
          <InputField label="Features Section Title" value={local.featuresTitle || ""} onChange={(v: string) => update("featuresTitle", v)} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-2">Vision Section (Optional)</h4>
        <p className="text-xs text-gray-400 mb-6 border-b border-gray-50 pb-4">If left blank, this section will not appear on the website.</p>
        <div className="grid grid-cols-1 gap-6">
          <InputField label="Vision Heading" value={local.vision?.heading || ""} onChange={(v: string) => updateVision("heading", v)} />
          <TextareaField label="Vision Description" value={local.vision?.description || ""} onChange={(v: string) => updateVision("description", v)} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
          <h4 className="text-lg font-playfair font-black text-primary">Features Section</h4>
          <button onClick={addFeature} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-all cursor-pointer">
            <Plus size={14} /> Add Feature
          </button>
        </div>
        <div className="space-y-6">
          {(local.features || []).map((feature: any, idx: number) => (
            <div key={idx} className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-gray-100 relative">
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shrink-0">{idx + 1}</span>
              <div className="flex-1 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Feature Title" value={feature.title} onChange={(v: string) => updateFeature(idx, "title", v)} />
                  <InputField label="Icon Name (e.g. Users, BookOpen)" value={feature.icon} onChange={(v: string) => updateFeature(idx, "icon", v)} />
                </div>
                <TextareaField label="Feature Description" value={feature.description} onChange={(v: string) => updateFeature(idx, "description", v)} />
              </div>
              <button onClick={() => removeFeature(idx)} className="p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all cursor-pointer">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {(!local.features || local.features.length === 0) && (
            <div className="text-center py-10 text-gray-400 font-medium italic">No features added yet.</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
          <h4 className="text-lg font-playfair font-black text-primary">Reasons (Cards)</h4>
          <button onClick={addReason} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-all cursor-pointer">
            <Plus size={14} /> Add Reason
          </button>
        </div>
        <div className="space-y-6">
          {(local.reasons || []).map((reason: any, idx: number) => (
            <div key={idx} className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-gray-100 relative">
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shrink-0">{idx + 1}</span>
              <div className="flex-1 grid grid-cols-1 gap-4">
                <InputField label="Reason Title" value={reason.title} onChange={(v: string) => updateReason(idx, "title", v)} />
                <TextareaField label="Reason Description" value={reason.description} onChange={(v: string) => updateReason(idx, "description", v)} />
              </div>
              <button onClick={() => removeReason(idx)} className="p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all cursor-pointer">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {local.reasons?.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-medium italic">No reasons added yet.</div>
          )}
        </div>
      </div>

      <div className="pt-6">
        <button onClick={() => onSave(local)} disabled={saving}
          className="flex items-center gap-2 px-12 py-4 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-xl">
          <Save size={18} /> {saving ? "Saving..." : "Save Why Choose Us Content"}
        </button>
      </div>
    </div>
  );
}


// ─── About Excellence Editor ───
function AboutExcellenceEditor({ excellence, onSave, saving }: { excellence: any[]; onSave: (e: any[]) => void; saving: boolean }) {
  const [local, setLocal] = useState(excellence);

  const addItem = () => setLocal([...local, { title: "", description: "", image: "" }]);
  const removeItem = (idx: number) => setLocal(local.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: string, value: string) => {
    setLocal((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {local.map((item: any, idx: number) => (
        <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative group">
          <button onClick={() => removeItem(idx)} className="absolute top-6 right-6 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
            <Trash size={16} />
          </button>
          <h4 className="text-lg font-playfair font-black text-primary mb-6">Excellence Block {idx + 1}</h4>
          <div className="grid grid-cols-1 gap-6">
            <InputField label="Title" value={item.title} onChange={(v) => updateItem(idx, "title", v)} />
            <TextareaField label="Description" value={item.description} onChange={(v) => updateItem(idx, "description", v)} />
            <ImageUpload label="Image" value={item.image} onChange={(v) => updateItem(idx, "image", v)} />
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addItem} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Block
        </button>
        <button onClick={() => onSave(local)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Excellence Section"}
        </button>
      </div>
    </div>
  );
}

// ─── About Values Scroll Editor ───
function AboutValuesScrollEditor({ valuesScroll, onSave, saving }: { valuesScroll: any; onSave: (v: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(valuesScroll);

  const updateField = (field: string, value: string) => setLocal({ ...local, [field]: value });

  const addFeature = () => {
    setLocal({ ...local, features: [...(local.features || []), { title: "", image: "" }] });
  };

  const removeFeature = (idx: number) => {
    setLocal({ ...local, features: local.features.filter((_: any, i: number) => i !== idx) });
  };

  const updateFeature = (idx: number, field: string, value: string | string[]) => {
    setLocal((prev: any) => {
      const newFeatures = [...(prev.features || [])];
      newFeatures[idx] = { ...newFeatures[idx], [field]: value };
      return { ...prev, features: newFeatures };
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Values Section Overview</h4>
        <div className="grid grid-cols-1 gap-6">
          <InputField label="Heading" value={local.heading} onChange={(v) => updateField("heading", v)} />
          <div>
            <TextareaField label="Description" value={local.description} onChange={(v) => updateField("description", v)} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-playfair font-black text-primary px-2">Features / Values</h4>
        {(local.features || []).map((feature: any, idx: number) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative group flex flex-col md:flex-row gap-6 items-center">
            <button onClick={() => removeFeature(idx)} className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
              <Trash size={16} />
            </button>
            <div className="flex-1 w-full grid grid-cols-1 gap-4">
              <InputField label={`Feature ${idx + 1} Title`} value={feature.title} onChange={(v) => updateFeature(idx, "title", v)} />
              <MultiImageUpload
                label="Feature Images (slides in the card)"
                values={feature.images && feature.images.length > 0 ? feature.images : (feature.image ? [feature.image] : [])}
                onChange={(urls: string[]) => {
                  updateFeature(idx, "images", urls);
                  if (urls.length > 0) updateFeature(idx, "image", urls[0]);
                }}
                maxImages={5}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button onClick={addFeature} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Feature
        </button>
        <button onClick={() => onSave(local)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Values Section"}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// ACADEMICS TAB - Edit Hero, Programs
// ════════════════════════════════════════
const defaultAcademicsContent = {
  hero: {
    heading: "",
    headingHighlight: "",
    description: "",
    image: "",
  },
  programs: [
    {
      title: "Primary Foundation",
      level: "Std 1 to 5",
      tagline: "Building Bright Beginnings",
      description: "Our primary program focuses on sensory and play-based learning, ensuring every child develops a love for discovery while mastering core literacy and numeracy.",
      features: ["Experimental Science", "Vedic Mathematics", "Creative Storytelling", "Environmental Awareness"],
      image: "",
      color: "from-blue-500/10 to-transparent"
    },
    {
      title: "Secondary Excellence",
      level: "Std 6 to 10",
      tagline: "Critical Thinking & Character",
      description: "Students transition into abstract reasoning and critical analysis. We combine rigorous board curriculum with real-world application to prepare them for global stages.",
      features: ["Robotics & Coding", "Advanced Social Sciences", "Foreign Language Lab", "Competitive Sports"],
      image: "",
      color: "from-amber-500/10 to-transparent"
    },
    {
      title: "Higher Secondary",
      level: "Std 11 & 12",
      tagline: "Career & Leadership Portals",
      description: "Dedicated streams for Science, Commerce, and Arts with personalized mentoring. We focus on entrance exam mastery and professional portfolio development.",
      features: ["University Guidance", "Research Workshops", "Enterprise Training", "Creative Portfolio"],
      image: "",
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
    { id: "journey", name: "Academic Journey", icon: History },
    { id: "activities", name: "Activities Section", icon: Building2 },
    { id: "teacherDuties", name: "Teacher Duty Plan", icon: Users },
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
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

      {activeSection === "journey" && content && (
        <AcademicsJourneyEditor
          journey={content.journey}
          onSave={(data: any) => saveSection("journey", { journey: data })}
          saving={saving === "journey"}
        />
      )}

      {activeSection === "activities" && content && (
        <AcademicsActivitiesEditor
          activities={content.activities || []}
          onSave={(activities: any[]) => saveSection("activities", { activities })}
          saving={saving === "activities"}
        />
      )}

      {activeSection === "teacherDuties" && content && (
        <AcademicsTeacherDutiesEditor
          teacherDuties={content.teacherDuties || []}
          onSave={(teacherDuties: any[]) => saveSection("teacherDuties", { teacherDuties })}
          saving={saving === "teacherDuties"}
        />
      )}
    </div>
  );
}

function AcademicsHeroEditor({ hero, onSave, saving }: { hero: any; onSave: (h: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(hero);
  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Academics: Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading" value={local.heading} onChange={(v) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v) => update("headingHighlight", v)} />

          <div className="md:col-span-2 mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-4 border-b border-gray-100 pb-2">Hero Slider Images</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((imgIdx) => (
                <ImageUpload
                  key={imgIdx}
                  label={`Slider Image ${imgIdx + 1}`}
                  value={(local.images || [])[imgIdx] || ""}
                  onChange={(v) => {
                    const newImages = [...(local.images || [])];
                    while (newImages.length <= imgIdx) newImages.push("");
                    newImages[imgIdx] = v;
                    update("images", newImages);
                  }}
                />
              ))}
            </div>
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
    setLocalPrograms((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
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
              <MultiImageUpload
                label="Program Images (Slider)"
                values={program.images && program.images.length > 0 ? program.images : (program.image ? [program.image] : [])}
                onChange={(urls: string[]) => {
                  updateProgram(idx, "images", urls);
                  if (urls.length > 0) updateProgram(idx, "image", urls[0]);
                  else updateProgram(idx, "image", "");
                }}
                maxImages={10}
              />
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

function AcademicsActivitiesEditor({ activities, onSave, saving }: { activities: any[]; onSave: (a: any[]) => void; saving: boolean }) {
  const [localActivities, setLocalActivities] = useState(activities);

  const updateActivity = (idx: number, field: string, value: any) => {
    setLocalActivities((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const updateActivityImage = (activityIdx: number, imageIdx: number, value: string) => {
    setLocalActivities((prev: any) => {
      const updated = [...prev];
      const newImages = [...(updated[activityIdx].images || [])];
      while (newImages.length <= imageIdx) {
        newImages.push("");
      }
      newImages[imageIdx] = value;
      updated[activityIdx] = { ...updated[activityIdx], images: newImages };
      return updated;
    });
  };

  const addActivity = () => {
    setLocalActivities([...localActivities, { title: "", description: "", images: ["", "", ""] }]);
  };

  const removeActivity = (idx: number) => {
    setLocalActivities(localActivities.filter((_: any, i: number) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {localActivities.map((activity, idx) => (
        <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-playfair font-black text-primary">Activity {idx + 1}: {activity.title || "New Activity"}</h4>
            <button onClick={() => removeActivity(idx)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-all cursor-pointer"><Trash2 size={18} /></button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <InputField label="Title" value={activity.title} onChange={(v) => updateActivity(idx, "title", v)} />
            <TextareaField label="Description" value={activity.description} onChange={(v) => updateActivity(idx, "description", v)} />

            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-4 border-b border-gray-100 pb-2">Activity Images (Exactly 3 required for slider)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((imgIdx) => (
                  <ImageUpload
                    key={imgIdx}
                    label={`Image ${imgIdx + 1}`}
                    value={(activity.images || [])[imgIdx] || ""}
                    onChange={(v) => updateActivityImage(idx, imgIdx, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addActivity} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Activity
        </button>
        <button onClick={() => onSave(localActivities)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Activities"}
        </button>
      </div>
    </div>
  );
}

// ─── Academics Journey Editor ───
function AcademicsJourneyEditor({ journey, onSave, saving }: { journey: any; onSave: (j: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(journey || {
    title: "A Journey of Excellence in Education",
    subtitle: "M. G. School Journey so far… milestones in last 6 decades:",
    paragraphs: [],
    milestones: []
  });

  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  const addMilestone = () => update("milestones", [...(local.milestones || []), { year: "", achievement: "" }]);
  const removeMilestone = (idx: number) => update("milestones", (local.milestones || []).filter((_: any, i: number) => i !== idx));
  const updateMilestone = (idx: number, field: string, val: string) => {
    const updated = [...(local.milestones || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    update("milestones", updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6 border-b border-gray-50 pb-4">Journey Content</h4>
        <div className="grid grid-cols-1 gap-6">
          <InputField label="Title" value={local.title} onChange={(v: string) => update("title", v)} />
          <InputField label="Milestones Subtitle" value={local.subtitle} onChange={(v: string) => update("subtitle", v)} />
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Paragraphs (Separate with | character)</label>
            <textarea
              value={(local.paragraphs || []).join(" | ")}
              onChange={(e) => update("paragraphs", e.target.value.split("|").map(s => s.trim()).filter(Boolean))}
              rows={8}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
          <h4 className="text-lg font-playfair font-black text-primary">Milestones (Timeline)</h4>
          <button onClick={addMilestone} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-all cursor-pointer">
            <Plus size={14} /> Add Milestone
          </button>
        </div>
        <div className="space-y-4">
          {(local.milestones || []).map((ms: any, idx: number) => (
            <div key={idx} className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-gray-100">
              <div className="w-24">
                <InputField label="Year" value={ms.year} onChange={(v: string) => updateMilestone(idx, "year", v)} />
              </div>
              <div className="flex-1">
                <InputField label="Achievement" value={ms.achievement} onChange={(v: string) => updateMilestone(idx, "achievement", v)} />
              </div>
              <button onClick={() => removeMilestone(idx)} className="p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all cursor-pointer mt-5">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button onClick={() => onSave(local)} disabled={saving}
          className="flex items-center gap-2 px-12 py-4 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-xl">
          <Save size={18} /> {saving ? "Saving..." : "Save Journey Content"}
        </button>
      </div>
    </div>
  );
}

function AcademicsTeacherDutiesEditor({ teacherDuties, onSave, saving }: { teacherDuties: any[]; onSave: (d: any[]) => void; saving: boolean }) {
  const [localDuties, setLocalDuties] = useState(teacherDuties);

  const updateDuty = (idx: number, field: string, value: any) => {
    setLocalDuties((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addDuty = () => {
    setLocalDuties([...localDuties, { category: "", duty: "", teachers: "", description: "" }]);
  };

  const removeDuty = (idx: number) => {
    setLocalDuties(localDuties.filter((_: any, i: number) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {localDuties.map((duty: any, idx: number) => (
        <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-playfair font-black text-primary">Duty {idx + 1}: {duty.duty || "New Duty"}</h4>
            <button onClick={() => removeDuty(idx)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-all cursor-pointer"><Trash2 size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Category" value={duty.category} onChange={(v) => updateDuty(idx, "category", v)} />
            <InputField label="Duty" value={duty.duty} onChange={(v) => updateDuty(idx, "duty", v)} />
            <InputField label="Teachers" value={duty.teachers} onChange={(v) => updateDuty(idx, "teachers", v)} />
            <ImageUpload label="Teacher Photo" value={duty.image} onChange={(v) => updateDuty(idx, "image", v)} compact={true} contain={true} />
            <div className="md:col-span-2">
              <TextareaField label="Description" value={duty.description} onChange={(v) => updateDuty(idx, "description", v)} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addDuty} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Duty
        </button>
        <button onClick={() => onSave(localDuties)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Teacher Duties"}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// BRANCHES TAB - Edit Hero, Branches List
// ════════════════════════════════════════
const defaultBranchesContent = {
  hero: {
    heading: "Distributed ",
    headingHighlight: "Excellence.",
    description: "Three distinct campuses, one unified vision of nurturing tomorrow's leaders.",
  },
  branchesList: [
    {
      id: "block-a",
      name: "Block A",
      subtitle: "The Foundation Campus",
      grades: "Std 1–8",
      medium: "Gujarati Medium",
      location: "East Campus, MG Road",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80",
    },
    {
      id: "block-b",
      name: "Block B",
      subtitle: "The Academic Center",
      grades: "Std 9–12",
      medium: "Gujarati Medium",
      location: "West Campus, Scholars Lane",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80",
    },
    {
      id: "block-c",
      name: "Block C",
      subtitle: "The International Hub",
      grades: "Std 1–12",
      medium: "English & Gujarati Medium",
      location: "Central Hub, Education Square",
      image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80",
    },
  ],
  blockA: {
    name: "Block A",
    subtitle: "The Foundation Campus",
    grades: "Std 1–8",
    medium: "Gujarati Medium",
    description: "Our vibrant foundation hub focuses on building character and core academic skills through activity-based learning in our native tongue.",
    images: ["https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80"],
    location: "East Campus, MG Road",
    principal: "Dr. Rajesh Shah",
    specialties: ["Smart Classrooms", "Vedic Math", "Moral Education", "Vibrant Playgrounds"],
  },
  blockB: {
    name: "Block B",
    subtitle: "The Academic Center",
    grades: "Std 9–12",
    medium: "Gujarati Medium",
    description: "A focused academic environment designed for rigorous board preparation and career readiness.",
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80"],
    location: "West Campus, Scholars Lane",
    principal: "Mrs. Anjali Desai",
    specialties: ["Science Labs", "Career Counseling", "Digital Library", "Sports Complex"],
  },
  blockC: {
    name: "Block C",
    subtitle: "The International Hub",
    grades: "Std 1–12",
    medium: "English & Gujarati Medium",
    description: "A modern facility blending state-board rigor with international perspectives and dual-medium instruction.",
    images: ["https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80"],
    location: "Central Hub, Education Square",
    principal: "Mr. Vikram Mehta",
    specialties: ["Robotics Lab", "Foreign Languages", "Global Exchange", "Performing Arts"],
  }
};

function BuildingsTab() {
  const [content, setContent] = useState<any>(defaultBranchesContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("status");

  useEffect(() => {
    axiosInstance.get("/api/branches-content")
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
      const res = await axiosInstance.put("/api/branches-content", { section, ...data });
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
    { id: "status", name: "Current Status", icon: LayoutDashboard },
    { id: "hero", name: "Hero Section", icon: ImageIcon },
    { id: "branches", name: "Buildings List", icon: Building2 },
    { id: "blockA", name: "Block A Content", icon: Building2 },
    { id: "blockB", name: "Block B Content", icon: Building2 },
    { id: "blockC", name: "Block C Content", icon: Building2 },
  ];

  const currentBranches = content.branchesList || defaultBranchesContent.branchesList || [];
  const currentHero = content.hero || defaultBranchesContent.hero;
  const currentBlockA = content.blockA || defaultBranchesContent.blockA;
  const currentBlockB = content.blockB || defaultBranchesContent.blockB;
  const currentBlockC = content.blockC || defaultBranchesContent.blockC;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {sections.map((s) => {
          const Icon = s.icon as any;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
                }`}
            >
              <Icon size={18} /> {s.name}
            </button>
          );
        })}
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to reset all Building content to defaults? This cannot be undone.")) {
              await axiosInstance.delete("/api/branches-content");
              window.location.reload();
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all cursor-pointer ml-auto"
        >
          <Trash2 size={18} /> Reset All
        </button>
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </motion.div>
      )}

      {activeSection === "status" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm col-span-full">
            <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-4">Hero Summary</h4>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <p className="text-xl font-playfair font-black text-primary">{currentHero.heading} {currentHero.headingHighlight}</p>
                <p className="text-sm text-gray-500 mt-2 italic">"{currentHero.description}"</p>
              </div>
              <button onClick={() => setActiveSection("hero")} className="px-6 py-2 rounded-xl bg-primary/5 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">Edit Hero</button>
            </div>
          </div>

          {[
            { key: "blockA", data: currentBlockA, title: "Block A" },
            { key: "blockB", data: currentBlockB, title: "Block B" },
            { key: "blockC", data: currentBlockC, title: "Block C" }
          ].map((block) => (
            <div key={block.key} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-black text-primary">{block.title}</h4>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Live</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Principal:</span>
                  <span className="text-primary truncate ml-2">{block.data.principal}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Medium:</span>
                  <span className="text-primary">{block.data.medium}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Grades:</span>
                  <span className="text-primary">{block.data.grades}</span>
                </div>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => setActiveSection(block.key)}
                  className="w-full py-2.5 rounded-xl bg-gray-50 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all"
                >
                  Edit Block Data
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm col-span-full">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-secondary uppercase tracking-widest">Buildings Overview List ({currentBranches.length})</h4>
              <button onClick={() => setActiveSection("branches")} className="text-xs font-bold text-primary hover:underline">Edit List</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentBranches.map((b: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-primary/10 transition-all">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                    {b.image ? <img src={b.image} className="w-full h-full object-cover" /> : <Building2 className="w-full h-full p-3 text-gray-400" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-primary truncate">{b.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{b.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === "hero" && content && (
        <BuildingsHeroEditor
          hero={content.hero || defaultBranchesContent.hero}
          onSave={(hero: any) => saveSection("hero", { hero })}
          saving={saving === "hero"}
        />
      )}

      {activeSection === "branches" && content && (
        <BuildingsListEditor
          branches={content.branchesList || []}
          onSave={(branchesList: any[]) => saveSection("branches", { branchesList })}
          saving={saving === "branches"}
        />
      )}

      {["blockA", "blockB", "blockC"].includes(activeSection) && content && (
        <BlockContentEditor
          key={activeSection}
          blockName={activeSection}
          blockData={content[activeSection] || defaultBranchesContent[activeSection as keyof typeof defaultBranchesContent]}
          onSave={(blockContent: any) => saveSection(activeSection, { blockContent })}
          saving={saving === activeSection}
        />
      )}
    </div>
  );
}

function BuildingsHeroEditor({ hero, onSave, saving }: { hero: any; onSave: (h: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(hero);
  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  useEffect(() => {
    const handleGlobalSave = () => onSave(local);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [local, onSave]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Buildings: Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading Prefix" value={local.heading} onChange={(v) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v) => update("headingHighlight", v)} />
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

function BuildingsListEditor({ branches, onSave, saving }: { branches: any[]; onSave: (b: any[]) => void; saving: boolean }) {
  const [localBranches, setLocalBranches] = useState(branches);

  const updateBranch = (idx: number, field: string, value: any) => {
    setLocalBranches((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addBranch = () => {
    setLocalBranches([...localBranches, { id: "", name: "", subtitle: "", grades: "", medium: "", location: "", image: "" }]);
  };

  const removeBranch = (idx: number) => {
    setLocalBranches(localBranches.filter((_: any, i: number) => i !== idx));
  };

  useEffect(() => {
    const handleGlobalSave = () => onSave(localBranches);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [localBranches, onSave]);

  return (
    <div className="space-y-6">
      {localBranches.map((branch, idx) => (
        <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-playfair font-black text-primary">Building {idx + 1}: {branch.name || "New Building"}</h4>
            <button onClick={() => removeBranch(idx)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-all cursor-pointer"><Trash2 size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="URL ID (e.g. block-a)" value={branch.id} onChange={(v) => updateBranch(idx, "id", v)} />
            <InputField label="Name (e.g. Block A)" value={branch.name} onChange={(v) => updateBranch(idx, "name", v)} />
            <InputField label="Subtitle" value={branch.subtitle} onChange={(v) => updateBranch(idx, "subtitle", v)} />
            <InputField label="Grades (e.g. Std 1-8)" value={branch.grades} onChange={(v) => updateBranch(idx, "grades", v)} />
            <InputField label="Medium (e.g. Gujarati Medium)" value={branch.medium} onChange={(v) => updateBranch(idx, "medium", v)} />
            <InputField label="Location" value={branch.location} onChange={(v) => updateBranch(idx, "location", v)} />
            <div className="md:col-span-2">
              <ImageUpload label="Branch Image" value={branch.image} onChange={(v) => updateBranch(idx, "image", v)} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addBranch} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Building
        </button>
        <button onClick={() => onSave(localBranches)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Buildings"}
        </button>
      </div>
    </div>
  );
}

function BlockContentEditor({ blockName, blockData, onSave, saving }: { blockName: string; blockData: any; onSave: (b: any) => void; saving: boolean }) {
  const [local, setLocal] = useState(blockData);

  const update = (field: string, value: any) => setLocal((prev: any) => ({ ...prev, [field]: value }));

  const addImage = (url: string) => {
    update("images", [...(local.images || []), url]);
  };

  const removeImage = (idx: number) => {
    update("images", (local.images || []).filter((_: any, i: number) => i !== idx));
  };

  const addFaculty = () => {
    update("faculty", [...(local.faculty || []), { image: "", name: "", role: "", education: "", subject: "" }]);
  };

  const updateFaculty = (idx: number, field: string, value: any) => {
    const updatedFaculty = [...(local.faculty || [])];
    updatedFaculty[idx] = { ...updatedFaculty[idx], [field]: value };
    update("faculty", updatedFaculty);
  };

  const removeFaculty = (idx: number) => {
    update("faculty", (local.faculty || []).filter((_: any, i: number) => i !== idx));
  };

  useEffect(() => {
    const handleGlobalSave = () => onSave(local);
    window.addEventListener("admin-global-save", handleGlobalSave);
    return () => window.removeEventListener("admin-global-save", handleGlobalSave);
  }, [local, onSave]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Edit {blockName.replace("block", "Block ")} Content</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Name (e.g. Block A)" value={local.name} onChange={(v) => update("name", v)} />
          <InputField label="Subtitle" value={local.subtitle} onChange={(v) => update("subtitle", v)} />
          <InputField label="Grades (e.g. Std 1-8)" value={local.grades} onChange={(v) => update("grades", v)} />
          <InputField label="Medium (e.g. Gujarati Medium)" value={local.medium} onChange={(v) => update("medium", v)} />
          <InputField label="Location" value={local.location} onChange={(v) => update("location", v)} />
          <InputField label="Principal / Head" value={local.principal || ""} onChange={(v) => update("principal", v)} />
          <div className="md:col-span-2">
            <InputField label="Specialties (comma-separated)" value={local.specialties ? local.specialties.join(", ") : ""} onChange={(v) => update("specialties", v.split(",").map((s: string) => s.trim()).filter(Boolean))} />
          </div>
          <div className="md:col-span-2">
            <TextareaField label="Description" value={local.description || ""} onChange={(v) => update("description", v)} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Image Sliders</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {(local.images || []).map((img: string, idx: number) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video border border-gray-200">
                  <img src={img} alt="slide" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <ImageUpload label="Add New Slide" value="" onChange={addImage} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-playfair font-black text-primary">Faculty Section</h4>
          <button onClick={addFaculty} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer">
            <Plus size={14} /> Add Faculty
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(local.faculty || []).map((member: any, idx: number) => (
            <div key={idx} className="p-5 border border-gray-100 rounded-3xl bg-gray-50 relative flex flex-col sm:flex-row gap-5">
              <button onClick={() => removeFaculty(idx)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-100 rounded-lg transition-all cursor-pointer z-10"><Trash2 size={14} /></button>

              {/* Image Column */}
              <div className="w-full sm:w-28 shrink-0">
                <ImageUpload
                  label="Photo"
                  value={member.image}
                  onChange={(v) => updateFaculty(idx, "image", v)}
                  contain={true}
                  compact={true}
                />
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-3">
                <InputField label="Name" value={member.name} onChange={(v) => updateFaculty(idx, "name", v)} />
                <InputField label="Role" value={member.role} onChange={(v) => updateFaculty(idx, "role", v)} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Education" value={member.education} onChange={(v) => updateFaculty(idx, "education", v)} />
                  <InputField label="Subject" value={member.subject} onChange={(v) => updateFaculty(idx, "subject", v)} />
                </div>
              </div>
            </div>
          ))}
          {(!local.faculty || local.faculty.length === 0) && (
            <p className="text-sm text-gray-400 text-center py-4 lg:col-span-2">No faculty members added yet.</p>
          )}
        </div>
      </div>

      <button onClick={() => onSave(local)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Block"}
      </button>
    </div>
  );
}

// ════════════════════════════════════════
// FACULTY TAB - Edit Hero, Faculty Members
// ════════════════════════════════════════
const defaultFacultyContent = {
  hero: {
    heading: "Inspiring ",
    headingHighlight: "Mentors.",
    description: "Meet the dedicated educators who are shaping the future of our students with passion and expertise.",
    slides: [],
  },
  facultyMembers: [
    {
      name: "Dr. Rajesh Shah",
      designation: "Principal",
      expertise: "Educational Leadership",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80",
      block: "Block A",
      experience: "20+ Years",
      education: "Ph.D. in Education",
    }
  ],
};

function FacultyTab() {
  const [content, setContent] = useState<any>(defaultFacultyContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    axiosInstance.get("/api/faculty-content")
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
      const res = await axiosInstance.put("/api/faculty-content", { section, ...data });
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
    { id: "members", name: "Faculty Members", icon: Users },
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
                }`}
            >
              <Icon size={18} /> {s.name}
            </button>
          );
        })}
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to reset all Faculty content to defaults? This cannot be undone.")) {
              await axiosInstance.delete("/api/faculty-content");
              window.location.reload();
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all cursor-pointer ml-auto"
        >
          <Trash2 size={18} /> Reset All
        </button>
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </motion.div>
      )}

      {activeSection === "hero" && content && (
        <FacultyHeroEditor
          hero={content.hero || defaultFacultyContent.hero}
          onSave={(hero: any) => saveSection("hero", { hero })}
          saving={saving === "hero"}
        />
      )}

      {activeSection === "members" && content && (
        <FacultyMembersEditor
          members={content.facultyMembers || []}
          onSave={(facultyMembers: any[]) => saveSection("members", { facultyMembers })}
          saving={saving === "members"}
        />
      )}
    </div>
  );
}

function FacultyHeroEditor({ hero, onSave, saving }: { hero: any; onSave: (h: any) => void; saving: boolean }) {
  const [local, setLocal] = useState({
    ...hero,
    slides: hero.slides || []
  });

  const update = (field: string, value: any) => setLocal({ ...local, [field]: value });

  const addSlide = () => {
    const updatedSlides = [...(local.slides || []), { image: "", name: "", role: "", description: "" }];
    update("slides", updatedSlides);
  };

  const removeSlide = (idx: number) => {
    const updatedSlides = (local.slides || []).filter((_: any, i: number) => i !== idx);
    update("slides", updatedSlides);
  };

  const updateSlide = (idx: number, field: string, value: string) => {
    const updatedSlides = [...(local.slides || [])];
    updatedSlides[idx] = { ...updatedSlides[idx], [field]: value };
    update("slides", updatedSlides);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Faculty: Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading" value={local.heading} onChange={(v) => update("heading", v)} />
          <InputField label="Heading Highlight" value={local.headingHighlight} onChange={(v) => update("headingHighlight", v)} />
          <div className="md:col-span-2">
            <TextareaField label="Global Description" value={local.description} onChange={(v) => update("description", v)} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
          <h4 className="text-lg font-playfair font-black text-primary">Hero Slider Slides</h4>
          <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-xl text-xs font-bold hover:bg-secondary hover:text-white transition-all cursor-pointer">
            <Plus size={14} /> Add Slide
          </button>
        </div>

        <div className="space-y-10">
          {(local.slides || []).map((slide: any, idx: number) => (
            <div key={idx} className="p-6 border border-gray-100 rounded-3xl bg-slate-50 relative group">
              <button onClick={() => removeSlide(idx)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
              <h5 className="font-bold text-gray-400 mb-6 uppercase text-[10px] tracking-widest">Slide {idx + 1}</h5>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4">
                  <ImageUpload label="Mentor Photo" value={slide.image} onChange={(v) => updateSlide(idx, "image", v)} compact={true} contain={true} />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Name" value={slide.name} onChange={(v) => updateSlide(idx, "name", v)} />
                    <InputField label="Role / Subject" value={slide.role} onChange={(v) => updateSlide(idx, "role", v)} />
                  </div>
                  <TextareaField label="Slide Description / Quote" value={slide.description} onChange={(v) => updateSlide(idx, "description", v)} />
                </div>
              </div>
            </div>
          ))}
          {(!local.slides || local.slides.length === 0) && (
            <div className="text-center py-10 text-gray-400 italic">No slides added. Add a slide to start building the hero slider.</div>
          )}
        </div>
      </div>
      <button onClick={() => onSave(local)} disabled={saving}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
        <Save size={18} /> {saving ? "Saving..." : "Save Hero"}
      </button>
    </div>
  );
}

function FacultyMembersEditor({ members, onSave, saving }: { members: any[]; onSave: (m: any[]) => void; saving: boolean }) {
  const [localMembers, setLocalMembers] = useState(members);
  const [filter, setFilter] = useState("All");

  const updateMember = (idx: number, field: string, value: any) => {
    setLocalMembers((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addMember = () => {
    setLocalMembers([...localMembers, {
      name: "",
      designation: "",
      expertise: "",
      image: "",
      block: filter === "All" ? "Block A" : filter,
      experience: "",
      education: ""
    }]);
  };

  const removeMember = (idx: number) => {
    setLocalMembers(localMembers.filter((_: any, i: number) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Filter by Block:</span>
        {["All", "Block A", "Block B", "Block C"].map((b) => (
          <button
            key={b}
            onClick={() => setFilter(b)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${filter === b ? "bg-secondary text-primary shadow-md" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {localMembers.map((member, idx) => {
          if (filter !== "All" && member.block !== filter) return null;
          return (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative flex flex-col sm:flex-row gap-5 animate-in fade-in zoom-in-95 duration-300">
              <button onClick={() => removeMember(idx)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all cursor-pointer z-10"><Trash2 size={14} /></button>

              {/* Image Column */}
              <div className="w-full sm:w-28 shrink-0">
                <ImageUpload
                  label="Photo"
                  value={member.image}
                  onChange={(v) => updateMember(idx, "image", v)}
                  contain={true}
                  compact={true}
                />
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-3">
                <InputField label="Full Name" value={member.name} onChange={(v) => updateMember(idx, "name", v)} />
                <InputField label="Designation" value={member.designation} onChange={(v) => updateMember(idx, "designation", v)} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Expertise" value={member.expertise} onChange={(v) => updateMember(idx, "expertise", v)} />
                  <InputField label="Education" value={member.education} onChange={(v) => updateMember(idx, "education", v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Experience" value={member.experience} onChange={(v) => updateMember(idx, "experience", v)} />
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-black text-gray-400">Block</label>
                    <select
                      value={member.block}
                      onChange={(e) => updateMember(idx, "block", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Block A">Block A</option>
                      <option value="Block B">Block B</option>
                      <option value="Block C">Block C</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4">
        <button onClick={addMember} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
          <Plus size={18} /> Add Faculty Member
        </button>
        <button onClick={() => onSave(localMembers)} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg">
          <Save size={18} /> {saving ? "Saving..." : "Save Members"}
        </button>
      </div>
    </div>
  );
}


function LifeAtMGTab() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    axiosInstance.get("/api/life-at-mg")
      .then((res) => {
        if (res.data.success) {
          setContent(res.data.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveSection = async (section: string, data: any) => {
    setSaving(section);
    setMessage("");
    try {
      const res = await axiosInstance.put("/api/life-at-mg", { section, ...data });
      if (res.data.success) {
        setContent(res.data.content);
        setMessage("Saved successfully!");
      } else {
        setMessage("Error: " + res.data.error);
      }
    } catch {
      setMessage("Failed to save.");
    }
    setSaving("");
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const sections = [
    { id: "hero", name: "Hero Section", icon: ImageIcon },
    { id: "slider", name: "Image/Video Slider", icon: ImageIcon },
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${activeSection === s.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:border-primary/20"
                }`}
            >
              <Icon size={18} /> {s.name}
            </button>
          );
        })}
        <button
          onClick={async () => {
            if (confirm("Reset Life@MG content to defaults?")) {
              await axiosInstance.delete("/api/life-at-mg");
              window.location.reload();
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all cursor-pointer ml-auto"
        >
          <Trash2 size={18} /> Reset
        </button>
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`px-6 py-3 rounded-2xl text-sm font-bold ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </motion.div>
      )}

      {activeSection === "hero" && content && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h4 className="text-lg font-playfair font-black text-primary mb-6">Life@MG: Hero Section</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Heading" value={content.hero.heading} onChange={(v) => setContent((prev: any) => ({ ...prev, hero: { ...prev.hero, heading: v } }))} />
              <div className="md:col-span-2">
                <ImageUpload label="Hero Image" value={content.hero.image} onChange={(v) => setContent((prev: any) => ({ ...prev, hero: { ...prev.hero, image: v } }))} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Description (Small Text)</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-primary/30 focus:bg-white transition-all h-32"
                  value={content.hero.description}
                  onChange={(e) => setContent((prev: any) => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                />
              </div>
            </div>
          </div>
          <button onClick={() => saveSection("hero", { hero: content.hero })} disabled={saving === "hero"}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Save size={18} /> {saving === "hero" ? "Saving..." : "Save Hero"}
          </button>
        </div>
      )}

      {activeSection === "slider" && content && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
              <div>
                <h4 className="text-lg font-playfair font-black text-primary">Life@MG: Image/Video Slider</h4>
                <p className="text-xs text-gray-400 mt-1">Add images or videos to the main experience slider.</p>
              </div>
              <button
                onClick={() => setContent((prev: any) => ({ ...prev, slider: [...(content.slider || []), { url: "", type: "image", title: "" }] }))}
                className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Slide
              </button>
            </div>

            <div className="space-y-8">
              {(content.slider || []).map((slide: any, idx: number) => (
                <div key={idx} className="p-6 border border-gray-100 rounded-3xl bg-gray-50 relative group">
                  <button
                    onClick={() => setContent((prev: any) => ({ ...prev, slider: prev.slider.filter((_: any, i: number) => i !== idx) }))}
                    className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <InputField label="Slide Title (Optional)" value={slide.title || ""} onChange={(v) => {
                        const updated = [...content.slider];
                        updated[idx] = { ...updated[idx], title: v };
                        setContent((prev: any) => ({ ...prev, slider: updated }));
                      }} />
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Content Type</label>
                        <div className="flex gap-2">
                          {["image", "video"].map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                const updated = [...content.slider];
                                updated[idx] = { ...updated[idx], type: type as "image" | "video", url: "" };
                                setContent((prev: any) => ({ ...prev, slider: updated }));
                              }}
                              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${slide.type === type ? "bg-primary text-white" : "bg-white text-gray-400 border border-gray-100"}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {slide.type === "video" ? (
                        <VideoUpload
                          label="Slide Video"
                          value={slide.url}
                          onChange={(v) => {
                            const updated = [...content.slider];
                            updated[idx] = { ...updated[idx], url: v };
                            setContent((prev: any) => ({ ...prev, slider: updated }));
                          }}
                        />
                      ) : (
                        <ImageUpload
                          label="Slide Image"
                          value={slide.url}
                          onChange={(v) => {
                            const updated = [...content.slider];
                            updated[idx] = { ...updated[idx], url: v };
                            setContent((prev: any) => ({ ...prev, slider: updated }));
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(!content.slider || content.slider.length === 0) && (
                <div className="text-center py-10 text-gray-400 italic">No slides added yet. Click "Add Slide" to begin.</div>
              )}
            </div>
          </div>
          <button onClick={() => saveSection("slider", { slider: content.slider })} disabled={saving === "slider"}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Save size={18} /> {saving === "slider" ? "Saving..." : "Save Slider"}
          </button>
        </div>
      )}
    </div>
  );
}


function EventsTab() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    const res = await axiosInstance.get("/api/events");
    if (res.data.success) setEvents(res.data.events);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const saveEvent = async (event: any) => {
    setSaving(event._id || "new");
    try {
      const res = event._id
        ? await axiosInstance.put("/api/events", event)
        : await axiosInstance.post("/api/events", event);
      if (res.data.success) {
        setMessage("Event saved!");
        fetchEvents();
      } else {
        setMessage("Error: " + res.data.error);
      }
    } catch { setMessage("Error saving event"); }
    setSaving("");
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete event?")) return;
    try {
      const res = await axiosInstance.delete(`/api/events?id=${id}`);
      if (res.data.success) {
        setEvents(events.filter(e => e._id !== id));
      }
    } catch { alert("Error deleting event"); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-playfair font-black text-primary">School Events</h3>
        <button
          onClick={() => setEvents([{ title: "New Event", date: new Date().toISOString(), location: "Campus", time: "", branch: "All", description: "", image: "", category: "Upcoming" }, ...events])}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary text-primary font-bold text-sm shadow-lg"
        >
          <Plus size={18} /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 hover:shadow-md transition-all overflow-hidden">
            <div className="lg:col-span-1 min-w-0">
              <ImageUpload label="Event Banner" value={event.image} onChange={(v) => {
                setEvents((prev: any) => {
                  const updated = [...prev];
                  updated[idx] = { ...updated[idx], image: v };
                  return updated;
                });
              }} />
            </div>
            <div className="lg:col-span-2 min-w-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Title" value={event.title} onChange={(v) => {
                  setEvents((prev: any) => {
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], title: v };
                    return updated;
                  });
                }} />
                <InputField label="Date" type="date" value={event.date?.split('T')[0]} onChange={(v) => {
                  setEvents((prev: any) => {
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], date: v };
                    return updated;
                  });
                }} />
                <InputField label="Location" value={event.location} onChange={(v) => {
                  setEvents((prev: any) => {
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], location: v };
                    return updated;
                  });
                }} />
                <InputField label="Time (e.g. 10:00 AM)" value={event.time} onChange={(v) => {
                  const updated = [...events];
                  updated[idx].time = v;
                  setEvents(updated);
                }} />
                <InputField label="Category" value={event.category} onChange={(v) => {
                  setEvents((prev: any) => {
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], category: v };
                    return updated;
                  });
                }} />
                <InputField label="Branch/Block" value={event.branch} onChange={(v) => {
                  const updated = [...events];
                  updated[idx].branch = v;
                  setEvents(updated);
                }} />
              </div>
              <TextareaField label="Description" value={event.description} onChange={(v) => {
                setEvents((prev: any) => {
                  const updated = [...prev];
                  updated[idx] = { ...updated[idx], description: v };
                  return updated;
                });
              }} />
              <div className="flex gap-4 pt-4">
                <button onClick={() => saveEvent(event)} disabled={saving === (event._id || "new")}
                  className="flex-1 bg-primary text-white py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg">
                  {saving === (event._id || "new") ? "Saving..." : "Persist Event"}
                </button>
                <button onClick={() => deleteEvent(event._id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ════════════════════════════════════════
// ENROLLMENT TAB
// ════════════════════════════════════════
function EnrollmentTab() {
  const [activeSection, setActiveSection] = useState("fields");
  const [config, setConfig] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [configRes, subRes] = await Promise.all([
        axiosInstance.get("/api/enrollment-config"),
        axiosInstance.get("/api/enrollment-submissions")
      ]);
      if (configRes.data.success) setConfig(configRes.data.config);
      if (subRes.data.success) setSubmissions(subRes.data.submissions);
    } catch (e) { }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveConfig = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await axiosInstance.put("/api/enrollment-config", config);
      if (res.data.success) {
        setConfig(res.data.config);
        setMessage("Saved successfully!");
      } else setMessage("Error saving.");
    } catch {
      setMessage("Failed to save.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <div className="py-32 flex justify-center"><div className="w-8 h-8 animate-spin border-3 border-primary/30 border-t-primary rounded-full" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex gap-3">
        <button onClick={() => setActiveSection("fields")} className={`px-6 py-3 rounded-2xl text-sm font-bold ${activeSection === "fields" ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-100"}`}>Form Builder</button>
        <button onClick={() => setActiveSection("submissions")} className={`px-6 py-3 rounded-2xl text-sm font-bold ${activeSection === "submissions" ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-100"}`}>Submissions ({submissions.length})</button>
      </div>

      {message && <div className="px-6 py-3 rounded-2xl text-sm font-bold bg-emerald-50 text-emerald-600">{message}</div>}

      {activeSection === "fields" && config && (
        <EnrollmentFormBuilder config={config} setConfig={setConfig} onSave={saveConfig} saving={saving} />
      )}

      {activeSection === "submissions" && (
        <EnrollmentSubmissionsList submissions={submissions} />
      )}
    </div>
  );
}

function EnrollmentFormBuilder({ config, setConfig, onSave, saving }: any) {
  const addField = () => {
    setConfig({ ...config, fields: [...config.fields, { id: "field_" + Date.now(), label: "New Field", type: "text", required: false, options: [] }] });
  };
  const updateField = (idx: number, key: string, val: any) => {
    const newFields = [...config.fields];
    newFields[idx] = { ...newFields[idx], [key]: val };
    setConfig({ ...config, fields: newFields });
  };
  const removeField = (idx: number) => {
    setConfig({ ...config, fields: config.fields.filter((_: any, i: number) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h4 className="text-lg font-playfair font-black text-primary mb-6">Form Details</h4>
        <div className="grid grid-cols-1 gap-6">
          <InputField label="Form Title" value={config.title} onChange={(v) => setConfig({ ...config, title: v })} />
          <TextareaField label="Description" value={config.description} onChange={(v) => setConfig({ ...config, description: v })} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-playfair font-black text-primary">Dynamic Fields</h4>
          <button onClick={addField} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-2"><Plus size={14} /> Add Field</button>
        </div>

        <div className="space-y-4">
          {config.fields.map((field: any, idx: number) => (
            <div key={idx} className="p-4 border border-gray-100 rounded-2xl bg-gray-50 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <InputField label="Field Label" value={field.label} onChange={(v) => updateField(idx, "label", v)} />
                <InputField label="Field ID (unique)" value={field.id} onChange={(v) => updateField(idx, "id", v.replace(/\s+/g, "_").toLowerCase())} />
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Type</label>
                  <select value={field.type} onChange={(e) => updateField(idx, "type", e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700">
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Long Text</option>
                    <option value="select">Dropdown</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <input type="checkbox" id={`req-${idx}`} checked={field.required} onChange={(e) => updateField(idx, "required", e.target.checked)} className="w-4 h-4 text-primary" />
                  <label htmlFor={`req-${idx}`} className="text-sm font-bold text-gray-600">Required</label>
                </div>
              </div>
              {field.type === "select" && (
                <div className="w-full md:w-1/3">
                  <InputField label="Options (comma separated)" value={(field.options || []).join(", ")} onChange={(v) => updateField(idx, "options", v.split(",").map((s: string) => s.trim()).filter(Boolean))} />
                </div>
              )}
              <button onClick={() => removeField(idx)} className="p-2 text-red-400 hover:bg-red-100 rounded-xl mt-6"><Trash2 size={16} /></button>
            </div>
          ))}
          {config.fields.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No fields added yet.</p>}
        </div>
      </div>

      <button onClick={onSave} disabled={saving} className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all cursor-pointer">
        <Save size={18} /> {saving ? "Saving..." : "Save Form Config"}
      </button>
    </div>
  );
}

function EnrollmentSubmissionsList({ submissions }: { submissions: any[] }) {
  if (submissions.length === 0) return <div className="text-center py-12 text-gray-500">No submissions yet.</div>;
  return (
    <div className="space-y-4">
      {submissions.map((sub: any) => (
        <div key={sub._id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(sub.data).map(([key, val]: any) => (
              <div key={key}>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{key}</p>
                <p className="text-sm font-medium text-gray-800">{val || "-"}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between items-end border-l border-gray-100 pl-6">
            <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full mb-2">{new Date(sub.createdAt).toLocaleDateString()}</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${sub.status === "Pending" ? "bg-yellow-50 text-yellow-600" : "bg-emerald-50 text-emerald-600"}`}>{sub.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}



// ─── About Principal Messages Editor ───
function AboutPrincipalMessagesEditor({ principalMessages, onSave, saving }: { principalMessages: any[]; onSave: (p: any[]) => void; saving: boolean }) {
  const [local, setLocal] = useState<any[]>(principalMessages || []);

  const addMessage = () => {
    setLocal([...local, {
      heading: "New Message",
      message: "",
      name: "",
      qualifications: "",
      designation: "",
      image: ""
    }]);
  };

  const removeMessage = (idx: number) => {
    if (confirm("Remove this message?")) {
      const updated = local.filter((_, i) => i !== idx);
      setLocal(updated);
    }
  };

  const updateMessage = (idx: number, field: string, value: any) => {
    const updated = [...local];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocal(updated);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const updated = [...local];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    setLocal(updated);
  };

  const moveDown = (idx: number) => {
    if (idx === local.length - 1) return;
    const updated = [...local];
    [updated[idx + 1], updated[idx]] = [updated[idx], updated[idx + 1]];
    setLocal(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-playfair font-black text-primary">Principal Messages</h4>
        <button
          onClick={addMessage}
          className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-xl text-xs font-bold hover:bg-secondary hover:text-white transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Another Message
        </button>
      </div>

      <div className="space-y-12">
        {local.map((msg, idx) => (
          <div key={idx} className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden relative group">
            {/* Reorder & Remove buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all cursor-pointer disabled:opacity-20"
                title="Move Up"
              >
                <ChevronUp size={20} />
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === local.length - 1}
                className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all cursor-pointer disabled:opacity-20"
                title="Move Down"
              >
                <ChevronDown size={20} />
              </button>
              <div className="w-px h-4 bg-gray-100 mx-1" />
              <button
                onClick={() => removeMessage(idx)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                title="Remove Message"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="relative">
              <h5 className="text-xl font-playfair font-black text-primary mb-10 border-b border-gray-50 pb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <MessageSquare size={20} />
                </div>
                Message #{idx + 1}
              </h5>

              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="w-full lg:w-80 shrink-0 min-w-0">
                  <ImageUpload
                    label="Official Portrait"
                    value={msg.image}
                    onChange={(v: string) => updateMessage(idx, "image", v)}
                    contain={true}
                    compact={true}
                  />
                </div>

                <div className="flex-1 w-full min-w-0 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="md:col-span-2">
                      <InputField label="Section Heading" value={msg.heading} onChange={(v: string) => updateMessage(idx, "heading", v)} />
                    </div>
                    <InputField label="Full Name" value={msg.name} onChange={(v: string) => updateMessage(idx, "name", v)} />
                    <InputField label="Academic Qualifications" value={msg.qualifications} onChange={(v: string) => updateMessage(idx, "qualifications", v)} />
                    <div className="md:col-span-2">
                      <InputField label="Official Designation / Roles" value={msg.designation} onChange={(v: string) => updateMessage(idx, "designation", v)} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <TextareaField
                      label="The Message Content"
                      value={msg.message}
                      onChange={(v: string) => updateMessage(idx, "message", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {local.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
          <p className="text-gray-400">No principal messages added yet.</p>
          <button onClick={addMessage} className="mt-4 text-primary font-bold hover:underline">Add the first message</button>
        </div>
      )}

      <div className="pt-10 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-[10px] uppercase tracking-widest">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          All messages will be displayed on the page
        </div>
        <button
          onClick={() => onSave(local)}
          disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 rounded-[1.25rem] bg-primary text-white font-black text-sm hover:bg-secondary hover:text-primary transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-2xl shadow-primary/20 hover:shadow-secondary/20 group"
        >
          <Save size={20} className="group-hover:scale-110 transition-transform" />
          {saving ? "Publishing..." : "Update Principal Messages"}
        </button>
      </div>
    </div>
  );
}

// ─── Trustees Tab ───
function TrusteesTab() {
  const [content, setContent] = useState<any>({
    hero: { heading: "Inspiring Mentors", description: "", image: "", slides: [] },
    trustees: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosInstance.get("/api/trustees-content")
      .then((res) => {
        if (res.data.success) setContent(res.data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await axiosInstance.put("/api/trustees-content", content);
      if (res.data.success) {
        setMessage("Saved successfully!");
      } else {
        setMessage("Error saving.");
      }
    } catch {
      setMessage("Failed to save.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const addTrustee = () => {
    setContent((prev: any) => ({
      ...prev,
      trustees: [...(prev.trustees || []), { name: "New Trustee", designation: "", description: "", image: "" }]
    }));
  };

  const updateTrustee = (idx: number, field: string, val: string) => {
    setContent((prev: any) => {
      const updated = [...(prev.trustees || [])];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, trustees: updated };
    });
  };

  const removeTrustee = (idx: number) => {
    if (confirm("Remove this trustee?")) {
      setContent((prev: any) => ({
        ...prev,
        trustees: prev.trustees.filter((_: any, i: number) => i !== idx)
      }));
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><div className="w-8 h-8 animate-spin border-3 border-primary/30 border-t-primary rounded-full" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-playfair font-black text-primary">Trustees Management</h3>
          <p className="text-sm text-gray-500 mt-1">Manage the trustees page content and list of trustees.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg hover:bg-primary/90 transition-all cursor-pointer">
          <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>


      {message && <div className={`p-4 rounded-xl text-sm font-bold ${message.startsWith("Error") || message.startsWith("Failed") ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}>{message}</div>}

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <h4 className="text-lg font-playfair font-black text-primary border-b border-gray-50 pb-4">Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Heading" value={content.hero?.heading || ""} onChange={(v) => setContent((prev: any) => ({ ...prev, hero: { ...prev.hero, heading: v } }))} />
          <InputField label="Description" value={content.hero?.description || ""} onChange={(v) => setContent((prev: any) => ({ ...prev, hero: { ...prev.hero, description: v } }))} />
          <div className="md:col-span-2">
            <ImageUpload label="Hero Background Image" value={content.hero?.image || ""} onChange={(v) => setContent((prev: any) => ({ ...prev, hero: { ...prev.hero, image: v } }))} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <h4 className="text-lg font-playfair font-black text-primary">Trustees List</h4>
          <button onClick={addTrustee} className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-xl text-xs font-bold hover:bg-secondary hover:text-white transition-colors cursor-pointer">
            <Plus size={14} /> Add Trustee
          </button>
        </div>

        <div className="space-y-6">
          {content.trustees.map((t: any, idx: number) => (
            <div key={idx} className="p-6 border border-gray-100 rounded-2xl bg-gray-50 relative group overflow-hidden">
              <button onClick={() => removeTrustee(idx)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-100 rounded-xl transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                <Trash2 size={16} />
              </button>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4 min-w-0">
                  <ImageUpload label="Photo" value={t.image} onChange={(v) => updateTrustee(idx, "image", v)} contain={true} compact={true} />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Name" value={t.name} onChange={(v) => updateTrustee(idx, "name", v)} />
                    <InputField label="Designation" value={t.designation} onChange={(v) => updateTrustee(idx, "designation", v)} />
                  </div>
                  <TextareaField label="Description (Paragraphs allowed)" value={t.description} onChange={(v) => updateTrustee(idx, "description", v)} />
                </div>
              </div>
            </div>
          ))}
          {content.trustees.length === 0 && <p className="text-center text-sm text-gray-400 py-4">No trustees added yet.</p>}
        </div>
      </div>
    </div>
  );
}
