import { AppbarComponent } from "@/src/components/Appbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AppbarComponent />
      {children}
    </main>
  );
}
