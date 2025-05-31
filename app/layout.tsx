import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import Head from "next/head";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "F-Ledger",
  description: "Your Family Finance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon_io/site.webmanifest" />
      </Head>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
