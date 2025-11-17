"use client";

import { useEffect, useState } from "react";
import { descrypt } from "@/lib/brycpt/descrypt";
import { octokitClient } from "@/lib/github/octokit";
import { NetworkInterface } from "@/interfaces/network-interface";

export function useDashboardData(session: any) {
  const [mutualFollowers, setMutualFollowers] = useState<NetworkInterface[]>([]);
  const [nonFollowers, setNonFollowers] = useState<NetworkInterface[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.acessToken) return;

    const fetchData = async () => {
      setLoading(true);

      const token = await descrypt(session.acessToken);
      const login = session.user.githubProfile.login;

      const followersResponse = await octokitClient(1, token, login);
      const followingResponse = await octokitClient(2, token, login);
      const issuesResponse = await octokitClient(4, token, login);

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
