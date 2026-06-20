export type Locale = "zh" | "en";

export const translations = {
  // Header
  submitSite: { zh: "提交站点", en: "Submit" },

  // Hero
  heroBadge: { zh: "API 接口索引", en: "API Index" },
  heroTitle: { zh: "API Hub", en: "API Hub" },
  heroSubtitle: {
    zh: "按模型、渠道与价格分类，一站找到最适合的 Claude、GPT、Gemini 等大模型 API 接口。",
    en: "Find the best API endpoints for Claude, GPT, Gemini, and more — filtered by model, channel, and price.",
  },
  heroSearchPlaceholder: {
    zh: "搜索站点名称、描述、模型...",
    en: "Search by name, description, model...",
  },

  // StatsBar
  statsTotal: { zh: "收录站点", en: "Listed" },
  statsVerified: { zh: "已验证存活", en: "Verified" },
  statsUpdated: { zh: "数据更新", en: "Updated" },

  // FilterBar
  filterAll: { zh: "全部", en: "All" },
  filterModel: { zh: "模型", en: "Model" },
  filterPayment: { zh: "付费", en: "Payment" },
  filterAdvanced: { zh: "高级筛选", en: "Filters" },
  filterPricingTier: { zh: "价格档位", en: "Pricing" },
  filterChannelType: { zh: "渠道类型", en: "Channel" },
  filterUrlStatus: { zh: "连接状态", en: "Status" },

  // ActiveFilters
  activeFilters: { zh: "筛选条件", en: "Active" },
  clearAll: { zh: "清除全部", en: "Clear all" },

  // Results
  resultsAll: { zh: "全部站点", en: "All" },
  resultsFiltered: { zh: "筛选结果", en: "Results" },
  resultsCount: { zh: "个", en: "" },

  // Empty state
  emptyTitle: { zh: "未找到匹配站点", en: "No matches found" },
  emptySubtitle: {
    zh: "尝试调整筛选条件或搜索关键词",
    en: "Try adjusting filters or search keywords",
  },
  emptyClearFilters: { zh: "清除所有筛选", en: "Clear all filters" },

  // StationCard
  cardEnter: { zh: "进入", en: "Visit" },
  cardViewOnApiNav: { zh: "在 ApiNav 查看", en: "View on ApiNav" },
  cardGitHub: { zh: "GitHub", en: "GitHub" },
  cardMinDeposit: { zh: "起充", en: "from" },
  cardHot: { zh: "热", en: "Hot" },
  cardDead: { zh: "失效", en: "Dead" },
  cardProxy: { zh: "需代理", en: "Proxy" },

  // Footer
  footerText: {
    zh: "API Nexus 仅做信息聚合。数据来源于公开信息与社区反馈（2026-06-20 更新）。使用中转站前请自行验证服务质量。",
    en: "API Nexus aggregates public information only. Data updated 2026-06-20. Verify service quality before use.",
  },
  footerSource: { zh: "完整数据源", en: "Data source" },

  // Category labels
  categoryLabels: {
    enterprise: { zh: "企业级服务", en: "Enterprise" },
    budget: { zh: "性价比优选", en: "Budget" },
    cloud: { zh: "官方云平台", en: "Cloud" },
    community: { zh: "社区推荐", en: "Community" },
    opensource: { zh: "开源/自建", en: "Open Source" },
    aggregator: { zh: "导航与评测", en: "Aggregator" },
    apinav: { zh: "ApiNav 收录", en: "ApiNav" },
  },

  // Model labels
  modelLabels: {
    Claude: { zh: "Claude", en: "Claude" },
    GPT: { zh: "GPT", en: "GPT" },
    Gemini: { zh: "Gemini", en: "Gemini" },
    DeepSeek: { zh: "DeepSeek", en: "DeepSeek" },
    "国产": { zh: "国产模型", en: "Domestic" },
    "多模型": { zh: "多模型", en: "Multi" },
  },

  // Payment labels
  paymentLabels: {
    "高性价比": { zh: "高性价比", en: "Value" },
    "免费": { zh: "免费", en: "Free" },
    "按量": { zh: "按量付费", en: "Pay-as-you-go" },
    "订阅": { zh: "按期付费", en: "Subscription" },
  },

  // Pricing tier labels
  pricingTierLabels: {
    "免费": { zh: "免费", en: "Free" },
    "超低价": { zh: "超低价", en: "Ultra-low" },
    "低价": { zh: "低价", en: "Low" },
    "均价": { zh: "均价", en: "Avg" },
    "溢价": { zh: "溢价", en: "Premium" },
  },

  // Channel type labels
  channelTypeLabels: {
    "官直": { zh: "官方直连", en: "Official" },
    "中转": { zh: "中转代理", en: "Relay" },
    "逆向": { zh: "逆向接口", en: "Reverse" },
    "开源": { zh: "开源项目", en: "OSS" },
    "拼车": { zh: "拼车合租", en: "Group" },
    "未知": { zh: "未知", en: "Unknown" },
  },

  // URL status labels
  urlStatusLabels: {
    verified: { zh: "已验证", en: "Verified" },
    timeout: { zh: "需代理", en: "Proxy req." },
    dead: { zh: "已失效", en: "Dead" },
    unchecked: { zh: "未验证", en: "Unchecked" },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = translations[key] as Record<Locale, string> | undefined;
  if (!entry) return key;
  return (entry as Record<Locale, string>)[locale] ?? (entry as Record<Locale, string>).zh;
}

// Helpers for label groups
function getLabel(
  group: Record<string, { zh: string; en: string }>,
  key: string,
  locale: Locale
): string {
  const entry = group[key];
  if (!entry) return key;
  return entry[locale] ?? entry.zh;
}

export function getCategoryLabel(cat: string, locale: Locale): string {
  return getLabel(translations.categoryLabels as unknown as Record<string, { zh: string; en: string }>, cat, locale);
}

export function getModelLabel(model: string, locale: Locale): string {
  return getLabel(translations.modelLabels as unknown as Record<string, { zh: string; en: string }>, model, locale);
}

export function getPaymentLabel(payment: string, locale: Locale): string {
  return getLabel(translations.paymentLabels as unknown as Record<string, { zh: string; en: string }>, payment, locale);
}

export function getPricingTierLabel(pt: string, locale: Locale): string {
  return getLabel(translations.pricingTierLabels as unknown as Record<string, { zh: string; en: string }>, pt, locale);
}

export function getChannelTypeLabel(ct: string, locale: Locale): string {
  return getLabel(translations.channelTypeLabels as unknown as Record<string, { zh: string; en: string }>, ct, locale);
}

export function getUrlStatusLabel(us: string, locale: Locale): string {
  return getLabel(translations.urlStatusLabels as unknown as Record<string, { zh: string; en: string }>, us, locale);
}
