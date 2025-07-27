import { AuthProvider } from "@/lib/auth-context";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type React from "react";
import "./globals.css";

const IBM = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ReadTracker",
  description:
    "A clean, minimal reading tracker app to monitor your reading progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={IBM.className}>
        <AuthProvider>
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
