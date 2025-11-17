"use client"

import { AppbarComponent } from "@/components/Appbar";
import { HomeProvider } from "@/src/context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="w-full h-full">
      <HomeProvider>
        <AppbarComponent />
        {children}
      </HomeProvider>
    </main>
  );
}
