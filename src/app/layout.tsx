import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import ClientShell from "../components/ClientShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "WorkHop",
  description: "WorkHop - Book your station",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
