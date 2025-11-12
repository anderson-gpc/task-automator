"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ThereeDotComponent from "@/components/ThreeDot";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex items-center w-full h-full justify-center">
      <ThereeDotComponent text="Redirecionando" />
    </div>
  );
}
