"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data.session) {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white flex items-center justify-center p-6 transition-colors duration-500 font-sans">
        <div className="max-w-md w-full bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-mono font-extrabold flex items-center justify-center mx-auto text-sm shadow-md">
              ADMIN
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Portfolio CMS</h1>
            <p className="text-xs text-slate-500 font-mono">Sign in to manage your portfolio content</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 font-mono">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@portfolio.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#18191E] text-xs font-mono text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs hover:opacity-80 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In to Admin"} <ArrowRight size={14} />
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="/" className="font-mono text-[10px] text-slate-400 hover:underline">
              ← Return to Public Portfolio
            </a>
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}
