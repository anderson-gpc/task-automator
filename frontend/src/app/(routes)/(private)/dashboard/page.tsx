"use client";

import { verifyUser } from "@/src/app/_actions/(mysql)/user-action";
import { verifyRefinedAcessToken } from "@/src/app/_actions/(mysql)/token-action";
import { User } from "@/src/interfaces/user-interface";
import { DashboardPage } from "@/src/pages/home/DashboardPage";
import DefaultPage from "@/src/pages/home/DefaultPage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [actionsGit, setActionGit] = useState<boolean>(false);

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
          const token = await verifyRefinedAcessToken(user.githubId);
          if (token) setActionGit(true);
        } catch (error) {
          throw new Error(`[ERROR]: ${error}`);
        }
      }
    };

    checkUser();
  }, [status, session]);

  if (actionsGit === true) {
    return <DashboardPage />;
  } else {
    return <DefaultPage />;
  }
}
