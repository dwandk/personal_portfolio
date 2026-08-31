"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  FolderGit2,
  Award,
  Image as ImageIcon,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
  Layers,
  ExternalLink,
  Code
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "capabilities" | "certs" | "activities">("profile");

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Auth Check
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setUser(data.session.user);
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white flex items-center justify-center font-mono text-xs">
          Authenticating admin session...
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white transition-colors duration-500 font-sans pb-24">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#F3F3F5]/90 dark:bg-[#0E0F12]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono font-bold text-xs flex items-center justify-center">
              CMS
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-black dark:text-white leading-none">Portfolio Admin</h1>
              <p className="font-mono text-[10px] text-slate-500 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all inline-flex items-center gap-1.5"
            >
              Live Portfolio <ExternalLink size={12} />
            </a>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-mono text-[10px] font-bold hover:bg-red-500/20 transition-all inline-flex items-center gap-1.5"
            >
              Sign Out <LogOut size={12} />
            </button>
          </div>
        </header>

        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2 font-mono text-xs ${
              notification.type === "success"
                ? "bg-emerald-500 text-white border-emerald-400"
                : "bg-red-500 text-white border-red-400"
            }`}>
              {notification.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 pt-8">
          {/* Nav Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-4 border-b border-black/10 dark:border-white/10 mb-8">
            {[
              { id: "profile", label: "Profile & About", icon: User },
              { id: "projects", label: "Projects", icon: FolderGit2 },
              { id: "capabilities", label: "Capabilities & Skills", icon: Layers },
              { id: "certs", label: "Certifications", icon: Award },
              { id: "activities", label: "Activities", icon: ImageIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                      : "bg-white dark:bg-[#14151A] text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20"
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENTS */}
          {activeTab === "profile" && <ProfileManager showToast={showToast} />}
          {activeTab === "projects" && <ProjectsManager showToast={showToast} />}
          {activeTab === "capabilities" && <CapabilitiesManager showToast={showToast} />}
          {activeTab === "certs" && <CertificationsManager showToast={showToast} />}
          {activeTab === "activities" && <ActivitiesManager showToast={showToast} />}

        </div>

      </div>
    </ThemeProvider>
  );
}

// ------------------------------------------------------------------------------
// Helper: Upload file to Supabase Storage
// ------------------------------------------------------------------------------
async function uploadStorageFile(file: File, folder: string): Promise<string | null> {
  try {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const { data, error } = await supabase.storage.from("portfolio").upload(fileName, file, {
      upsert: true,
    });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage.from("portfolio").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}

// ------------------------------------------------------------------------------
// 1. PROFILE MANAGER COMPONENT
// ------------------------------------------------------------------------------
function ProfileManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [profile, setProfile] = useState<any>({
    name: "",
    headline: "",
    bio_line_1: "",
    bio_line_2: "",
    profile_photo: "",
    university: "",
    graduation_year: "",
    cv_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("profiles").select("*").single();
      if (data) setProfile(data);
    }
    load();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const url = await uploadStorageFile(file, "profile");
    if (url) {
      setProfile((prev: any) => ({ ...prev, profile_photo: url }));
      showToast("Profile photo uploaded!");
    } else {
      showToast("Photo upload failed", "error");
    }
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: existing } = await supabase.from("profiles").select("id").single();
      if (existing) {
        await supabase.from("profiles").update(profile).eq("id", existing.id);
      } else {
        await supabase.from("profiles").insert([profile]);
      }
      showToast("Profile saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 max-w-4xl shadow-sm">
      <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
        <h2 className="text-xl font-extrabold text-black dark:text-white">Edit Profile &amp; About Me</h2>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-80 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-start">
        {/* Photo Upload */}
        <div className="md:col-span-4 space-y-3">
          <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Profile Photo</label>
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#1E1F26]">
            {profile.profile_photo ? (
              <img src={profile.profile_photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">No Photo</div>
            )}
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#1E1F26] text-black dark:text-white font-mono text-xs font-bold border border-black/10 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-[#252730] transition-colors">
            <Upload size={14} /> {uploading ? "Uploading..." : "Upload New Photo"}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
          
          <input
            type="text"
            placeholder="Or photo URL"
            value={profile.profile_photo || ""}
            onChange={(e) => setProfile({ ...profile, profile_photo: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] font-mono text-xs"
          />
        </div>

        {/* Text Fields */}
        <div className="md:col-span-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-bold"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Typewriter Headline</label>
              <input
                type="text"
                value={profile.headline || ""}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Bio Paragraph 1</label>
            <textarea
              rows={3}
              value={profile.bio_line_1 || ""}
              onChange={(e) => setProfile({ ...profile, bio_line_1: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Bio Paragraph 2</label>
            <textarea
              rows={3}
              value={profile.bio_line_2 || ""}
              onChange={(e) => setProfile({ ...profile, bio_line_2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs leading-relaxed"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">University</label>
              <input
                type="text"
                value={profile.university || ""}
                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Graduation Year</label>
              <input
                type="text"
                value={profile.graduation_year || ""}
                onChange={(e) => setProfile({ ...profile, graduation_year: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">CV / Resume Link</label>
              <input
                type="text"
                value={profile.cv_url || ""}
                onChange={(e) => setProfile({ ...profile, cv_url: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
              />
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}

// ------------------------------------------------------------------------------
// 2. PROJECTS MANAGER COMPONENT
// ------------------------------------------------------------------------------
function ProjectsManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
    if (data) setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateNew = () => {
    setEditing({
      slug: `project-${Date.now()}`,
      title: "New Project",
      subtitle: "",
      category: "Web Application",
      year: "2025",
      short_desc: "",
      long_desc: "",
      gradient: "from-blue-500 to-cyan-500",
      thumbnail: "/assets/projects/calmora.png",
      featured: true,
      display_order: projects.length + 1,
      role: "Developer",
      tools: ["React", "Next.js"],
      highlights: ["Clean architecture"],
      github_url: "",
      live_url: "",
      figma_url: "",
      documentation_url: "",
      prototype_url: "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing.id) {
        await supabase.from("projects").update(editing).eq("id", editing.id);
        showToast("Project updated!");
      } else {
        await supabase.from("projects").insert([editing]);
        showToast("New project created!");
      }
      setEditing(null);
      fetchProjects();
    } catch (err: any) {
      showToast(err.message || "Failed to save project", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    showToast("Project deleted.");
    fetchProjects();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const url = await uploadStorageFile(file, "projects");
    if (url) {
      setEditing((prev: any) => ({ ...prev, thumbnail: url }));
      showToast("Thumbnail uploaded!");
    } else {
      showToast("Upload failed", "error");
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold">Projects Showcase ({projects.length})</h2>
          <p className="text-xs text-slate-500 font-mono">Manage items displayed in Project Gallery &amp; Archive</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus size={14} /> Add New Project
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
            <h3 className="font-extrabold text-base">{editing.id ? "Edit Project" : "Create Project"}</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-1.5"
              >
                <Save size={13} /> Save Project
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4 space-y-3">
              <label className="block font-mono text-[10px] font-bold uppercase text-slate-500">Thumbnail Image</label>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#18191E]">
                <img src={editing.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E1F26] font-mono text-xs font-bold border border-black/10 dark:border-white/10">
                <Upload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <input
                type="text"
                placeholder="Or Image URL"
                value={editing.thumbnail || ""}
                onChange={(e) => setEditing({ ...editing, thumbnail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] font-mono text-xs"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    required
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Category</label>
                  <select
                    value={editing.category || "Web Application"}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-bold"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Data Analytics">Data Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Year</label>
                  <input
                    type="text"
                    value={editing.year || "2025"}
                    onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Role</label>
                  <input
                    type="text"
                    value={editing.role || ""}
                    onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editing.short_desc || ""}
                  onChange={(e) => setEditing({ ...editing, short_desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Full Detailed Description</label>
                <textarea
                  rows={4}
                  value={editing.long_desc || ""}
                  onChange={(e) => setEditing({ ...editing, long_desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs leading-relaxed"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Tools (Comma Separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editing.tools) ? editing.tools.join(", ") : ""}
                    onChange={(e) => setEditing({ ...editing, tools: e.target.value.split(",").map((s) => s.trim()) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Figma URL</label>
                  <input
                    type="text"
                    value={editing.figma_url || ""}
                    onChange={(e) => setEditing({ ...editing, figma_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">Live Project URL</label>
                  <input
                    type="text"
                    value={editing.live_url || ""}
                    onChange={(e) => setEditing({ ...editing, live_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editing.github_url || ""}
                    onChange={(e) => setEditing({ ...editing, github_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono"
                  />
                </div>
              </div>

            </div>
          </div>
        </form>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.id} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="aspect-[16/10] bg-slate-100 dark:bg-[#1E1F26] relative">
                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                  {p.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm">{p.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.short_desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-black/5 dark:border-white/5">
                  <span className="font-mono text-[10px] text-slate-400">{p.year}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditing(p)}
                      className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------
// 3. CAPABILITIES MANAGER COMPONENT
// ------------------------------------------------------------------------------
function CapabilitiesManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [caps, setCaps] = useState<any[]>([]);

  const fetchCaps = async () => {
    const { data } = await supabase.from("capabilities").select("*").order("display_order", { ascending: true });
    if (data) setCaps(data);
  };

  useEffect(() => {
    fetchCaps();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-extrabold">Capabilities &amp; Specializations</h2>
        <p className="text-xs text-slate-500 font-mono">Specializations rendered in What I Can Do section</p>
      </div>

      <div className="space-y-4">
        {caps.map((c) => (
          <div key={c.id} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{c.number_code}</span>
                <h3 className="font-extrabold text-base">{c.title}</h3>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E1F26] font-mono text-[9px] text-slate-500">{c.category}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// 4. CERTIFICATIONS MANAGER COMPONENT
// ------------------------------------------------------------------------------
function CertificationsManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [certs, setCerts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchCerts = async () => {
    const { data } = await supabase.from("certifications").select("*").order("display_order", { ascending: true });
    if (data) setCerts(data);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleCreate = () => {
    setEditing({
      category_id: "cert",
      category_title: "TECHNICAL CERTIFICATION",
      subtitle: "New Certification",
      issuer: "BNSP / Google / IBM",
      year: "2025",
      image: "/assets/projects/BNSP.jpg",
      description: "",
      link: "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
      display_order: certs.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing.id) {
        await supabase.from("certifications").update(editing).eq("id", editing.id);
        showToast("Certification updated!");
      } else {
        await supabase.from("certifications").insert([editing]);
        showToast("Certification created!");
      }
      setEditing(null);
      fetchCerts();
    } catch (err: any) {
      showToast(err.message || "Failed to save", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete certification?")) return;
    await supabase.from("certifications").delete().eq("id", id);
    showToast("Deleted certification.");
    fetchCerts();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const url = await uploadStorageFile(file, "certs");
    if (url) {
      setEditing((prev: any) => ({ ...prev, image: url }));
      showToast("Uploaded credential image!");
    } else {
      showToast("Upload failed", "error");
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold">Certifications ({certs.length})</h2>
          <p className="text-xs text-slate-500 font-mono">Verified achievements &amp; certificates</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus size={14} /> Add Certification
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-3xl p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
            <h3 className="font-extrabold text-sm">{editing.id ? "Edit Cert" : "New Cert"}</h3>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(null)} className="px-3 py-1 rounded-xl border text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs">Save</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Category Title</label>
              <input type="text" value={editing.category_title} onChange={(e) => setEditing({ ...editing, category_title: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-bold" />
            </div>
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Subtitle / Certificate Name</label>
              <input type="text" value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-bold" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Issuer</label>
              <input type="text" value={editing.issuer} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs" />
            </div>
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Year</label>
              <input type="text" value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-mono" />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Description</label>
            <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs" />
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Credential Link</label>
            <input type="text" value={editing.link || ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-mono" />
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Certificate Image</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E1F26] font-mono text-xs font-bold border">
                <Upload size={13} className="inline mr-1" /> {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <input type="text" value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="flex-1 px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-mono" />
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {certs.map((c) => (
            <div key={c.id} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={c.image} alt={c.subtitle} className="w-14 h-10 object-cover rounded-lg border" />
                <div>
                  <h3 className="font-extrabold text-sm">{c.subtitle}</h3>
                  <p className="text-xs text-slate-500 font-mono">{c.issuer} &bull; {c.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(c)} className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"><Edit size={13} /></button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------
// 5. ACTIVITIES MANAGER COMPONENT
// ------------------------------------------------------------------------------
function ActivitiesManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [activities, setActivities] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchActivities = async () => {
    const { data } = await supabase.from("activities").select("*").order("display_order", { ascending: true });
    if (data) setActivities(data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleCreate = () => {
    setEditing({
      title: "New Activity",
      caption: "Activity details & description",
      category: "EVENT",
      image: "/assets/projects/Beraksi.png",
      year: "2025",
      display_order: activities.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing.id) {
        await supabase.from("activities").update(editing).eq("id", editing.id);
        showToast("Activity updated!");
      } else {
        await supabase.from("activities").insert([editing]);
        showToast("Activity created!");
      }
      setEditing(null);
      fetchActivities();
    } catch (err: any) {
      showToast(err.message || "Failed to save", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete activity?")) return;
    await supabase.from("activities").delete().eq("id", id);
    showToast("Deleted activity.");
    fetchActivities();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const url = await uploadStorageFile(file, "activities");
    if (url) {
      setEditing((prev: any) => ({ ...prev, image: url }));
      showToast("Uploaded photo!");
    } else {
      showToast("Upload failed", "error");
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold">Activity Snapshots ({activities.length})</h2>
          <p className="text-xs text-slate-500 font-mono">Photos rendered in 3D Cover Flow Activity Gallery</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus size={14} /> Add Activity Photo
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-3xl p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
            <h3 className="font-extrabold text-sm">{editing.id ? "Edit Activity" : "New Activity"}</h3>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(null)} className="px-3 py-1 rounded-xl border text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs">Save</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Title</label>
              <input type="text" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-bold" />
            </div>
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Category Badge</label>
              <input type="text" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-mono uppercase" />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Caption / Description</label>
            <textarea rows={3} value={editing.caption || ""} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs leading-relaxed" />
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold text-slate-500 mb-1">Activity Photo</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E1F26] font-mono text-xs font-bold border">
                <Upload size={13} className="inline mr-1" /> {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <input type="text" value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="flex-1 px-3 py-1.5 rounded-xl border bg-slate-50 dark:bg-[#18191E] text-xs font-mono" />
            </div>
          </div>
        </form>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activities.map((a) => (
            <div key={a.id} className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="aspect-[4/3] bg-slate-100 dark:bg-[#1E1F26] relative">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[9px] uppercase">
                  {a.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm">{a.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{a.caption}</p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <button onClick={() => setEditing(a)} className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"><Edit size={13} /></button>
                  <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
