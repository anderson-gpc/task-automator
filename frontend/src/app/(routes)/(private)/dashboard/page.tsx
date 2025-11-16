"use client";

import { verifyUser } from "@/src/app/_actions/(mysql)/user-action";
import { verifyRefinedAcessToken } from "@/src/app/_actions/(mysql)/token-action";
import { User } from "@/src/interfaces/user-interface";
import { DashboardPage } from "@/src/pages/home/DashboardPage";
import DefaultPage from "@/src/pages/home/DefaultPage";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { HomeContext } from "@/src/context";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [actionsGit, setActionGit] = useState<boolean>(false);
  const homeContext = use(HomeContext);

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
          console.log(`Dashboard: [${token}]`);
          if (token) setActionGit(true);
          else setActionGit(false);
        } catch (error) {
          throw new Error(`[ERROR]: ${error}`);
        }
      }
    };

    checkUser();
  }, [status, session, homeContext?.token]);

  if (actionsGit === true) {
    return <DashboardPage />;
  } else {
    return <DefaultPage />;
  }
}
