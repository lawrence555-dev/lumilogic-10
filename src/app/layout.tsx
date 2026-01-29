import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google"; // Use Baloo 2 as requested
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Range of weights for hierarchy
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LumiLogic 10",
  description: "A 10-Year Logic Journey",
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} font-baloo antialiased bg-lumi-bg text-slate-600`}
      >
        {children}
      </body>
    </html>
  );
}
