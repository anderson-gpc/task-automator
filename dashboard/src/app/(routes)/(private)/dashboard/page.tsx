"use client";

import { verifyUser } from "@/src/actions/database/user-action";
import { verifyRefinedAcessToken } from "@/src/actions/database/token-action";
import { User } from "@/interfaces/user-interface";
import DashboardPage from "@/views/home/DashboardPage";
import DefaultPage from "@/views/home/DefaultPage";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState, useRef } from "react";
import { HomeContext } from "@/src/context";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [actionsGit, setActionGit] = useState<boolean>(false);
  const {token} = useContext(HomeContext)!;
  const checkedUserIdRef = useRef<number | null>(null);
  const lastTokenRef = useRef<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (status === "authenticated" && session?.user?.githubProfile) {
        const githubProfile = session.user.githubProfile;
        const userId = githubProfile.id;
        const tokenChanged = lastTokenRef.current !== null && lastTokenRef.current !== token;
        
        if (checkedUserIdRef.current === userId && !tokenChanged) {
          return;
        }

        const user: User = {
          login: githubProfile.login,
          githubId: userId,
        };

        try {
          await verifyUser(user);
          const hasToken = await verifyRefinedAcessToken(user.githubId);
          if (hasToken) setActionGit(true);
          else setActionGit(false);
          checkedUserIdRef.current = userId;
          lastTokenRef.current = token;
        } catch (error) {
          throw new Error(`[ERROR]: ${error}`);
        }
      }
    };

    checkUser();
  }, [status, session?.user?.githubProfile?.id, token]);

  if (actionsGit === true) {
    return <DashboardPage />;
  } else {
    return <DefaultPage />;
  }
}
