import type { Metadata } from "next"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    default: "光影智助 PhotoAI Studio - AI摄影创作助手",
    template: "%s | 光影智助",
  },
  description:
    "上传一张照片，获得专业摄影分析、调色建议和拍摄方案。从灵感到成片，让AI成为摄影师的创意搭档。",
  keywords: ["AI摄影", "照片分析", "摄影助手", "AI后期", "摄影策划", "光影智助"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "光影智助 PhotoAI Studio",
    title: "光影智助 PhotoAI Studio - 你的AI摄影创作助手",
    description: "上传一张照片，获得专业摄影分析、调色建议和拍摄方案。",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Providers>
          {children}
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{ duration: 4000 }}
          />
        </Providers>
      </body>
    </html>
  )
}
