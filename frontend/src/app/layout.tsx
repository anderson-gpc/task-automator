import type { Metadata } from "next";
import "@/assets/css/globals.css";
import Provider from "@/components/SessionProvider";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Dashboard - Github",
  description: "",
};

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} w-full h-full  overflow-hidden`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
