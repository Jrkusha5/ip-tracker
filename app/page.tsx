import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Address Tracker",
  description: "Track IP address details and location.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-[Rubik] bg-gray-50">{children}</body>
    </html>
  );
}
