import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { WandCursor } from "@/components/ui/WandCursor";
import "./globals.css";

const themeInitScript = `try{var s=localStorage.getItem('noumi-theme');var t=s||'dark';var r=document.documentElement;if(t==='light'){r.classList.add('light')}else{r.classList.add('dark')}r.style.colorScheme=t}catch(e){}`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://isratnoumi.github.io/Noumi-portfolio";
const siteName = "Israt Moyeen Noumi — AI/ML Application Developer";
const description =
  "Portfolio of Israt Moyeen Noumi — AI/ML Application Developer at Dexian Bangladesh. Builds LLM-powered products and agentic AI systems with FastAPI, Next.js, LangChain and Azure OpenAI.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s — Israt Moyeen Noumi",
  },
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description,
    url: siteUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <CommandPalette />
          <WandCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
