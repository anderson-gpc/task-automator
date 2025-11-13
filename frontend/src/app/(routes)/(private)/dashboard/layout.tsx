import { AppbarComponent } from "@/src/components/Appbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      <AppbarComponent />
      {children}
    </main>
  );
}
