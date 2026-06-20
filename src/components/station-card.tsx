import { ExternalLink, ChevronRight, AlertCircle, Clock, Brain, Sparkles, Star, Cpu, Flag, Layers, Zap, Shield, Wrench, LinkIcon } from "lucide-react";
import { type ApiStation, type ChannelType, type ModelCategory } from "@/data/api-stations";

interface StationCardProps {
  station: ApiStation;
  layout?: "grid" | "list";
  style?: React.CSSProperties;
}

const modelIcons: Record<ModelCategory, typeof Brain> = {
  Claude: Brain, GPT: Sparkles, Gemini: Star, DeepSeek: Cpu,
  "国产": Flag, "多模型": Layers,
};

const channelMeta: Record<ChannelType, { icon: typeof Zap; label: string; className: string }> = {
  "官直": { icon: Shield, label: "官直", className: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40" },
  "中转": { icon: Zap, label: "中转", className: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40" },
  "逆向": { icon: Wrench, label: "逆向", className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40" },
  "开源": { icon: LinkIcon, label: "开源", className: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40" },
  "拼车": { icon: LinkIcon, label: "拼车", className: "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/40" },
  "未知": { icon: Zap, label: "未知", className: "bg-muted text-muted-foreground border-muted-foreground/10" },
};

const statusDotColor: Record<string, string> = {
  verified: "bg-emerald-500",
  timeout: "bg-amber-500",
  dead: "bg-red-400",
  unchecked: "bg-muted-foreground/30",
};

export function StationCard({ station, layout = "grid", style }: StationCardProps) {
  const isDead = station.urlStatus === "dead";
  const isTimeout = station.urlStatus === "timeout";
  const ch = station.channelType ? channelMeta[station.channelType] : null;
  const ChannelIcon = ch?.icon || null;
  const ModelIcon = station.modelCategory ? modelIcons[station.modelCategory] : null;
  const isOpenSource = station.channelType === "开源";
  const isApiNav = station.category === "apinav";
  const dotColor = statusDotColor[station.urlStatus] || statusDotColor.unchecked;

  // Anthropic-inspired card: oat bg, serif description, dark CTA
  if (layout === "list") {
    return (
      <a href={station.url} target="_blank" rel="noopener noreferrer"
        className="shadow-card group flex items-center gap-5 rounded-2xl px-8 py-6 no-underline transition-all duration-200"
        style={{ ...style, backgroundColor: '#e3dacc' }}
      >
        <div className={`shrink-0 h-2.5 w-2.5 rounded-full ${dotColor}`} />
        {ModelIcon && (
          <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white/50">
            <ModelIcon size={20} strokeWidth={1.5} className="text-foreground/60" />
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1 gap-1">
          <h3 className="truncate font-sans text-[20px] font-semibold leading-[1.3] text-foreground">
            {station.name}
          </h3>
          <p className="line-clamp-1 text-[17px] leading-[1.45] text-foreground/70 font-normal" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {station.description}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          {ch && (
            <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[13px] font-semibold ${ch.className}`}>
              {ChannelIcon && <ChannelIcon size={11} strokeWidth={1.5} />}{ch.label}
            </span>
          )}
          {station.minDeposit && (
            <span className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[14px] font-medium font-sans" style={{ backgroundColor: '#141413', color: '#faf9f5' }}>
              {station.minDeposit}
              <ChevronRight size={13} strokeWidth={1.5} />
            </span>
          )}
        </div>
      </a>
    );
  }

  // Grid card
  return (
    <a href={station.url} target="_blank" rel="noopener noreferrer"
      className="shadow-card group relative flex flex-col rounded-2xl p-8 no-underline transition-all duration-200"
      style={{ ...style, backgroundColor: '#e3dacc' }}
    >
      {/* Status badges — top right */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        {isDead && (
          <span className="inline-flex items-center gap-1 rounded-md bg-red-100/70 px-2 py-0.5 text-[11px] font-semibold text-red-600 font-sans">
            <AlertCircle size={10} /> Dead
          </span>
        )}
        {isTimeout && (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/70 px-2 py-0.5 text-[11px] font-semibold text-amber-600 font-sans">
            <Clock size={10} /> Proxy
          </span>
        )}
      </div>

      {/* Status dot */}
      <div className={`h-2.5 w-2.5 rounded-full ${dotColor} mb-5`} />

      {/* Card title — Anthropic style: Arial, 24px, 600 */}
      <h3 className="font-sans text-[22px] font-semibold leading-[1.3] text-foreground tracking-[-0.01em]">
        {station.name}
        {station.featured && (
          <span className="ml-2 inline-flex rounded-md bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-semibold tracking-[0.1em] uppercase font-sans text-foreground/50">
            Hot
          </span>
        )}
      </h3>

      {/* URL — mono label like DATE/CATEGORY */}
      {!isOpenSource && !isApiNav && (
        <span className="mt-2 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-foreground/40">
          {station.url.replace(/^https?:\/\//, "").replace(/\/.*/, "")}
        </span>
      )}

      {/* Description — Anthropic style: Georgia serif, 18px, 400 */}
      <p className="mt-4 text-[17px] leading-[1.45] text-foreground/70 font-normal flex-1"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {station.description}
      </p>

      {/* Channel + pricing badges */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {ch && (
          <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[13px] font-semibold font-sans ${ch.className}`}>
            {ChannelIcon && <ChannelIcon size={11} strokeWidth={1.5} />}{ch.label}
          </span>
        )}
        {station.pricingTier && (
          <span className="inline-flex items-center rounded-md bg-white/40 px-2 py-0.5 text-[13px] font-medium font-sans text-foreground/60">
            {station.pricingTier}
          </span>
        )}
        {station.exchangeRate && (
          <span className="inline-flex items-center font-sans text-[13px] font-medium text-foreground/50 tabular-nums">
            {station.exchangeRate}
          </span>
        )}
        {(station.paymentCategory === "订阅" || (station.paymentCategory === "免费" && station.pricingTier !== "免费")) && (
          <span className="inline-flex items-center rounded-md bg-violet-50/80 px-2 py-0.5 text-[13px] font-semibold font-sans text-violet-700 border border-violet-200/60">
            {station.paymentCategory === "订阅" ? "订阅制" : "免费"}
          </span>
        )}
      </div>

      {/* Model tags */}
      {station.models && station.models.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {station.models.map((m) => (
            <span key={m} className="inline-flex items-center rounded-md bg-white/30 px-2 py-0.5 text-[12px] font-medium font-sans text-foreground/50">
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {station.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-md bg-white/30 px-2 py-0.5 text-[12px] font-normal font-sans text-foreground/50">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA bar — dark like "Read announcement" */}
      <div className="mt-6 flex items-center justify-between rounded-xl px-5 py-3.5"
        style={{ backgroundColor: '#141413' }}>
        {station.minDeposit ? (
          <span className="font-sans text-[15px] font-medium tabular-nums" style={{ color: '#87867f' }}>
            起充 <span style={{ color: '#faf9f5' }} className="font-semibold">{station.minDeposit}</span>
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-2 font-sans text-[15px] font-medium transition-colors group-hover:opacity-80"
          style={{ color: '#faf9f5' }}>
          {isOpenSource ? "GitHub" : isApiNav ? "在 ApiNav 查看" : "进入"}
          {isApiNav ? <ExternalLink size={14} strokeWidth={1.5} /> : <ChevronRight size={14} strokeWidth={1.5} />}
        </span>
      </div>
    </a>
  );
}
