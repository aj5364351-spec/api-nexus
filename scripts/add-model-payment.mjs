import { readFileSync, writeFileSync } from "fs";

let lines = readFileSync("src/data/api-stations.ts", "utf8").split("\n");

const catMap = {
  apikeyfun: "'多模型', paymentCategory: '按量'",
  "4sapi": "'多模型', paymentCategory: '按量'",
  catrouter: "'多模型', paymentCategory: '按量'",
  tokenriver: "'多模型', paymentCategory: '按量'",
  zenmux: "'多模型', paymentCategory: '按量'",
  laozhang: "'Claude', paymentCategory: '按量'",
  aihubmix: "'多模型', paymentCategory: '按量'",
  closeai: "'多模型', paymentCategory: '按量'",
  nearline: "'多模型', paymentCategory: '按量'",
  n1nai: "'多模型', paymentCategory: '高性价比'",
  shiyunapi: "'多模型', paymentCategory: '高性价比'",
  poloapi: "'Claude', paymentCategory: '按量'",
  leits: "'多模型', paymentCategory: '按量'",
  lmuai: "'Claude', paymentCategory: '高性价比'",
  whatai: "'多模型', paymentCategory: '高性价比'",
  packyapi: "'多模型', paymentCategory: '高性价比'",
  rightcode: "'Claude', paymentCategory: '高性价比'",
  zovelox: "'Claude', paymentCategory: '高性价比'",
  lingyaai: "'Claude', paymentCategory: '高性价比'",
  ccgpai: "'多模型', paymentCategory: '高性价比'",
  magic666: "'多模型', paymentCategory: '高性价比'",
  aicodemirror: "'Claude', paymentCategory: '高性价比'",
  "78code": "'Claude', paymentCategory: '高性价比'",
  dawcode: "'Claude', paymentCategory: '高性价比'",
  cubence: "'多模型', paymentCategory: '高性价比'",
  derouter: "'多模型', paymentCategory: '按量'",
  kkaiapi: "'Claude', paymentCategory: '高性价比'",
  apiyi: "'Claude', paymentCategory: '按量'",
  ikuncode: "'Claude', paymentCategory: '高性价比'",
  terminalpub: "'多模型', paymentCategory: '按量'",
  getcheapai: "'多模型', paymentCategory: '高性价比'",
  wenwenai: "'Claude', paymentCategory: '高性价比'",
  michu: "'Claude', paymentCategory: '高性价比'",
  nekocode: "'Claude', paymentCategory: '高性价比'",
  poixe: "'多模型', paymentCategory: '按量'",
  xproxy: "'多模型', paymentCategory: '按量'",
  oai2api: "'多模型', paymentCategory: '高性价比'",
  kevoryn: "'多模型', paymentCategory: '高性价比'",
  baoapi: "'多模型', paymentCategory: '高性价比'",
  getezo: "'GPT', paymentCategory: '高性价比'",
  "zhuji-ai": "'Claude', paymentCategory: '高性价比'",
  corerelay: "'多模型', paymentCategory: '高性价比'",
  apimart: "'多模型', paymentCategory: '高性价比'",
  tokenbox: "'多模型', paymentCategory: '高性价比'",
  fusecode: "'Claude', paymentCategory: '高性价比'",
  zetatechs: "'多模型', paymentCategory: '高性价比'",
  code0: "'多模型', paymentCategory: '高性价比'",
  crazyrouter: "'多模型', paymentCategory: '高性价比'",
  aidesuwa: "'Claude', paymentCategory: '高性价比'",
  siliconflow: "'国产', paymentCategory: '免费'",
  "qiniu-ai": "'多模型', paymentCategory: '免费'",
  bigmodel: "'国产', paymentCategory: '免费'",
  "deepseek-platform": "'DeepSeek', paymentCategory: '免费'",
  "moonshot-platform": "'国产', paymentCategory: '免费'",
  "aliyun-bailian": "'国产', paymentCategory: '按量'",
  "tencent-cloud": "'国产', paymentCategory: '按量'",
  "volcano-ark": "'国产', paymentCategory: '按量'",
  nicecode: "'Claude', paymentCategory: '高性价比'",
  ddshub: "'Claude', paymentCategory: '高性价比'",
  bulita: "'Claude', paymentCategory: '订阅'",
  coyes: "'Claude', paymentCategory: '订阅'",
  levolink: "'多模型', paymentCategory: '按量'",
  aigocode: "'多模型', paymentCategory: '订阅'",
  pincc: "'Claude', paymentCategory: '高性价比'",
  anyaigc: "'多模型', paymentCategory: '按量'",
  "ai-router": "'GPT', paymentCategory: '高性价比'",
  ofoxai: "'多模型', paymentCategory: '按量'",
  "302ai": "'多模型', paymentCategory: '按量'",
  ohmygpt: "'多模型', paymentCategory: '按量'",
  "jieko-ai": "'多模型', paymentCategory: '按量'",
  "one-api": "'多模型', paymentCategory: '免费'",
  "new-api": "'多模型', paymentCategory: '免费'",
  litellm: "'多模型', paymentCategory: '免费'",
  "gpt-load": "'多模型', paymentCategory: '免费'",
  "simple-one-api": "'国产', paymentCategory: '免费'",
  "one-hub": "'多模型', paymentCategory: '免费'",
  "uni-api": "'多模型', paymentCategory: '免费'",
  apipark: "'多模型', paymentCategory: '免费'",
  higress: "'多模型', paymentCategory: '免费'",
  ccx: "'Claude', paymentCategory: '免费'",
  metapi: "'多模型', paymentCategory: '免费'",
  apinav: "'多模型', paymentCategory: '免费'",
  proxycc: "'多模型', paymentCategory: '免费'",
  apiranking: "'多模型', paymentCategory: '免费'",
  helpaio: "'多模型', paymentCategory: '免费'",
  ccnavx: "'多模型', paymentCategory: '免费'",
  hvoy: "'多模型', paymentCategory: '免费'",
  "all-api-hub": "'多模型', paymentCategory: '免费'",
};

const newLines = [];
let currentId = null;
let count = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch) currentId = idMatch[1];

  // Look for line containing exchangeRate
  if (currentId && catMap[currentId] && line.includes("exchangeRate:")) {
    newLines.push(line + ` modelCategory: ${catMap[currentId]},`);
    count++;
    delete catMap[currentId];
  } else {
    newLines.push(line);
  }
}

const result = newLines.join("\n");
writeFileSync("src/data/api-stations.ts", result);
console.log(`Inserted: ${count}. Remaining: ${Object.keys(catMap).length}`);
if (Object.keys(catMap).length) console.log("Missed: " + Object.keys(catMap).join(", "));
