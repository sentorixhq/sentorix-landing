import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sentorix — AI Governance Gateway",
  description:
    "Protect your AI usage with real-time PII detection, prompt injection blocking, and immutable audit logs. Drop-in integration with OpenAI, Anthropic, and AWS Bedrock.",
  keywords: [
    "AI governance",
    "PII detection",
    "prompt injection",
    "AI compliance",
    "EU AI Act",
    "HIPAA AI",
    "AI audit logs",
    "LLM security",
    "AI gateway",
  ],
  metadataBase: new URL("https://sentorix.io"),
  alternates: {
    canonical: "https://sentorix.io",
  },
  openGraph: {
    type: "website",
    url: "https://sentorix.io",
    title: "Sentorix — AI Governance Gateway",
    description:
      "Protect your AI usage with real-time PII detection, prompt injection blocking, and immutable audit logs. Drop-in integration with OpenAI, Anthropic, and AWS Bedrock.",
    siteName: "Sentorix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sentorix AI Governance Gateway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentorix — AI Governance Gateway",
    description:
      "Protect your AI usage with real-time PII detection, prompt injection blocking, and immutable audit logs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
