"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  Layers,
  SearchX,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { StationCard } from "@/components/station-card";
import { FilterBar } from "@/components/filter-bar";
import { ActiveFilters, type ActiveFilter } from "@/components/active-filters";
import { useLocale } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import {
  stations,
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
    <div className="flex-1">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16 pb-24">
        {/* ═══════ Hero — Anthropic-style ═══════ */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-20">
          <div className="flex flex-col max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.15em] uppercase text-muted-foreground font-sans">
              <Layers size={14} strokeWidth={1.5} />
              {t("heroBadge", locale)}
            </span>

            <h1 className="mt-6 font-sans text-[48px] leading-[1.05] tracking-[-0.02em] font-bold text-foreground sm:text-[56px] md:text-[64px]">
              {t("heroTitle", locale)}
            </h1>

            <p className="mt-6 max-w-xl text-[20px] leading-[1.5] text-muted-foreground font-normal" style={{fontFamily: "Georgia, 'Times New Roman', serif"}}>
              {t("heroSubtitle", locale)}
            </p>

            {/* Search */}
            <div className="relative mt-8 w-full max-w-xl">
              <div className="relative flex items-center">
                <Search size={20} strokeWidth={1.5} className="absolute left-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder={t("heroSearchPlaceholder", locale)}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-[52px] w-full rounded-lg border border-foreground/[0.08] bg-card pl-12 pr-12 text-[16px] font-normal placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0"
                  style={{fontFamily: "Georgia, 'Times New Roman', serif"}}
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-4 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <X size={16} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Dark emphasis band — 关键数据 ═══════ */}
        <section className="mt-16 -mx-8 lg:-mx-16 px-8 lg:px-16 py-16" style={{backgroundColor: '#141413'}}>
          <div className="max-w-[1280px] mx-auto">
            <span className="text-[11px] font-sans font-semibold tracking-[0.18em] uppercase" style={{color: '#87867f'}}>
              {locale === "zh" ? "实时数据" : "Live Data"}
            </span>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <span className="font-sans text-[48px] font-bold leading-none tabular-nums" style={{color: '#faf9f5'}}>
                  {stations.length}
                </span>
                <p className="mt-2 text-[16px] leading-snug" style={{color: '#87867f', fontFamily: "Georgia, 'Times New Roman', serif"}}>
                  {locale === "zh" ? "收录 API 站点" : "Listed API Sites"}
                </p>
              </div>
              <div>
                <span className="font-sans text-[48px] font-bold leading-none tabular-nums" style={{color: '#faf9f5'}}>
                  {Math.round(stations.filter(s => s.urlStatus === "verified").length / stations.length * 100)}%
                </span>
                <p className="mt-2 text-[16px] leading-snug" style={{color: '#87867f', fontFamily: "Georgia, 'Times New Roman', serif"}}>
                  {locale === "zh" ? "已验证存活" : "Verified Alive"}
                </p>
              </div>
              <div>
                <span className="font-sans text-[48px] font-bold leading-none tabular-nums" style={{color: '#faf9f5'}}>
                  7
                </span>
                <p className="mt-2 text-[16px] leading-snug" style={{color: '#87867f', fontFamily: "Georgia, 'Times New Roman', serif"}}>
                  {locale === "zh" ? "筛选维度" : "Filter Dimensions"}
                </p>
              </div>
              <div>
                <span className="font-sans text-[48px] font-bold leading-none tabular-nums" style={{color: '#faf9f5'}}>
                  2026
                </span>
                <p className="mt-2 text-[16px] leading-snug" style={{color: '#87867f', fontFamily: "Georgia, 'Times New Roman', serif"}}>
                  {locale === "zh" ? "数据年份" : "Data Year"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Stats + Filter ═══════ */}
        <section className="mt-16">
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

        {/* ═══════ Section heading — "Latest releases" style ═══════ */}
        <section className="mt-16">
          <h2 className="font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[40px]">
            {hasActiveFilters ? t("resultsFiltered", locale) : t("resultsAll", locale)}
          </h2>
          <span className="mt-2 inline-block font-sans text-[16px] font-normal text-muted-foreground">
            {filteredStations.length}{locale === "zh" ? " 个站点" : " stations"}
          </span>
        </section>

        {/* ═══════ Station Cards — 3-column grid ═══════ */}
        <section className="mt-8">
          {filteredStations.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStations.map((station, i) => (
                <StationCard
                  key={station.id}
                  station={station}
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
