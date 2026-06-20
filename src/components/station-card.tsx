import { ChevronRight } from "lucide-react";
import { type ApiStation, type ChannelType } from "@/data/api-stations";

interface StationCardProps {
  station: ApiStation;
  style?: React.CSSProperties;
}

const channelLabel: Record<ChannelType, string> = {
  "官直": "Official", "中转": "Relay", "逆向": "Reverse",
  "开源": "Open Source", "拼车": "Group", "未知": "Unknown",
};

export function StationCard({ station, style }: StationCardProps) {
  const isDead = station.urlStatus === "dead";
  const isTimeout = station.urlStatus === "timeout";
  const chLabel = station.channelType ? channelLabel[station.channelType] : "Unknown";
  const dateLabel = isDead ? "Dead" : isTimeout ? "Proxy" : station.pricingTier ?? "Active";
  const urlShort = station.url.replace(/^https?:\/\//, "").replace(/\/.*/, "");

  return (
    <a
      href={station.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[18px] p-7 no-underline transition-all duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: "#F0EBE1", ...style }}
    >
      {/* ── URL domain badge ── */}
      <span
        className="inline-block self-start rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] mb-5 font-sans"
        style={{ backgroundColor: "rgba(20,20,19,0.05)", color: "#87867f" }}
      >
        {urlShort}
      </span>

      {/* ── Title: Bold 700 sans-serif, left-aligned ── */}
      <h3
        className="font-sans text-[20px] font-bold leading-[1.25] text-left"
        style={{ color: "#141413" }}
      >
        {station.name}
      </h3>

      {/* ── Description: Regular 400 sans-serif, left-aligned ── */}
      <p
        className="mt-2.5 font-sans text-[15px] font-normal leading-[1.55] text-left"
        style={{ color: "#5e5d59" }}
      >
        {station.description}
      </p>

      {/* ── Thin gray divider ── */}
      <div className="mt-5" style={{ height: "1px", backgroundColor: "rgba(20,20,19,0.08)" }} />

      {/* ── Meta row: CATEGORY (left) · DATE (center/right) ── */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#87867f" }}
        >
          CATEGORY
        </span>
        <span
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#87867f" }}
        >
          DATE
        </span>
      </div>

      {/* ── Values row: channel label (left) · pricing/status (right) ── */}
      <div className="mt-1.5 flex items-center justify-between">
        <span
          className="font-sans text-[15px] font-medium"
          style={{ color: "#141413" }}
        >
          {chLabel}
        </span>
        <span
          className="font-sans text-[15px] font-medium tabular-nums"
          style={{ color: "#141413" }}
        >
          {dateLabel}
        </span>
      </div>

      {/* ── Thin gray divider ── */}
      <div className="mt-4" style={{ height: "1px", backgroundColor: "rgba(20,20,19,0.08)" }} />

      {/* ── Tags row ── */}
      {station.models && station.models.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {station.models.slice(0, 4).map((m) => (
            <span
              key={m}
              className="inline-flex items-center rounded-md px-2 py-0.5 font-sans text-[12px] font-medium"
              style={{ backgroundColor: "rgba(20,20,19,0.04)", color: "#5e5d59" }}
            >
              {m}
            </span>
          ))}
        </div>
      )}

      {/* ── Exchange rate ── */}
      {station.exchangeRate && (
        <span
          className="mt-3 font-sans text-[13px] font-medium tabular-nums"
          style={{ color: "#87867f" }}
        >
          {station.exchangeRate}
        </span>
      )}

      {/* ── Black pill button: "进入 →" ── */}
      <div className="mt-5 flex items-center gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[14px] font-medium transition-all duration-200 group-hover:opacity-85"
          style={{ backgroundColor: "#141413", color: "#FAF9F5" }}
        >
          {isDead ? "失效" : station.category === "apinav" ? "查看" : "进入"}
          <ChevronRight size={14} strokeWidth={2} />
        </span>
        {station.minDeposit && (
          <span
            className="font-sans text-[13px] font-medium"
            style={{ color: "#87867f" }}
          >
            起 {station.minDeposit}
          </span>
        )}
      </div>
    </a>
  );
}
