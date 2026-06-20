import { ChevronRight } from "lucide-react";
import { type ApiStation } from "@/data/api-stations";

interface StationCardProps {
  station: ApiStation;
  style?: React.CSSProperties;
}

export function StationCard({ station, style }: StationCardProps) {
  const domain = station.url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
  const isDead = station.urlStatus === "dead";
  const ctaLabel = isDead ? "失效" : station.category === "apinav" ? "查看" : "进入";

  return (
    <a
      href={station.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[20px] p-7 no-underline transition-all duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: "#F0EBE1", ...style }}
    >
      {/* ── 域名前缀 — 13px 灰色全大写 ── */}
      <span
        className="font-sans text-[13px] font-semibold uppercase tracking-[0.10em]"
        style={{ color: "#87867f" }}
      >
        {domain}
      </span>

      {/* ── 标题 — 22px Bold 700 ── */}
      <h3
        className="mt-1.5 font-sans text-[22px] font-bold leading-[1.25]"
        style={{ color: "#141413" }}
      >
        {station.name}
      </h3>

      {/* ── 简介 — 15px 灰色 左对齐 ── */}
      <p
        className="mt-2.5 font-sans text-[15px] font-normal leading-[1.55] text-left"
        style={{ color: "#5e5d59" }}
      >
        {station.description}
      </p>

      {/* ── 标签区 — 圆角灰底标签 ── */}
      {station.models && station.models.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {station.models.slice(0, 5).map((m) => (
            <span
              key={m}
              className="inline-flex items-center rounded-md px-2.5 py-1 font-sans text-[12px] font-medium"
              style={{ backgroundColor: "rgba(20,20,19,0.05)", color: "#5e5d59" }}
            >
              {m}
            </span>
          ))}
        </div>
      )}

      {/* ── 底部：黑色胶囊按钮 + 价格，同一行左对齐 ── */}
      <div className="mt-5 flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-[14px] font-medium transition-all duration-200 group-hover:opacity-85"
          style={{ backgroundColor: "#141413", color: "#FAF9F5" }}
        >
          {ctaLabel}
          <ChevronRight size={14} strokeWidth={2} />
        </span>
        {station.minDeposit && (
          <span
            className="font-sans text-[14px] font-medium tabular-nums"
            style={{ color: "#87867f" }}
          >
            起充 {station.minDeposit}
          </span>
        )}
        {station.exchangeRate && (
          <span
            className="font-sans text-[13px] font-medium tabular-nums ml-auto"
            style={{ color: "#87867f" }}
          >
            {station.exchangeRate}
          </span>
        )}
      </div>
    </a>
  );
}
