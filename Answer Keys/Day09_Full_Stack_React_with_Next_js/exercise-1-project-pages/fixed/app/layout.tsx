import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "TaskBoard" };

export default function RootLayout(
  { children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/">TaskBoard</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
