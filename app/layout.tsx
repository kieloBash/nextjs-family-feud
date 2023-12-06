import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar";
import SidebarProvider from "@/components/contexts/SidebarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mercado Feud",
  description: "Xmas Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen w-screen relative`}
      >
        <SidebarProvider>
          <SideBar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
