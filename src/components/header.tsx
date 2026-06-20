"use client";

import { Search, GitFork, Layers, Languages } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocale } from "@/contexts/language-context";
import { t } from "@/lib/i18n";

export function Header() {
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="glass-header sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 no-underline">
          <span className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight text-foreground italic">
            API
          </span>
          <span className="-ml-1 mt-[2px] font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight text-foreground">
            Nexus
          </span>
          <span className="mt-[2px] rounded-md border border-foreground/[0.06] px-1.5 py-0 text-[10px] font-semibold tracking-[0.10em] uppercase text-muted-foreground">
            Beta
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="https://apinav.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <Search size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">ApiNav</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <GitFork size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle />
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-[12px] font-semibold tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label="切换语言"
          >
            <Languages size={14} strokeWidth={1.5} />
            <span className="tabular-nums">{locale === "zh" ? "EN" : "中"}</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <a
            href="https://apinav.cc/submit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-foreground/[0.06] px-3 py-1.5 text-[12px] font-medium tracking-wide text-muted-foreground transition-all duration-200 hover:border-foreground/[0.12] hover:text-foreground"
          >
            提交站点
          </a>
        </div>
      </div>
    </header>
  );
}
