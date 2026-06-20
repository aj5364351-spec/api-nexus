"use client";

import {
  Layers,
  Building2,
  Sparkles,
  Cloud,
  MessageCircle,
  GitFork,
  BarChart3,
  LinkIcon,
  ShieldCheck,
  Activity,
} from "lucide-react";
import {
  type StationCategory,
  categoryLabels,
  categoryCounts,
  stations,
} from "@/data/api-stations";

const categoryIcons: Record<StationCategory, typeof Building2> = {
  enterprise: Building2,
  budget: Sparkles,
  cloud: Cloud,
  community: MessageCircle,
  opensource: GitFork,
  aggregator: BarChart3,
  apinav: LinkIcon,
};

const categoryShortLabels: Record<StationCategory, string> = {
  enterprise: "企业级",
  budget: "性价比",
  cloud: "云平台",
  community: "社区",
  opensource: "开源",
  aggregator: "导航",
  apinav: "收录",
};

interface StatsBarProps {
  activeCategory: StationCategory | null;
  onCategoryClick: (c: StationCategory | null) => void;
}

export function StatsBar({ activeCategory, onCategoryClick }: StatsBarProps) {
  const total = stations.length;
  const verified = stations.filter((s) => s.urlStatus === "verified").length;
  const verifiedPct = Math.round((verified / total) * 100);

  return (
    <div className="rounded-2xl border border-foreground/[0.04] bg-card/50 px-5 py-4 shadow-deep">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {/* Total count */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/40">
            <Layers size={18} strokeWidth={1.5} className="text-foreground/50" />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-heading)] text-[22px] font-semibold leading-none tabular-nums text-foreground">
              {total}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              收录站点
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-foreground/[0.05]" />

        {/* Verified ratio */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20">
            <ShieldCheck
              size={18}
              strokeWidth={1.5}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-heading)] text-[22px] font-semibold leading-none tabular-nums text-foreground">
              {verifiedPct}%
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              已验证存活
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-foreground/[0.05]" />

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <Activity
            size={14}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          <span className="text-[12px] font-medium text-muted-foreground">
            数据更新: 2026-06-20
          </span>
        </div>

        {/* Category pills — pushed to the right */}
        <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto">
          {(Object.keys(categoryLabels) as StationCategory[]).map((cat) => {
            const count = categoryCounts[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  onCategoryClick(isActive ? null : cat)
                }
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "border-amber-300 bg-amber-100/60 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                    : "border-foreground/[0.04] bg-card hover:border-foreground/[0.08] text-muted-foreground hover:text-foreground"
                }`}
              >
                {categoryShortLabels[cat]}
                <span className="font-mono text-[10px] tabular-nums opacity-60">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
