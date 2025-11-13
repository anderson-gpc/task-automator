"use client";

import { verifyUser } from "@/src/app/_actions/(mysql)/user-action";
import { User } from "@/src/interfaces/user-interface";
import { DashboardPage } from "@/src/pages/home/DashboardPage";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (status === "authenticated" && session?.user?.githubProfile) {
        const githubProfile = session.user.githubProfile;
        const user: User = {
          login: githubProfile.login,
          githubId: githubProfile.id,
        };

        try {
          await verifyUser(user);
          console.log("Usuário verificado com sucesso!");
        } catch (error) {
          console.error("Erro ao verificar usuário:", error);
        }
      }
    };

    checkUser();
  }, [status, session]);

  return <DashboardPage />;
}
