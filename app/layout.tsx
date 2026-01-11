import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Application tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
