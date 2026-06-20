import { ExternalLink, ChevronRight, AlertCircle, Clock, Brain, Sparkles, Star, Cpu, Flag, Layers, Zap, Shield, Wrench, LinkIcon } from "lucide-react";
import { type ApiStation, type ChannelType, type ModelCategory } from "@/data/api-stations";

interface StationCardProps {
  station: ApiStation;
  layout?: "grid" | "list";
  style?: React.CSSProperties;
}

// ─── 模型图标映射 ───
const modelIcons: Record<ModelCategory, typeof Brain> = {
  Claude: Brain,
  GPT: Sparkles,
  Gemini: Star,
  DeepSeek: Cpu,
  "国产": Flag,
  "多模型": Layers,
};

// ─── 渠道类型配置 ───
const channelMeta: Record<ChannelType, { icon: typeof Zap; label: string; className: string }> = {
  "官直": { icon: Shield, label: "官直", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50" },
  "中转": { icon: Zap, label: "中转", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50" },
  "逆向": { icon: Wrench, label: "逆向", className: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/50" },
  "开源": { icon: LinkIcon, label: "开源", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/50" },
  "拼车": { icon: LinkIcon, label: "拼车", className: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-800/50" },
  "未知": { icon: Zap, label: "未知", className: "bg-muted text-muted-foreground border-muted-foreground/10" },
};

// ─── 状态点颜色 ───
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

  // ─── 列表模式 ───
  if (layout === "list") {
    return (
      <a
        href={station.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-card group flex items-center gap-4 rounded-2xl border border-foreground/[0.04] bg-card px-5 py-4 no-underline transition-all duration-300"
        style={style}
      >
        {/* Status dot */}
        <div className={`shrink-0 h-2 w-2 rounded-full ${dotColor}`} />

        {/* Model icon */}
        {ModelIcon && (
          <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-muted/40 border border-foreground/[0.02]">
            <ModelIcon size={18} strokeWidth={1.5} className="text-foreground/50" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col min-w-0 flex-1 gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-[family-name:var(--font-heading)] text-[16px] font-semibold leading-tight tracking-tight text-card-foreground">
              {station.name}
            </h3>
            {station.featured && (
              <span className="shrink-0 rounded-md bg-amber-100/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-amber-700">
                Hot
              </span>
            )}
          </div>
          <p className="line-clamp-1 text-[13px] leading-relaxed text-muted-foreground font-normal">
            {station.description}
          </p>
        </div>

        {/* Right meta */}
        <div className="shrink-0 flex items-center gap-2">
          {ch && (
            <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold ${ch.className}`}>
              {ChannelIcon && <ChannelIcon size={10} strokeWidth={1.5} />}
              {ch.label}
            </span>
          )}
          {station.pricingTier && (
            <span className="text-[11px] font-medium text-muted-foreground">
              {station.pricingTier}
            </span>
          )}
          {station.minDeposit && (
            <span className="text-[12px] font-medium text-foreground tabular-nums">
              {station.minDeposit}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground transition-colors group-hover:text-foreground ml-2">
            {isOpenSource ? "GitHub" : isApiNav ? "查看" : "进入"}
            {isApiNav ? <ExternalLink size={12} strokeWidth={1.5} /> : <ChevronRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />}
          </span>
        </div>
      </a>
    );
  }

  // ─── 网格模式 (默认) ───
  return (
    <a
      href={station.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shadow-card group relative flex flex-col gap-3 rounded-2xl border border-foreground/[0.04] bg-card p-5 no-underline transition-all duration-300"
      style={style}
    >
      {/* ── 右上角状态徽章 ── */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        {isDead && (
          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-500 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle size={9} /> 失效
          </span>
        )}
        {isTimeout && (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-500 dark:bg-amber-950/30 dark:text-amber-400">
            <Clock size={9} /> 需代理
          </span>
        )}
      </div>

      {/* ── 顶部: 状态点 + 模型图标 + 标题 ── */}
      <div className="flex items-start gap-3 pr-14">
        {/* Status dot + Model icon */}
        <div className="shrink-0 mt-0.5 flex flex-col items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${dotColor}`} />
          {ModelIcon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/40 border border-foreground/[0.02]">
              <ModelIcon size={18} strokeWidth={1.5} className="text-foreground/50" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {/* Name + featured badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="truncate font-[family-name:var(--font-heading)] text-[17px] font-semibold leading-tight tracking-tight text-card-foreground">
              {station.name}
            </h3>
            {station.featured && (
              <span className="shrink-0 rounded-md bg-amber-100/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                Hot
              </span>
            )}
          </div>

          {/* URL */}
          {!isOpenSource && !isApiNav && (
            <span className="truncate text-[12px] font-normal text-muted-foreground/70 font-mono">
              {station.url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-[14px] leading-relaxed text-muted-foreground font-normal pl-[calc(2.25rem+0.75rem+0.5rem)]">
        {station.description}
      </p>

      {/* ── Meta row: channel + price + exchange ── */}
      <div className="flex flex-wrap items-center gap-1.5 pl-[calc(2.25rem+0.75rem+0.5rem)]">
        {ch && (
          <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold ${ch.className}`}>
            {ChannelIcon && <ChannelIcon size={10} strokeWidth={1.5} />}
            {ch.label}
          </span>
        )}
        {station.pricingTier && (
          <span className="inline-flex items-center rounded-md bg-muted/40 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {station.pricingTier}
          </span>
        )}
        {station.exchangeRate && (
          <span className="inline-flex items-center rounded-md bg-muted/40 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground font-mono tabular-nums">
            {station.exchangeRate}
          </span>
        )}
        {station.paymentCategory && (
          <span className="inline-flex items-center rounded-md bg-muted/30 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {station.paymentCategory === "高性价比" ? "高性价比" :
             station.paymentCategory === "免费" ? "免费" :
             station.paymentCategory === "按量" ? "按量" : "订阅"}
          </span>
        )}
      </div>

      {/* ── Model tags ── */}
      {station.models && station.models.length > 0 && (
        <div className="flex flex-wrap gap-1 pl-[calc(2.25rem+0.75rem+0.5rem)]">
          {station.models.map((m) => (
            <span key={m} className="inline-flex items-center rounded-md bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      )}

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-1.5 pl-[calc(2.25rem+0.75rem+0.5rem)]">
        {station.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-md bg-muted/40 px-1.5 py-0 text-[11px] font-normal text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto flex items-center justify-between border-t border-foreground/[0.04] pt-3 pl-[calc(2.25rem+0.75rem+0.5rem)]">
        {station.minDeposit ? (
          <span className="text-[12px] font-normal text-muted-foreground">
            起充 <span className="font-semibold text-foreground tabular-nums">{station.minDeposit}</span>
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {isOpenSource ? "GitHub" : isApiNav ? "在 ApiNav 查看" : "进入"}
          {isApiNav ? <ExternalLink size={12} strokeWidth={1.5} /> : <ChevronRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />}
        </span>
      </div>
    </a>
  );
}
