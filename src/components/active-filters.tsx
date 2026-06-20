"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { useLocale } from "@/contexts/language-context";
import { t } from "@/lib/i18n";

export interface ActiveFilter {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onClearAll }: ActiveFiltersProps) {
  const { locale } = useLocale();
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 animate-enter-fast">
      <SlidersHorizontal
        size={13}
        strokeWidth={1.5}
        className="text-muted-foreground/60 shrink-0"
      />
      <span className="text-[12px] font-medium text-muted-foreground mr-1">
        {t("activeFilters", locale)}
      </span>
      {filters.map((f) => (
        <span
          key={f.key}
          className="inline-flex items-center gap-1 rounded-full border border-amber-200/60 bg-amber-50/70 pl-2.5 pr-1 py-1 text-[12px] font-medium text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/25 dark:text-amber-300 transition-colors duration-200"
        >
          {f.label}
          <button
            onClick={f.onRemove}
            className="flex h-4 w-4 items-center justify-center rounded-full text-amber-500 hover:text-amber-700 hover:bg-amber-200/50 dark:hover:text-amber-200 dark:hover:bg-amber-800/30 transition-colors duration-150"
            aria-label={`移除筛选: ${f.label}`}
          >
            <X size={10} strokeWidth={1.5} />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="ml-1 text-[12px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
      >
        {t("clearAll", locale)}
      </button>
    </div>
  );
}
