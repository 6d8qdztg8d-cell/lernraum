import { Sidebar } from "@/components/app-shell/Sidebar";
import { TopBar } from "@/components/app-shell/TopBar";
import { MobileNav } from "@/components/app-shell/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full">
      <Sidebar />
      <div className="md:pl-[var(--sidebar-width)]">
        <TopBar />
        <main className="mx-auto min-h-[calc(100dvh-var(--topbar-height))] w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8 md:pb-12 lg:px-10">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
