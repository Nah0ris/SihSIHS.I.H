"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ShieldCheck, UploadCloud, BarChart3, CheckCircle, Cpu, LogOut, ArrowLeft } from "lucide-react";
import { GlassIcon } from "@/components/ui/glass-icon";

export const AppHeader: React.FC = () => {
  const pathname = usePathname();
  const isSubmit = pathname?.startsWith("/institution");
  const isOverview = pathname === "/admin/overview";
  const isBenchmark = pathname === "/admin/benchmark";
  const isVerifier = pathname?.startsWith("/verify");
  const isAdmin = isOverview || isBenchmark;
  const role = isAdmin
    ? { name: "AICTE Central Admin", detail: "National Regulatory Directorate", Icon: ShieldCheck }
    : isVerifier
    ? { name: "External Verifier", detail: "Read-only verification portal", Icon: CheckCircle }
    : { name: "Apex Institute of Tech", detail: "Institution ID | SYN-MH-0001", Icon: Building2 };

  const items = [
    { href: "/institution/submit", label: "Institute", short: "01", Icon: UploadCloud, active: !!isSubmit, detail: "Submission workspace" },
    { href: "/admin/overview", label: "Compliance", short: "02", Icon: BarChart3, active: !!isOverview, detail: "Regulatory overview" },
    { href: "/admin/benchmark", label: "Benchmark", short: "03", Icon: Cpu, active: !!isBenchmark, detail: "Validation scenarios" },
    { href: "/verify/chk_demo8723", label: "Verification", short: "04", Icon: CheckCircle, active: !!isVerifier, detail: "Secure token check" },
  ];

  return (
    <>
      <header className="workspace-topbar">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline group" aria-label="AICTE APAAR RegTech home">
            <div className="flex items-center gap-2.5 bg-amber-50/60 px-2.5 py-1.5 rounded-xl border border-amber-200/70 shadow-sm">
              <img
                src="/logos/moe-logo.webp"
                alt="Ministry of Education"
                className="h-8 w-auto object-contain"
              />
              <span className="w-px h-6 bg-amber-300/80" aria-hidden="true" />
              <img
                src="/logos/aicte-logo.webp"
                alt="AICTE"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <strong className="text-slate-900 font-bold text-xs tracking-wide">
                  अखिल भारतीय तकनीकी शिक्षा परिषद <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-extrabold ml-1">AICTE</span>
                </strong>
              </div>
              <small className="text-slate-500 text-[10px] font-medium tracking-tight">
                APAAR RegTech · Academic Governance &amp; Regulatory Scrutiny
              </small>
            </div>
          </Link>
        </div>

        <div className="workspace-topbar-right flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-700 bg-slate-50 hover:bg-amber-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-300 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Public Portal</span>
          </Link>

          <div className="workspace-role">
            <span className="workspace-role-icon">
              <role.Icon />
            </span>
            <span>
              <strong>{role.name}</strong>
              <small>{role.detail}</small>
            </span>
          </div>

          <Link href="/login" className="workspace-switch">
            <LogOut /> <span>Switch role</span>
          </Link>
        </div>
      </header>

      <aside className="line-sidebar" aria-label="Workspace navigation">
        <div className="sidebar-caption">REGULATORY WORKSPACE</div>
        <nav>
          {items.map(({ href, label, short, Icon, active, detail }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`line-sidebar-item ${active ? "is-active" : ""}`}
            >
              <GlassIcon className="sidebar-icon-glass">
                <Icon />
              </GlassIcon>
              <span className="sidebar-item-copy">
                <strong>{label}</strong>
                <small>{detail}</small>
              </span>
              <span className="sidebar-index">{short}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-status">
          <i />
          <span>
            Scrutiny cycle active<br />
            <small>Deterministic validation mode</small>
          </span>
        </div>
      </aside>
    </>
  );
};
