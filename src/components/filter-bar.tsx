"use client";

import { useState } from "react";
import {
  ChevronDown,
  Brain,
  Sparkles,
  Star,
  Cpu,
  Flag,
  Layers,
  Zap,
  Coins,
  Clock,
  Shield,
  Building2,
  Cloud,
  MessageCircle,
  GitFork,
  BarChart3,
  LinkIcon,
  DollarSign,
  Radio,
  Wifi,
  Wrench,
  Users,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock3,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type StationCategory,
  type ModelCategory,
  type PaymentCategory,
  type PricingTier,
  type ChannelType,
  type UrlStatus,
  categoryLabels,
  modelLabels,
  paymentLabels,
  pricingTierLabels,
  channelTypeLabels,
  urlStatusLabels,
  modelCounts,
  paymentCounts,
  categoryCounts,
  pricingTierCounts,
  channelTypeCounts,
  urlStatusCounts,
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

const modelIcons: Record<ModelCategory, typeof Brain> = {
  Claude: Brain,
  GPT: Sparkles,
  Gemini: Star,
  DeepSeek: Cpu,
  "国产": Flag,
  "多模型": Layers,
};

const paymentIcons: Record<PaymentCategory, typeof Zap> = {
  "高性价比": Zap,
  "免费": Coins,
  "按量": Clock,
  "订阅": Shield,
};

const pricingTierIcons: Record<PricingTier, typeof DollarSign> = {
  "免费": Coins,
  "超低价": DollarSign,
  "低价": DollarSign,
  "均价": DollarSign,
  "溢价": DollarSign,
};

const channelTypeIcons: Record<ChannelType, typeof Radio> = {
  "官直": Radio,
  "中转": Wifi,
  "逆向": Wrench,
  "开源": GitFork,
  "拼车": Users,
  "未知": HelpCircle,
};

const urlStatusIcons: Record<UrlStatus, typeof CheckCircle2> = {
  verified: CheckCircle2,
  timeout: Clock3,
  dead: XCircle,
  unchecked: AlertTriangle,
};

interface FilterBarProps {
  categoryFilter: StationCategory | null;
  onCategoryChange: (c: StationCategory | null) => void;
  modelFilter: ModelCategory | null;
  onModelChange: (m: ModelCategory | null) => void;
  paymentFilter: PaymentCategory | null;
  onPaymentChange: (p: PaymentCategory | null) => void;
  pricingTierFilter: PricingTier | null;
  onPricingTierChange: (p: PricingTier | null) => void;
  channelTypeFilter: ChannelType | null;
  onChannelTypeChange: (c: ChannelType | null) => void;
  urlStatusFilter: UrlStatus | null;
  onUrlStatusChange: (u: UrlStatus | null) => void;
}

function PillButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Brain;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
        active
          ? "border-amber-300/80 bg-amber-100/50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-300"
          : "border-foreground/[0.05] bg-card hover:border-foreground/[0.10] text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon size={14} strokeWidth={1.5} />
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-0.5 font-mono text-[11px] tabular-nums opacity-60">
          {count}
        </span>
      )}
    </button>
  );
}

export function FilterBar({
  categoryFilter,
  onCategoryChange,
  modelFilter,
  onModelChange,
  paymentFilter,
  onPaymentChange,
  pricingTierFilter,
  onPricingTierChange,
  channelTypeFilter,
  onChannelTypeChange,
  urlStatusFilter,
  onUrlStatusChange,
}: FilterBarProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const advancedActive =
    pricingTierFilter || channelTypeFilter || urlStatusFilter;

  return (
    <div className="space-y-4">
      {/* Row 1: Category tabs */}
      <div className="rounded-2xl border border-foreground/[0.04] bg-card/50 px-3 py-2 shadow-deep">
        <Tabs
          value={categoryFilter ?? "all"}
          onValueChange={(v) => {
            if (v === "all") {
              onCategoryChange(null);
            } else {
              onCategoryChange(v as StationCategory);
            }
          }}
        >
          <TabsList variant="line" className="w-full justify-start gap-0.5 overflow-x-auto">
            <TabsTrigger
              value="all"
              className="after:!bg-amber-600 dark:after:!bg-amber-500 text-[13px] px-3"
            >
              <Layers size={15} strokeWidth={1.5} />
              全部
              <span className="ml-1 font-mono text-[11px] tabular-nums opacity-50">
                {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
              </span>
            </TabsTrigger>
            {(Object.keys(categoryLabels) as StationCategory[]).map((cat) => {
              const Icon = categoryIcons[cat];
              const count = categoryCounts[cat];
              return (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="after:!bg-amber-600 dark:after:!bg-amber-500 text-[13px] px-3"
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {categoryLabels[cat]}
                  <span className="ml-1 font-mono text-[11px] tabular-nums opacity-50">
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Row 2: Model + Payment pills */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {/* Model group */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-medium text-muted-foreground/70 tracking-wide mr-0.5">
            模型
          </span>
          {(Object.keys(modelLabels) as ModelCategory[]).map((m) => {
            const Icon = modelIcons[m];
            return (
              <PillButton
                key={m}
                active={modelFilter === m}
                onClick={() => onModelChange(modelFilter === m ? null : m)}
                icon={Icon}
                label={modelLabels[m]}
                count={modelCounts[m]}
              />
            );
          })}
        </div>

        {/* Payment group */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-medium text-muted-foreground/70 tracking-wide mr-0.5">
            付费
          </span>
          {(Object.keys(paymentLabels) as PaymentCategory[]).map((p) => {
            const Icon = paymentIcons[p];
            return (
              <PillButton
                key={p}
                active={paymentFilter === p}
                onClick={() => onPaymentChange(paymentFilter === p ? null : p)}
                icon={Icon}
                label={paymentLabels[p]}
                count={paymentCounts[p]}
              />
            );
          })}
        </div>
      </div>

      {/* Row 3: Advanced filters — collapsible */}
      <div>
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ${
            advancedActive
              ? "border-amber-300/60 bg-amber-100/40 text-amber-800 dark:border-amber-700/40 dark:bg-amber-950/15 dark:text-amber-300"
              : "border-foreground/[0.04] bg-card text-muted-foreground hover:border-foreground/[0.08] hover:text-foreground"
          }`}
        >
          高级筛选
          {advancedActive && (
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white tabular-nums">
              {(pricingTierFilter ? 1 : 0) +
                (channelTypeFilter ? 1 : 0) +
                (urlStatusFilter ? 1 : 0)}
            </span>
          )}
          <ChevronDown
            size={13}
            strokeWidth={1.5}
            className={`transition-transform duration-200 ${
              advancedOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {advancedOpen && (
          <div className="mt-3 grid gap-4 rounded-2xl border border-foreground/[0.04] bg-card/50 p-5 animate-enter-fast sm:grid-cols-3">
            {/* Pricing tier */}
            <div>
              <span className="text-[11px] font-semibold tracking-wide uppercase text-muted-foreground">
                价格档位
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {(Object.keys(pricingTierLabels) as PricingTier[]).map((pt) => {
                  const Icon = pricingTierIcons[pt];
                  const count = pricingTierCounts[pt];
                  const active = pricingTierFilter === pt;
                  return (
                    <button
                      key={pt}
                      onClick={() =>
                        onPricingTierChange(active ? null : pt)
                      }
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-all duration-200 ${
                        active
                          ? "border-amber-300/80 bg-amber-100/50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-300"
                          : "border-foreground/[0.04] bg-card hover:border-foreground/[0.08] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon size={11} strokeWidth={1.5} />
                      {pricingTierLabels[pt]}
                      <span className="font-mono text-[10px] tabular-nums opacity-50">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Channel type */}
            <div>
              <span className="text-[11px] font-semibold tracking-wide uppercase text-muted-foreground">
                渠道类型
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {(Object.keys(channelTypeLabels) as ChannelType[]).map((ct) => {
                  const Icon = channelTypeIcons[ct];
                  const count = channelTypeCounts[ct];
                  const active = channelTypeFilter === ct;
                  return (
                    <button
                      key={ct}
                      onClick={() =>
                        onChannelTypeChange(active ? null : ct)
                      }
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-all duration-200 ${
                        active
                          ? "border-amber-300/80 bg-amber-100/50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-300"
                          : "border-foreground/[0.04] bg-card hover:border-foreground/[0.08] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon size={11} strokeWidth={1.5} />
                      {channelTypeLabels[ct]}
                      <span className="font-mono text-[10px] tabular-nums opacity-50">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* URL status */}
            <div>
              <span className="text-[11px] font-semibold tracking-wide uppercase text-muted-foreground">
                连接状态
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {(Object.keys(urlStatusLabels) as UrlStatus[]).map((us) => {
                  const Icon = urlStatusIcons[us];
                  const count = urlStatusCounts[us];
                  const active = urlStatusFilter === us;
                  return (
                    <button
                      key={us}
                      onClick={() =>
                        onUrlStatusChange(active ? null : us)
                      }
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-all duration-200 ${
                        active
                          ? "border-amber-300/80 bg-amber-100/50 text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-300"
                          : "border-foreground/[0.04] bg-card hover:border-foreground/[0.08] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon size={11} strokeWidth={1.5} />
                      {urlStatusLabels[us]}
                      <span className="font-mono text-[10px] tabular-nums opacity-50">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
