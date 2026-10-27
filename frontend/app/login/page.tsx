"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  FileCheck,
  Fingerprint,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import SpecularButton from "@/components/ui/SpecularButton";
import { AnimatedRoleList, type RoleListOption } from "@/components/ui/animated-role-list";

type RoleOption = "aicte_admin" | "institution" | "verifier";

const personas: { role: RoleOption; email: string; name: string; detail: string; icon: typeof Building2 }[] = [
  { role: "institution", email: "principal@apextech.edu.in", name: "Institution admin", detail: "Apex Institute of Tech", icon: Building2 },
  { role: "aicte_admin", email: "admin@aicte.gov.in", name: "Central regulator", detail: "AICTE Central Admin", icon: ShieldCheck },
  { role: "verifier", email: "verifier@deloitte-audit.com", name: "External verifier", detail: "Demo token access", icon: UserCheck },
];

const roleOptions: RoleListOption[] = [
  { value: "institution", label: "Institution Admin / Operator (Apex Institute #SYN-MH-0001)", description: "Upload and review institutional enrolment batches" },
  { value: "aicte_admin", label: "AICTE Central Regulatory Administrator", description: "Review national compliance and resolve disputes" },
  { value: "verifier", label: "External Verification Screener (Token Gateway)", description: "Run purpose-bound, read-only verification" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("principal@apextech.edu.in");
  const [password, setPassword] = useState("regulatoryDemoPass2026!");
  const [role, setRole] = useState<RoleOption>("institution");
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(300);
  const [isLoading, setIsLoading] = useState(false);

  const selectPersona = (persona: (typeof personas)[number]) => {
    setRole(persona.role);
    setEmail(persona.email);
    setPassword("regulatoryDemoPass2026!");
    setError(null);
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (rateLimited) return;
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
    }, 450);
  };

  const triggerRateLimitSimulation = () => {
    setRateLimited(true);
    setError("Too many failed attempts. Locked for 300s.");
    const interval = setInterval(() => {
      setLockoutTimer((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          setRateLimited(false);
          setError(null);
          return 300;
        }
        return previous - 1;
      });
    }, 1000);
  };

  return (
    <div className="landing-shell">
      {/* Government Ribbon */}
      <div className="government-bar">
        <div className="page-container government-bar-inner">
          <div className="government-context">
            <span className="tricolor-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <strong>SMART INDIA HACKATHON</strong>
            <span className="gov-divider" />
            <span>AICTE · APAAR RegTech prototype</span>
          </div>
          <nav aria-label="Utility links">
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-700 hover:text-amber-700 font-semibold text-xs mr-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Landing Page</span>
            </Link>
            <a href="#compliance">
              <AlertCircle className="h-3.5 w-3.5" /> Important note
            </a>
            <span className="language-chip">
              EN <span aria-hidden="true">⌄</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Official AICTE Navbar */}
      <header className="landing-header">
        <Link href="/" className="brand-lockup flex items-center gap-3 no-underline" aria-label="AICTE APAAR RegTech home">
          <div className="flex items-center gap-2 bg-amber-50/70 p-1.5 rounded-xl border border-amber-200">
            <img src="/logos/moe-logo.webp" alt="Ministry of Education" className="h-9 w-auto object-contain" />
            <span className="w-px h-6 bg-amber-300" aria-hidden="true" />
            <img src="/logos/aicte-logo.webp" alt="AICTE" className="h-9 w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-900 font-bold text-xs sm:text-sm">अखिल भारतीय तकनीकी शिक्षा परिषद</span>
              <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-1.5 py-0.5 rounded">AICTE</span>
            </div>
            <span className="text-slate-700 font-bold text-[11px] sm:text-xs">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION</span>
            <span className="text-slate-500 text-[10px] hidden sm:block">Academic governance · SIH 2026 prototype</span>
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
            idleIntensity={0.35}
            shineSize={12}
            shineFade={34}
            thickness={1.3}
            glow={1.1}
            onClick={() => {
              const el = document.getElementById("portal");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
              Explore portal <ArrowRight className="h-4 w-4" />
            </span>
          </SpecularButton>
        </div>
      </header>

      {/* Status strip */}
      <div className="status-strip">
        <div className="page-container status-strip-inner">
          <span className="status-live">DEMO</span>
          <span>Institutional enrolment review · Capacity validation · Privacy-preserving verification</span>
          <span className="status-cycle">ACADEMIC YEAR 2026–27</span>
        </div>
      </div>

      <main>
        {/* Overview Hero */}
        <section id="overview" className="hero-section scroll-mt-24">
          <div className="hero-backdrop" aria-hidden="true">
            <div className="hero-glow" />
          </div>
          <div className="hero-content page-container">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span className="eyebrow-dot" /> NATIONAL REGULATORY INTELLIGENCE PORTAL <i /> AY 2026–27
              </div>
              <h1 className="blur-reveal">
                Institutional approval &amp; regulatory scrutiny{" "}
                <span className="text-[#ea580c]">verified with care.</span>
              </h1>
              <p className="hero-description">
                Validate enrolment submissions, review sanctioned intake, and support secure student-record verification in one accountable workspace.
              </p>
              <div className="hero-portal-card glass-panel tilt-card">
                <div className="hero-card-actions">
                  <a href="#compliance" className="button-secondary">
                    <FileCheck className="h-4 w-4" /> Explore the framework <ArrowRight className="h-4 w-4" />
                  </a>
                  <SpecularButton
                    size="md"
                    radius={10}
                    tint="#f59e0b"
                    tintOpacity={0.92}
                    textColor="#0f172a"
                    lineColor="#ffffff"
                    baseColor="#d97706"
                    onClick={() => {
                      const el = document.getElementById("portal");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full font-bold"
                  >
                    <span className="flex items-center gap-2">
                      Access demo portal <ArrowRight className="h-4 w-4" />
                    </span>
                  </SpecularButton>
                </div>
                <div className="quick-access">
                  <strong>QUICK ACCESS</strong>
                  <button onClick={() => router.push("/institution/submit")}>
                    <Building2 className="h-3.5 w-3.5 text-amber-700" /> Institution workspace
                  </button>
                  <a href="#compliance">
                    <FileCheck className="h-3.5 w-3.5 text-amber-700" /> Compliance architecture
                  </a>
                  <button onClick={() => router.push("/verify/chk_demo8723")}>
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-700" /> Verification gateway
                  </button>
                </div>
              </div>
              <div className="trust-chips">
                <span>
                  <Lock className="h-3.5 w-3.5 text-amber-600" /> Privacy-first design
                </span>
                <span>
                  <Building2 className="h-3.5 w-3.5 text-amber-600" /> Sanctioned-intake checks
                </span>
                <span>
                  <FileCheck className="h-3.5 w-3.5 text-amber-600" /> Traceable review
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance architecture */}
        <section id="compliance" className="compliance-section scroll-mt-24">
          <div className="page-container">
            <div className="section-heading">
              <div>
                <div className="eyebrow section-eyebrow">
                  <i /> BUILT FOR TRUST AND ACCOUNTABILITY
                </div>
                <h2 className="blur-reveal">
                  Core boundaries &amp;<br className="mobile-break" /> compliance architecture
                </h2>
              </div>
              <p>
                Clear regulatory guardrails and privacy-by-design processes help keep student data workflows credible, accountable and compliant.
              </p>
            </div>
            <div className="principle-grid">
              <article className="principle-card glass-panel">
                <span className="principle-icon">
                  <Fingerprint className="h-6 w-6" />
                </span>
                <div>
                  <h3>Data minimization</h3>
                  <p>
                    Collect only what is necessary for enrolment, compliance and verification. Aadhaar numbers are not collected or stored.
                  </p>
                </div>
                <span className="principle-index">01</span>
              </article>
              <article className="principle-card glass-panel">
                <span className="principle-icon">
                  <Building2 className="h-6 w-6" />
                </span>
                <div>
                  <h3>Intake enforcement</h3>
                  <p>
                    Validate admissions against sanctioned programme capacity and apply consistent regulatory rules.
                  </p>
                </div>
                <span className="principle-index">02</span>
              </article>
              <article className="principle-card glass-panel">
                <span className="principle-icon">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <h3>Privacy-preserving verification</h3>
                  <p>
                    Support time-limited verification tokens that avoid exposing sensitive student details to external verifiers.
                  </p>
                </div>
                <span className="principle-index">03</span>
              </article>
            </div>
            <div className="compliance-note">
              <ShieldAlert className="h-4 w-4" />
              <span>
                Designed around accountable access, minimum necessary data and traceable regulatory decisions.
              </span>
            </div>
          </div>
        </section>

        {/* Portal Access Form */}
        <section id="portal" className="portal-section scroll-mt-24">
          <div className="page-container portal-layout">
            <div className="portal-intro">
              <div className="eyebrow section-eyebrow">
                <i /> AUTHORIZED ACCESS
              </div>
              <h2 className="blur-reveal">
                Your regulatory workspace,<br />
                <span className="text-[#ea580c]">ready when you are.</span>
              </h2>
              <p>
                Sign in with your assigned institutional or regulatory role. Evaluators can use a quick-launch profile to explore the demo.
              </p>
              <div className="portal-assurance">
                <span className="assurance-icon">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <span>
                  <strong>Protected access</strong>
                  <small>Role-based entry to the APAAR RegTech workspace</small>
                </span>
              </div>
            </div>

            <div className="login-card glass-panel">
              <div className="login-card-heading">
                <div>
                  <span className="login-kicker">APAAR REGTECH</span>
                  <h3>Sign in to your portal</h3>
                  <p>Use your authorized credentials to continue.</p>
                </div>
                <span className="login-shield">
                  <ShieldCheck className="h-5 w-5" />
                </span>
              </div>

              <div className="persona-heading">
                <span>Evaluator quick access</span>
                <span>Choose a profile</span>
              </div>
              <div className="persona-grid">
                {personas.map((persona) => {
                  const Icon = persona.icon;
                  return (
                    <button
                      key={persona.role}
                      type="button"
                      onClick={() => selectPersona(persona)}
                      className={`persona-option ${role === persona.role ? "persona-selected" : ""}`}
                      aria-pressed={role === persona.role}
                    >
                      <Icon className="h-4 w-4" />
                      <span>
                        <strong>{persona.name}</strong>
                        <small>{persona.detail}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="login-error" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <div>
                    <span>{error}</span>
                    {rateLimited && <small>Lockout countdown: {lockoutTimer}s remaining</small>}
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="login-form">
                <div className="form-field">
                  <span>Authorization role</span>
                  <AnimatedRoleList
                    id="authorization-role"
                    value={role}
                    options={roleOptions}
                    onChange={(value) => setRole(value as RoleOption)}
                    disabled={rateLimited}
                  />
                </div>
                <label className="form-field">
                  <span>Email address / institutional ID</span>
                  <span className="input-wrap">
                    <Mail className="h-4 w-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@institution.edu.in"
                      disabled={rateLimited}
                      autoComplete="username"
                    />
                  </span>
                </label>
                <label className="form-field">
                  <span>Password / passkey</span>
                  <span className="input-wrap">
                    <Lock className="h-4 w-4" />
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your secure access key"
                      disabled={rateLimited}
                      autoComplete="current-password"
                    />
                  </span>
                </label>

                <div className="pt-2">
                  <SpecularButton
                    type="submit"
                    size="md"
                    radius={12}
                    tint="#f59e0b"
                    tintOpacity={0.92}
                    textColor="#0f172a"
                    lineColor="#ffffff"
                    baseColor="#d97706"
                    disabled={isLoading || rateLimited}
                    className="w-full font-bold text-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          <span>Validating credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue to workspace</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </span>
                  </SpecularButton>
                </div>
              </form>

              <div className="login-card-footer">
                <span>
                  <Lock className="h-3.5 w-3.5" /> Role-based secure access
                </span>
                <button type="button" onClick={triggerRateLimitSimulation}>
                  Simulate lockout
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="page-container footer-content">
          <Link href="/" className="footer-brand flex items-center gap-2 no-underline">
            <img src="/logos/aicte-logo.webp" alt="AICTE" className="h-5 w-auto object-contain" />
            <span>AICTE <i>|</i> SIH 2026</span>
          </Link>
          <span>APAAR RegTech <i>/</i> Smart India Hackathon</span>
          <a href="#overview" className="back-top">
            Back to top <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
