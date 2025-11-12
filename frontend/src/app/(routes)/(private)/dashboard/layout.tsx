import { AppbarComponent } from "@/src/components/Appbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AppbarComponent name="Anderson" />
      {children}
    </main>
  );
}
