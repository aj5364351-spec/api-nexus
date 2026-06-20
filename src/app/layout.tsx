import type { Metadata } from "next";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/contexts/language-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Hub — AI API Interface Index",
  description:
    "收录 178+ 个 AI API 接口与代理平台的开放索引。按模型、渠道、价格筛选 Claude、GPT、Gemini 等大模型接口。",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "API Hub",
    "AI API",
    "Claude API",
    "OpenAI proxy",
    "LLM interface",
    "API index",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
