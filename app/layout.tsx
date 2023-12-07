import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar";
import SidebarProvider from "@/components/contexts/SidebarProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
        className={`${poppins.className} flex min-h-screen w-screen relative`}
      >
        <QueryProvider>
          <SidebarProvider>
            <SideBar />
            {children}
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
