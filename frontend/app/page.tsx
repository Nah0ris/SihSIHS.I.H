"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle,
  Clock,
  Cpu,
  ExternalLink,
  FileSpreadsheet,
  Fingerprint,
  Lock,
  Mail,
  Scale,
  Search,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
  GitBranch,
} from "lucide-react";
import SpecularButton from "@/components/ui/SpecularButton";

type RoleOption = "aicte_admin" | "institution" | "verifier";

const personas: { role: RoleOption; email: string; name: string; detail: string; icon: typeof Building2; target: string }[] = [
  { role: "institution", email: "principal@apextech.edu.in", name: "Institution admin", detail: "Apex Institute of Tech (#SYN-MH-0001)", icon: Building2, target: "/institution/submit" },
  { role: "aicte_admin", email: "admin@aicte.gov.in", name: "Central regulator", detail: "AICTE Central Admin Directorate", icon: ShieldCheck, target: "/admin/overview" },
  { role: "verifier", email: "verifier@deloitte-audit.com", name: "External verifier", detail: "Read-only Token Screener", icon: UserCheck, target: "/verify/chk_demo8723" },
];

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("All Programmes & Quotas");
  const [role, setRole] = useState<RoleOption>("institution");
  const [email, setEmail] = useState("principal@apextech.edu.in");
  const [password, setPassword] = useState("regulatoryDemoPass2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/institution/submit");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email address and access key.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "aicte_admin") router.push("/admin/overview");
      else if (role === "institution") router.push("/institution/submit");
      else router.push("/verify/chk_demo8723");
    }, 400);
  };

  const selectPersona = (p: typeof personas[number]) => {
    setRole(p.role);
    setEmail(p.email);
    setPassword("regulatoryDemoPass2026!");
    setError(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. TOP GOVERNMENT OF INDIA & SIH BAR */}
      <div className="w-full bg-[#f1f5f9] border-b border-slate-200 py-1.5 px-4 text-[11px] text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center shadow-xs border border-slate-300 rounded overflow-hidden">
              <span className="w-2.5 h-3 bg-[#f59e0b]" />
              <span className="w-2.5 h-3 bg-white" />
              <span className="w-2.5 h-3 bg-[#15803d]" />
            </span>
            <span className="font-semibold text-slate-800">भारत सरकार</span>
            <span className="text-slate-400">|</span>
            <span>Government of India</span>
            <span className="text-slate-400">·</span>
            <span className="hidden sm:inline">Ministry of Education</span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded text-[10px]">
              SIH 2026 · Team KRATOS · PS 3 (SIH26263)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setShowNoteModal(true)}
              className="inline-flex items-center gap-1.5 text-rose-700 hover:text-rose-800 transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Project Summary</span>
            </button>
            <a
              href="https://www.aicte-india.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-slate-600 hover:text-amber-700 transition-colors"
            >
              <span>AICTE Central</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-700 text-[11px]">
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. OFFICIAL AICTE HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3.5 no-underline group">
            <div className="flex items-center gap-2.5 bg-amber-50/70 p-1.5 sm:p-2 rounded-xl border border-amber-200/80 shadow-xs">
              <img
                src="/logos/moe-logo.webp"
                alt="Ministry of Education"
                className="h-9 sm:h-11 w-auto object-contain"
              />
              <span className="w-px h-7 bg-amber-300" aria-hidden="true" />
              <img
                src="/logos/aicte-logo.webp"
                alt="AICTE Logo"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-slate-900 font-bold text-xs sm:text-sm tracking-tight leading-tight">
                  अखिल भारतीय तकनीकी शिक्षा परिषद
                </span>
                <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-1.5 py-0.5 rounded tracking-wider shadow-xs">
                  AICTE
                </span>
              </div>
              <span className="text-slate-800 font-bold text-[11px] sm:text-xs tracking-wider">
                APAAR ID-BASED STUDENT VERIFICATION PLATFORM
              </span>
              <span className="text-slate-500 text-[10px] sm:text-[11px] hidden sm:block">
                Academic Governance, Intake Parity &amp; Privacy-Preserving Verification · SIH 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <SpecularButton
              size="md"
              radius={12}
              tint="#f59e0b"
              tintOpacity={0.92}
              textColor="#0f172a"
              lineColor="#ffffff"
              baseColor="#d97706"
              intensity={1.2}
              idleIntensity={0.4}
              shineSize={14}
              shineFade={36}
              thickness={1.3}
              glow={1.2}
              followMouse
              proximity={220}
              onClick={() => scrollToSection("portal-access")}
            >
              <span className="flex items-center gap-2 font-bold text-sm">
                Explore Platform <ArrowRight className="w-4 h-4" />
              </span>
            </SpecularButton>
          </div>
        </div>
      </header>

      {/* 3. LIVE REGULATORY TICKER STRIP */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              LIVE
            </span>
            <span className="text-slate-800 font-medium">
              Academic Year 2026–27 Enrolment Cycle Active · Timeline-Based Overlap &amp; Intake Reconciliation Engine Operational
            </span>
          </div>

          <span className="hidden lg:inline-flex items-center gap-1.5 text-amber-800 font-mono text-[11px] font-semibold bg-amber-100/70 px-2.5 py-0.5 rounded border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            AICTE SIH 2026 · PS 3 COMPLIANT
          </span>
        </div>
      </div>

      <main className="relative">
        {/* 4. HERO SECTION WITH SEARCH & VALUE PROPOSITIONS */}
        <section className="relative pt-12 pb-16 px-4 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-100/40 via-amber-50/20 to-transparent pointer-events-none -z-10 blur-3xl"
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto text-center">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/80 shadow-xs text-xs font-semibold text-slate-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
              <span>AICTE Student Verification Platform</span>
              <span className="text-slate-300">·</span>
              <span className="text-amber-700 font-mono font-bold">Team KRATOS (SIH 2026)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-slate-900 leading-[1.15] mb-5">
              APAAR ID-Based Student Data Management{" "}
              <span className="text-[#ea580c] block sm:inline">
                &amp; Regulatory Verification Platform
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Autonomous verification of institutional enrolment submissions across AICTE-approved colleges.
              Enforces sanctioned programme intake, validates category &amp; supernumerary quotas, detects overlapping enrolments, and guarantees privacy-preserving student verification.
            </p>

            {/* Interactive Search & Filter Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-lg shadow-slate-200/50 mb-5">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Institution, APAAR ID or Batch (e.g. Apex Institute / SYN-MH-0001)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  />
                </div>

                <div className="relative w-full sm:w-56">
                  <select
                    value={selectedProgramme}
                    onChange={(e) => setSelectedProgramme(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white cursor-pointer transition-all"
                  >
                    <option>All Programmes &amp; Quotas</option>
                    <option>B.Tech Computer Engg (120 Cap)</option>
                    <option>Supernumerary Quotas (CAP-001)</option>
                    <option>NRI &amp; OCI Quotas (CAP-002)</option>
                    <option>Cross-Institutional Flags (DUP-002)</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="w-full sm:w-auto">
                  <SpecularButton
                    size="md"
                    radius={10}
                    tint="#f59e0b"
                    tintOpacity={0.92}
                    textColor="#0f172a"
                    lineColor="#ffffff"
                    baseColor="#d97706"
                    intensity={1.2}
                    idleIntensity={0.35}
                    shineSize={12}
                    shineFade={34}
                    thickness={1.3}
                    glow={1.1}
                    type="submit"
                    className="w-full sm:w-auto font-bold text-sm px-6"
                  >
                    <span className="flex items-center gap-1.5 font-bold">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </SpecularButton>
                </div>
              </form>
            </div>

            {/* Quick Access Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 mb-12">
              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mr-1">
                Quick Access:
              </span>
              <button
                onClick={() => router.push("/institution/submit")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50/90 text-amber-900 font-semibold hover:bg-amber-100 transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>★ Apex Institute (#SYN-MH-0001)</span>
              </button>
              <button
                onClick={() => router.push("/admin/overview")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <span>Concurrent Dispute Queue (DUP-002)</span>
              </button>
              <button
                onClick={() => router.push("/admin/benchmark")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <span>Synthetic Benchmarking Suite</span>
              </button>
            </div>

            {/* 4 CORE VALUE PROPOSITION CARDS (DETECT · VALIDATE · MONITOR · EXPLAIN) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
              {/* DETECT */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all">
                <div className="flex items-center gap-2 text-sky-700 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  DETECT
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Duplicate &amp; Overlap</div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Identifies duplicate records, invalid APAAR IDs, and overlapping active enrolments across institutions.
                </div>
              </div>

              {/* VALIDATE */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all">
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  VALIDATE
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Approved Quotas</div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Enforces sanctioned programme intake, NRI caps, and applicable supernumerary category rules.
                </div>
              </div>

              {/* MONITOR */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all">
                <div className="flex items-center gap-2 text-amber-700 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  MONITOR
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">National Dashboards</div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Real-time analytics for AICTE regulators tracking state-level compliance, intake trends, and exceptions.
                </div>
              </div>

              {/* EXPLAIN */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all">
                <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  EXPLAIN
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Actionable Evidence</div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Returns row-wise explanations, regulatory evidence payloads, and suggested fixes for every flagged row.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 6-PHASE END-TO-END DATA FLOW PIPELINE */}
        <section className="py-10 px-4 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                End-To-End Architecture
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                The 6-Phase Regulatory Data Lifecycle
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">01</span>
                <span className="font-bold text-slate-900 text-xs mb-1">UPLOAD</span>
                <span className="text-[11px] text-slate-500">Prescribed CSV template with APAAR ID</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">02</span>
                <span className="font-bold text-slate-900 text-xs mb-1">VALIDATE</span>
                <span className="text-[11px] text-slate-500">Configurable rules for intake &amp; quotas</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">03</span>
                <span className="font-bold text-slate-900 text-xs mb-1">PRIORITIZE</span>
                <span className="text-[11px] text-slate-500">Severity triage (Accepted, Flagged, Rejected)</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">04</span>
                <span className="font-bold text-slate-900 text-xs mb-1">REVIEW</span>
                <span className="text-[11px] text-slate-500">Dispute mediation &amp; correction workflow</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">05</span>
                <span className="font-bold text-slate-900 text-xs mb-1">STORE</span>
                <span className="text-[11px] text-slate-500">Promoted into AICTE validated repository</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">06</span>
                <span className="font-bold text-slate-900 text-xs mb-1">VERIFY</span>
                <span className="text-[11px] text-slate-500">Privacy-preserving expiring tokens</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. KEY TECHNICAL DIFFERENTIATORS & CORE MODULES */}
        <section className="py-12 px-4 bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                Core Modules &amp; Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Engineered Specifically for AICTE Problem Statement PS 3
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: APAAR ID Status Checks */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3.5">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">APAAR ID Validation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Validates 12-digit APAAR identifiers via mock APAAR adapter. Missing identifiers receive a &quot;Pending APAAR&quot; status rather than automatic rejection.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/institution/submit")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>APAAR ID Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: Regulatory Quotas & Intake Rules */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3.5">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">Approved Intake &amp; Quotas</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Enforces Rule CAP-001 (Approved Intake Limit) and Rule CAP-002 (NRI/Supernumerary Quotas). Prevents institutions from exceeding sanctioned capacities.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/institution/submit")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Intake Reconciliation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 3: Timeline-Based Duplicate Detection */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3.5">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">Timeline Overlap (DUP-002)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Compares student enrolment timelines across multiple institutions to isolate cross-university concurrent enrolments and dual admission clashes.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/admin/overview")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Dispute Ledger Queue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 4: Actionable Row-Wise Reports */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3.5">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">Row-Wise Actionable Reports</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Annotates batch rows as Accepted, Flagged, or Rejected with specific rule codes, evidence payloads, and suggested remediation steps.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/institution/submit")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Validation Reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PROMINENT DARK CARBON SCRUTINY BANNER */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
              <div
                className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
                  AICTE CENTRAL REPOSITORY &amp; VERIFICATION ENGINE
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                  Launch Institutional Compliance Operations
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                  Step into the regulator or institution operator workspace to test 135-row enrolment batches, resolve cross-university disputes, and run synthetic stress benchmarks.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <SpecularButton
                    size="lg"
                    radius={14}
                    tint="#f59e0b"
                    tintOpacity={0.95}
                    textColor="#0f172a"
                    lineColor="#ffffff"
                    baseColor="#d97706"
                    intensity={1.2}
                    idleIntensity={0.4}
                    shineSize={16}
                    shineFade={36}
                    thickness={1.4}
                    glow={1.3}
                    followMouse
                    proximity={250}
                    onClick={() => router.push("/institution/submit")}
                    className="font-bold text-sm px-6"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      Enter Operational Portal <ArrowRight className="w-4 h-4" />
                    </span>
                  </SpecularButton>

                  <button
                    onClick={() => router.push("/institution/submit")}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm transition-all shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Apex Institute Demo Baseline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAST CRUX ACCESS & ROLE PORTAL */}
        <section id="portal-access" className="py-14 px-4 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Role-Based Access
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Enter The Portal By Stakeholder Role
              </h2>
              <p className="text-slate-600 text-sm">
                Direct 1-click launch into each dedicated stakeholder workspace.
              </p>
            </div>

            {/* 4 Workspace Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {/* Institution Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider block mb-1">
                    01 · Institution User
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">Apex Institute</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Upload prescribed CSV batches, inspect pre-flight checks, and reconcile 120 sanctioned capacity.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/institution/submit")}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Central Compliance Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider block mb-1">
                    02 · AICTE Regulator
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">Central Regulator</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Monitor national sanctioned capacity, review Rule DUP-002 concurrent clashes, and mediate disputes.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/admin/overview")}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Launch Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Benchmark Suite Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-105 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider block mb-1">
                    03 · Benchmark Engine
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">Synthetic Engine</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Run synthetic fault-injection scenarios, concurrent transfer checks, and verify sub-second latency.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/admin/benchmark")}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Run Benchmark</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Verification Gateway Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-105 transition-transform">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider block mb-1">
                    04 · Authorised Verifier
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">Verification Gateway</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Time-limited token gateway for privacy-preserving, purpose-bound verification with zero biometrics.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/verify/chk_demo8723")}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Verify Student Token</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Sign-In Drawer */}
            <div className="max-w-xl mx-auto bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Evaluator Demo Sign-In</h3>
                  <p className="text-xs text-slate-500">Pick a pre-configured persona or continue directly to workspace.</p>
                </div>
                <span className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Lock className="w-4 h-4" />
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {personas.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.role}
                      type="button"
                      onClick={() => selectPersona(p)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        role === p.role
                          ? "border-amber-400 bg-amber-50/80 text-amber-900 font-semibold shadow-xs"
                          : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1 text-amber-600" />
                      <div className="text-[11px] font-bold truncate">{p.name}</div>
                      <div className="text-[9px] text-slate-500 truncate">{p.detail}</div>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email address / institutional ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.edu.in"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password / passkey
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your secure access key"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <SpecularButton
                    size="md"
                    radius={12}
                    tint="#f59e0b"
                    tintOpacity={0.92}
                    textColor="#0f172a"
                    lineColor="#ffffff"
                    baseColor="#d97706"
                    intensity={1.2}
                    idleIntensity={0.35}
                    shineSize={14}
                    shineFade={36}
                    thickness={1.3}
                    glow={1.2}
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-bold text-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Validating Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue to Workspace</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </SpecularButton>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logos/aicte-logo.webp" alt="AICTE" className="h-6 w-auto object-contain" />
            <span className="font-bold text-slate-800">अखिल भारतीय तकनीकी शिक्षा परिषद (AICTE)</span>
            <span className="text-slate-300">·</span>
            <span>APAAR ID-Based Student Verification Platform · SIH 2026 (Team KRATOS)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-amber-700 transition-colors font-medium"
            >
              <span>Back to top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* PROJECT SUMMARY MODAL */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowNoteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-3 text-amber-700">
              <ShieldCheck className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-base text-slate-900">SIH 2026 · Problem Statement 3 (SIH26263)</h3>
                <span className="text-xs text-slate-500 font-medium">Team KRATOS · Proposed Solution Architecture</span>
              </div>
            </div>
            
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed mb-4">
              <p>
                <strong>The Core Challenge:</strong> Indian higher education institutions manually verify student data, leading to undetected overlapping enrolments, invalid APAAR IDs, and quota over-intake violations.
              </p>
              <p>
                <strong>Team KRATOS Solution:</strong> An end-to-end 6-phase pipeline that automates CSV batch intake, validates APAAR IDs, enforces sanctioned capacity limits (CAP-001/002), detects cross-institution timeline overlaps (DUP-002), and issues expiring verification tokens.
              </p>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                <strong>Data Minimization Principle:</strong> No biometric or Aadhaar numbers are stored or transmitted. All third-party checks use purpose-bound, expiring tokens.
              </div>
            </div>

            <button
              onClick={() => setShowNoteModal(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Close &amp; Return to Platform
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
