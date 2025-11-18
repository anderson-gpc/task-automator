"use client";

import { verifyUser } from "@/src/actions/mysql/user-action";
import { verifyRefinedAcessToken } from "@/src/actions/mysql/token-action";
import { User } from "@/interfaces/user-interface";
import DashboardPage from "@/views/home/DashboardPage";
import DefaultPage from "@/views/home/DefaultPage";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/src/context";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [actionsGit, setActionGit] = useState<boolean>(false);
  const {token} = useContext(HomeContext)!;

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
          else setActionGit(false);
        } catch (error) {
          throw new Error(`[ERROR]: ${error}`);
        }
      }
    };

    checkUser();
  }, [status, session, token]);

  if (actionsGit === true) {
    return <DashboardPage />;
  } else {
    return <DefaultPage />;
  }
}
