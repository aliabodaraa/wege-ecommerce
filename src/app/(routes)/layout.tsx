import "../globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "../_navigation/header";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WEGE - E-commerce Demo",
  description: "Modern e-commerce app with filters & search",
  authors: [
    { name: "WEGE Company" },
    { name: "Ali Abodaraa", url: "https://github.com/aliabodaraa" },
  ],
  creator: "Ali Abodaraa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta property="og:title" content="WEGE - E-commerce Demo" />
        <meta
          property="og:description"
          content="Modern e-commerce app with filters & search"
        />
        <meta property="og:image" content="/images/shopping.png" />
        <meta
          property="og:url"
          content="https://wege-ecommerce-brown.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WEGE - E-commerce Demo" />
        <meta
          name="twitter:description"
          content="Modern e-commerce app with filters & search"
        />
        <meta name="twitter:image" content="/images/shopping.png" />
        <link rel="icon" href="/images/shopping.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider>
            <Header />
            <div className="flex overflow-hidden border-collapse h-[calc(100vh-60px)]">
              <main
                className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-secondary/20 flex flex-col
              "
              >
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
