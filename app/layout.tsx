import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PisonQALab — Engineering Confidence. Accelerating Quality.",
  description:
    "From world-class QA services to AI-powered testing and elite QA training — PisonQALab helps teams ship with confidence. Manual testing, automation, API, performance, security, and TestCatalyst AI platform.",
  keywords: [
    "QA consulting",
    "test automation",
    "quality assurance",
    "software testing",
    "AI testing platform",
    "TestCatalyst",
    "QA training",
    "API testing",
    "performance testing",
    "security testing",
  ],
  openGraph: {
    title: "PisonQALab — Engineering Confidence. Accelerating Quality.",
    description:
      "From world-class QA services to AI-powered testing and elite QA training — PisonQALab helps teams ship with confidence.",
    type: "website",
    siteName: "PisonQALab",
  },
  twitter: {
    card: "summary_large_image",
    title: "PisonQALab — Engineering Confidence. Accelerating Quality.",
    description:
      "From world-class QA services to AI-powered testing and elite QA training.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
