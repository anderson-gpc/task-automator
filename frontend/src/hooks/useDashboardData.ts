"use client";

import { useEffect, useState } from "react";
import { descrypt } from "@/lib/brycpt/descrypt";
import { octokitClient } from "@/lib/github/octokit";
import { NetworkInterface } from "@/interfaces/network-interface";
import { getRefinedAcessToken } from "../actions/database/token-action";

export function useDashboardData(session: any) {
  const [mutualFollowers, setMutualFollowers] = useState<NetworkInterface[]>(
    []
  );
  const [nonFollowers, setNonFollowers] = useState<NetworkInterface[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let acess: string | null;

      if (!session.acessToken)
        acess = await getRefinedAcessToken(session!.user!.githubProfile!.id!);
      else acess = session.acessToken;

      if (!acess || typeof acess !== "string") {
        console.warn("Sem token disponível pra decriptar");
        return;
      }

      const githubToken = await descrypt(acess);
      const login = session.user.githubProfile.login;

      const followersResponse = await octokitClient(1, githubToken, login);
      const followingResponse = await octokitClient(2, githubToken, login);
      const issuesResponse = await octokitClient(4, githubToken, login);

      const followers = Array.isArray(followersResponse)
        ? followersResponse
        : followersResponse.data;

      const following = Array.isArray(followingResponse)
        ? followingResponse
        : followingResponse.data;

      const issues = Array.isArray(issuesResponse)
        ? issuesResponse
        : issuesResponse.data;

      const mutual = following.filter((u: any) =>
        followers.some((f: any) => f.id === u.id)
      );

      const non = following.filter(
        (u: any) => !followers.some((f: any) => f.id === u.id)
      );

      setMutualFollowers(mutual);
      setNonFollowers(non);
      setIssues(issues);
      setLoading(false);
    };

    fetchData();
  }, [session]);

  return { mutualFollowers, nonFollowers, issues, loading };
}
