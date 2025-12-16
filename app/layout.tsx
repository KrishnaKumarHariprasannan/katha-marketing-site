import type { Metadata } from "next";
import { Quicksand, Mulish } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Katha",
  description: "Build Your Story With Us",
  icons: {
    icon: [
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "16x16" },
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "32x32" },
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "48x48" },
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "64x64" },
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "96x96" },
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/logo_gradient_white.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${mulish.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
