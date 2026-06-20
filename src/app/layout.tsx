import type { Metadata } from "next";
import { Playfair_Display, Manrope, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Hub — AI API 接口导航",
  description:
    "收录 178+ 个 AI API 接口与代理平台。按模型（Claude/GPT/Gemini/DeepSeek）、渠道类型、价格档位多维度筛选，一站式发现大模型接口。",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "API Hub",
    "AI API",
    "Claude API",
    "OpenAI 代理",
    "大模型接口",
    "中转站导航",
    "API 聚合",
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
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans font-normal">
        <Header />
        {children}
      </body>
    </html>
  );
}
