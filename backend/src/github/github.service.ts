import { Injectable } from "@nestjs/common";

@Injectable()
export class GithubService {
  getFriends(
    followers: Record<string, any>[],
    following: Record<string, any>[]
  ): Record<string, any>[] {
    const data = following.filter((followingUser: any) =>
      followers.some((follower: any) => follower.id === followingUser.id)
    );
    return data;
  }

  getNotFollowers(
    followeres: Record<string, any>[],
    following: Record<string, any>[]
  ): Record<string, any>[] {
    const data = following.filter((followingUser: any) =>
      !followeres.some((follower: any) => follower.id === followingUser.id)
    );
    return data;
  }
}
