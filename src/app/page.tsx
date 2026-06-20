"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  Layers,
  LayoutGrid,
  List,
  SearchX,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { StationCard } from "@/components/station-card";
import { StatsBar } from "@/components/stats-bar";
import { FilterBar } from "@/components/filter-bar";
import { ActiveFilters, type ActiveFilter } from "@/components/active-filters";
import { useLocale } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import {
  getStationsByFilter,
  type StationCategory,
  type ModelCategory,
  type PaymentCategory,
  type PricingTier,
  type ChannelType,
  type UrlStatus,
  modelLabels,
  paymentLabels,
  pricingTierLabels,
  channelTypeLabels,
  urlStatusLabels,
  categoryLabels,
} from "@/data/api-stations";

export default function Home() {
  const { locale } = useLocale();

  // ─── State ───
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<StationCategory | null>(null);
  const [modelFilter, setModelFilter] = useState<ModelCategory | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<PaymentCategory | null>(null);
  const [pricingTierFilter, setPricingTierFilter] = useState<PricingTier | null>(null);
  const [channelTypeFilter, setChannelTypeFilter] = useState<ChannelType | null>(null);
  const [urlStatusFilter, setUrlStatusFilter] = useState<UrlStatus | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ─── Filtered results ───
  const filteredStations = useMemo(
    () =>
      getStationsByFilter({
        query,
        category: categoryFilter,
        modelCategory: modelFilter,
        paymentCategory: paymentFilter,
        pricingTier: pricingTierFilter,
        channelType: channelTypeFilter,
        urlStatus: urlStatusFilter,
      }),
    [
      query,
      categoryFilter,
      modelFilter,
      paymentFilter,
      pricingTierFilter,
      channelTypeFilter,
      urlStatusFilter,
    ]
  );

  // ─── Active filter chips ───
  const activeFilters = useMemo(() => {
    const list: ActiveFilter[] = [];
    if (categoryFilter) {
      list.push({
        key: "category",
        label: categoryLabels[categoryFilter],
        onRemove: () => setCategoryFilter(null),
      });
    }
    if (modelFilter) {
      list.push({
        key: "model",
        label: modelLabels[modelFilter],
        onRemove: () => setModelFilter(null),
      });
    }
    if (paymentFilter) {
      list.push({
        key: "payment",
        label: paymentLabels[paymentFilter],
        onRemove: () => setPaymentFilter(null),
      });
    }
    if (pricingTierFilter) {
      list.push({
        key: "pricing",
        label: pricingTierLabels[pricingTierFilter],
        onRemove: () => setPricingTierFilter(null),
      });
    }
    if (channelTypeFilter) {
      list.push({
        key: "channel",
        label: channelTypeLabels[channelTypeFilter],
        onRemove: () => setChannelTypeFilter(null),
      });
    }
    if (urlStatusFilter) {
      list.push({
        key: "status",
        label: urlStatusLabels[urlStatusFilter],
        onRemove: () => setUrlStatusFilter(null),
      });
    }
    return list;
  }, [
    categoryFilter,
    modelFilter,
    paymentFilter,
    pricingTierFilter,
    channelTypeFilter,
    urlStatusFilter,
  ]);

  const clearAllFilters = () => {
    setQuery("");
    setCategoryFilter(null);
    setModelFilter(null);
    setPaymentFilter(null);
    setPricingTierFilter(null);
    setChannelTypeFilter(null);
    setUrlStatusFilter(null);
  };

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="grid-pattern flex-1">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 pb-24">
        {/* ═══════ Hero — Asymmetric ═══════ */}
        <section className="relative pt-16 pb-8 md:pt-24 md:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
            {/* Left zone: text + search */}
            <div className="flex flex-col animate-enter">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.04] bg-card/60 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground w-fit">
                <Layers size={13} strokeWidth={1.5} />
                {t("heroBadge", locale)}
              </span>

              <h1 className="mt-6 font-[family-name:var(--font-heading)] text-[44px] leading-[1.08] tracking-tight text-foreground sm:text-[52px] md:text-[60px]">
                {t("heroTitle", locale)}
              </h1>

              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground font-[family-name:var(--font-body)] font-normal">
                {t("heroSubtitle", locale)}
              </p>

              {/* Search — left aligned */}
              <div className="relative mt-6 w-full max-w-lg">
                <div className="shadow-deep rounded-2xl">
                  <div className="relative flex items-center">
                    <Search
                      size={18}
                      strokeWidth={1.5}
                      className="absolute left-4 text-muted-foreground pointer-events-none"
                    />
                    <Input
                      type="text"
                      placeholder={t("heroSearchPlaceholder", locale)}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-foreground/[0.05] bg-card pl-11 pr-12 text-[15px] font-normal placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-amber-500/30 focus-visible:ring-offset-0"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-4 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right zone: decorative stat card */}
            <div className="hidden lg:flex flex-col items-end justify-start pt-2 animate-enter stagger-3">
              <div className="rounded-2xl border border-foreground/[0.03] bg-card/40 p-6 shadow-deep w-full max-w-[280px]">
                <div className="flex items-center gap-2 mb-4">
                  <Activity
                    size={15}
                    strokeWidth={1.5}
                    className="text-amber-600 dark:text-amber-500"
                  />
                  <span className="text-[12px] font-semibold tracking-wide uppercase text-muted-foreground">
                    {locale === "zh" ? "实时状态" : "Live Status"}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-[family-name:var(--font-heading)] text-[28px] font-semibold leading-none tabular-nums text-foreground">
                      178+
                    </span>
                    <p className="mt-1 text-[13px] text-muted-foreground leading-snug">
                      {locale === "zh" ? "收录站点" : "Listed Sites"}
                    </p>
                  </div>
                  <div>
                    <span className="font-[family-name:var(--font-heading)] text-[28px] font-semibold leading-none tabular-nums text-foreground">
                      7
                    </span>
                    <p className="mt-1 text-[13px] text-muted-foreground leading-snug">
                      {locale === "zh" ? "筛选维度" : "Filter Dimensions"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[12px] text-muted-foreground">
                      {locale === "zh" ? "每日 URL 验证" : "Daily URL Check"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Stats Bar ═══════ */}
        <section className="animate-enter stagger-4">
          <StatsBar
            activeCategory={categoryFilter}
            onCategoryClick={setCategoryFilter}
          />
        </section>

        {/* ═══════ Filter Bar ═══════ */}
        <section className="mt-6 animate-enter stagger-5">
          <FilterBar
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            modelFilter={modelFilter}
            onModelChange={setModelFilter}
            paymentFilter={paymentFilter}
            onPaymentChange={setPaymentFilter}
            pricingTierFilter={pricingTierFilter}
            onPricingTierChange={setPricingTierFilter}
            channelTypeFilter={channelTypeFilter}
            onChannelTypeChange={setChannelTypeFilter}
            urlStatusFilter={urlStatusFilter}
            onUrlStatusChange={setUrlStatusFilter}
          />
        </section>

        {/* ═══════ Active Filters ═══════ */}
        <section className="mt-4">
          <ActiveFilters
            filters={activeFilters}
            onClearAll={clearAllFilters}
          />
        </section>

        {/* ═══════ Results Header ═══════ */}
        <section className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-medium tracking-tight text-foreground">
              {hasActiveFilters ? t("resultsFiltered", locale) : t("resultsAll", locale)}
            </h2>
            <span className="text-[13px] font-normal text-muted-foreground tabular-nums">
              {filteredStations.length}
              {locale === "zh" ? " 个" : ""}
            </span>
          </div>

          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-foreground/[0.05] bg-card p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center justify-center rounded-md p-1.5 transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-muted/60 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="网格视图"
            >
              <LayoutGrid size={15} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center justify-center rounded-md p-1.5 transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-muted/60 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="列表视图"
            >
              <List size={15} strokeWidth={1.5} />
            </button>
          </div>
        </section>

        {/* ═══════ Station Cards ═══════ */}
        <section className="mt-4">
          {filteredStations.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-3"
              }
            >
              {filteredStations.map((station, i) => (
                <StationCard
                  key={station.id}
                  station={station}
                  layout={viewMode}
                  style={{
                    animationDelay: `${Math.min(i, 20) * 40}ms`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/30 mb-5">
                <SearchX
                  size={24}
                  strokeWidth={1.5}
                  className="text-muted-foreground/50"
                />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-[20px] font-medium text-foreground">
                {t("emptyTitle", locale)}
              </h3>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground font-normal">
                {t("emptySubtitle", locale)}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-amber-300/60 bg-amber-100/40 px-4 py-2 text-[13px] font-medium text-amber-800 transition-all duration-200 hover:bg-amber-100/60 dark:border-amber-700/40 dark:bg-amber-950/20 dark:text-amber-300 dark:hover:bg-amber-950/30"
                >
                  <X size={13} strokeWidth={1.5} />
                  {t("emptyClearFilters", locale)}
                </button>
              )}
            </div>
          )}
        </section>

        {/* ═══════ Footer ═══════ */}
        <footer className="mt-20 border-t border-foreground/[0.04] pt-8 text-center">
          <p className="text-[13px] leading-relaxed font-normal text-muted-foreground">
            {t("footerText", locale)}{" "}
            <a
              href="https://apinav.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 underline underline-offset-2 transition-colors"
            >
              {t("footerSource", locale)}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
