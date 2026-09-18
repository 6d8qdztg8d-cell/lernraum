import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastViewport } from "@/components/ui/ToastViewport";

export const metadata: Metadata = {
  title: "Lernraum",
  description: "Die zentrale Datenablage für Unterrichtsmaterialien.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f5f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full bg-[var(--background)] text-[var(--text-primary)] antialiased">
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
