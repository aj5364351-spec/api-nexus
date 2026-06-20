import { readFileSync, writeFileSync } from "fs";

let lines = readFileSync("src/data/api-stations.ts", "utf8").split("\n");

const fieldMap = {
  apikeyfun: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  "4sapi": `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  catrouter: `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  tokenriver: `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  zenmux: `    channelType: '官直', pricingTier: '溢价', exchangeRate: '¥7.3/$',`,
  laozhang: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  aihubmix: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.1/$',`,
  closeai: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  nearline: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  n1nai: `    channelType: '官直', pricingTier: '超低价', exchangeRate: '¥1.0/$',`,
  shiyunapi: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.5/$',`,
  poloapi: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥6.5/$',`,
  leits: `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  lmuai: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥2.4/$',`,
  whatai: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥2.0/$',`,
  packyapi: `    channelType: '逆向', pricingTier: '超低价', exchangeRate: '¥1.0/$',`,
  rightcode: `    channelType: '逆向', pricingTier: '超低价', exchangeRate: '¥0.3/$',`,
  zovelox: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥0.5/$',`,
  lingyaai: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.0/$',`,
  ccgpai: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥2.1/$',`,
  magic666: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥0.7/$',`,
  aicodemirror: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥2.7/$',`,
  "78code": `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.5/$',`,
  dawcode: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥1.5/$',`,
  cubence: `    channelType: '逆向', pricingTier: '超低价', exchangeRate: '¥0.3/$',`,
  derouter: `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  kkaiapi: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥5.0/$',`,
  apiyi: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  ikuncode: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥2.3/$',`,
  terminalpub: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥5.0/$',`,
  getcheapai: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥1.0/$',`,
  wenwenai: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '赠金',`,
  michu: `    channelType: '逆向', pricingTier: '超低价', exchangeRate: '¥0.5/$',`,
  nekocode: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥1.8/$',`,
  poixe: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  xproxy: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥5.0/$',`,
  oai2api: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.0/$',`,
  kevoryn: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.0/$',`,
  baoapi: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥5.0/$',`,
  getezo: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '¥2.0/$',`,
  "zhuji-ai": `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥4.0/$',`,
  corerelay: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.0/$',`,
  apimart: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '$1起',`,
  tokenbox: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '$1起',`,
  fusecode: `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  zetatechs: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥4.0/$',`,
  code0: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥5.0/$',`,
  crazyrouter: `    channelType: '中转', pricingTier: '超低价', exchangeRate: '$1起',`,
  aidesuwa: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.0/$',`,
  siliconflow: `    channelType: '官直', pricingTier: '免费', exchangeRate: '免费额度',`,
  "qiniu-ai": `    channelType: '官直', pricingTier: '免费', exchangeRate: '300万tokens',`,
  bigmodel: `    channelType: '官直', pricingTier: '免费', exchangeRate: '2000万tokens',`,
  "deepseek-platform": `    channelType: '官直', pricingTier: '免费', exchangeRate: '赠10元',`,
  "moonshot-platform": `    channelType: '官直', pricingTier: '免费', exchangeRate: '赠15元',`,
  "aliyun-bailian": `    channelType: '官直', pricingTier: '均价', exchangeRate: '按量',`,
  "tencent-cloud": `    channelType: '官直', pricingTier: '均价', exchangeRate: '限量',`,
  "volcano-ark": `    channelType: '官直', pricingTier: '均价', exchangeRate: '按量',`,
  nicecode: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥5.0/$',`,
  ddshub: `    channelType: '拼车', pricingTier: '低价', exchangeRate: '拼车',`,
  bulita: `    channelType: '中转', pricingTier: '均价', exchangeRate: '订阅',`,
  coyes: `    channelType: '中转', pricingTier: '低价', exchangeRate: '套餐',`,
  levolink: `    channelType: '官直', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  aigocode: `    channelType: '中转', pricingTier: '低价', exchangeRate: '月卡',`,
  pincc: `    channelType: '拼车', pricingTier: '低价', exchangeRate: '拼车',`,
  anyaigc: `    channelType: '中转', pricingTier: '低价', exchangeRate: '¥3.0/$',`,
  "ai-router": `    channelType: '中转', pricingTier: '低价', exchangeRate: '日¥0.97',`,
  ofoxai: `    channelType: '中转', pricingTier: '均价', exchangeRate: '¥7.0/$',`,
  "302ai": `    channelType: '中转', pricingTier: '均价', exchangeRate: '$1起',`,
  ohmygpt: `    channelType: '中转', pricingTier: '均价', exchangeRate: '$4起',`,
  "jieko-ai": `    channelType: '中转', pricingTier: '均价', exchangeRate: '$1起',`,
  "one-api": `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  "new-api": `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  litellm: `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  "gpt-load": `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  "simple-one-api": `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  "one-hub": `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  "uni-api": `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  apipark: `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  higress: `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  ccx: `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  metapi: `    channelType: '开源', pricingTier: '免费', exchangeRate: '开源',`,
  apinav: `    channelType: '未知', pricingTier: '免费', exchangeRate: '导航站',`,
  proxycc: `    channelType: '未知', pricingTier: '免费', exchangeRate: '导航站',`,
  apiranking: `    channelType: '未知', pricingTier: '免费', exchangeRate: '评测站',`,
  helpaio: `    channelType: '未知', pricingTier: '免费', exchangeRate: '评测站',`,
  ccnavx: `    channelType: '未知', pricingTier: '免费', exchangeRate: '导航站',`,
  hvoy: `    channelType: '未知', pricingTier: '免费', exchangeRate: '评测站',`,
  "all-api-hub": `    channelType: '开源', pricingTier: '免费', exchangeRate: '插件',`,
};

const newLines = [];
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  newLines.push(line);

  // Detect the id of current entry
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch) currentId = idMatch[1];

  // After urlStatus line, insert new fields if this entry is in our map
  const urlMatch = line.match(/^\s*urlStatus:\s*"[a-z]+",?\s*$/);
  if (urlMatch && currentId && fieldMap[currentId]) {
    newLines.push(fieldMap[currentId]);
    delete fieldMap[currentId]; // only insert once
  }
}

const result = newLines.join("\n");
writeFileSync("src/data/api-stations.ts", result);

const remaining = Object.keys(fieldMap);
console.log(`Inserted fields for entries.`);
if (remaining.length > 0) {
  console.log(`Not found (${remaining.length}): ${remaining.join(", ")}`);
}
